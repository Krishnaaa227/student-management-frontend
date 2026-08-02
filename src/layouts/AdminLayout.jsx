import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/AdminLayout.css";
function AdminLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="d-flex">

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="main-content">

                <Header
                    setSidebarOpen={setSidebarOpen}
                />

                <div className="p-4">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default AdminLayout;