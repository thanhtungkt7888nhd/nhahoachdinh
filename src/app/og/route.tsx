import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Phạm Thanh Tùng";
  const subtitle = searchParams.get("subtitle") ?? "Nhà Hoạch Định Farmstay & Du Lịch Nông Nghiệp";
  const category = searchParams.get("category") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #060E05 0%, #0A1208 50%, #0D1A0C 100%)",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        {/* Gold ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "60%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,154,40,0.12) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
            display: "flex",
          }}
        />

        {/* Top hairline */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, transparent, #C49A28 30%, #D4B050 50%, #C49A28 70%, transparent)",
            display: "flex",
          }}
        />

        {/* Category tag */}
        {category && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                background: "rgba(196,154,40,0.12)",
                border: "1px solid rgba(196,154,40,0.35)",
                borderRadius: "100px",
                padding: "6px 18px",
                color: "#C49A28",
                fontSize: "14px",
                fontFamily: "sans-serif",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                display: "flex",
              }}
            >
              {category}
            </div>
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? "42px" : "52px",
            color: "#EDE0C4",
            lineHeight: 1.25,
            marginBottom: "20px",
            maxWidth: "900px",
            display: "flex",
          }}
        >
          {title}
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: "48px",
            height: "2px",
            background: "linear-gradient(90deg, #C49A28, #D4B050)",
            marginBottom: "20px",
            display: "flex",
          }}
        />

        {/* Subtitle / Author */}
        <div
          style={{
            fontSize: "20px",
            color: "rgba(196,154,40,0.75)",
            fontFamily: "sans-serif",
            letterSpacing: "0.05em",
            display: "flex",
          }}
        >
          {subtitle}
        </div>

        {/* Bottom right domain */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            fontSize: "16px",
            color: "rgba(237,224,196,0.3)",
            fontFamily: "sans-serif",
            letterSpacing: "0.1em",
            display: "flex",
          }}
        >
          nhahoachdinh.com
        </div>

        {/* Bottom hairline */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, transparent, rgba(196,154,40,0.4) 30%, rgba(196,154,40,0.4) 70%, transparent)",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
