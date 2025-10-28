import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Info, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

export default function Home(): React.ReactElement {
    const navigate = useNavigate();

    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.12,
            },
        },
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 12 },
        show: (i = 1) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
        }),
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100">
            {/* Subtle animated gradient blobs for movement */}
            <motion.div
                aria-hidden
                className="absolute -left-20 -top-28 w-96 h-96 rounded-full bg-pink-200 opacity-40 blur-3xl"
                animate={{ x: [0, 30, 0], y: [0, -20, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                aria-hidden
                className="absolute -right-28 -bottom-20 w-[32rem] h-[32rem] rounded-full bg-blue-200 opacity-30 blur-3xl"
                animate={{ x: [0, -40, 0], y: [0, 20, 0], rotate: [0, -8, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating fruit emojis */}
            <motion.div
                className="absolute top-12 right-12 text-3xl pointer-events-none"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.15 }}
            >
                🍎
            </motion.div>
            <motion.div
                className="absolute left-8 bottom-24 text-2xl pointer-events-none"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.12 }}
            >
                🍌
            </motion.div>
            <motion.div
                className="absolute -right-6 top-36 text-2xl pointer-events-none"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.1 }}
            >
                🍇
            </motion.div>

            <motion.div
                className="w-full max-w-2xl p-6"
                variants={container}
                initial="hidden"
                animate="show"
            >
                <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl">
                    <CardContent className="p-10">
                        <motion.header
                            variants={fadeUp}
                            custom={0.6}
                            className="text-center mb-6"
                        >
                            <CardHeader className="p-0">
                                <CardTitle className="mb-2">
                                    <motion.h1
                                        variants={fadeUp}
                                        custom={0.8}
                                        className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-3"
                                    >
                                        <span className="text-4xl">🍎</span>
                                        Fruit Price Prediction System
                                        <Sparkles className="w-6 h-6 text-amber-500 ml-2" />
                                    </motion.h1>
                                </CardTitle>
                                <CardDescription>
                                    <motion.p
                                        variants={fadeUp}
                                        custom={1.0}
                                        className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto"
                                    >
                                        Predict retail fruit prices instantly using AI-powered models.
                                    </motion.p>
                                </CardDescription>
                            </CardHeader>
                        </motion.header>

                        <motion.div
                            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6"
                            variants={container}
                        >
                            <motion.div variants={fadeUp} custom={1.2} className="w-full sm:w-auto">
                                <Button
                                    onClick={() => navigate("/predict")}
                                    className="w-full sm:w-auto inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm sm:text-base bg-gradient-to-r from-rose-500 to-amber-400 text-white shadow-md hover:scale-105 transform transition"
                                    aria-label="Start Prediction"
                                    asChild={false}
                                >
                                    <span className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4" />
                                        Start Prediction
                                    </span>
                                </Button>
                            </motion.div>

                            <motion.div variants={fadeUp} custom={1.35} className="w-full sm:w-auto">
                                <Button
                                    onClick={() => navigate("/about")}
                                    variant="outline"
                                    className="w-full sm:w-auto inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm sm:text-base border border-slate-200 bg-white/40 backdrop-blur-sm shadow-sm hover:scale-105 transform transition"
                                    aria-label="About Project"
                                >
                                    <span className="flex items-center gap-2 text-slate-800">
                                        <Info className="w-4 h-4" />
                                        About Project
                                    </span>
                                </Button>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            custom={1.6}
                            className="mt-6 text-center text-xs text-slate-500"
                        >
                            Made with <span aria-hidden>❤️</span> by Zakaria Said Dahir
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}