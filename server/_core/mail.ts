import nodemailer from "nodemailer";

export async function sendLeadEmail(lead: any) {
  const recipient = "algemeneopslaggroep@gmail.com";
  
  // Create a transporter using a dummy SMTP or just log if no credentials
  // For production, the user should provide SMTP credentials in ENV
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"AOG Funnel" <${process.env.SMTP_USER || "noreply@zonnebatterij-advies.nl"}>`,
    to: recipient,
    subject: `Nieuwe Lead: ${lead.name}`,
    html: `
      <h2>Nieuwe lead binnengekomen!</h2>
      <p>Er is zojuist een nieuwe aanvraag gedaan via de website.</p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Naam:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${lead.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Telefoon:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${lead.phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">E-mail:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${lead.email || "Niet opgegeven"}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Postcode:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${lead.postalCode || "Niet opgegeven"}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Aantal panelen:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${lead.solarPanelCount || "Onbekend"}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Woningeigenaar:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${lead.homeOwner ? "Ja" : "Nee"}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Geschatte besparing:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">€${lead.estimatedSavings || 0} /jaar</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Bron:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${lead.source || "website"}</td>
        </tr>
      </table>
      <p style="margin-top: 20px; font-size: 12px; color: #666;">
        UTM Source: ${lead.utmSource || "-"}<br>
        UTM Medium: ${lead.utmMedium || "-"}<br>
        UTM Campaign: ${lead.utmCampaign || "-"}
      </p>
    `,
  };

  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("[Mail] SMTP credentials not configured. Lead data:", lead);
      return false;
    }
    await transporter.sendMail(mailOptions);
    console.log(`[Mail] Lead email sent to ${recipient}`);
    return true;
  } catch (error) {
    console.error("[Mail] Failed to send lead email:", error);
    return false;
  }
}
