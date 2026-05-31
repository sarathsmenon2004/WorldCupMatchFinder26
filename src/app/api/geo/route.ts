export const runtime = "edge";

export async function GET() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);

  try {
    const response = await fetch("https://ipapi.co/json/", {
      signal: controller.signal,
      headers: { accept: "application/json" },
      cache: "no-store",
    });
    const data = (await response.json()) as {
      country_code?: string;
      country_name?: string;
    };
    const countryCode = data.country_code?.toUpperCase() ?? "US";
    return Response.json({
      countryCode,
      country: data.country_name ?? "United States",
    });
  } catch {
    return Response.json({ countryCode: "US", country: "United States" });
  } finally {
    clearTimeout(timeout);
  }
}
