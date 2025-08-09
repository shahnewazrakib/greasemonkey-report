import { Rate } from "antd";
import { IoMdInformationCircleOutline } from "react-icons/io";
import RatingCard from "./RatingCard";
import { useStore } from "../store/zustand";
import { useMemo } from "react";

export default function Rating() {
  const { rating, data } = useStore();

  const weights = {
    engine: 0.2,
    brake: 0.15,
    gearbox: 0.15,
    differential: 0.1,
    suspension: 0.1,
    fluid: 0.05,
    tyre: 0.05,
    light: 0.03,
    exhaust: 0.02,
    interior: 0.04,
    exterior: 0.04,
    chassis: 0.07,
  };

  // Critical components that can severely impact overall rating
  const criticalComponents = ["engine", "brake", "gearbox"];

  const calculateOverallRating = () => {
    // Step 1: Calculate weighted average
    const weightedSum = Object.entries(weights).reduce((sum, [key, weight]) => {
      const r = rating[key] ?? 0;
      return sum + r * weight;
    }, 0);

    // Step 2: Apply critical component penalties
    let penalty = 0;
    criticalComponents.forEach((component) => {
      const r = rating[component] ?? 0;
      if (r < 3) {
        // Heavy penalty for critical components below 3
        penalty += (3 - r) * 0.6;
      } else if (r < 4) {
        // Moderate penalty for critical components below 4
        penalty += (4 - r) * 0.3;
      }
    });

    // Step 3: Apply penalty
    const penalizedRating = Math.max(0, weightedSum - penalty);

    // Step 4: Cap overall rating based on lowest critical component
    const lowestCriticalRating = Math.min(
      ...criticalComponents.map((comp) => rating[comp] ?? 0)
    );

    // Overall rating cannot exceed lowest critical component by more than 1 point
    const cappedRating = Math.min(penalizedRating, lowestCriticalRating + 1);

    // Ensure rating stays within 0-5 bounds
    return Math.max(0, Math.min(5, cappedRating));
  };

  const overallRating = useMemo(() => {
    return calculateOverallRating().toFixed(1);
  }, [rating]);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border">
        <div className="bg-muted rounded-t-xl px-4 sm:px-6 py-4 border-b">
          <h4 className="font-semibold text-lg text-center">
            Inspection Summary
          </h4>
        </div>
        <div className="p-4 sm:p-6 space-y-10">
          <div className="space-y-2">
            <h4 className="font-semibold text-lg text-center">
              Overall Rating
            </h4>
            <h4 className="text-center text-3xl font-semibold">
              {overallRating}/5.0
            </h4>
            <div className="flex justify-center">
              <Rate
                allowHalf
                style={{ fontSize: 25, color: "#374151" }}
                value={parseFloat(overallRating)}
                disabled
              />
            </div>
            <a
              href="#rating-guide"
              className="flex items-center justify-center gap-1 text-text text-sm underline-offset-2 hover:underline"
            >
              <IoMdInformationCircleOutline size={16} />{" "}
              <span>Rating Guide</span>
            </a>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
            <RatingCard name="Engine" rating={rating?.engine} id="engine" />
            <RatingCard name="Fluids" rating={rating?.fluid} id="fluid" />
            <RatingCard
              name="Transmission"
              rating={rating?.gearbox}
              id="gearbox"
            />
            <RatingCard
              name="Differential"
              rating={rating?.differential}
              id="differential"
            />
            <RatingCard
              name="Suspension"
              rating={rating?.suspension}
              id="suspension"
            />
            <RatingCard name="Brakes" rating={rating?.brake} id="brake" />
            <RatingCard name="Tyres & Wheels" rating={rating?.tyre} id="tyre" />
            <RatingCard
              name="Exhaust System"
              rating={rating?.exhaust}
              id="exhaust"
            />
            <RatingCard
              name="Lights & Electrical"
              rating={rating?.light}
              id="light"
            />
            <RatingCard
              name="Interior"
              rating={rating?.interior}
              id="interior"
            />
            <RatingCard
              name="Exterior Components"
              rating={rating?.exterior}
              id="exterior"
            />
            <RatingCard
              name="Chassis & Body"
              rating={rating?.chassis}
              id="chassis"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
