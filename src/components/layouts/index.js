import { Helmet } from "react-helmet";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Breadcrumb from "./Breadcrumb";
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
        </>
    );
}

export default Layout;
