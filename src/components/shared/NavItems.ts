import type { IconType } from "react-icons/lib";
import { IoGrid } from "react-icons/io5";
import { GoOrganization } from "react-icons/go";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { MdOutlineInventory2 } from "react-icons/md";
import { SlTrash } from "react-icons/sl";
import { IoCalendarClearOutline } from "react-icons/io5";
import { IoReceiptOutline } from "react-icons/io5";
import { RiGeminiLine } from "react-icons/ri";
import { IoAnalyticsSharp } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { MdOutlineContactSupport } from "react-icons/md";

interface navigation {
    label: string,
    link: string,
    id: number,
    icon: IconType,
    badge?: string,
}

 export const navlink:navigation[] = [

    {
        label: 'Dashboard',
        link: '/dashboard/overview',
        id: 0,
        icon: IoGrid,
    },
    {
        label: 'Organization',
        link: '/dashboard/organization',
        id: 1,
        icon: GoOrganization, 
    },
    {
        label: 'Menu Items',
        link: '/dashboard/menu-items',
        id: 2,
        icon: MdOutlineRestaurantMenu, 
    },
    {
        label: 'Inventory',
        link: '/dashboard/inventory',
        id: 3,
        icon: MdOutlineInventory2, 
    },
    {
        label: 'Waste Tracking',
        link: '/dashboard/waste-tracking',
        id: 4,
        icon: SlTrash, 
    },
    {
        label: 'Calendar Events',
        link: '/dashboard/calender',
        id: 5,
        icon: IoCalendarClearOutline, 
    },
    {
        label: 'Sales Records',
        link: '/dashboard/sales-record',
        id: 6,
        icon: IoReceiptOutline, 
    },
    {
        label: 'AI Forecasting',
        link: '/dashboard/forecasting',
        id: 7,
        icon: RiGeminiLine,
        badge: 'NEW',
    },
    {
        label: 'Analytics',
        link: '/dashboard/analytics',
        id: 8,
        icon: IoAnalyticsSharp, 
    },
]


export const buttomNav:navigation[] =[
    {
        label: 'Settings',
        link: '/dashboard/settings',
        id: 0,
        icon: CiSettings,
    },

    {
        label: 'Support',
        link: '/dashboard/support',
        id: 1,
        icon: MdOutlineContactSupport,
    },
]