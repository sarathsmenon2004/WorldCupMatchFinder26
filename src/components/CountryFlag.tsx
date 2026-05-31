import * as FlagIcons from "country-flag-icons/react/3x2";
import type { ComponentType, SVGProps } from "react";

type Props = {
  countryCode: string;
  emojiFallback?: string;
  preferEmoji?: boolean;
  className?: string;
};

export function CountryFlag({
  countryCode,
  emojiFallback,
  preferEmoji = false,
  className = "h-4 w-6 shrink-0",
}: Props) {
  const code = countryCode.toUpperCase();

  if (preferEmoji && emojiFallback) {
    return (
      <span className={`inline-flex items-center justify-center text-xl leading-none ${className}`}>
        {emojiFallback}
      </span>
    );
  }

  const Flag = FlagIcons[code as keyof typeof FlagIcons] as
    | ComponentType<SVGProps<SVGSVGElement>>
    | undefined;

  if (Flag && code !== "QA") {
    return <Flag className={`${className} rounded-sm object-cover`} aria-label={code} />;
  }

  if (emojiFallback) {
    return (
      <span className={`inline-flex items-center justify-center text-xl leading-none ${className}`}>
        {emojiFallback}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex h-4 w-6 shrink-0 items-center justify-center rounded-sm bg-border text-[10px] font-bold ${className}`}
    >
      {code}
    </span>
  );
}
