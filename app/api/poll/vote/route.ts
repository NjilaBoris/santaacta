

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Single-poll project — matches POLL_ID in Poll.tsx and the seed SQL.
const POLL_ID = "7320d2fc-893f-4ebe-ade3-5dc6f23fa43b";

export async function POST(req: Request) {
  const { deviceId, optionId } = await req.json();

  if (!deviceId || !optionId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error: rpcError } = await supabaseAdmin.rpc("cast_poll_vote", {
    p_poll_id: POLL_ID,
    p_option_id: optionId,
    p_device_id: deviceId,
  });

  if (rpcError) {
    const alreadyVoted = rpcError.message.includes("already voted");
    return NextResponse.json(
      { error: rpcError.message },
      { status: alreadyVoted ? 409 : 500 }
    );
  }

  const { data, error: fetchError } = await supabaseAdmin
    .from("poll_options")
    .select("id, vote_count")
    .eq("poll_id", POLL_ID);

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  return NextResponse.json({ votes: data });
}

export async function DELETE(req: Request) {
  const { deviceId } = await req.json();

  if (!deviceId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error: rpcError } = await supabaseAdmin.rpc("remove_poll_vote", {
    p_poll_id: POLL_ID,
    p_device_id: deviceId,
  });

  if (rpcError) {
    const noVote = rpcError.message.includes("No vote found");
    return NextResponse.json(
      { error: rpcError.message },
      { status: noVote ? 404 : 500 }
    );
  }

  const { data, error: fetchError } = await supabaseAdmin
    .from("poll_options")
    .select("id, vote_count")
    .eq("poll_id", POLL_ID);

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  return NextResponse.json({ votes: data });
}