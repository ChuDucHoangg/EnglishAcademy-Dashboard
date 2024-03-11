import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Setting from "./Setting";
import Breadcrumb from "./Breadcrumb";
function Layout({ children }) {
    return (
        <>
            <Sidebar />
            <Header />
            <div className="pc-container">
                <div className="pc-content">
                    <Breadcrumb title="Dashboard" />
                    <div className="row">{children}</div>
                </div>
            </div>
            <Footer />
            <Setting />
        </>
    );
}

export default Layout;
