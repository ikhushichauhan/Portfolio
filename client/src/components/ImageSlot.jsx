import React, { useState } from "react";
import { ImagePlus } from "lucide-react";

/**
 * Shows the image at `src` if it loads successfully.
 * If the file doesn't exist yet (you haven't added it to /public/images/... ),
 * it automatically falls back to a dashed placeholder box — so the site
 * never breaks while you're still collecting screenshots.
 */
export function ImageSlot({ src, alt = "", label = "Add image here", ratio = "aspect-[16/10]" }) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <div className={`${ratio} w-full rounded-xl overflow-hidden border border-[var(--line)]`}>
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`${ratio} w-full rounded-xl border border-dashed border-[var(--line)] bg-[var(--surface-2)] flex flex-col items-center justify-center gap-2 text-center px-4`}
    >
      <ImagePlus size={22} className="text-[var(--mute)]" strokeWidth={1.5} />
      <span className="text-[11px] tracking-wide text-[var(--mute)]">{label}</span>
      {src && (
        <span className="text-[10px] font-mono text-[var(--mute)] opacity-60 break-all px-2">
          {src}
        </span>
      )}
    </div>
  );
}
