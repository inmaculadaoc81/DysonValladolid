const { google } = require("googleapis");

const clean = (value, max = 2000) =>
  String(value ?? "").replace(/[<>]/g, "").trim().slice(0, max);

module.exports = async function handler(req, res) {
  const required = ["GOOGLE_CLIENT_ID","GOOGLE_CLIENT_SECRET","GOOGLE_REFRESH_TOKEN","GOOGLE_EMAIL","CONTACT_EMAIL"];

  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      service: "DysonRepair contacto API",
      node: process.version,
      environment: Object.fromEntries(required.map(k => [k, Boolean(process.env[k])]))
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok:false, code:"METHOD_NOT_ALLOWED" });
  }

  try {
    if (required.some(k => !process.env[k])) {
      return res.status(500).json({ ok:false, code:"MISSING_ENVIRONMENT_VARIABLES" });
    }

    let data = req.body || {};
    if (typeof data === "string") {
      try { data = JSON.parse(data); } catch (_) { data = Object.fromEntries(new URLSearchParams(data)); }
    }

    const nombre = clean(data.nombre, 80);
    const telefono = clean(data.telefono, 30);
    const email = clean(data.email, 120);
    const equipo = clean(data.equipo, 140);
    const mensaje = clean(data.mensaje, 2000);

    if (!nombre || !telefono || !email || !mensaje) {
      return res.status(400).json({ ok:false, code:"INVALID_FORM_DATA" });
    }

    const oauth2 = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    oauth2.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
    await oauth2.getAccessToken();

    const gmail = google.gmail({ version:"v1", auth:oauth2 });
    const subject = "Nueva consulta DysonRepair Valladolid";
    const html = `
      <h2>Nueva consulta DysonRepair Valladolid</h2>
      <p><b>Nombre:</b> ${nombre}</p>
      <p><b>Teléfono:</b> ${telefono}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Equipo / modelo:</b> ${equipo || "No indicado"}</p>
      <p><b>Consulta:</b><br>${mensaje.replace(/\n/g,"<br>")}</p>`;

    const raw = [
      `From: DysonRepair <${process.env.GOOGLE_EMAIL}>`,
      `To: ${process.env.CONTACT_EMAIL}`,
      `Reply-To: ${email}`,
      `Subject: =?UTF-8?B?${Buffer.from(subject).toString("base64")}?=`,
      "MIME-Version: 1.0",
      "Content-Type: text/html; charset=UTF-8",
      "",
      html
    ].join("\r\n");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: Buffer.from(raw).toString("base64url") }
    });

    return res.status(200).json({ ok:true });
  } catch (error) {
    console.error("DysonRepair contact error:", error);
    return res.status(500).json({ ok:false, code:"EMAIL_SEND_FAILED" });
  }
};