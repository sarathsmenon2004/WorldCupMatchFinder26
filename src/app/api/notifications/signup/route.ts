import { createPublicSupabaseClient } from "@/lib/supabase";
import { notificationSignupSchema } from "@/lib/validation";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = notificationSignupSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const supabase = createPublicSupabaseClient();
  if (!supabase) {
    return Response.json(
      { error: "Notification signups are not configured yet. Try again later." },
      { status: 503 },
    );
  }

  const { email, teamName, notifyBeforeMatch } = parsed.data;
  const { error } = await supabase.from("notification_signups").insert({
    email,
    team_name: teamName,
    notify_before_match: notifyBeforeMatch,
  });

  if (error) {
    return Response.json({ error: "Could not save signup. Please try again." }, { status: 500 });
  }

  return Response.json({ ok: true });
}
