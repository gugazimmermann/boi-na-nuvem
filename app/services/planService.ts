import type { Plan, PlansResponse } from '~/types/plan';

// Use relative URL in development (with Vite proxy) or full URL in production
const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:3000';

export class PlanService {
    static async getAll(): Promise<Plan[]> {
        const token = localStorage.getItem('token');
        const url = `${API_BASE_URL}/plans`;

        const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
        if (!response.ok) {
            throw new Error(`Erro ao buscar planos: ${response.status}`);
        }
        const json: PlansResponse = await response.json();
        if (!json.success || !Array.isArray(json.data)) {
            throw new Error('Resposta inválida ao buscar planos');
        }
        return json.data;
    }
}

