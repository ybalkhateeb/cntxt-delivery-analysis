

import React from 'react';
import { Opportunity } from '../types';
import { AlertCircle, DollarSign, Clock, Info } from 'lucide-react';

interface KeyInsightsProps {
  data: Opportunity[];
}

const KeyInsights: React.FC<KeyInsightsProps> = ({ data }) => {
  const pif = data.find(d => d.customer === 'PIF');
  const jedco = data.find(d => d.customer === 'JEDCO');
  const kafaat = data.find(d => d.customer === 'Kafaat');
  
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <h4 className="flex items-center text-blue-800 font-bold mb-2">
          <Info size={20} className="mr-2" />
          Strategic Observations
        </h4>
        <p className="text-blue-700 text-sm mb-2">
          Observation: Delivery estimates show variance compared to partner benchmarks. Analyzing these deltas presents an opportunity for model alignment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* PIF Case Study */}
        {pif && (
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
             <div className="flex justify-between items-start mb-3">
               <h5 className="font-bold text-gray-900">PIF</h5>
               <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Delta +67%</span>
             </div>
             <p className="text-xs text-gray-600 mb-3">
                Delivery quote: $98k. Partner quote: $58k.
             </p>
             <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
               <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
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
               <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Delta +290%</span>
             </div>
             <p className="text-xs text-gray-600 mb-3">
                Delivery: $263k. Partner: $90k. Reviewing resource mix.
             </p>
             <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
               <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
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
               <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Delta +300%</span>
             </div>
             <p className="text-xs text-gray-600 mb-3">
                $99k vs ~$32k (Market). Client evaluating options.
             </p>
             <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
               <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
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