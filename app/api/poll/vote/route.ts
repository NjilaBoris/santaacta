import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { deviceId, optionId, pollId } = await req.json();

  if (!deviceId || !optionId || !pollId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin.rpc("cast_poll_vote", {
    p_poll_id: pollId,
    p_option_id: optionId,
    p_device_id: deviceId,
  });

  if (error) {
    // "Device has already voted" will land here as error.message
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ votes: data });
}