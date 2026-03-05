import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ProposalAcceptanceRequest {
  signature: string;
  role: string;
  company: string;
  date: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const resend = new Resend(resendKey);
    const { signature, role, company, date }: ProposalAcceptanceRequest = await req.json();

    if (!signature || !role || !company || !date) {
      throw new Error("Missing required fields");
    }

    const { error } = await resend.emails.send({
      from: "Uvicuo <onboarding@resend.dev>",
      to: ["iker@uvicuo.com"],
      subject: `✅ Propuesta aceptada — ${company}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="font-size: 24px; color: #111; margin: 0;">🎉 ¡Propuesta Aceptada!</h1>
            <p style="color: #666; font-size: 14px; margin-top: 8px;">Un cliente ha firmado la propuesta comercial</p>
          </div>
          
          <div style="background: #f9fafb; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #888; width: 120px;">Empresa</td>
                <td style="padding: 8px 0; color: #111; font-weight: 600;">${company}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Firmado por</td>
                <td style="padding: 8px 0; color: #111; font-weight: 600;">${signature}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Cargo</td>
                <td style="padding: 8px 0; color: #111; font-weight: 600;">${role}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Fecha</td>
                <td style="padding: 8px 0; color: #111; font-weight: 600;">${date}</td>
              </tr>
            </table>
          </div>
          
          <p style="color: #888; font-size: 12px; text-align: center;">Este correo fue enviado automáticamente por Uvicuo.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error(`Failed to send email: ${JSON.stringify(error)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error sending proposal email:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
