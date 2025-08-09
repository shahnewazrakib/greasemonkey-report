import { useStore } from "../store/zustand";
import { LuShield } from "react-icons/lu";
import { MdAttachMoney } from "react-icons/md";
import { IoMdSpeedometer } from "react-icons/io";
import { PiEngine } from "react-icons/pi";
import { IoClipboardOutline } from "react-icons/io5";
import { Image, Popover, Tag } from "antd";
import { FaCarBurst } from "react-icons/fa6";
import { FiInfo } from "react-icons/fi";

export default function HistoryDetail() {
  const { data } = useStore();

  const HISTORY_CHECKS = [
    {
      key: "writtenOff",
      label: "Written Off",
      icon: <FaCarBurst size={22} />,
      yesMessage: "Written-off incidents reported",
      noMessage: "Not recorded as written-off",
      unknownMessage: "Insufficient records available",
    },
    {
      key: "stolenStatus",
      label: "Stolen Status",
      icon: <LuShield size={20} />,
      yesMessage: "Listed as stolen",
      noMessage: "No record as stolen",
      unknownMessage: "Insufficient records available",
    },
    {
      key: "financeCheck",
      label: "Finance Check",
      icon: <MdAttachMoney size={22} />,
      yesMessage: "Financial interests reported",
      noMessage: "No security interests reported",
      unknownMessage: "Insufficient records available",
    },
    {
      key: "odometerCheck",
      label: "Odometer Check",
      icon: <IoMdSpeedometer size={20} />,
      yesMessage: "Odometer inconsistency suspected",
      noMessage: "No odometer rollback suspected",
      unknownMessage: "Insufficient records available",
    },
    {
      key: "engineFaultCodes",
      label: "Engine/Transmission Fault Codes",
      icon: <PiEngine size={20} />,
      yesMessage: "Fault codes detected",
      noMessage: "No fault codes detected",
      unknownMessage: "Insufficient records available",
    },
    {
      key: "serviceCheck",
      label: "Service Check",
      icon: <IoClipboardOutline size={18} />,
      yesMessage: "Service records available",
      noMessage: "No service records available",
      unknownMessage: "Insufficient records available",
    },
  ];

  // Filter history checks to only show items with comments or photos
  const filteredHistoryChecks = HISTORY_CHECKS.filter((check) => {
    const historyData = data?.history?.[check.key];
    return (
      historyData?.status === "yes" &&
      (historyData?.comment || historyData.photos.length > 0)
    );
  });

  return filteredHistoryChecks.length === 0 ? null : (
    <div className="border rounded-xl">
      <div className="bg-muted rounded-t-xl px-4 sm:px-6 py-4 border-b flex items-center gap-2">
        <h4 className="font-semibold text-lg">Vehicle History Details</h4>
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

      <div className="p-3 sm:p-6 grid md:grid-cols-2 gap-3">
        {filteredHistoryChecks?.map((check, index) => {
          const hisotryData = data.history?.[check.key];
          const isServiceCheck = check.key === "serviceCheck";

          // Determine tag color with reversed logic for serviceCheck
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
              id={check.key}
              className="border rounded-xl p-4 space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div>{check.icon}</div>
                  <h6 className="max-sm:text-sm font-medium">{check.label}</h6>
                </div>

                <Tag color={tagColor}>{tagLabel}</Tag>
              </div>

              <div>
                <h6 className="text-sm">Status:</h6>
                <p className="text-sm text-text">
                  {hisotryData?.status === "yes"
                    ? check.yesMessage
                    : hisotryData?.status === "no"
                    ? check.noMessage
                    : check.unknownMessage}
                </p>
              </div>

              {hisotryData?.comment && (
                <div>
                  <h6 className="text-sm">Description:</h6>
                  <p className="text-sm text-text">{hisotryData?.comment}</p>
                </div>
              )}

              {hisotryData?.photos?.length > 0 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  <Image.PreviewGroup items={hisotryData?.photos}>
                    {hisotryData?.photos.map((photo, index) => (
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
          );
        })}
      </div>
    </div>
  );
}
