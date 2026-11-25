// Working brand, matched to the lead domain candidate (freightfactoringcompared.com). It and the tagline
// are the only places the brand appears in code, so renaming is a one-file change once Marco picks a domain.
export const SITE_NAME = 'Freight Factoring Compared';
export const TAGLINE = 'Freight factoring companies, compared on what they publish.';
export const SITE_DESCRIPTION =
  "Rates, fees, contracts and recourse for 28 freight factoring companies, each copied from the factor's own pages with the date we read them.";

// Nothing is crawlable until GATE approval. /publish-directory sets PUBLIC_NOINDEX=false on production only.
export const NOINDEX = import.meta.env.PUBLIC_NOINDEX !== 'false';

// Shown on the legal, About and Corrections pages; the line is omitted when null.
export const CONTACT_EMAIL: string | null = 'sunshinesolutions305@outlook.com';
export const OPERATOR_NAME = 'PALM ICON LLC';
export const OPERATOR_PLACE = 'Miami, Florida';

// The date the factors' own pages were last read. Update it whenever the data is re-read.
export const DATA_DATE = '2026-11-09';
export const DATA_DATE_LABEL = 'November 9, 2026';

export const NAV: { href: string; label: string }[] = [
  { href: '/freight-factoring-rates/', label: 'Rates and cost' },
  { href: '/all/', label: 'All factors' },
  { href: '/how-we-compare/', label: 'Method' },
];

export const CATEGORIES: { slug: string; name: string; short: string; intro: string; seoTitle: string }[] = [
  {
    slug: 'published-rates',
    name: 'Publishes a rate',
    short: 'Rate published',
    intro:
      'These factors print a rate on their own pages: a tier table, a flat rate, a maximum or a starting rate. Only a tier table or a flat rate tells you what you will pay; a starting rate is the best case.',
    seoTitle: 'Freight Factoring Companies That Publish Rates',
  },
  {
    slug: 'quote-only',
    name: 'Quote only',
    short: 'Quote only',
    intro:
      'These factors publish terms such as advance rate, contract length or recourse, but quote the rate after you apply. Get the rate, the term and the termination clause in writing before you compare them.',
    seoTitle: 'Freight Factoring Companies With Quoted Rates',
  },
];

// Price-source labels. Tone picks the tag color: primary, signal or neutral.
export const CONFIDENCE: Record<string, { label: string; note: string; tone: string }> = {
  vendor: { label: 'Rate published', note: "Taken from the factor's own page.", tone: 'primary' },
  'third-party': { label: 'Third-party reported', note: 'Not confirmed on the factor page; from a named third party and may differ.', tone: 'signal' },
  quote: { label: 'Quote only', note: 'The factor does not publish a rate on the pages we read.', tone: 'neutral' },
};

// The one memorable thing on the home page: a complete factoring fee schedule, as one factor publishes it.
// Chosen because it shows every line a carrier should ask about; it is not a recommendation.
export const HERO_PANEL: {
  title: string;
  subtitle?: string;
  rows: { label: string; value: string; kind?: 'sub' | 'total' }[];
  source: { label: string; href: string };
} | null = {
  title: 'A complete factoring fee schedule',
  subtitle: 'Every line a carrier should get in writing, as MJN Services publishes it.',
  rows: [
    { label: 'Variable rate', value: '1.5%, moves with shipper pay time' },
    { label: 'Flat rate', value: '3%, fixed for 60 days' },
    { label: 'Advance rate', value: 'Up to 95%' },
    { label: 'Application fee', value: 'None' },
    { label: 'ACH transfer fee', value: 'None' },
    { label: 'Credit check fee', value: 'None' },
    { label: 'Invoice processing fee', value: 'None' },
    { label: 'Minimum monthly fee', value: '$200 after 90 days', kind: 'total' },
  ],
  source: { label: 'MJN Services rate schedule', href: 'https://www.mjnservices.com/factoring/rates' },
};

export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const categoryByName = (name: string) => CATEGORIES.find((c) => name === c.name);
