import { GOOGLE_PLACE_ID, MAPS_DIRECTIONS_URL, OFFICE_COORDS } from "@/lib/company";

const browserKey = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"] as
  | string
  | undefined;

export function OfficeMap() {
  const embedUrl = browserKey
    ? `https://www.google.com/maps/embed/v1/place?key=${browserKey}&q=place_id:${GOOGLE_PLACE_ID}&center=${OFFICE_COORDS.lat},${OFFICE_COORDS.lng}&zoom=15`
    : null;

  return (
    <div className="flex h-full flex-col border border-hairline">
      <div className="relative aspect-[4/3] w-full grow bg-surface">
        {embedUrl ? (
          <iframe
            title="Modern Edge main office location on Google Maps"
            src={embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 grayscale-[35%] transition-[filter] duration-500 hover:grayscale-0"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-sm text-muted-foreground">
            The map could not be loaded. Use Get Directions to open it in Google Maps.
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-hairline px-6 py-5">
        <span className="text-[0.7rem] tracking-[0.14em] uppercase text-muted-foreground">
          Duhabi - 06, Sunsari
        </span>
        <a
          href={MAPS_DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center border border-primary px-6 py-3 text-[0.68rem] font-bold tracking-[0.18em] uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Get Directions
        </a>
      </div>
    </div>
  );
}
