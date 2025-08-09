import { useStore } from "../store/zustand";
import Brake from "./Brake";
import Chassis from "./Chassis";
import Differential from "./Differential";
import Engine from "./Engine";
import Exhaust from "./Exhaust";
import Exterior from "./Exterior";
import Fluid from "./Fluid";
import Gearbox from "./Gearbox";
import Interior from "./Interior";
import Light from "./Light";
import Suspension from "./Suspension";
import Tyre from "./Tyre";

export default function InspectionResult() {
  const { data } = useStore();
  return (
    <div>
      <div className="rounded-xl border">
        <div className="bg-muted rounded-t-xl px-4 sm:px-6 py-4 border-b">
          <h4 className="font-semibold text-lg">Detailed Inspection Results</h4>
        </div>
        <div className="px-3 py-3 sm:p-6 space-y-5">
          <Engine data={data?.engine} />
          <Fluid data={data?.fluid} />
          <Gearbox data={data?.gearbox} />
          <Differential data={data?.differential} />
          <Suspension data={data?.suspension} />
          <Brake data={data?.brake} />
          <Tyre data={data?.tyre} />
          <Exhaust data={data?.exhaust} />
          <Light data={data?.light} />
          <Interior data={data?.interior} />
          <Exterior data={data?.exterior} />
          <Chassis data={data?.chassis} />
        </div>
      </div>
    </div>
  );
}
