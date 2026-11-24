import { Logo } from "./Logo";

/** Brief branded intro; pure CSS so it fades out even before scripts load. */
export function Preloader() {
  return (
    <div aria-hidden="true" className="preloader pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <Logo className="preloader-logo h-14 sm:h-16" />
        <div className="h-0.5 w-40 overflow-hidden rounded-full bg-secondary">
          <div className="preloader-bar h-full w-full bg-brand-gradient" />
        </div>
      </div>
    </div>
  );
}
