export type Listing = {
  id?: string;
  title?: string;
  description?: string;
  price?: number;
  currency?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  location?: string;
  images?: string[];
  raw?: unknown;
};

export interface PortalAdapter {
  id: 'bayut' | 'propertyfinder' | 'dubizzle' | 'emaar';
  name: string;
  toPortal(listing: Listing): Record<string, unknown>;
  validate?(listing: Listing): { ok: boolean; errors?: string[] };
}

export const bayutAdapter: PortalAdapter = {
  id: 'bayut',
  name: 'Bayut',
  toPortal(listing) {
    return {
      title: listing.title,
      description: listing.description,
      price: listing.price,
      currency: listing.currency || 'AED',
      rooms: listing.bedrooms,
      baths: listing.bathrooms,
      size: listing.area,
      location: listing.location,
      photos: listing.images || [],
      _raw: listing.raw || {},
    };
  },
  validate(listing) {
    const errors: string[] = [];
    if (!listing.title) errors.push('title required');
    if (!listing.price) errors.push('price required');
    return { ok: errors.length === 0, errors };
  },
};

export const propertyFinderAdapter: PortalAdapter = {
  id: 'propertyfinder',
  name: 'Property Finder',
  toPortal(listing) {
    return {
      name: listing.title,
      details: listing.description,
      price: listing.price,
      currency: listing.currency || 'AED',
      beds: listing.bedrooms,
      baths: listing.bathrooms,
      area_sqft: listing.area,
      community: listing.location,
      images: listing.images || [],
    };
  },
};

export const adapters: Record<string, PortalAdapter> = {
  bayut: bayutAdapter,
  propertyfinder: propertyFinderAdapter,
};

export function toBayut(listing: Listing) {
  return bayutAdapter.toPortal(listing);
}

export function toPropertyFinder(listing: Listing) {
  return propertyFinderAdapter.toPortal(listing);
}
