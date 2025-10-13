import { useMemo } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import type { PasturePlanning } from '~/types/property';

interface PropertyClimateChartProps {
  pasturePlanning: PasturePlanning[];
}

// Mapeamento de meses em inglês para português
const monthTranslation: Record<string, string> = {
  'January': 'Jan',
  'February': 'Fev',
  'March': 'Mar',
  'April': 'Abr',
  'May': 'Mai',
  'June': 'Jun',
  'July': 'Jul',
  'August': 'Ago',
  'September': 'Set',
  'October': 'Out',
  'November': 'Nov',
  'December': 'Dez'
};

// Mapeamento de estados da pastagem para valores numéricos
const pastureStateValues: Record<string, number> = {
  'Good': 3,
  'Medium': 2,
  'Poor': 1
};

// Mapeamento de estados da pastagem para cores
const pastureStateColors: Record<string, string> = {
  'Good': '#10b981', // green-500
  'Medium': '#f59e0b', // amber-500
  'Poor': '#ef4444' // red-500
};

export function PropertyClimateChart({ pasturePlanning }: PropertyClimateChartProps) {
  const chartData = useMemo(() => {
    return pasturePlanning.map(item => ({
      month: monthTranslation[item.month] || item.month,
      precipitation: Math.round(item.precipitation), // Valor real da precipitação
      temperature: Math.round(item.temperature * 10) / 10, // Arredondar para 1 casa decimal
      pastureQuality: pastureStateValues[item.state] || 2,
      pastureState: item.state
    }));
  }, [pasturePlanning]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="text-blue-600 dark:text-blue-400">Precipitação:</span>{' '}
              <span className="font-medium">{data.precipitation}mm</span>
            </p>
            <p className="text-sm">
              <span className="text-orange-600 dark:text-orange-400">Temperatura:</span>{' '}
              <span className="font-medium">{data.temperature}°C</span>
            </p>
            <p className="text-sm">
              <span className="text-green-600 dark:text-green-400">Qualidade da Pastagem:</span>{' '}
              <span 
                className="font-medium"
                style={{ color: pastureStateColors[data.pastureState] }}
              >
                {data.pastureState === 'Good' ? 'Boa' : data.pastureState === 'Medium' ? 'Média' : 'Ruim'}
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  if (!pasturePlanning || pasturePlanning.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">Nenhum dado climático disponível</p>
      </div>
    );
  }

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }}
            className="text-gray-600 dark:text-gray-400"
          />
          <YAxis 
            yAxisId="temperature"
            orientation="left"
            tick={{ fontSize: 12 }}
            className="text-gray-600 dark:text-gray-400"
            label={{ value: 'Temperatura (°C)', angle: -90, position: 'insideLeft' }}
            domain={['dataMin - 2', 'dataMax + 2']}
          />
          <YAxis 
            yAxisId="precipitation"
            orientation="right"
            tick={{ fontSize: 12 }}
            className="text-gray-600 dark:text-gray-400"
            label={{ value: 'Precipitação (mm)', angle: 90, position: 'insideRight' }}
            domain={[0, 'dataMax + 100']}
          />
          <YAxis 
            yAxisId="pasture"
            orientation="right"
            domain={[0.5, 3.5]}
            tick={{ fontSize: 12 }}
            className="text-gray-600 dark:text-gray-400"
            tickFormatter={(value) => {
              if (value === 1) return 'Ruim';
              if (value === 2) return 'Média';
              if (value === 3) return 'Boa';
              return '';
            }}
            hide={true}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          
          {/* Linha de Temperatura */}
          <Line 
            yAxisId="temperature"
            type="monotone"
            dataKey="temperature" 
            name="Temperatura (°C)"
            stroke="#f97316"
            strokeWidth={3}
            dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2 }}
          />
          
          {/* Área de Precipitação */}
          <Area 
            yAxisId="precipitation"
            type="monotone"
            dataKey="precipitation" 
            name="Precipitação (mm)"
            fill="#3b82f6"
            fillOpacity={0.3}
            stroke="#3b82f6"
            strokeWidth={2}
          />
          
          {/* Linha de Qualidade da Pastagem */}
          <Line 
            yAxisId="pasture"
            type="monotone" 
            dataKey="pastureQuality" 
            name="Qualidade da Pastagem"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
