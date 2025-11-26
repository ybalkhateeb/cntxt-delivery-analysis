import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Opportunity } from '../types';

interface ComparisonChartProps {
  data: Opportunity[];
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ data }) => {
  // Filter for items that have both prices for comparison OR are high priority with high delivery costs
  // We exclude NWC from the main chart because its scale (millions) dwarfs the others, usually charts are better without extreme outliers
  const chartData = data
    .filter(item => (item.deliveryPrice && item.deliveryPrice > 0) && item.customer !== 'NWC (AI/ML)' && item.customer !== 'NWC (Smart Asst)')
    .map(item => ({
      name: item.customer,
      'Delivery Price': item.deliveryPrice,
      'Partner Price': item.partnerPrice || 0,
      amt: item.deliveryPrice, // for sorting if needed
    }));

  return (
    <div className="h-[400px] w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Delivery vs. Partner Pricing Gaps</h3>
        <p className="text-sm text-gray-500">Excluding NWC (due to scale). Shows clear premium on Delivery services.</p>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#6b7280'}}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip 
            cursor={{fill: '#f9fafb'}}
            formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend />
          <Bar dataKey="Delivery Price" fill="#DB4437" radius={[4, 4, 0, 0]} name="Delivery Quote" />
          <Bar dataKey="Partner Price" fill="#0F9D58" radius={[4, 4, 0, 0]} name="Partner Quote" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparisonChart;