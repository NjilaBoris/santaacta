import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_EMAIL = "politicosinfo@gmail.com"; 

type Payload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

function isValid(body: Partial<Payload>): body is Payload {
  return Boolean(
    body.firstName?.trim() &&
      body.lastName?.trim() &&
      body.email?.trim() &&
      body.subject?.trim() &&
      body.message?.trim()
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

  try {
    await resend.emails.send({
      from: "Parli Access <notifications@parliaccess.org>", 
      to: NOTIFY_EMAIL,
      replyTo: body.email,
      subject: `New sales inquiry: ${body.subject}`,
      html: `
        <h2>New "Contact Sales" submission</h2>
        <p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone || "Not provided"}</p>
        <p><strong>Subject:</strong> ${body.subject}</p>
        <hr />
        <p style="white-space: pre-wrap;">${body.message}</p>
      `,
    });
  } catch (emailError) {
    console.error("Resend error:", emailError);
    return NextResponse.json({ error: "Could not send your message." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}