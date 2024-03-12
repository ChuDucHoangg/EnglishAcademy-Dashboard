import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Setting from "./Setting";
import Breadcrumb from "./Breadcrumb";
import { Helmet } from "react-helmet";
function Layout({ children, title }) {
    return (
        <>
            <Helmet>
                <title>{title} | English Academy</title>
            </Helmet>
            <Sidebar />
            <Header />
            <div className="pc-container">
                <div className="pc-content">
                    <Breadcrumb title={title} />
                    <div className="row">{children}</div>
                </div>
            </div>
            <Footer />
            <Setting />
        </>
    );
}

export default Layout;
