import { Popover, Tag } from "antd";
import { LuShield } from "react-icons/lu";
import { MdAttachMoney } from "react-icons/md";
import { IoMdSpeedometer } from "react-icons/io";
import { useStore } from "../store/zustand";
import { IoClipboardOutline } from "react-icons/io5";
import { PiEngine } from "react-icons/pi";
import { FiInfo } from "react-icons/fi";
import { FaCarBurst } from "react-icons/fa6";

export default function History() {
  const { data } = useStore();

  const HISTORY_CHECKS = [
    {
      key: "writtenOff",
      label: "Written Off",
      icon: <FaCarBurst size={18} />,
      yesMessage: "Written-off incidents reported",
      noMessage: "Not recorded as written-off",
      unknownMessage: "Insufficient records available",
    },
    {
      key: "stolenStatus",
      label: "Stolen Status",
      icon: <LuShield size={18} />,
      yesMessage: "Listed as stolen",
      noMessage: "No record as stolen",
      unknownMessage: "Insufficient records available",
    },
    {
      key: "financeCheck",
      label: "Finance Check",
      icon: <MdAttachMoney size={20} />,
      yesMessage: "Financial interests reported",
      noMessage: "No security interests reported",
      unknownMessage: "Insufficient records available",
    },
    {
      key: "odometerCheck",
      label: "Odometer Check",
      icon: <IoMdSpeedometer size={18} />,
      yesMessage: "Odometer inconsistency suspected",
      noMessage: "No odometer rollback suspected",
      unknownMessage: "Insufficient records available",
    },
    {
      key: "engineFaultCodes",
      label: "Engine/Transmission Fault Codes",
      icon: <PiEngine />,
      yesMessage: "Fault codes detected",
      noMessage: "No fault codes detected",
      unknownMessage: "Insufficient records available",
    },
    {
      key: "serviceCheck",
      label: "Service Check",
      icon: <IoClipboardOutline />,
      yesMessage: "Service records available",
      noMessage: "No service records available",
      unknownMessage: "Insufficient records available",
    },
  ];

  return (
    <div className="border rounded-xl">
      <div className="bg-muted rounded-t-xl px-4 sm:px-6 py-4 border-b flex items-center gap-2">
        <h4 className="font-semibold text-lg">Vehicle History Snapshot</h4>
        <div>
          <Popover
            placement="top"
            content={
              <p className="text-[13px] max-w-[300px]">
                Information is sourced from the PPSR, third-party databases,
                diagnostic tools, and available service records at the time of
                inspection. Company uses advanced equipment to assess the
                vehicle, where applicable, at the time of inspection. While
                every effort is made, we do not guarantee the accuracy,
                completeness, or future condition of the vehicle.
              </p>
            }
          >
            <FiInfo className="cursor-pointer" size={18} />
          </Popover>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid md:grid-cols-2 gap-3">
          {data?.history &&
            HISTORY_CHECKS.map((check, index) => {
              const hisotryData = data.history?.[check.key];

              // Is this the service check item?
              const isServiceCheck = check.key === "serviceCheck";

              // Determine text color class (reversed if serviceCheck)
              const textColorClass = isServiceCheck
                ? hisotryData?.status === "yes"
                  ? "text-green-600"
                  : hisotryData?.status === "no"
                  ? "text-red-500"
                  : "text-text"
                : hisotryData?.status === "yes"
                ? "text-red-500"
                : hisotryData?.status === "no"
                ? "text-green-600"
                : "text-text";

              // Determine message (reversed if serviceCheck)
              const statusMessage = isServiceCheck
                ? hisotryData?.status === "yes"
                  ? check.yesMessage // normally yesMessage is "Service records available"
                  : hisotryData?.status === "no"
                  ? check.noMessage
                  : check.unknownMessage
                : hisotryData?.status === "yes"
                ? check.yesMessage
                : hisotryData?.status === "no"
                ? check.noMessage
                : check.unknownMessage;

              // Determine tag color (reversed if serviceCheck)
              const tagColor = isServiceCheck
                ? hisotryData?.status === "yes"
                  ? "green"
                  : hisotryData?.status === "no"
                  ? "red"
                  : undefined
                : hisotryData?.status === "yes"
                ? "red"
                : hisotryData?.status === "no"
                ? "green"
                : undefined;

              const tagLabel =
                hisotryData?.status === "yes"
                  ? "Yes"
                  : hisotryData?.status === "no"
                  ? "No"
                  : "N/A";

              return (
                <div
                  key={index}
                  className="border rounded-lg p-2 flex justify-between gap-4"
                >
                  <div className="flex gap-2">
                    <div className="bg-black/5 size-9 rounded-lg flex items-center justify-center">
                      {check.icon}
                    </div>
                    <div>
                      <h6 className="text-sm font-medium">{check.label}</h6>
                      <p className={`text-xs ${textColorClass}`}>
                        {statusMessage}
                      </p>

                      {hisotryData?.status === "yes" &&
                        (hisotryData?.comment ||
                          hisotryData?.photos?.length > 0) && (
                          <a
                            href={`#${check.key}`}
                            className="underline underline-offset-2 text-xs"
                          >
                            View more
                          </a>
                        )}
                    </div>
                  </div>
                  <div>
                    <Tag color={tagColor}>{tagLabel}</Tag>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
