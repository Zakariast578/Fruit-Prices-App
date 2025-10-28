import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Info,
    Sparkles,
    Brain,
    Rocket,
    Zap,
    Cpu,
    Apple,
    Sliders,
    TrendingUp,
    Calculator,
    type LucideIcon,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Step = {
    title: string;
    description: string;
    Icon: LucideIcon;
    accent: string;
};

type Highlight = {
    title: string;
    description: string;
    Icon: LucideIcon;
    accent: string;
};

const tabContentVariants = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -24 },
};

const highlights: Highlight[] = [
    {
        title: "Ensemble Intelligence",
        description: "Blends Random Forest, Gradient Boosting, and Linear Regression for resilient forecasts.",
        Icon: Brain,
        accent: "bg-indigo-100 text-indigo-500",
    },
    {
        title: "Optimized Pipeline",
        description: "FastAPI microservices orchestrate feature engineering and inference in milliseconds.",
        Icon: Cpu,
        accent: "bg-purple-100 text-purple-500",
    },
    {
        title: "Delightful Experience",
        description: "Tailwind-powered UI, Framer Motion, and shadcn/ui deliver a smooth analyst workflow.",
        Icon: Zap,
        accent: "bg-rose-100 text-rose-500",
    },
];

const steps: Step[] = [
    {
        title: "Choose a fruit",
        description: "Select the produce you want to price, from apples to exotic imports.",
        Icon: Apple,
        accent: "bg-rose-100 text-rose-500",
    },
    {
        title: "Select its form",
        description: "Fresh, dried, organic—capture market context with configurable attributes.",
        Icon: Sliders,
        accent: "bg-amber-100 text-amber-500",
    },
    {
        title: "Enter yield and metrics",
        description: "Add yield, size, and historical price bands to enrich the feature set.",
        Icon: TrendingUp,
        accent: "bg-indigo-100 text-indigo-500",
    },
    {
        title: "Predict with AI",
        description: "Trigger the ensemble engine and receive calibrated retail price estimates instantly.",
        Icon: Calculator,
        accent: "bg-emerald-100 text-emerald-500",
    },
];

const About: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"about" | "how">("about");

    return (
        <motion.main
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="min-h-screen bg-gradient-to-br from-slate-50 to-white px-6 py-12 flex items-center justify-center"
        >
            <Card className="w-full max-w-4xl rounded-3xl border border-white/60 bg-white/80 shadow-2xl backdrop-blur-xl">
                <CardHeader className="space-y-6 text-center">
                    <motion.div
                        className="flex justify-center gap-6 text-indigo-500"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 220, damping: 12 }}
                    >
                        <motion.span whileHover={{ rotate: -8, scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <Sparkles className="h-8 w-8" />
                        </motion.span>
                        <motion.span whileHover={{ rotate: 6, scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <Rocket className="h-8 w-8 text-purple-500" />
                        </motion.span>
                        <motion.span whileHover={{ rotate: -4, scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <Info className="h-8 w-8 text-rose-500" />
                        </motion.span>
                    </motion.div>

                    <CardTitle className="text-4xl font-semibold tracking-tight text-slate-900">
                        Fruit Price AI
                    </CardTitle>
                    <motion.p
                        className="mx-auto max-w-2xl text-base text-slate-600"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.45 }}
                    >
                        Predictive analytics for global fruit retailers, blending ensemble machine learning with a refined user experience.
                    </motion.p>
                </CardHeader>

                <CardContent className="pt-4">
                    <Tabs
                        value={activeTab}
                        onValueChange={(val) => setActiveTab(val as typeof activeTab)}
                        className="space-y-6"
                    >
                        <TabsList className="grid grid-cols-2 rounded-full bg-slate-100 p-1 shadow-inner">
                            <TabsTrigger
                                value="about"
                                className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow"
                            >
                                <motion.span whileHover={{ rotate: -6 }} whileTap={{ scale: 0.9 }}>
                                    <Info className="h-4 w-4" />
                                </motion.span>
                                About
                            </TabsTrigger>
                            <TabsTrigger
                                value="how"
                                className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow"
                            >
                                <motion.span whileHover={{ rotate: 6 }} whileTap={{ scale: 0.9 }}>
                                    <Brain className="h-4 w-4" />
                                </motion.span>
                                How It Works
                            </TabsTrigger>
                        </TabsList>

                        <div className="relative">
                            <AnimatePresence mode="wait">
                                {activeTab === "about" && (
                                    <TabsContent value="about" forceMount className="mt-0">
                                        <motion.div
                                            key="about"
                                            variants={tabContentVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            transition={{ duration: 0.45, ease: "easeOut" }}
                                            className="space-y-8 rounded-2xl border border-white/60 bg-white/70 p-8 shadow-lg"
                                        >
                                            <motion.div
                                                className="flex flex-wrap items-center justify-center gap-6"
                                                initial={{ opacity: 0, y: 16 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.15, duration: 0.4 }}
                                            >
                                                <motion.span whileHover={{ scale: 1.15, rotate: -8 }} whileTap={{ scale: 0.95 }}>
                                                    <Sparkles className="h-10 w-10 text-amber-500" />
                                                </motion.span>
                                                <motion.span whileHover={{ scale: 1.15, rotate: 8 }} whileTap={{ scale: 0.95 }}>
                                                    <Brain className="h-10 w-10 text-indigo-500" />
                                                </motion.span>
                                                <motion.span whileHover={{ scale: 1.15, rotate: -6 }} whileTap={{ scale: 0.95 }}>
                                                    <Rocket className="h-10 w-10 text-rose-500" />
                                                </motion.span>
                                            </motion.div>

                                            <div className="space-y-4 text-center">
                                                <h2 className="text-3xl font-semibold text-slate-900">
                                                    About Fruit Price AI 🍎
                                                </h2>
                                                <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600">
                                                    Fruit Price AI empowers growers, buyers, and analysts with accurate, explainable retail price forecasts. It unifies historical market data, agronomic attributes, and demand signals to surface actionable insights before the market shifts.
                                                </p>
                                            </div>

                                            <div className="grid gap-4 md:grid-cols-3">
                                                {highlights.map(({ title, description, Icon, accent }) => (
                                                    <motion.div
                                                        key={title}
                                                        whileHover={{ y: -6, scale: 1.02 }}
                                                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                                                        className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 text-left shadow-sm backdrop-blur"
                                                    >
                                                        <span className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full ${accent}`}>
                                                            <Icon className="h-5 w-5" />
                                                        </span>
                                                        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                                                        <p className="mt-2 text-sm text-slate-600">{description}</p>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            <p className="text-sm font-medium text-slate-500">
                                                Built with ❤️ using React, Vite, and AI.
                                            </p>
                                        </motion.div>
                                    </TabsContent>
                                )}

                                {activeTab === "how" && (
                                    <TabsContent value="how" forceMount className="mt-0">
                                        <motion.div
                                            key="how"
                                            variants={tabContentVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            transition={{ duration: 0.45, ease: "easeOut" }}
                                            className="space-y-8 rounded-2xl border border-white/60 bg-white/70 p-8 shadow-lg"
                                        >
                                            <div className="space-y-4 text-center">
                                                <h2 className="text-3xl font-semibold text-slate-900">
                                                    How It Works ⚙️
                                                </h2>
                                                <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600">
                                                    A guided workflow streamlines data capture and inference, so you can model price elasticity and optimize supply chains without friction.
                                                </p>
                                            </div>

                                            <div className="grid gap-5 md:grid-cols-2">
                                                {steps.map(({ title, description, Icon, accent }, index) => (
                                                    <motion.div
                                                        key={title}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.1 * index, duration: 0.4 }}
                                                        whileHover={{ y: -8, scale: 1.02, boxShadow: "0px 20px 45px rgba(15, 23, 42, 0.14)" }}
                                                        className="flex h-full flex-col gap-4 rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur transition-shadow"
                                                    >
                                                        <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${accent}`}>
                                                            <Icon className="h-6 w-6" />
                                                        </span>
                                                        <div className="space-y-2">
                                                            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                                                            <p className="text-sm leading-relaxed text-slate-600">{description}</p>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            <p className="text-sm font-medium text-slate-500">
                                                Built with ❤️ using React, Vite, and AI.
                                            </p>
                                        </motion.div>
                                    </TabsContent>
                                )}
                            </AnimatePresence>
                        </div>
                    </Tabs>
                </CardContent>
            </Card>
        </motion.main>
    );
};

export default About;
