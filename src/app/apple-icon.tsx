import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#0D1F0D",
          border: "6px solid #C49A28",
          borderRadius: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#C49A28",
            fontSize: 58,
            fontWeight: 700,
            fontFamily: "serif",
            letterSpacing: "-1px",
            lineHeight: 1,
          }}
        >
          PTT
        </span>
      </div>
    ),
    { ...size }
  );
}
