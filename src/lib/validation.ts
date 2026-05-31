import { z } from "zod";

export const countryCodeSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^[A-Z]{2}$/, "Country code must be ISO 3166-1 alpha-2");

export const scheduleFilterSchema = z.object({
  phase: z
    .enum([
      "Group Stage",
      "Round of 32",
      "Round of 16",
      "Quarter-finals",
      "Semi-finals",
      "Third Place",
      "Final",
    ])
    .optional(),
});
