import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function AdminLayout({ children }) {

    return (

        <div className="d-flex">

            <Sidebar/>

            <main
                style={{
                    marginLeft:"250px",
                    width:"100%",
                    minHeight:"100vh",
                    background:"#f8fafc"
                }}
            >

                <Header/>

                <div className="container-fluid p-4">

                    {children}

                </div>

            </main>

        </div>

    );

}

export default AdminLayout;