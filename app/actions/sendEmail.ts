"use server"; // This tells Next.js to run this code ONLY on the server

import { Resend } from "resend";

// Initialize Resend with your API Key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  // Extract data from the form
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const service = formData.get("service") as string;
  const budget = formData.get("budget") as string;
  const message = formData.get("message") as string;

  // Basic validation
  if (!name || !email || !message) {
    return { error: "Please fill in all required fields." };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "MS Visuals <onboarding@resend.dev>", // Change to your verified domain later
      to: ["your-email@gmail.com"], // YOUR email address where leads will arrive
      subject: `New Lead: ${service} from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 15px;">
          <h2 style="color: #0B1F3A; border-bottom: 2px solid #f97316; padding-bottom: 10px;">New Project Inquiry</h2>
          <p style="margin: 10px 0;"><strong>Client Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>Client Email:</strong> ${email}</p>
          <p style="margin: 10px 0;"><strong>Service Required:</strong> ${service}</p>
          <p style="margin: 10px 0;"><strong>Budget:</strong> PKR ${budget}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-radius: 8px;">
            <p style="margin-top: 0; font-weight: bold; color: #0B1F3A;">Project Brief:</p>
            <p style="line-height: 1.6; color: #475569;">${message}</p>
          </div>
          <p style="font-size: 12px; color: #94a3b8; margin-top: 30px; text-align: center;">Sent from MS Visuals Portfolio</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { error: "Failed to send email. Please try again." };
    }

    return { success: true };
  } catch (err) {
    console.error("Server Error:", err);
    return { error: "A server error occurred. Please check your connection." };
  }
}