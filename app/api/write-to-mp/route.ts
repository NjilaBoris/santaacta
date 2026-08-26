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
  regionId: string;
  regionName: string;
  divisionId: string;
  divisionName: string;
  constituencyId: string;
  constituencyName: string;
  mpId?: string;
  mpName?: string;
  subject: string;
  message: string;
  email: string;
  phone: string;
};

function isValid(body: Partial<Payload>): body is Payload {
  return Boolean(
    body.regionId &&
      body.regionName &&
      body.divisionId &&
      body.divisionName &&
      body.constituencyId &&
      body.constituencyName &&
      body.subject?.trim() &&
      body.message?.trim() &&
      body.email?.trim() &&
      body.phone?.trim()
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
    .from("mp_messages")
    .insert({
      region_id: body.regionId,
      region_name: body.regionName,
      division_id: body.divisionId,
      division_name: body.divisionName,
      constituency_id: body.constituencyId,
      constituency_name: body.constituencyName,
      mp_id: body.mpId || null,
      mp_name: body.mpName || null,
      subject: body.subject,
      message: body.message,
      email: body.email,
      phone: body.phone,
    })
    .select()
    .single();

  if (dbError) {
    console.error("Supabase insert error:", dbError);
    return NextResponse.json({ error: "Could not save your message." }, { status: 500 });
  }

  try {
    await resend.emails.send({
      from: "Parli Access <notifications@parliaccess.org>",
      to: NOTIFY_EMAIL,
      replyTo: body.email,
      subject: `New message to MP: ${body.subject}`,
      html: `
        <h2>New "Write to your MP" submission</h2>
        <p><strong>Region:</strong> ${body.regionName}</p>
        <p><strong>Division:</strong> ${body.divisionName}</p>
        <p><strong>Constituency:</strong> ${body.constituencyName}</p>
        <p><strong>MP:</strong> ${body.mpName || "Not specified"}</p>
        <p><strong>Subject:</strong> ${body.subject}</p>
        <p><strong>From:</strong> ${body.email} / ${body.phone}</p>
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