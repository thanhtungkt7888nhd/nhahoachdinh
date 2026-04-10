import { NextRequest, NextResponse } from "next/server";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyD-7EFeiDdz0VSQ3SnwBVXAZdtk6N76qgTDdYa6g6RXLbc9d6V1sn7xV4HOr2xazznxA/exec";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ ok: false, error: "Thiếu email." }, { status: 400 });
    }

    // Gửi vào Google Sheets + email xác nhận qua Apps Script
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "sach-farmstay", email }),
    }).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Notify API] Error:", err);
    return NextResponse.json({ ok: false, error: "Đã xảy ra lỗi." }, { status: 500 });
  }
}
