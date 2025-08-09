import React, { useEffect, useState } from "react";
import { useStore } from "../store/zustand";
import { partsLookup } from "../lib/constant";
import { Image, Rate } from "antd";

export default function PoorParts() {
  const { data } = useStore();
  const [poorParts, setPoorParts] = useState([]);

  useEffect(() => {
    if (data) {
      const filteredParts = [];
      for (const key in data) {
        if (["vehicle", "history"].includes(key)) continue;
        const details = data[key];

        for (const partKey in details) {
          const partData = details[partKey];
          if (partData?.rating < 3) {
            if (
              partData.hasOwnProperty("isAvailable") &&
              !partData.isAvailable
            ) {
              continue;
            }

            const partName = partsLookup[partKey] || "Unknown Part";
            filteredParts.push({
              label: partName,
              rating: partData.rating,
              comment: partData.comment,
              photos: partData.photos || [],
            });
          }
        }
      }

      const sortedParts = filteredParts.sort((a, b) => a.rating - b.rating);
      setPoorParts(sortedParts);
    }
  }, [data]);

  return poorParts.length > 0 ? (
    <div className="border rounded-xl border-red-100">
      <div className="bg-red-500/10 rounded-t-xl px-4 sm:px-6 py-4 border-b border-red-100">
        <h4 className="font-semibold text-lg">Attention Needed</h4>
      </div>
      <div className="p-4 sm:p-6 space-y-4">
        {poorParts.map((part, index) => {
          return (
            <div
              key={index}
              className="border rounded-lg p-4 bg-red-500/10 border-red-100 space-y-1"
            >
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm">{part.label}</p>
                <Rate
                  allowHalf
                  style={{ fontSize: 10, color: "#374151" }}
                  value={part.rating}
                  disabled
                />
                <span className="text-xs font-medium">{part.rating.toFixed(1)}</span>
              </div>
              <p className="text-sm text-text">{part?.comment}</p>

              {part?.photos?.length > 0 && (
                <div className="flex gap-2">
                  <Image.PreviewGroup items={part?.photos}>
                    {part?.photos.map((photo, index) => (
                      <Image
                        key={index}
                        src={photo}
                        placeholder={true}
                        height={50}
                        width={80}
                        className="rounded-md object-cover"
                      />
                    ))}
                  </Image.PreviewGroup>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
}
