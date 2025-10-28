import React from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import {
    ArrowLeft,
    RefreshCw,
    Loader2,
    Trees,
    TrendingUp,
    Database,
    Sparkles,
} from "lucide-react";

type FormValues = {
    fruit: string;
    form: "Fresh" | "Frozen" | "Dried" | "Juice";
    yield_factor: number | "";
    cup_eq_size: number | "";
    cup_eq_price: number | "";
};

type Predictions = {
    RandomForest: number;
    LinearRegression: number;
    DecisionTree: number;
};

const DEFAULT_VALUES: FormValues = {
    fruit: "Apples",
    form: "Fresh",
    yield_factor: "",
    cup_eq_size: "",
    cup_eq_price: "",
};

const FRUITS = [
    "Apples",
    "Bananas",
    "Blueberries",
    "Mangoes",
    "Oranges",
    "Pineapple",
    "Strawberries",
    "Watermelon",
];

const cardEnter = { opacity: 0, y: 10 };
const cardAnimate = { opacity: 1, y: 0 };

const PredictPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({ defaultValues: DEFAULT_VALUES });

    const [loading, setLoading] = React.useState(false);
    const [result, setResult] = React.useState<Predictions | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    const onSubmit = async (data: FormValues) => {
        setError(null);
        setResult(null);
        setLoading(true);

        const payload = {
            fruit: data.fruit,
            form_Dried: data.form === "Dried",
            form_Fresh: data.form === "Fresh",
            form_Frozen: data.form === "Frozen",
            form_Juice: data.form === "Juice",
            yield_factor: Number(data.yield_factor),
            cup_eq_size: Number(data.cup_eq_size),
            cup_eq_price: Number(data.cup_eq_price),
        };

        try {
            const resp = await axios.post<{ predictions: Predictions }>(
                import.meta.env.VITE_API_URL + "/predict",
                payload,
                { headers: { "Content-Type": "application/json" }, timeout: 15000 }
            );

            const preds = resp.data?.predictions;
            if (!preds) throw new Error("Invalid response");
            setResult(preds);
        } catch (err: unknown) {
            console.error(err);
            const maybe = err as any;
            const msg =
                maybe?.response?.data?.detail ||
                maybe?.message ||
                "Failed to fetch predictions. Please try again.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-12 px-6 bg-gradient-to-br from-slate-50 via-white to-sky-50">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={cardEnter}
                    animate={cardAnimate}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-semibold text-slate-800">
                                Fruit Price Prediction
                            </h1>
                            <p className="mt-1 text-sm text-slate-500">
                                Estimate retail price using multiple ML models.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Link to="/" className="flex items-center text-sm text-slate-700 hover:text-slate-900">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left: Form Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                    >
                        <Card className="shadow-md rounded-xl overflow-hidden">
                            <CardHeader className="bg-white px-6 py-5">
                                <CardTitle>
                                    <div className="flex items-center gap-3">
                                        <Sparkles className="h-6 w-6 text-indigo-500" />
                                        <div>
                                            <div className="text-lg font-medium text-slate-800">Predict</div>
                                            <p className="text-xs text-slate-500">Provide inputs to get model estimates</p>
                                        </div>
                                    </div>
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="bg-white px-6 py-6">
                                {error && (
                                    <Alert variant="destructive" className="mb-4">
                                        <AlertTitle>Prediction failed</AlertTitle>
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div>
                                        <Label htmlFor="fruit" className="mb-2">
                                            Fruit
                                        </Label>
                                        <Controller
                                            control={control}
                                            name="fruit"
                                            rules={{ required: "Select a fruit" }}
                                            render={({ field }) => (
                                                <Select onValueChange={(v) => field.onChange(v)} value={field.value}>
                                                    <SelectTrigger id="fruit" className="w-full">
                                                        <SelectValue placeholder="Select fruit" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {FRUITS.map((f) => (
                                                            <SelectItem key={f} value={f}>
                                                                {f}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        {errors.fruit && <p className="text-xs text-red-600 mt-1">{errors.fruit.message}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="form" className="mb-2">
                                            Form
                                        </Label>
                                        <Controller
                                            control={control}
                                            name="form"
                                            render={({ field }) => (
                                                <Select onValueChange={(v) => field.onChange(v)} value={field.value}>
                                                    <SelectTrigger id="form" className="w-full">
                                                        <SelectValue placeholder="Select form" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Fresh">Fresh</SelectItem>
                                                        <SelectItem value="Frozen">Frozen</SelectItem>
                                                        <SelectItem value="Dried">Dried</SelectItem>
                                                        <SelectItem value="Juice">Juice</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <div>
                                            <Label htmlFor="yield_factor" className="mb-2">
                                                Yield Factor
                                            </Label>
                                            <Input
                                                id="yield_factor"
                                                type="number"
                                                step="any"
                                                placeholder="e.g., 0.85"
                                                {...register("yield_factor", {
                                                    required: "Required",
                                                    valueAsNumber: true,
                                                    validate: (v) => (v > 0 ? true : "Must be > 0"),
                                                })}
                                            />
                                            {errors.yield_factor && (
                                                <p className="text-xs text-red-600 mt-1">{(errors.yield_factor as any).message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="cup_eq_size" className="mb-2">
                                                Cup Eq. Size
                                            </Label>
                                            <Input
                                                id="cup_eq_size"
                                                type="number"
                                                step="any"
                                                placeholder="e.g., 1.5"
                                                {...register("cup_eq_size", {
                                                    required: "Required",
                                                    valueAsNumber: true,
                                                    validate: (v) => (v > 0 ? true : "Must be > 0"),
                                                })}
                                            />
                                            {errors.cup_eq_size && (
                                                <p className="text-xs text-red-600 mt-1">{(errors.cup_eq_size as any).message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="cup_eq_price" className="mb-2">
                                                Cup Eq. Price
                                            </Label>
                                            <Input
                                                id="cup_eq_price"
                                                type="number"
                                                step="any"
                                                placeholder="e.g., 2.50"
                                                {...register("cup_eq_price", {
                                                    required: "Required",
                                                    valueAsNumber: true,
                                                    validate: (v) => (v >= 0 ? true : "Must be ≥ 0"),
                                                })}
                                            />
                                            {errors.cup_eq_price && (
                                                <p className="text-xs text-red-600 mt-1">{(errors.cup_eq_price as any).message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                <Button type="submit" disabled={loading || isSubmitting} className="inline-flex items-center gap-2">
                                                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                                                    Predict
                                                </Button>
                                            </motion.div>

                                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    onClick={() => {
                                                        reset(DEFAULT_VALUES);
                                                        setResult(null);
                                                        setError(null);
                                                    }}
                                                    className="inline-flex items-center gap-2"
                                                >
                                                    <RefreshCw className="h-4 w-4" />
                                                    Reset
                                                </Button>
                                            </motion.div>
                                        </div>

                                        <Link to="/" className="text-sm text-indigo-600 hover:underline">
                                            <ArrowLeft className="inline-block mr-2 h-4 w-4 align-middle" />
                                            Back to Home
                                        </Link>
                                    </div>
                                </form>
                            </CardContent>

                            <CardFooter className="bg-white px-6 py-4">
                                <div className="text-xs text-slate-500">
                                    Predictions are estimates. Validate before production.
                                </div>
                            </CardFooter>
                        </Card>
                    </motion.div>

                    {/* Right: Result Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                    >
                        <Card className="overflow-hidden rounded-xl shadow-md">
                            <CardHeader className="px-6 py-5" />
                            <CardContent className="px-6 py-6 bg-gradient-to-br from-indigo-50 to-sky-50">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="text-sm text-slate-700 font-medium">Model Predictions</div>
                                        <p className="text-xs text-slate-500 mt-1">Results from multiple estimators</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <motion.div
                                            animate={result ? { scale: [1, 1.05, 1] } : { scale: [1, 1.02, 1] }}
                                            transition={{ repeat: result ? 0 : Infinity, duration: 1.8 }}
                                            className="p-2 rounded-md bg-white/60"
                                        >
                                            {!result ? (
                                                <Sparkles className="h-6 w-6 text-indigo-500" />
                                            ) : (
                                                <Database className="h-6 w-6 text-indigo-600" />
                                            )}
                                        </motion.div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    {!result && !loading ? (
                                        <div className="flex flex-col items-center justify-center py-16">
                                            <Sparkles className="h-10 w-10 text-indigo-400 animate-pulse" />
                                            <p className="mt-4 text-sm text-slate-600">No prediction yet. Submit the form to see results.</p>
                                        </div>
                                    ) : loading ? (
                                        <div className="flex items-center justify-center py-14">
                                            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                                        </div>
                                    ) : result ? (
                                        <motion.div
                                            key="predictions"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.35 }}
                                            className="space-y-4"
                                        >
                                            <div className="grid grid-cols-1 gap-3">
                                                <div className="flex items-center justify-between bg-white/60 rounded-lg p-4 shadow-sm">
                                                    <div className="flex items-center gap-3">
                                                            <Trees className="h-5 w-5 text-emerald-600" />
                                                            <div>
                                                                <div className="text-sm font-medium text-slate-700">Decision Tree</div>
                                                                <div className="text-xs text-slate-500">Interpretable tree model</div>
                                                            </div>
                                                        </div>
                                                    <div className="text-lg font-semibold text-slate-800">${result.DecisionTree.toFixed(2)}</div>
                                                </div>

                                                <div className="flex items-center justify-between bg-white/60 rounded-lg p-4 shadow-sm">
                                                    <div className="flex items-center gap-3">
                                                        <Database className="h-5 w-5 text-sky-600" />
                                                        <div>
                                                            <div className="text-sm font-medium text-slate-700">Random Forest</div>
                                                            <div className="text-xs text-slate-500">Ensemble tree estimator</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-lg font-semibold text-slate-800">${result.RandomForest.toFixed(2)}</div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : null}
                                </div>
                            </CardContent>

                            <CardFooter className="bg-white px-6 py-4">
                                <div className="text-xs text-slate-500">
                                    Results animate on arrival. Refresh input or use Reset to run new predictions.
                                </div>
                            </CardFooter>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default PredictPage;
