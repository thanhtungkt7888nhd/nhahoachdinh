"use client";

/**
 * ProcessDiagram — Sơ đồ quy trình dạng bước ngang (editorial infographic)
 * Dùng trong bài viết longform để hiển thị lộ trình / quy trình nhiều bước.
 */

interface Step {
  number: string | number;
  title: string;
  description?: string;
}

interface ProcessDiagramProps {
  steps: Step[];
  title?: string;
}

const TERRA = "#A0522D";
const GOLD  = "#C49A28";
const CREAM = "#EDE0C4";

export default function ProcessDiagram({ steps, title }: ProcessDiagramProps) {
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

      {/* Mobile: dọc / Desktop: ngang */}
      <div className="flex flex-col lg:flex-row">
        {steps.map((step, idx) => (
          <div key={idx} className="flex lg:flex-col flex-1 items-start lg:items-center relative">
            {/* Connector line — dọc trên mobile, ngang trên desktop */}
            {idx > 0 && (
              <>
                {/* Desktop connector */}
                <div
                  className="hidden lg:block absolute top-[2.35rem] right-1/2 w-1/2 h-px"
                  style={{ background: `linear-gradient(to right, rgba(160,82,45,0.6), rgba(196,154,40,0.25))` }}
                />
                {/* Mobile connector */}
                <div
                  className="lg:hidden absolute top-0 left-[1.9rem] w-px h-5"
                  style={{ background: "rgba(160,82,45,0.4)" }}
                />
              </>
            )}

            <div className="flex lg:flex-col items-start lg:items-center p-5 lg:p-6 gap-4 lg:gap-3 w-full">
              {/* Circle number */}
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full font-sans font-bold"
                style={{
                  width: 40, height: 40,
                  background: `rgba(160,82,45,0.15)`,
                  border: `1.5px solid ${TERRA}`,
                  color: TERRA,
                  fontSize: "0.75rem",
                  letterSpacing: "0.05em",
                  zIndex: 1,
                }}
              >
                {String(step.number).padStart(2, "0")}
              </div>

              <div className="lg:text-center">
                <p
                  className="font-serif font-normal leading-snug mb-1"
                  style={{ color: CREAM, fontSize: "0.95rem" }}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p
                    className="font-sans leading-relaxed"
                    style={{ color: "rgba(237,224,196,0.5)", fontSize: "0.78rem" }}
                  >
                    {step.description}
                  </p>
                )}
              </div>
            </div>

            {/* Divider giữa các bước */}
            {idx < steps.length - 1 && (
              <div
                className="lg:hidden w-full"
                style={{ height: "1px", background: "rgba(196,154,40,0.08)", marginLeft: "5rem" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
