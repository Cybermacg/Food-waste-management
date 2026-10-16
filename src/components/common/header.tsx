import Icon from "./Icon";

function Header(){
    return(
        <div className="w-full flex justify-center shadow bg-white font-family">
            <header className="w-full justify-between items-center p-2 mt-4 flex px-5 max-w-7xl">
                <div className="flex items-center flex-row gap-2">
                    <Icon/>
                    <h1 className="font-bold">FoodWaste Manager</h1>
                    <p className="text-[10px] text-[#2E7D32] mt-1 font-bold uppercase">Enterprise QSR</p>
                </div>

                <div>
                    <div className="p-5 py-1 mb-1 w-40 rounded-2xl bg-[#E2E8F0]">
                        <div className="flex flex-row gap-2 items-center">
                            <div className="w-2 h-2 bg-[#34D399] rounded-full"></div>
                            <p className="text-[10px] text-[#64748B]">Systems Operational</p>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}
export default Header;