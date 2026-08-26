import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_EMAIL = "peoplesparliament5@gmail.com";

type Payload = {
  community: string;
  representative: string;
  subject: string;
  message: string;
  email: string;
  phone?: string;
};

function isValid(body: Partial<Payload>): body is Payload {
  return Boolean(
    body.community?.trim() &&
      body.representative?.trim() &&
      body.subject?.trim() &&
      body.message?.trim() &&
      body.email?.trim()
  );
}

export async function POST(req: Request) {
  let body: Partial<Payload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isValid(body)) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const { data, error: dbError } = await supabase
    .from("council_messages")
    .insert({
      community: body.community,
      representative: body.representative,
      subject: body.subject,
      message: body.message,
      email: body.email,
      phone: body.phone || null,
    })
    .select()
    .single();

  if (dbError) {
    console.error("Supabase insert error:", dbError);
    return NextResponse.json({ error: "Could not save your message." }, { status: 500 });
  }

  try {
    await resend.emails.send({
      from: "ACTA Contact Form <noreply@santaacta.com>",
      to: NOTIFY_EMAIL,
      replyTo: body.email,
      subject: `New message to representative: ${body.subject}`,
      html: `
        <h2>New "Write to your Mayor / Councillor" submission</h2>
        <p><strong>Community / Quarter:</strong> ${body.community}</p>
        <p><strong>Representative:</strong> ${body.representative}</p>
        <p><strong>Subject:</strong> ${body.subject}</p>
        <p><strong>From:</strong> ${body.email} / ${body.phone || "Not provided"}</p>
        <hr />
        <p style="white-space: pre-wrap;">${body.message}</p>
        <hr />
        <p style="font-size:12px;color:#888;">Record ID: ${data.id}</p>
      `,
    });
  } catch (emailError) {
    console.error("Resend error:", emailError);
  }

  return NextResponse.json({ ok: true, id: data.id }, { status: 200 });
}