import blueMark from "@/assets/logo-mark-blue.png.asset.json";
import whiteMark from "@/assets/logo-mark-white.png.asset.json";

export function LogoMark({ className = "h-9" }: { className?: string }) {
  return (
    <span className={`relative inline-block shrink-0 ${className}`} aria-hidden="true">
      <img
        src={blueMark.url}
        alt=""
        className="block h-full w-auto object-contain dark:hidden"
        draggable={false}
      />
      <img
        src={whiteMark.url}
        alt=""
        className="hidden h-full w-auto object-contain dark:block"
        draggable={false}
      />
    </span>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 text-foreground ${className}`}>
      <LogoMark className="h-9" />
      <span className="leading-none">
        <span className="block text-[0.95rem] font-extrabold tracking-[0.14em] uppercase">
          Modern Edge
        </span>
        <span className="mt-1 block text-[0.5rem] font-medium tracking-[0.28em] uppercase text-muted-foreground">
          Architects &amp; Engineers
        </span>
      </span>
    </span>
  );
}
