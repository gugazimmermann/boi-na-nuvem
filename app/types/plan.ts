export interface Plan {
    id: string;
    name: string;
    price: number;
    annualPrice: number;
    description: string;
    features: string[];
    isPopular?: boolean;
}

export interface PlansResponse {
    success: boolean;
    data: Plan[];
    count: number;
}

