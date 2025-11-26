



import React from 'react';
import { Opportunity, ResourceRow, TableColumnDef } from '../types';
import { formatCurrency, formatNumber } from '../constants';
import { ArrowLeft, Clock, DollarSign, Calendar, FileText, AlertTriangle, Building, Users, Info } from 'lucide-react';

interface OpportunityDetailProps {
  opportunity: Opportunity;
  onBack: () => void;
}

const OpportunityDetail: React.FC<OpportunityDetailProps> = ({ opportunity, onBack }) => {
  const variance = (opportunity.deliveryPrice && opportunity.partnerPrice) 
    ? ((opportunity.deliveryPrice - opportunity.partnerPrice) / opportunity.partnerPrice) * 100 
    : null;

  // Default columns if none specified
  const defaultColumns: TableColumnDef[] = [
    { header: 'Role', key: 'role', format: 'text' },
    { header: 'Seniority / Qty', key: 'seniority', format: 'text' }, // Fallback logic in render
    { header: 'Est. Effort (FTE Days)', key: 'fteDays', format: 'number' },
    { header: 'Total Cost', key: 'totalPrice', format: 'currency' },
  ];

  const columns = opportunity.resourceColumns || defaultColumns;

  const renderCell = (row: ResourceRow, col: TableColumnDef) => {
    const value = row[col.key];
    
    // Special handling for mixed seniority/qty column in default view
    if (col.key === 'seniority' && !value && row.qty) {
        return `Qty: ${row.qty}`;
    }
    
    // Handle explicitly blank values (like empty pricing model)
    if (value === '') return '';

    if (col.format === 'currency') return formatCurrency(value as number);
    if (col.format === 'sar') return formatCurrency(value as number, 'SAR');
    if (col.format === 'number') return formatNumber(value as number);
    
    return value || '-';
  };

  // Grouping Logic
  let processedRows: { row: ResourceRow, isHeader?: boolean, title?: string }[] = [];
  if (opportunity.resourceDetails) {
    // If items have sections, group them
    const hasSections = opportunity.resourceDetails.some(r => r.section);
    if (hasSections) {
        const groups = opportunity.resourceDetails.reduce((acc, curr) => {
            const sec = curr.section || 'General';
            if (!acc[sec]) acc[sec] = [];
            acc[sec].push(curr);
            return acc;
        }, {} as Record<string, ResourceRow[]>);
        
        Object.keys(groups).forEach(section => {
            processedRows.push({ row: {} as ResourceRow, isHeader: true, title: section });
            groups[section].forEach(r => processedRows.push({ row: r }));
        });
    } else {
        processedRows = opportunity.resourceDetails.map(r => ({ row: r }));
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Navigation */}
      <button 
        onClick={onBack}
        className="flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors group"
      >
        <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </button>

      {/* Header */}
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <FileText size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
             <h1 className="text-3xl font-bold text-gray-900">{opportunity.customer}</h1>
             <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${
               opportunity.status.includes('Lost') 
               ? 'bg-gray-50 text-gray-700 border-gray-200' 
               : 'bg-green-50 text-green-700 border-green-200'
             }`}>
               {opportunity.status}
             </span>
          </div>
          <p className="text-gray-500 font-mono text-sm mb-6">ID: {opportunity.id}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FileText size={16} className="text-blue-600"/>
                Use Case & Scope
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {opportunity.useCase}
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Info size={16} className="text-blue-600"/>
                Strategic Context
              </h3>
              <p className="text-gray-600 italic">
                "{opportunity.notes}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Delivery Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Building size={24} className="text-blue-600" />
              Delivery Estimate
            </h2>
            <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded">INTERNAL</span>
          </div>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                <DollarSign size={14}/> Total Price
              </p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(opportunity.deliveryPrice)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                <Clock size={14}/> Estimated Effort
              </p>
              <p className="text-xl font-medium text-gray-800">{opportunity.deliveryEffort || 'Not Specified'}</p>
            </div>
          </div>
        </div>

        {/* Partner Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative">
          {variance && variance > 0 && (
             <div className="absolute top-4 right-4 bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
               Variance: +{variance.toFixed(0)}%
             </div>
          )}
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Building size={24} className="text-green-600" />
              Partner Quote
            </h2>
            <span className="bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded">
              {opportunity.partnerName || 'EXTERNAL'}
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                <DollarSign size={14}/> Total Price
              </p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(opportunity.partnerPrice)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                <Clock size={14}/> Estimated Effort
              </p>
              <p className="text-xl font-medium text-gray-800">{opportunity.partnerEffort || 'Not Specified'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Breakdown Table */}
      {opportunity.resourceDetails && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Users size={20} className="text-blue-600"/>
              {opportunity.resourceTableTitle || 'Resource & Effort Breakdown'}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                <tr>
                  {columns.map((col, idx) => (
                      <th key={idx} className={`px-6 py-3 ${idx === columns.length - 1 ? 'text-right' : ''}`}>
                          {col.header}
                      </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {processedRows.map((item, rowIdx) => {
                  if (item.isHeader) {
                    return (
                        <tr key={rowIdx} className="bg-blue-50/50">
                            <td colSpan={columns.length} className="px-6 py-3 font-bold text-blue-800 text-xs uppercase tracking-wider">
                                {item.title}
                            </td>
                        </tr>
                    );
                  }
                  
                  const isSummary = item.row.isSummary;
                  return (
                    <tr key={rowIdx} className={`hover:bg-gray-50 transition-colors ${isSummary ? 'bg-gray-100/50 font-bold border-t border-gray-200' : ''}`}>
                       {columns.map((col, colIdx) => (
                          <td key={colIdx} className={`px-6 py-4 ${colIdx === columns.length - 1 ? 'text-right font-medium text-gray-900' : ''}`}>
                              {renderCell(item.row, col)}
                          </td>
                       ))}
                    </tr>
                  );
                })}
                
                {/* Dynamic Footer Summation - Only if no manual summaries exist to avoid confusion */}
                {!opportunity.resourceDetails.some(r => r.isSummary) && (
                    <tr className="bg-gray-50 font-bold border-t border-gray-200">
                    {columns.map((col, idx) => {
                        const shouldSum = ['totalPrice', 'marginPrice', 'sureTotal', 'cntxtTotal', 'price', 'costPerRole'].includes(col.key);
                        
                        if (idx === 0) return <td key={idx} className="px-6 py-4 text-gray-900">Total</td>;
                        if (!shouldSum) return <td key={idx} className="px-6 py-4"></td>;
                        
                        // Sum only non-summary rows to avoid double counting
                        const sum = opportunity.resourceDetails?.reduce((acc, curr) => {
                            if (curr.isSummary) return acc;
                            return acc + (curr[col.key] as number || 0);
                        }, 0);
                        return (
                            <td key={idx} className="px-6 py-4 text-right text-gray-900 text-base">
                                {col.format === 'sar' ? formatCurrency(sum, 'SAR') : formatCurrency(sum)}
                            </td>
                        );
                    })}
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Timeline Info */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center gap-6 text-sm text-gray-600">
         <div className="flex items-center gap-2">
           <Calendar size={16} className="text-gray-400"/>
           <span>Target Close Date: <strong>{opportunity.closeDate}</strong></span>
         </div>
         <div className="h-4 w-px bg-gray-300"></div>
         <div>
           Deal Value: <strong>{formatCurrency(opportunity.dealValue)}</strong>
         </div>
      </div>

    </div>
  );
};

export default OpportunityDetail;