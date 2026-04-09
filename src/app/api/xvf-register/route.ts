import { NextRequest, NextResponse } from "next/server";

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
