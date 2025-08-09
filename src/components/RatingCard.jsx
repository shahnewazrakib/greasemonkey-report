import { Rate } from "antd";

export default function RatingCard({ name, rating, id }) {
  return (
    <div className="border px-4 py-3 rounded-lg space-y-1">
      <div className="flex items-center justify-between gap-2">
        <h5 className="font-medium">{name}</h5>
        <p className="text-lg font-semibold">{rating?.toFixed(1)}</p>
      </div>
      <Rate
        style={{ fontSize: 16, color: "#374151" }}
        value={rating}
        disabled
        allowHalf
      />
      <a
        href={`#${id}`}
        className="text-text text-sm underline-offset-2 underline block w-max"
      >
        View more
      </a>
    </div>
  );
}
