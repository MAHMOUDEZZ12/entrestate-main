
// src/lib/apps/io.ts
// Central registry for Apps I/O contracts + validation + samples

export type IOFieldType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'email'
  | 'url'
  | 'phone'
  | 'image'
  | 'video'
  | 'pdf'
  | 'json'
  | 'markdown';

export type IOField = {
  constraints?: { enum?: string[]; min?: number; max?: number; pattern?: string };
  key: string;
  label: string;
  type: IOFieldType;
  required?: boolean;
  description?: string;
  example?: any;
};

export type AppContract = {
  allowedRoles?: ('visitor'|'member'|'pro'|'admin')[];
  id: string;                 // machine id (slug)
  name: string;               // display name
  category: 'Marketing' | 'Listing' | 'Sales' | 'Creative' | 'Cloud' | 'Admin' | 'Agent';
  description: string;
  inputs: IOField[];
  outputs: IOField[];
  owner?: string;             // team/person
  version?: string;
  enabled?: boolean;
  status?: 'alpha' | 'beta' | 'ga';
  allowedRoles?: ('visitor'|'member'|'pro'|'admin')[];
};

const urlRe = /^https?:\/\/[^\s]+$/i;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[+]?[\d\s().-]{6,}$/;

// -------- Registry --------
export const appsRegistry: AppContract[] = [
  {
    id: 'property-marketer-ai',
    name: 'Property Marketer AI',
    category: 'Marketing',
    description: 'Generates property marketing packs, captions, and ad angles from a brochure or listing URL.',
    inputs: [
      { key: 'projectName', label: 'Project Name', type: 'string', required: true },
      { key: 'sourceUrl', label: 'Source URL', type: 'url', description: 'Official project/listing link or brochure drive URL' },
      { key: 'brochurePdf', label: 'Brochure PDF', type: 'pdf' },
      { key: 'images', label: 'Images', type: 'image' },
      { key: 'targetAudience', label: 'Target Audience', type: 'string' },
      { key: 'marketFocus', label: 'Market Focus', type: 'string', example: 'Dubai Marina, Off-plan, Investors' },
    ],
    outputs: [
      { key: 'adCopy', label: 'Ad Copy', type: 'markdown', required: true },
      { key: 'headlines', label: 'Headlines', type: 'json', required: true },
      { key: 'ctaVariants', label: 'CTA Variants', type: 'json' },
      { key: 'assetPlan', label: 'Asset Plan', type: 'json', description: 'What assets to produce (images/video/landing)' },
    ],
    version: '0.1.1',
    enabled: true, allowedRoles: ['member','pro','admin'],
    status: 'beta'
  },
  {
    id: 'campaign-creator-meta',
    name: 'Campaign Creator (Meta)',
    category: 'Marketing',
    description: 'Creates Meta campaigns with objective, audience, placements, and budget plan.',
    inputs: [
      { key: 'objective', label: 'Objective', type: 'string', required: true, example: 'Leads', constraints: { enum: ['Leads','Traffic','Awareness'] } },
      { key: 'dailyBudget', label: 'Daily Budget (AED)', type: 'number', required: true, constraints: { min: 10 } },
      { key: 'audience', label: 'Audience Definition', type: 'markdown', required: true },
      { key: 'creativeAssets', label: 'Creative Assets', type: 'json', description: 'List of images/videos to use' }
    ],
    outputs: [
      { key: 'campaignPlan', label: 'Campaign Plan (JSON)', type: 'json', required: true },
      { key: 'adsetPlan', label: 'Ad Sets', type: 'json', required: true },
      { key: 'complianceNotes', label: 'Compliance Notes', type: 'markdown' }
    ],
    version: '0.1.0',
    enabled: true, allowedRoles: ['member','pro','admin'],
    status: 'beta'
  },
  {
    id: 'landing-page-designer',
    name: 'Landing Page Designer',
    category: 'Creative',
    description: 'Generates a high-converting landing page from project inputs + brochure.',
    inputs: [
      { key: 'projectName', label: 'Project Name', type: 'string', required: true },
      { key: 'uniqueAngle', label: 'Unique Angle', type: 'string' },
      { key: 'sections', label: 'Desired Sections', type: 'json', example: ['Hero','Amenities','Payment Plan','CTA'] }
    ],
    outputs: [
      { key: 'pageHtml', label: 'Page HTML/TSX', type: 'markdown', required: true },
      { key: 'seoMeta', label: 'SEO Meta', type: 'json' },
      { key: 'assets', label: 'Assets', type: 'json' }
    ],
    version: '0.1.0',
    enabled: true, allowedRoles: ['member','pro','admin'],
    status: 'alpha'
  },
  {
    id: 'instagram-leads',
    name: 'Instagram Lead Generation',
    category: 'Marketing',
    description: 'IG profile tuning + DM funnel plan for lead capture.',
    inputs: [
      { key: 'profileUrl', label: 'Profile URL', type: 'url', required: true },
      { key: 'niche', label: 'Niche', type: 'string' },
      { key: 'offer', label: 'Offer', type: 'string', required: true }
    ],
    outputs: [
      { key: 'bio', label: 'Optimized Bio', type: 'string', required: true },
      { key: 'dmScript', label: 'DM Script', type: 'markdown', required: true },
      { key: 'highlightPlan', label: 'Highlights Plan', type: 'json' }
    ],
    version: '0.1.0',
    enabled: true, allowedRoles: ['member','pro','admin'],
    status: 'alpha'
  },
  {
    id: 'listing-portal-ai',
    name: 'Listing Portal AI',
    category: 'Listing',
    description: 'Syncs with key portals and generates tuned listings.',
    inputs: [
      { key: 'portal', label: 'Portal', type: 'string', example: 'Bayut or Property Finder' },
      { key: 'projectId', label: 'Project Identifier', type: 'string', required: true },
      { key: 'account', label: 'Account Mapping', type: 'json' }
    ],
    outputs: [
      { key: 'listingJson', label: 'Listing JSON', type: 'json', required: true },
      { key: 'renewalPlan', label: 'Renewal Plan', type: 'json' }
    ],
    version: '0.1.0',
    enabled: true, allowedRoles: ['member','pro','admin'],
    status: 'alpha'
  },
  {
    id: 'commission-calculator',
    name: 'Commission Calculator',
    category: 'Sales',
    description: 'Calculates commissions based on developer rules + deal structure.',
    inputs: [
      { key: 'salePrice', label: 'Sale Price (AED)', type: 'number', required: true },
      { key: 'commissionRate', label: 'Commission %', type: 'number', required: true },
      { key: 'bonusRules', label: 'Bonus Rules', type: 'json' }
    ],
    outputs: [
      { key: 'commission', label: 'Commission (AED)', type: 'number', required: true },
      { key: 'payoutPlan', label: 'Payout Plan', type: 'json' }
    ],
    version: '0.1.0',
    enabled: true, allowedRoles: ['member','pro','admin'],
    status: 'ga'
  },
  {
    id: 'sales-ai-assistant',
    name: 'Sales AI Assistant',
    category: 'Sales',
    description: 'ChatAnalog multi-button chat assistant to orchestrate flows across apps.',
    inputs: [
      { key: 'leadContext', label: 'Lead Context', type: 'json', required: true },
      { key: 'goal', label: 'Goal', type: 'string', required: true }
    ],
    outputs: [
      { key: 'nextActions', label: 'Next Actions', type: 'json', required: true },
      { key: 'messages', label: 'Suggested Messages', type: 'json' }
    ],
    version: '0.1.0',
    enabled: true, allowedRoles: ['member','pro','admin'],
    status: 'beta'
  }
];

// -------- Validation --------
function validateType(type: IOFieldType, value: any): boolean {
  if(value === undefined || value === null) return true; // handle required elsewhere
  switch(type){
    case 'string': return typeof value === 'string';
    case 'number': return typeof value === 'number' && !isNaN(value);
    case 'boolean': return typeof value === 'boolean';
    case 'email': return typeof value === 'string' && emailRe.test(value);
    case 'url': return typeof value === 'string' && urlRe.test(value);
    case 'phone': return typeof value === 'string' && phoneRe.test(value);
    case 'image': return typeof value === 'string' && urlRe.test(value);
    case 'video': return typeof value === 'string' && urlRe.test(value);
    case 'pdf': return typeof value === 'string' && urlRe.test(value);
    case 'json': return typeof value === 'object';
    case 'markdown': return typeof value === 'string';
    default: return true;
  }
}

export function validateData(appId: string, payload: Record<string, any>){
  const app = appsRegistry.find(a => a.id === appId);
  if(!app) return { ok: false, errors: [`Unknown app: ${appId}`] };

  const errors: string[] = [];
  const keys = Object.keys(payload || {});
  const inputMap = Object.fromEntries(app.inputs.map(f => [f.key, f]));

  // Required checks
  for(const f of app.inputs){
    if(f.required && !(f.key in payload)){
      errors.push(`Missing required: ${f.key}`);
    }
  }
  // Unknown keys
  for(const k of keys){
    if(!inputMap[k]){
      errors.push(`Unknown field for ${appId}: ${k}`);
    }
  }
  // Type checks
  for(const [k, v] of Object.entries(payload || {})){
    const spec = inputMap[k];
    if(spec && !validateType(spec.type, v)){
      errors.push(`Invalid type for ${k}. Expected ${spec.type}.`);
    }
    if(spec){ validateConstraints(spec, v, errors); }
  }

  return { ok: errors.length === 0, errors };
}

// -------- Samples --------
export function buildSamplePayload(appId: string){
  const app = appsRegistry.find(a => a.id === appId);
  if(!app) return null;
  const payload: Record<string, any> = {};
  for(const f of app.inputs){
    if(f.example !== undefined){
      payload[f.key] = f.example;
    }else{
      switch(f.type){
        case 'string': payload[f.key] = f.required ? '...' : ''; break;
        case 'number': payload[f.key] = f.required ? 0 : 0; break;
        case 'boolean': payload[f.key] = false; break;
        case 'email': payload[f.key] = 'user@example.com'; break;
        case 'url': payload[f.key] = 'https://example.com'; break;
        case 'phone': payload[f.key] = '+971 55 123 4567'; break;
        case 'image': payload[f.key] = 'https://example.com/image.jpg'; break;
        case 'video': payload[f.key] = 'https://example.com/video.mp4'; break;
        case 'pdf': payload[f.key] = 'https://example.com/file.pdf'; break;
        case 'json': payload[f.key] = {}; break;
        case 'markdown': payload[f.key] = '...'; break;
        default: payload[f.key] = null;
      }
    }
  }
  return payload;
}


function validateConstraints(field: IOField, value: any, errors: string[]){
  const c = field.constraints;
  if(!c || value === undefined || value === null) return;
  if(typeof value === 'number'){
    if(typeof c.min === 'number' && value < c.min) errors.push(`Field ${field.key}: below min ${c.min}`);
    if(typeof c.max === 'number' && value > c.max) errors.push(`Field ${field.key}: above max ${c.max}`);
  }
  if(typeof value === 'string'){
    if(c.enum && !c.enum.includes(value)) errors.push(`Field ${field.key}: must be one of ${c.enum.join(', ')}`);
    if(c.pattern && !(new RegExp(c.pattern).test(value))) errors.push(`Field ${field.key}: invalid format`);
  }
}
