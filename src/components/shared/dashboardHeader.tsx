import { navlink } from "./NavItems"
import { useLocation } from "react-router"
import { PiGreaterThanLight } from "react-icons/pi"
import { useAuthStore } from "../../store/authStore";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiZap } from "react-icons/fi";
import { FaRegCircle } from "react-icons/fa";

function DashBoardHeader () {
    const location = useLocation();
    const activeSection = navlink.find((item) => item.link === location.pathname);
    const useBranchName = useAuthStore((state) => state?.user);

    // Generate user initials from the branch name
    const getInitials = (name?: string) => {
        if (!name) return "US";
        const words = name.split(" ");
        return words.length >= 2
            ? (words[0][0] + words[1][0]).toUpperCase()
            : name.slice(0, 2).toUpperCase();
    };

    return(
        <header className="font-primary border-b border-gray-200 bg-white flex items-center justify-between py-2.5 px-6">
            {/* Left section: Breadcrumb + Store + Telemetry */}
            <div className="flex flex-row items-center gap-3">
                {/* Breadcrumb */}
                <div className="flex flex-row items-center gap-2">
                    <h1 className="flex text-gray-400 text-[13px] items-center gap-1.5 whitespace-nowrap">
                        Operations
                        <PiGreaterThanLight className="text-[10px]" />
                    </h1>
                    <p className="font-semibold text-gray-800 text-[13px] whitespace-nowrap">
                        {activeSection?.label ?? "Dashboard"}
                    </p>
                </div>

                {/* Divider */}
                <div className="w-px h-5 bg-gray-300"></div>

                {/* Store selector */}
                <div className="bg-gray-50 px-3 flex items-center gap-1.5 rounded-md border border-gray-300 text-[12px] py-1.5 whitespace-nowrap">
                    <MdOutlineStoreMallDirectory size={14} className="text-emerald-700" />
                    <p className="font-semibold text-gray-700">
                        {useBranchName?.name ?? "Store"} - {useBranchName?.city_display ?? "Location"}
                    </p>
                    <PiGreaterThanLight className="text-[9px] text-gray-400 rotate-90 ml-1" />
                </div>

                {/* Telemetry badge */}
                <div className="bg-emerald-50 border border-emerald-200 flex gap-1.5 items-center text-emerald-800 text-[12px] font-medium px-3 py-1.5 rounded-full whitespace-nowrap">
                    <GoDotFill className="text-emerald-500 text-[10px]"/>
                    <p>Telemetry Active</p>
                </div>
            </div>

            {/* Right section: Icons + Quick Action + Avatar */}
            <div className="flex flex-row items-center gap-3">
                {/* Notification bell */}
                <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <IoNotificationsOutline size={18} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full border border-white"></span>
                </button>

                {/* Circle / status icon */}
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <FaRegCircle size={15} />
                </button>

                {/* Quick Action button */}
                <button className="bg-gray-800 hover:bg-gray-900 text-white text-[12px] font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap">
                    <FiZap size={14} />
                    Quick Action
                </button>

                {/* User avatar */}
                <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-[11px] font-bold text-emerald-700 cursor-pointer hover:border-emerald-400 transition-colors">
                    {getInitials(useBranchName?.name)}
                </div>
            </div>
        </header>
    )
}

export default DashBoardHeader;