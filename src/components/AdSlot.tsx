type AdSlotProps = {
  size: "banner" | "sidebar" | "native";
};

const sizes = {
  banner: "min-h-[72px] md:min-h-[90px]",
  sidebar: "min-h-[250px]",
  native: "min-h-[120px]",
};

export function AdSlot({ size }: AdSlotProps) {
  return (
    <div
      className={`flex w-full items-center justify-center rounded-card border border-dashed border-border bg-surface/80 p-4 text-xs uppercase tracking-[0.2em] text-muted ${sizes[size]}`}
      aria-label="Advertisement"
    >
      Advertisement
      {/* Replace this placeholder with vetted AdSense markup after production approval. */}
    </div>
  );
}
