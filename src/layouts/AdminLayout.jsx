import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function AdminLayout({ children }) {
    return (
        <div className="d-flex">

            <Sidebar />

            <div
                style={{
                    marginLeft: "250px",
                    width: "calc(100% - 250px)",
                    minHeight: "100vh",
                    background: "#f8fafc"
                }}
            >
                <Header />

                <div
                    style={{
                        padding: "30px"
                    }}
                >
                    {children}
                </div>

            </div>

        </div>
    );
}

export default AdminLayout;