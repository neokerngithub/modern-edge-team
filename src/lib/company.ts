/** Single source of truth for company contact details, socials and map data. */

export const COMPANY_NAME = "Modern Edge Architects and Engineers Pvt. Ltd.";

export const GOOGLE_PLACE_ID = "ChIJERZwDABz7zkR-z-0qE_7M0k";

export const OFFICE_COORDS = { lat: 26.5622844, lng: 87.2802647 } as const;

export const OFFICES = [
  {
    label: "Main Office",
    lines: ["Duhabi - 06", "Sunsari, Nepal"],
  },
  {
    label: "Branch Office",
    lines: ["Biratnagar - 10", "Morang, Nepal"],
  },
] as const;

export const EMAILS = ["meae.np@gmail.com", "info@modernedge.com.np"] as const;

export const PHONE_CONTACTS = [
  { name: "Kiran", numbers: ["+977-9852059599", "+977-9842278666"] },
  { name: "Samir", numbers: ["+977-9767784543", "+977-9819015015"] },
] as const;

export const MAPS_PLACE_URL = `https://www.google.com/maps/place/?q=place_id:${GOOGLE_PLACE_ID}`;

export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${OFFICE_COORDS.lat},${OFFICE_COORDS.lng}&destination_place_id=${GOOGLE_PLACE_ID}`;

export const GOOGLE_REVIEWS_URL = `https://search.google.com/local/reviews?placeid=${GOOGLE_PLACE_ID}`;

export const SOCIAL_LINKS = [
  { label: "LinkedIn", short: "IN", href: "https://www.linkedin.com/company/meaenp/" },
  { label: "Facebook", short: "FB", href: "https://www.facebook.com/meae.np/" },
  { label: "Instagram", short: "IG", href: "https://www.instagram.com/meae.np" },
  { label: "Google Maps", short: "MP", href: MAPS_PLACE_URL },
] as const;

/** Strips formatting so the number works inside a tel: href. */
export function telHref(number: string): string {
  return `tel:${number.replace(/[^0-9+]/g, "")}`;
}
