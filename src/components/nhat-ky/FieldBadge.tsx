/**
 * FieldBadge — Badge địa điểm dạng nhật ký hành trình cho bài "hien-truong".
 * Hiển thị 📍 địa điểm + toạ độ (nếu có) ở đầu bài.
 */

interface FieldBadgeProps {
  location: string;
  coordinates?: string;
  date?: string;
}

const TERRA = "#A0522D";

export default function FieldBadge({ location, coordinates, date }: FieldBadgeProps) {
  return (
    <div
      className="inline-flex flex-col gap-1 mb-8 px-4 py-3 rounded-md"
      style={{
        background: "rgba(160,82,45,0.1)",
        border: `1px solid rgba(160,82,45,0.25)`,
      }}
    >
      <div className="flex items-center gap-2">
        <span aria-hidden="true" style={{ fontSize: "0.85rem" }}>📍</span>
        <span
          className="font-sans font-semibold uppercase tracking-widest"
          style={{ fontSize: "0.65rem", color: TERRA }}
        >
          Hiện Trường
        </span>
      </div>
      <p className="font-serif" style={{ fontSize: "0.92rem", color: "#EDE0C4" }}>
        {location}
      </p>
      {(coordinates || date) && (
        <p
          className="font-sans"
          style={{ fontSize: "0.68rem", color: "rgba(237,224,196,0.4)", letterSpacing: "0.05em" }}
        >
          {coordinates && <span>{coordinates}</span>}
          {coordinates && date && <span> · </span>}
          {date && <time dateTime={date}>{date}</time>}
        </p>
      )}
    </div>
  );
}
