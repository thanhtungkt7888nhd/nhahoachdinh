"use client";

/**
 * HorizontalTimeline — Dòng thời gian nằm ngang phong cách editorial
 * Dùng để hiển thị lịch sử, lộ trình phát triển, hoặc giai đoạn dự án.
 */

interface TimelineEvent {
  year: string | number;
  title: string;
  description?: string;
  highlight?: boolean;
}

interface HorizontalTimelineProps {
  events: TimelineEvent[];
  title?: string;
}

const TERRA = "#A0522D";
const GOLD  = "#C49A28";
const CREAM = "#EDE0C4";

export default function HorizontalTimeline({ events, title }: HorizontalTimelineProps) {
  return (
    <div
      className="my-8 rounded-xl overflow-hidden"
      style={{
        background: "rgba(10,18,8,0.7)",
        border: "1px solid rgba(196,154,40,0.15)",
      }}
    >
      {title && (
        <div
          className="px-6 py-3 border-b"
          style={{
            borderColor: "rgba(196,154,40,0.15)",
            background: "rgba(6,12,6,0.5)",
          }}
        >
          <p
            className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold"
            style={{ color: "rgba(196,154,40,0.65)" }}
          >
            {title}
          </p>
        </div>
      )}

      {/* Scrollable trên mobile */}
      <div className="overflow-x-auto pb-2">
        <div
          className="flex gap-0 relative min-w-max px-6 pt-6 pb-8"
          style={{ minWidth: `${events.length * 180}px` }}
        >
          {/* Đường timeline ngang */}
          <div
            className="absolute"
            style={{
              top: "3.1rem",
              left: "6rem",
              right: "6rem",
              height: "1px",
              background: `linear-gradient(to right, transparent, rgba(196,154,40,0.3) 10%, rgba(196,154,40,0.3) 90%, transparent)`,
            }}
          />

          {events.map((event, idx) => {
            const isHighlight = event.highlight;
            const dotColor = isHighlight ? TERRA : GOLD;
            const dotBg = isHighlight ? "rgba(160,82,45,0.2)" : "rgba(196,154,40,0.12)";

            return (
              <div
                key={idx}
                className="flex flex-col items-center flex-1"
                style={{ minWidth: 160, padding: "0 0.5rem" }}
              >
                {/* Year */}
                <div
                  className="font-sans font-bold mb-3 z-10"
                  style={{
                    color: isHighlight ? TERRA : "rgba(196,154,40,0.65)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  {event.year}
                </div>

                {/* Dot */}
                <div
                  className="rounded-full z-10 mb-4 flex-shrink-0"
                  style={{
                    width: isHighlight ? 14 : 10,
                    height: isHighlight ? 14 : 10,
                    background: dotBg,
                    border: `1.5px solid ${dotColor}`,
                    boxShadow: isHighlight ? `0 0 8px ${TERRA}60` : "none",
                  }}
                />

                {/* Content */}
                <div className="text-center">
                  <p
                    className="font-serif leading-snug mb-1"
                    style={{
                      color: isHighlight ? CREAM : "rgba(237,224,196,0.75)",
                      fontSize: "0.88rem",
                      fontWeight: isHighlight ? 500 : 400,
                    }}
                  >
                    {event.title}
                  </p>
                  {event.description && (
                    <p
                      className="font-sans"
                      style={{
                        color: "rgba(237,224,196,0.4)",
                        fontSize: "0.72rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
