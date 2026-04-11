import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0D1F0D",
          border: "1.5px solid #C49A28",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#C49A28",
            fontSize: 12,
            fontWeight: 700,
            fontFamily: "serif",
            letterSpacing: "-0.5px",
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
