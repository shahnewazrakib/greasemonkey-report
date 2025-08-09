import { Image, Rate } from "antd";
import { useEffect, useMemo } from "react";
import { FaStar } from "react-icons/fa";
import { useStore } from "../store/zustand";

export default function Exterior({ data }) {
  const { setRating } = useStore();
  const exteriorParts = [
    { key: "frontBumperBar", label: "Front Bumper Bar" },
    { key: "bonnet", label: "Bonnet" },
    {
      key: "frontQuarterPanels",
      label: "Front Right / Front Left Quarter Panels",
    },
    { key: "frontDoors", label: "Front Right / Front Left Doors" },
    {
      key: "rearDoors",
      label: "Rear Right / Rear Left Doors",
    },
    {
      key: "rearQuarterPanels",
      label: "Rear Right / Rear Left Quarter Panels",
    },
    {
      key: "roofPanel",
      label: "Roof Panel",
    },
    {
      key: "sunroofOrConvertible",
      label: "Sunroof / Convertible",
    },
  ];

  const avgRating = useMemo(() => {
    const ratings = exteriorParts
      .filter((part) => {
        const partData = data?.[part.key];
        if (
          ["rearDoors", "sunroofOrConvertible"].includes(part.key) &&
          !partData?.isAvailable
        )
          return false;
        return true;
      })
      .map((part) => data?.[part.key]?.rating);

    return parseFloat(
      (ratings.reduce((sum, val) => sum + val, 0) / ratings.length).toFixed(1)
    );
  }, [data]);

  useEffect(() => {
    if (avgRating) {
      setRating("exterior", avgRating);
    }
  }, [avgRating]);

  return (
    <div id="exterior">
      <div className="rounded-xl border">
        <div className="bg-muted rounded-t-xl py-3 px-4 border-b flex items-center justify-between gap-2">
          <h4 className="font-semibold sm:text-lg">Exterior Components</h4>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Avg Rating {avgRating}</p>
            <FaStar size={14} className="text-[#374151]" />
          </div>
        </div>

        <div>
          <div className={`${styles.row} max-md:hidden`}>
            <div className="font-medium">Parts</div>
            <div className="font-medium">Rating (out of 5)</div>
            <div className="col-span-2 font-medium">Comment/Photo</div>
          </div>

          {exteriorParts.map((part) => {
            const partData = data?.[part.key];

            return (
              <div key={part.key} className={styles.row}>
                <div>{part.label}</div>

                {["rearDoors", "sunroofOrConvertible"].includes(part.key) &&
                !partData?.isAvailable ? (
                  <>
                    <div>N/A</div>
                    <div className="max-md:hidden md:col-span-2">N/A</div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <Rate
                        allowHalf
                        style={{ fontSize: 16, color: "#374151" }}
                        defaultValue={partData?.rating}
                        disabled
                      />
                      <p className="font-medium">{partData?.rating.toFixed(1)}</p>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <p>{partData?.comment}</p>
                      {partData?.photos?.length > 0 && (
                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-6 gap-2">
                          <Image.PreviewGroup items={partData?.photos}>
                            {partData.photos.map((photo, index) => (
                              <Image
                                key={index}
                                src={photo}
                                placeholder={true}
                                height={60}
                                className="rounded-md object-cover"
                              />
                            ))}
                          </Image.PreviewGroup>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
  row: "gap-2 grid md:grid-cols-4 p-4 text-sm border-b items-center last-of-type:border-b-0",
};
