import { NextResponse } from "next/server";

import { getCountryBroadcast } from "@/lib/data";
import { countryCodeSchema } from "@/lib/validation";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ countryCode: string }> },
) {
  const { countryCode } = await params;
  const parsed = countryCodeSchema.safeParse(countryCode);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid country code" }, { status: 400 });
  }

  const country = await getCountryBroadcast(parsed.data);
  if (!country) {
    return NextResponse.json({ error: "Country not found" }, { status: 404 });
  }

  return NextResponse.json(country);
}
