"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/axios";

const recommendationSchema = z.object({
    age: z.number().min(18, "Age must be at least 18").max(120, "Age too high"),
    income: z.number().min(0, "Income must be positive"),
    dependents: z.number().min(0, "Dependents can't be negative"),
    risk: z.enum(["low", "medium", "high"]),
});

type RecommendationInput = z.infer<typeof recommendationSchema>;


export default function InsuranceForm() {
    const [result, setResult] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RecommendationInput>({
        resolver: zodResolver(recommendationSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data: RecommendationInput) => {
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const response = await api.post<any>(
                "/rec/generate/",
                data
            );
            setResult(response.data.data);            
        } catch (e: any) {
            setError(e?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto p-8 rounded-xl shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Age */}
                    <div>
                        <label htmlFor="age" className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
                            Age
                        </label>
                        <input
                            id="age"
                            type="number"
                            {...register("age", { valueAsNumber: true })}
                            className="w-full rounded-md border px-4 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200"
                        />
                        {errors.age && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.age.message}</p>
                        )}
                    </div>

                    {/* Income */}
                    <div>
                        <label htmlFor="income" className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
                            Income
                        </label>
                        <input
                            id="income"
                            type="number"
                            {...register("income", { valueAsNumber: true })}
                            className="w-full rounded-md border px-4 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200"
                        />
                        {errors.income && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.income.message}</p>
                        )}
                    </div>

                    {/* Dependents */}
                    <div>
                        <label htmlFor="dependents" className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
                            Number of Dependents
                        </label>
                        <input
                            id="dependents"
                            type="number"
                            {...register("dependents", { valueAsNumber: true })}
                            className="w-full rounded-md border px-4 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200"
                        />
                        {errors.dependents && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.dependents.message}</p>
                        )}
                    </div>

                    {/* Risk Tolerance */}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
                            Risk Tolerance
                        </label>
                        <select
                            {...register("risk")}
                            className="w-full rounded-md border px-4 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        {errors.risk && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.risk.message}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-blue-600 text-white font-semibold py-2 hover:bg-blue-700 disabled:bg-blue-400 transition"
                    >
                        {loading ? "Loading..." : "Get Recommendation"}
                    </button>
                </form>
            </motion.div>

            {/* Modal for result */}
            <AnimatePresence>
                {result && (
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-md mx-4 shadow-xl text-gray-900 dark:text-gray-100"
                        >
                            <h3 className="text-xl font-bold mb-2">Recommendation</h3>
                            <p>{result.recommended_plan}</p>
                            <p className="mt-2 text-sm">{result.reason}</p>

                            <button
                                onClick={() => {
                                    setResult(null);
                                    reset();
                                }}
                                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                                Close & Reset
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Error Message */}
            {error && (
                <div className="mt-8 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded">
                    {error}
                </div>
            )}
        </>
    );
}
