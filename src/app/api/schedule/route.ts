import { NextResponse } from "next/server";

import { listMatches } from "@/lib/data";
import { scheduleFilterSchema } from "@/lib/validation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = scheduleFilterSchema.safeParse({
    phase: searchParams.get("phase") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid schedule filter" }, { status: 400 });
  }

  const matches = await listMatches();
  return NextResponse.json(
    parsed.data.phase
      ? matches.filter((match) => match.phase === parsed.data.phase)
      : matches,
  );
}
