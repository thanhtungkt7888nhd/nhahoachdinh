import { NextRequest, NextResponse } from "next/server";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyD-7EFeiDdz0VSQ3SnwBVXAZdtk6N76qgTDdYa6g6RXLbc9d6V1sn7xV4HOr2xazznxA/exec";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, role } = body;

    if (!name || !phone || !email || !role) {
      return NextResponse.json(
        { ok: false, error: "Vui lòng điền đầy đủ thông tin bắt buộc." },
        { status: 400 }
      );
    }

    // Gửi vào Google Sheets + Gmail qua Apps Script
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, email, role }),
    }).catch(() => {});

    // Telegram (nếu đã cài)
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChat = process.env.TELEGRAM_CHAT_ID;

    if (tgToken && tgChat) {
      const datetime = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
      const msg = [
        `🌿 ĐĂNG KÝ XUYÊN VIỆT FARMSTAY 2026`,
        ``,
        `👤 Họ tên: ${name}`,
        `📞 SĐT: ${phone}`,
        `📧 Email: ${email}`,
        `🏷️ Vai trò: ${role}`,
        ``,
        `⏰ Thời gian: ${datetime}`,
      ].join("\n");

      await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: tgChat, text: msg }),
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[XVF Register API] Error:", err);
    return NextResponse.json({ ok: false, error: "Đã xảy ra lỗi, vui lòng thử lại." }, { status: 500 });
  }
}
