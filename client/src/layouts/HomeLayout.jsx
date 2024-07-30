import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { authStatus } from "../firebase";
import Navbar from "../components/navbar/Navbar";

const HomeLayout = () => {
    const navigate = useNavigate();

    const auth = async () => {
        const user = await authStatus();
        if (!user) {
            navigate('/login');
        }
    }
    useEffect(() => {
        auth();
    }, [])

    return (

        <div className="dark:bg-[#101010] dark:text-[#f1f1f1] min-h-screen">
            <Navbar />
            <div className="max-w-2xl mx-auto mt-4 pb-20">
                <h1 className="text-2xl font-semibold ">MainLayout</h1>
                <Outlet />
            </div>
        </div>
    );
}

export default HomeLayout