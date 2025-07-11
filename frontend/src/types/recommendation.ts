export interface FormValues {
    age: number;
    income: number;
    dependents: number;
    risk: "low" | "medium" | "high";
}

export interface RecommendationResult {
    plan: string;
    reason: string;
}
