import { Avatar } from "antd";
import { useStore } from "../store/zustand";

export default function InspectorComment() {
  const { data } = useStore();
  return (
    <div className="rounded-xl border">
      <div className="bg-muted rounded-t-xl px-4 sm:px-6 py-4 border-b">
        <h4 className="font-semibold text-lg text-center">Inspector Comment</h4>
      </div>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="text-sm text-center leading-relaxed">
          {data?.inspectorComment}
        </div>
        <div className="flex items-center gap-2 justify-center">
          {data?.assignedTo?.profilePhoto ? (
            <Avatar
              size={40}
              src={data?.assignedTo?.profilePhoto}
              width={50}
            />
          ) : (
            <img src="/inspector.png" width={50} />
          )}
          <div className="text-sm">
            <p>{data?.assignedTo?.name}</p>
            <p className=" text-text">Inspector,  Grasemonkey Inspectors</p>
          </div>
        </div>
      </div>
    </div>
  );
}
