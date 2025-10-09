import type { Route } from './+types/register';
import Register from '../pages/Register';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: `Cadastro - ${import.meta.env.VITE_TITLE || 'Boi na Nuvem'}` },
        {
            name: 'description',
            content: 'Crie sua conta e comece a gerenciar sua propriedade rural com 14 dias grátis.',
        },
        { name: 'keywords', content: 'cadastro, registro, conta, fazenda, propriedades, trial gratuito' },
        { property: 'og:title', content: 'Cadastro - Boi na Nuvem' },
        {
            property: 'og:description',
            content: 'Crie sua conta e comece a gerenciar sua propriedade rural com 14 dias grátis.',
        },
        { property: 'og:type', content: 'website' },
    ];
}

export default function RegisterRoute() {
    return <Register />;
}
