// All-in monthly cost at fixed example volumes, computed only from a factor's published numbers.
// Fixed volumes on purpose: the site never asks a carrier for its own income or invoice data.
export const VOLUMES = [10000, 25000, 50000];
// Example invoice size used to count per-invoice fees. Stated on every table that uses it.
export const AVG_INVOICE = 2500;

export interface CostModel {
  basis: 'tiered' | 'flat' | 'maximum' | 'starting';
  tiers: { upTo: number | null; ratePct: number }[];
  perInvoiceFee: number;
  monthlyMinimumFee: number | null;
  note: string;
  source: string;
}

export const BASIS_LABEL: Record<CostModel['basis'], string> = {
  tiered: 'Published tier',
  flat: 'Published flat rate',
  maximum: 'Published maximum',
  starting: 'Published starting rate (best case)',
};

export function rateFor(model: CostModel, volume: number): number {
  const tier = [...model.tiers]
    .sort((a, b) => (a.upTo ?? Infinity) - (b.upTo ?? Infinity))
    .find((t) => t.upTo === null || volume < t.upTo);
  return (tier ?? model.tiers[model.tiers.length - 1]).ratePct;
}

export function monthlyCost(model: CostModel, volume: number): number {
  const invoices = Math.ceil(volume / AVG_INVOICE);
  const fee = (volume * rateFor(model, volume)) / 100 + invoices * model.perInvoiceFee;
  return Math.max(fee, model.monthlyMinimumFee ?? 0);
}

export const usd = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;
