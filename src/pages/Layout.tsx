import { Outlet } from "react-router";
import SideBar from "../components/shared/sidebar";
import DashBoardHeader from "../components/shared/dashboardHeader";

function Layout (){
    return(
        <section className="flex flex-row">
            <SideBar/>
            <main className="w-full">
                <DashBoardHeader/>
                <div className="w-full p-5">
                     <Outlet/>
                     {       }
                </div>
            </main>
        </section>
    )
}

export default Layout;