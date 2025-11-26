import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  subValue?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, subValue, icon, trend, trendValue }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        {subValue && <p className="text-sm text-gray-500 mt-1">{subValue}</p>}
        {trendValue && (
          <div className={`flex items-center mt-2 text-sm font-medium ${
            trend === 'up' ? 'text-red-600' : trend === 'down' ? 'text-green-600' : 'text-gray-600'
          }`}>
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
        {icon}
      </div>
    </div>
  );
};

export default StatsCard;