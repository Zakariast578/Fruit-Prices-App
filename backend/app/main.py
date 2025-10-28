from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import os
from fastapi.middleware.cors import CORSMiddleware
import difflib  
import dotenv

# ==========================================
# ✅ Load environment variables
# ==========================================
dotenv.load_dotenv()


# ==========================================
# ✅ Initialize FastAPI
# ==========================================
app = FastAPI(
    title="🍎 Fruit Price Prediction API",
    description="Predict fruit retail prices using ML models (RF, LR, DT)",
    version="2.1.0",
)

# ==========================================
# 🌐 CORS Setup
# ==========================================

origins =[
    os.getenv("FRONTEND_URL"),
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# 📦 Load Models
# ==========================================
MODEL_DIR = os.path.join(os.path.dirname(__file__), "../models")

rf_model = joblib.load(os.path.join(MODEL_DIR, "random_forest_model.pkl"))
lr_model = joblib.load(os.path.join(MODEL_DIR, "linear_regression_model.pkl"))
dt_model = joblib.load(os.path.join(MODEL_DIR, "decision_tree_model.pkl"))
scaler = joblib.load(os.path.join(MODEL_DIR, "scaler.pkl"))
label_encoder_fruit = joblib.load(os.path.join(MODEL_DIR, "label_encoder_fruit.pkl"))
feature_columns = joblib.load(os.path.join(MODEL_DIR, "feature_columns.pkl"))

available_fruits = list(label_encoder_fruit.classes_)
print("✅ Loaded models successfully!")
print("✅ Available fruits:", available_fruits)

# ==========================================
# 🧾 Input Schema
# ==========================================
class FruitFeatures(BaseModel):
    fruit: str
    form_Dried: bool
    form_Fresh: bool
    form_Frozen: bool
    form_Juice: bool
    yield_factor: float
    cup_eq_size: float
    cup_eq_price: float


# ==========================================
# 🏠 Root
# ==========================================
@app.get("/")
def home():
    return {
        "message": "🍉 Fruit Price Prediction API running!",
        "models": ["Random Forest", "Linear Regression", "Decision Tree"],
        "fruits_endpoint": "/fruits",
    }


# ==========================================
# 🍒 Fruits Endpoint
# ==========================================
@app.get("/fruits")
def get_fruits():
    """List all fruits available in the encoder."""
    return {"available_fruits": available_fruits}


# ==========================================
# 🧩 Helper Function
# ==========================================
def find_best_match(user_input: str, choices: list, cutoff: float = 0.6):
    """Find best fuzzy match for a fruit name."""
    matches = difflib.get_close_matches(user_input, choices, n=1, cutoff=cutoff)
    return matches[0] if matches else None


def prepare_features(data: dict):
    """Encode and scale input features with fuzzy matching."""

    # Normalize input fruit name
    user_fruit = data["fruit"].strip().title()

    # Try to find the closest match
    best_match = find_best_match(user_fruit, available_fruits)
    if not best_match:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown fruit '{user_fruit}'. Available fruits: {available_fruits}",
        )

    print(f"🔍 Matched '{user_fruit}' → '{best_match}'")

    fruit_encoded = label_encoder_fruit.transform([best_match])[0]

    # Prepare features
    features = [
        data["yield_factor"],
        data["cup_eq_size"],
        data["cup_eq_price"],
        fruit_encoded,
        int(data["form_Dried"]),
        int(data["form_Fresh"]),
        int(data["form_Frozen"]),
        int(data["form_Juice"]),
    ]

    # Scale numeric parts (first 4)
    numeric_features = np.array(features[:4]).reshape(1, -1)
    scaled_numeric = scaler.transform(numeric_features)

    # Combine scaled + categorical
    final_features = np.concatenate(
        [scaled_numeric, np.array(features[4:]).reshape(1, -1)], axis=1
    )

    return final_features, best_match


# ==========================================
# 🔮 Predict Endpoint
# ==========================================
@app.post("/predict")
def predict_price(data: FruitFeatures):
    """Predict price using all trained models."""

    input_data = data.dict()
    print("📥 Incoming data:", input_data)

    try:
        final_features, matched_fruit = prepare_features(input_data)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Feature preparation failed: {str(e)}")

    try:
        rf_pred = rf_model.predict(final_features)[0]
        lr_pred = lr_model.predict(final_features)[0]
        dt_pred = dt_model.predict(final_features)[0]

        result = {
            "matched_fruit": matched_fruit,
            "predictions": {
                "RandomForest": round(float(rf_pred), 2),
                "LinearRegression": round(float(lr_pred), 2),
                "DecisionTree": round(float(dt_pred), 2),
            },
        }

        print("✅ Prediction complete:", result)
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Model prediction failed: {str(e)}")


# ==========================================
# 🚀 Run command
# ==========================================
# uvicorn app.main:app --reload
