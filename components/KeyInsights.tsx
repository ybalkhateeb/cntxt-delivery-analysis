import React from 'react';
import { Opportunity } from '../types';
import { AlertCircle, DollarSign, Clock } from 'lucide-react';

interface KeyInsightsProps {
  data: Opportunity[];
}

const KeyInsights: React.FC<KeyInsightsProps> = ({ data }) => {
  const pif = data.find(d => d.customer === 'PIF');
  const jedco = data.find(d => d.customer === 'JEDCO');
  const kafaat = data.find(d => d.customer === 'Kafaat');
  
  return (
    <div className="space-y-4">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
        <h4 className="flex items-center text-red-800 font-bold mb-2">
          <AlertCircle size={20} className="mr-2" />
          Critical Findings
        </h4>
        <p className="text-red-700 text-sm mb-2">
          Consistent pattern: Delivery estimates are frequently <strong>2x to 3x higher</strong> than partner quotes for identical scopes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* PIF Case Study */}
        {pif && (
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
             <div className="flex justify-between items-start mb-3">
               <h5 className="font-bold text-gray-900">PIF (Lost Deal)</h5>
               <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Avg +67%</span>
             </div>
             <p className="text-xs text-gray-600 mb-3">
                Delivery quoted $98k vs. Partner $58k. Resulted in Closed-Loss for delivery scope.
             </p>
             <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
               <div className="bg-red-500 h-2 rounded-full" style={{ width: '100%' }}></div>
             </div>
             <div className="w-full bg-gray-200 rounded-full h-2">
               <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
             </div>
             <div className="flex justify-between text-xs mt-1 text-gray-500">
               <span>Delivery</span>
               <span>Partner</span>
             </div>
          </div>
        )}

        {/* JEDCO Case Study */}
        {jedco && (
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
             <div className="flex justify-between items-start mb-3">
               <h5 className="font-bold text-gray-900">JEDCO</h5>
               <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Avg +290%</span>
             </div>
             <p className="text-xs text-gray-600 mb-3">
                Massive disparity. Delivery $263k vs. Partner $90k. Active risk.
             </p>
             <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
               <div className="bg-red-500 h-2 rounded-full" style={{ width: '100%' }}></div>
             </div>
             <div className="w-full bg-gray-200 rounded-full h-2">
               <div className="bg-green-500 h-2 rounded-full" style={{ width: '34%' }}></div>
             </div>
             <div className="flex justify-between text-xs mt-1 text-gray-500">
               <span>Delivery</span>
               <span>Partner</span>
             </div>
          </div>
        )}

        {/* Kafaat Case Study */}
        {kafaat && (
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
             <div className="flex justify-between items-start mb-3">
               <h5 className="font-bold text-gray-900">Kafaat</h5>
               <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Avg +300%</span>
             </div>
             <p className="text-xs text-gray-600 mb-3">
                $99k vs ~$32k (SBM/Omniops). Client sensitive to landing zone costs.
             </p>
             <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
               <div className="bg-red-500 h-2 rounded-full" style={{ width: '100%' }}></div>
             </div>
             <div className="w-full bg-gray-200 rounded-full h-2">
               <div className="bg-green-500 h-2 rounded-full" style={{ width: '33%' }}></div>
             </div>
             <div className="flex justify-between text-xs mt-1 text-gray-500">
               <span>Delivery</span>
               <span>Partner</span>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KeyInsights;