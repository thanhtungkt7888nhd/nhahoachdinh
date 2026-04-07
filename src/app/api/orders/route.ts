import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, name, phone, email, street, province, district, ward, quantity, note, paymentMethod, total, paymentConfirmed } = body;

    // --- Telegram notification ---
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChat  = process.env.TELEGRAM_CHAT_ID;
    if (tgToken && tgChat) {
      const payLabel = paymentMethod === "qr"
        ? (paymentConfirmed ? "✅ QR - Đã thanh toán" : "🔄 QR - Chờ thanh toán")
        : "📦 COD - Thanh toán khi nhận";
      const msg = [
        `🛒 *ĐƠN HÀNG MỚI* \`${orderId}\``,
        ``,
        `📚 Sách Farmstay × ${quantity}`,
        `💰 ${Number(total).toLocaleString("vi-VN")}₫ | ${payLabel}`,
        ``,
        `👤 ${name} | ${phone}`,
        email ? `📧 ${email}` : null,
        `📍 ${street}, ${ward}, ${district}, ${province}`,
        note ? `📝 ${note}` : null,
        ``,
        `⏰ ${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}`,
      ].filter(Boolean).join("\n");

      await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: tgChat, text: msg, parse_mode: "Markdown" }),
      }).catch(() => {}); // Don't fail if Telegram fails
    }

    // --- GHN Shipping (COD orders, if configured) ---
    let trackingCode: string | undefined;
    const ghnToken  = process.env.GHN_API_TOKEN;
    const ghnShopId = process.env.GHN_SHOP_ID;

    if (ghnToken && ghnShopId && paymentMethod === "cod") {
      try {
        const ghnPayload = {
          payment_type_id: 2,       // 2 = người nhận trả
          required_note: "KHONGCHOXEMHANG",
          to_name: name,
          to_phone: phone,
          to_address: street,
          to_ward_name: ward,
          to_district_name: district,
          to_province_name: province,
          cod_amount: total,
          weight: 500,
          length: 22,
          width: 15,
          height: 3,
          service_type_id: 2,       // Express
          items: [{
            name: "Sach Farmstay",
            quantity: Number(quantity),
            weight: 500,
          }],
        };

        const ghnRes = await fetch("https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Token": ghnToken,
            "ShopId": ghnShopId,
          },
          body: JSON.stringify(ghnPayload),
        });

        const ghnData = await ghnRes.json();
        if (ghnData.code === 200) {
          trackingCode = ghnData.data.order_code;

          // Telegram: send tracking code
          if (tgToken && tgChat && trackingCode) {
            await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: tgChat,
                text: `🚚 Vận đơn GHN tạo thành công!\nMã: \`${trackingCode}\`\nĐơn: \`${orderId}\``,
                parse_mode: "Markdown",
              }),
            }).catch(() => {});
          }
        }
      } catch (ghnErr) {
        console.error("[GHN] Error:", ghnErr);
      }
    }

    return NextResponse.json({ success: true, orderId, trackingCode });
  } catch (err) {
    console.error("[Orders API] Error:", err);
    return NextResponse.json({ success: false, error: "Đã xảy ra lỗi, vui lòng thử lại." }, { status: 500 });
  }
}
