import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function AdminLayout({ children }) {

    return (
        <div className="d-flex">

            <Sidebar />

            <div
                style={{
                    marginLeft: "250px",
                    width: "100%",
                    background: "#f8fafc",
                    minHeight: "100vh"
                }}
            >

                <Header />

                <div className="container-fluid p-4">
                    {children}
                </div>

            </div>

        </div>
    );
}

export default AdminLayout;