

import React from 'react';
import { Opportunity } from '../types';
import { formatCurrency } from '../constants';
import { AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';

interface OpportunityTableProps {
  data: Opportunity[];
  onSelect: (opp: Opportunity) => void;
}

const OpportunityTable: React.FC<OpportunityTableProps> = ({ data, onSelect }) => {
  return (
    <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800">Opportunity Detail View</h3>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {data.filter(d => d.issue?.includes('Variance') || d.issue?.includes('Pricing')).length} Variance Indicators
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3 font-semibold">Customer</th>
              <th scope="col" className="px-6 py-3 font-semibold">Delivery Quote (USD/SAR)</th>
              <th scope="col" className="px-6 py-3 font-semibold">Delivery Effort</th>
              <th scope="col" className="px-6 py-3 font-semibold">Partner Quote (USD/SAR)</th>
              <th scope="col" className="px-6 py-3 font-semibold">Partner Effort</th>
              <th scope="col" className="px-6 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr 
                  key={item.id} 
                  onClick={() => onSelect(item)}
                  className="bg-white border-b hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex flex-col">
                      <span className="text-base text-blue-600 hover:underline">{item.customer}</span>
                      <span className="text-xs text-gray-400 font-normal">{item.id}</span>
                    </div>
                  </td>
                  
                  {/* Delivery Stats */}
                  <td className="px-6 py-4 text-gray-900 font-bold whitespace-nowrap">
                    {formatCurrency(item.deliveryPrice, 'dual')}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-gray-400"/>
                      {item.deliveryEffort || '-'}
                    </div>
                  </td>

                  {/* Partner Stats */}
                  <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-semibold">{formatCurrency(item.partnerPrice, 'dual')}</span>
                      {item.partnerName && <span className="text-xs text-gray-400">{item.partnerName}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-gray-400"/>
                      {item.partnerEffort || '-'}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       {item.status === 'Closed-Loss' || item.status.includes('Lost') ? (
                         <span className="inline-flex items-center bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-200">
                           <XCircle size={12} className="mr-1"/> Closed
                         </span>
                       ) : (
                          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full border border-green-200">
                           <CheckCircle size={12} className="mr-1"/> Active
                         </span>
                       )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpportunityTable;