import Icon from "../common/Icon";
import { NavLink } from "react-router";
import { IoMdAdd } from "react-icons/io";
import { buttomNav, navlink } from "./NavItems";
import { useAuthStore } from "../../store/authStore";
import { FiLogOut } from "react-icons/fi";

function SideBar() {
    const useBranchName = useAuthStore((state) => state?.user);

    // Generate user initials
    const getInitials = (name?: string) => {
        if (!name) return "US";
        const words = name.split(" ");
        return words.length >= 2
            ? (words[0][0] + words[1][0]).toUpperCase()
            : name.slice(0, 2).toUpperCase();
    };

    return (
        <div className="border-r border-gray-200 bg-white h-screen font-family flex flex-col justify-between w-[260px] min-w-[260px]">
            {/* Top Section */}
            <div className="px-5 pt-5 space-y-5">
                {/* Logo */}
                <div className="flex flex-row items-center gap-3">
                    <Icon />
                    <div>
                        <h1 className="font-bold text-[15px] text-gray-800 leading-tight">FoodWaste Manager</h1>
                        <p className="text-gray-400 text-[12px] font-medium">Enterprise QSR</p>
                    </div>
                </div>

                {/* CTA Button */}
                <button className="bg-emerald-600 hover:bg-emerald-700 w-full flex justify-center items-center gap-2.5 text-white rounded-lg py-2.5 font-semibold text-[13px] transition-colors shadow-sm">
                    <IoMdAdd size={18} />
                    Log Waste Entry
                </button>

                {/* Main Navigation */}
                <nav className="space-y-0.5">
                    {navlink.map((link) => {
                        const LinkIcon = link.icon;
                        return (
                            <NavLink
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                                        isActive
                                            ? 'bg-emerald-50 text-emerald-700'
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                    }`
                                }
                                to={link.link}
                                key={link.id}
                            >
                                <LinkIcon size={17} />
                                <span className="flex-1">{link.label}</span>
                                {link.badge && (
                                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide">
                                        {link.badge}
                                    </span>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Section */}
            <div className="px-5 pb-5 space-y-1">
                {/* Bottom Nav Links */}
                <div className="border-t border-gray-100 pt-3 space-y-0.5">
                    {buttomNav.map((item) => {
                        const ItemIcon = item.icon;
                        return (
                            <NavLink
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                                        isActive
                                            ? 'bg-emerald-50 text-emerald-700'
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                    }`
                                }
                                to={item.link}
                                key={item.id}
                            >
                                <ItemIcon size={17} />
                                {item.label}
                            </NavLink>
                        );
                    })}
                </div>

                {/* User Profile */}
                <div className="border-t border-gray-100 pt-3 mt-2">
                    <div className="flex items-center gap-3 px-2">
                        {/* Avatar */}
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-[12px] font-bold text-white shadow-sm flex-shrink-0">
                            {getInitials(useBranchName?.name)}
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-semibold text-gray-800 truncate">
                                {useBranchName?.name ?? "User"}
                            </p>
                            <p className="text-[11px] text-gray-400 truncate">
                                {useBranchName?.city_display ?? "General Manager"}
                            </p>
                        </div>
                        {/* Logout */}
                        <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors" title="Logout">
                            <FiLogOut size={15} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;