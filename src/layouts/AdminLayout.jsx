import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function AdminLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="d-flex">

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div
                className="main-content"
                style={{
                    flex: 1,
                    minHeight: "100vh",
                    background: "#f8fafc"
                }}
            >

                <Header
                    setSidebarOpen={setSidebarOpen}
                />

                <div className="container-fluid p-3 p-md-4">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default AdminLayout;