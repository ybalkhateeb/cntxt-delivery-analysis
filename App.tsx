

import React, { useMemo, useState } from 'react';
import { OPPORTUNITIES, formatCurrency } from './constants';
import { Opportunity } from './types';
import StatsCard from './components/StatsCard';
import ComparisonChart from './components/ComparisonChart';
import OpportunityTable from './components/OpportunityTable';
import KeyInsights from './components/KeyInsights';
import OpportunityDetail from './components/OpportunityDetail';
import { 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  Briefcase,
  Table as TableIcon
} from 'lucide-react';

const App: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'high_priority'>('high_priority');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  const filteredData = useMemo(() => {
    if (filter === 'high_priority') {
      return OPPORTUNITIES.filter(o => o.isHighPriority);
    }
    return OPPORTUNITIES;
  }, [filter]);

  // Calculations for Stats
  const totalDeliveryValue = filteredData.reduce((acc, curr) => acc + (curr.deliveryPrice || 0), 0);
  const potentialLoss = filteredData
    .filter(o => o.issue?.includes('Variance') || o.status.includes('Lost'))
    .reduce((acc, curr) => acc + (curr.dealValue || 0), 0);

  const priceVarianceCount = filteredData.filter(o => 
    o.deliveryPrice && o.partnerPrice && o.deliveryPrice > o.partnerPrice * 1.5
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedOpportunity(null)}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Presales Analysis <span className="text-gray-400 font-normal">| Delivery & Market Alignment</span></h1>
          </div>
          
          {/* Only show filters on dashboard view */}
          {!selectedOpportunity && (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  filter === 'all' 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Deals
              </button>
              <button 
                onClick={() => setFilter('high_priority')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  filter === 'high_priority' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Key Focus Areas
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {selectedOpportunity ? (
          <OpportunityDetail 
            opportunity={selectedOpportunity} 
            onBack={() => setSelectedOpportunity(null)} 
          />
        ) : (
          <>
            {/* Intro Text */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Executive Summary</h2>
              <p className="text-gray-600 leading-relaxed">
                This dashboard analyzes the commercial alignment between Internal Delivery estimates and Market benchmarks. 
                The goal is to identify areas for optimization to improve competitiveness for key accounts including <span className="font-semibold text-gray-900">NWC, PIF, and ADF</span>.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard 
                title="Total Delivery Pipeline" 
                value={formatCurrency(totalDeliveryValue)} 
                icon={<Briefcase size={24} />}
              />
              <StatsCard 
                title="Avg Price Variance" 
                value="+185%" 
                subValue="Delivery vs Benchmark"
                trend="neutral"
                trendValue="Review Needed"
                icon={<TrendingUp size={24} />}
              />
              <StatsCard 
                title="Deals for Review" 
                value={priceVarianceCount.toString()} 
                subValue="Significant Delta"
                trend="neutral"
                trendValue="Optimization Opportunity"
                icon={<AlertTriangle size={24} />}
              />
              <StatsCard 
                title="Pipeline for Optimization" 
                value={formatCurrency(potentialLoss)} 
                subValue="Active Deals"
                icon={<DollarSign size={24} />}
              />
            </div>

            {/* Charts & Key Insights Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ComparisonChart data={filteredData} />
              </div>
              <div className="lg:col-span-1">
                 <KeyInsights data={filteredData} />
              </div>
            </div>

            {/* Detailed Table */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TableIcon className="text-gray-500" size={20} />
                <h2 className="text-lg font-bold text-gray-900">Detailed Opportunity Analysis</h2>
              </div>
              <OpportunityTable 
                data={filteredData} 
                onSelect={setSelectedOpportunity}
              />
            </div>
          </>
        )}

      </main>
    </div>
  );
};

export default App;