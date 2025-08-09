import { Image } from "antd";
import moment from "moment";
import { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useStore } from "../store/zustand";

export default function Vehicle() {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);
  const { data } = useStore();

  const handleChange = (value) => {
    setCurrent(value);
    if (!open) {
      setOpen(true);
    }
  };

  return (
    <div className="border rounded-xl sm:p-6 p-4 grid md:grid-cols-2 gap-5 lg:gap-10">
      <div>
        <h2 className="font-semibold text-xl sm:hidden mb-4">
          Pre-purchase Car Inspection Report
        </h2>

        <div className="hero-image">
          {data?.vehicle?.featuredPhotos?.length > 0 ? (
            <>
              <div
                className="relative group cursor-pointer"
                onClick={() => handleChange(0)}
              >
                <Image
                  className="rounded-xl object-cover !h-[200px] sm:!h-[300px] w-full"
                  src={data?.vehicle?.featuredPhotos[0]}
                  onClick={() => handleChange(0)}
                  preview={false}
                  placeholder={true}
                />
                <div className={styles.mask}>
                  <MdOutlineRemoveRedEye /> <span>Preview</span>
                </div>
              </div>

              <Image.PreviewGroup
                preview={{
                  visible: open,
                  current: current,
                  onChange: (value) => setCurrent(value),
                  onVisibleChange: (visible) => setOpen(visible),
                }}
                items={data?.vehicle?.featuredPhotos}
              />
            </>
          ) : (
            <img
              src="/placeholder-car.jpg"
              className="rounded-xl object-cover h-[200px] sm:h-[300px] w-full"
            />
          )}
        </div>

        <div className="grid grid-cols-4 gap-2 mt-2 hero-additional-image">
          {data?.vehicle?.featuredPhotos?.length > 1 &&
            data?.vehicle?.featuredPhotos?.slice(1, 4).map((photo, index) => (
              <div
                key={index}
                onClick={() => handleChange(index + 1)}
                className="relative group cursor-pointer"
              >
                <Image
                  className="rounded-md object-cover w-full"
                  src={photo}
                  height={65}
                  placeholder={true}
                />
                <div className={styles.mask}>
                  <MdOutlineRemoveRedEye /> <span>Preview</span>
                </div>
              </div>
            ))}

          {data?.vehicle?.featuredPhotos?.length > 4 && (
            <button
              onClick={() => handleChange(4)}
              className="bg-text/10 border rounded-md flex items-center justify-center text-sm text-text cursor-pointer hover:bg-black/5"
            >
              + {data?.vehicle?.featuredPhotos?.length - 4} more
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-semibold max-sm:hidden text-xl sm:text-2xl">
          Pre-purchase Car Inspection Report
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-4 ">
          <div>
            <p className="text-text text-sm">Make</p>
            <p className="font-medium">
              {data?.vehicle?.make || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-text text-sm">Model</p>
            <p className="font-medium">
              {data?.vehicle?.model || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-text text-sm">Model Year</p>
            <p className="font-medium">
              {data?.vehicle?.modelYear || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-text text-sm">Rego/Vin</p>
            <p className="font-medium">
              {data?.vehicle?.vin ? data?.vehicle?.vin : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-text text-sm">Odometer</p>
            <p className="font-medium">
              {data?.vehicle?.odometer
                ? `${data?.vehicle?.odometer.toLocaleString()} km`
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-text text-sm">Inspection Date</p>
            <p className="font-medium">
              {data?.vehicle?.inspectionDate
                ? moment(data?.vehicle?.inspectionDate).format("Do MMMM, YYYY")
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-text text-sm">Transmission</p>
            <p className="font-medium">
              {data?.gearbox?.transmissionType
                ? data?.gearbox?.transmissionType
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-text text-sm">Fuel Type</p>
            <p className="font-medium">
              {data?.engine?.fuelType ? data?.engine?.fuelType : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  mask: "group-hover:opacity-100 opacity-0 transition duration-100 bg-black/50 flex items-center justify-center rounded-xl text-sm text-white absolute top-0 left-0 w-full h-full gap-1",
};
