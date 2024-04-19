import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar.jsx";
export default function MainLayout() {
    return (
        <div className='container'>
            <SideBar />
            <Outlet />
        </div>
    )
}