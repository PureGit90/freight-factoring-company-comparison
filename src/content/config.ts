import { defineCollection, z } from 'astro:content';

// Published terms, copied from the factor's own pages. null means not stated on the pages we read.
const terms = z.object({
  rate: z.string().nullable(),
  advance: z.string().nullable(),
  recourse: z.string().nullable(),
  contract: z.string().nullable(),
  minimum: z.string().nullable(),
  transfers: z.string().nullable(),
  otherFees: z.string().nullable(),
  speed: z.string().nullable(),
  fuel: z.string().nullable(),
});

// Only for factors that publish a usable number. Drives the all-in cost table at fixed example volumes.
// basis says which published number it is, so a "starting at" rate is never shown as typical.
const costModel = z.object({
  basis: z.enum(['tiered', 'flat', 'maximum', 'starting']),
  // Rate tiers by monthly invoice volume. A single tier with upTo null is a flat or single published rate.
  tiers: z.array(z.object({ upTo: z.number().nullable(), ratePct: z.number().positive() })).min(1),
  perInvoiceFee: z.number().min(0).default(0),
  monthlyMinimumFee: z.number().min(0).nullable().default(null),
  note: z.string().min(1),
  source: z.string().url(),
});

const listings = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string().min(1),
    directoryType: z.enum(['software-tool', 'local-business', 'service-provider']),
    summary: z.string().min(1),
    // A concrete comparative judgment the top-ranking pages do not already have (guardrail 2).
    differentiator: z.string().min(1),
    url: z.string().url(),
    // Must point at the factor's own application or site. Never a form we collect data through.
    affiliateUrl: z.string().url().optional(),
    pricing: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    category: z.string().min(1),
    pricingConfidence: z.enum(['vendor', 'third-party', 'quote']).default('quote'),
    owner: z.string().nullable().default(null),
    terms,
    costModel: costModel.optional(),
    // Places where the factor's own pages disagree with each other. Shown as "read twice".
    pageConflicts: z.array(z.string()).default([]),
    bestFor: z.string().optional(),
    skipIf: z.string().optional(),
    watchOut: z.array(z.string()).default([]),
    lastChecked: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    sources: z.array(z.string().url()).min(1),
  }),
});

export const collections = { listings };
