

export interface ResourceRow {
  role: string;
  seniority?: string;
  fteDays?: number | string;
  qty?: number;
  unitPrice?: number;
  totalPrice?: number; // Generic total
  
  // Specific fields for detailed cost breakdown (Kafaat/RIPC)
  cost?: number;        // Raw Cost (Daily Cost?)
  price?: number;       // Cost * Days
  marginPrice?: number; // Price with Margin
  
  // Specific fields for NWC
  sureTotal?: number;   // Total for 24M (Sure)
  cntxtTotal?: number;  // Total for 24M (Cntxt)

  // Specific fields for Hevolution
  dailyCost?: number;
  costPerRole?: number;

  // New fields for grouping and summaries
  section?: string;     // For grouping (e.g. Landing Zone vs DR)
  isSummary?: boolean;  // For rows that are subtotals/totals (skip in auto-calc)
  pricingModel?: string; // Blank placeholder for NWC
}

export interface TableColumnDef {
  header: string;
  key: keyof ResourceRow;
  format?: 'currency' | 'sar' | 'number' | 'text' | 'dual';
}

export interface Opportunity {
  id: string;
  customer: string;
  dealValue: number;
  status: string;
  closeDate: string;
  deliveryEngaged: boolean;
  deliveryPrice: number | null;
  partnerPrice: number | null;
  partnerName: string | null;
  issue: string | null;
  notes: string;
  isHighPriority: boolean;
  
  // New fields for detail view
  useCase: string;
  deliveryEffort: string | null;
  partnerEffort: string | null;
  
  // Resource Breakdown
  resourceTableTitle?: string;
  resourceDetails?: ResourceRow[];
  resourceColumns?: TableColumnDef[]; // Optional custom column definition
}

export enum PricingStatus {
  HIGHER = 'Higher than Partner',
  LOWER = 'Lower than Partner',
  NO_COMP = 'No Comparison',
}