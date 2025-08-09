import { Button } from "antd";
import { HiOutlineExternalLink } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-black px-6 sm:py-6 py-10">
      <div className="max-w-[1140px] mx-auto space-y-4 sm:space-y-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-10">
          <div className="space-y-1">
            <p className="text-white flex gap-2 items-center font-medium">
              <LuPhone /> Phone
            </p>
            <p>
              <a className="text-white/80 text-sm" href="tel:4374464142">
                437 446 4142
              </a>
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-white flex gap-2 items-center font-medium">
              <MdOutlineEmail size={18} /> Email
            </p>
            <p>
              <a
                className="text-white/80 text-sm"
                href="mailto:support@greasemonkeyinspectors.com"
              >
                support@greasemonkeyinspectors.com
              </a>
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-white flex gap-2 items-center font-medium">
              <IoLocationOutline size={18} /> Location
            </p>
            <div>
              <p className="text-white/80 text-sm">
                2482 Yonge Street #1273, Toronto, ON M4P 2H5. SERVICE AVAILABLE
                ACROSS CANADA.
              </p>
            </div>
          </div>

        </div>
        <hr className="border-text" />
        <div className="flex max-sm:flex-col sm:items-center justify-between gap-4">
          <div className="flex sm:items-center gap-3 max-sm:flex-col">
            <p className="text-sm text-white">
              © 2025 Greasemonkey Inspectors.
            </p>
            <p className="text-white text-sm">
              Developed by{" "}
              <a
                className="text-primary underline-offset-2 hover:underline"
                target="_blank"
                href="https://shahnewazrakib.com"
              >
                Shahnewaz Rakib
              </a>
            </p>
          </div>

          <Button
            target="_blank"
            href="https://greasemonkeyinspectors.ca/"
            icon={<HiOutlineExternalLink />}
          >
            Visit Website
          </Button>
        </div>
      </div>
    </footer>
  );
}
