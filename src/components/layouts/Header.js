import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../../config";
import { getDecodedToken, removeAccessToken } from "../../utils/auth";

function Header() {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [closeSidebar, setCloseSidebar] = useState(false);

    useEffect(() => {
        const body = document.querySelector("body");
        const menu = document.querySelector("nav");

        body.setAttribute("data-pc-theme", isDarkTheme ? "dark" : "light");

        if (closeSidebar) {
            menu.classList.add("pc-sidebar-hide");
        } else {
            menu.classList.remove("pc-sidebar-hide");
        }
    }, [isDarkTheme, closeSidebar]);

    const toggleTheme = () => {
        setIsDarkTheme((prevTheme) => !prevTheme);
    };

    const toggleMenu = () => {
        setCloseSidebar((prevMenu) => !prevMenu);
    };

    const decodeToken = getDecodedToken();
    let fullName = "";
    let email = "";

    if (decodeToken && decodeToken.Fullname && decodeToken.Email) {
        fullName = decodeToken.Fullname;
        email = decodeToken.Email;
    }

    const handleLogout = () => {
        removeAccessToken();
    };

    return (
        <header className="pc-header">
            <div className="header-wrapper">
                <div className="me-auto pc-mob-drp">
                    <ul className="list-unstyled">
                        <li className="pc-h-item pc-sidebar-collapse">
                            <button onClick={toggleMenu} className="btn-cs pc-head-link ms-0">
                                <i className="ti ti-menu-2"></i>
                            </button>
                        </li>
                        <li className="pc-h-item pc-sidebar-popup">
                            <button onClick={toggleMenu} className="btn-cs pc-head-link ms-0">
                                <i className="ti ti-menu-2"></i>
                            </button>
                        </li>
                        <li className="dropdown pc-h-item">
                            <a className="pc-head-link dropdown-toggle arrow-none m-0 trig-drp-search" data-bs-toggle="dropdown" href="#!" role="button" aria-haspopup="false" aria-expanded="false">
                                <svg className="pc-icon">
                                    <use xlinkHref="#custom-search-normal-1"></use>
                                </svg>
                            </a>
                            <div className="dropdown-menu pc-h-dropdown drp-search">
                                <form className="px-3 py-2">
                                    <input type="search" className="form-control border-0 shadow-none" placeholder="Search here. . ." />
                                </form>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="ms-auto">
                    <ul className="list-unstyled">
                        <li className="dropdown pc-h-item">
                            <button className="pc-head-link dropdown-toggle arrow-none me-0 btn-cs" onClick={toggleTheme}>
                                <svg className="pc-icon">
                                    <use xlinkHref={isDarkTheme ? "#custom-sun-1" : "#custom-moon"}></use>
                                </svg>
                            </button>
                        </li>
                        <li className="dropdown pc-h-item">
                            <a className="pc-head-link dropdown-toggle arrow-none me-0" data-bs-toggle="dropdown" href="#!" role="button" aria-haspopup="false" aria-expanded="false">
                                <svg className="pc-icon">
                                    <use xlinkHref="#custom-setting-2"></use>
                                </svg>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end pc-h-dropdown">
                                <Link to="/profile" className="dropdown-item">
                                    <i className="ti ti-user"></i>
                                    <span>My Account</span>
                                </Link>
                                <a href="#!" className="dropdown-item">
                                    <i className="ti ti-settings"></i>
                                    <span>Settings</span>
                                </a>
                                <a href="#!" className="dropdown-item">
                                    <i className="ti ti-headset"></i>
                                    <span>Support</span>
                                </a>
                                <a href="#!" className="dropdown-item">
                                    <i className="ti ti-lock"></i>
                                    <span>Lock Screen aaa</span>
                                </a>
                                <Link to={config.routes.login} onClick={handleLogout} className="dropdown-item">
                                    <i className="ti ti-power"></i>
                                    <span>Logout</span>
                                </Link>
                            </div>
                        </li>
                        <li className="pc-h-item">
                            <a href="#!" className="pc-head-link me-0" data-bs-toggle="offcanvas" data-bs-target="#announcement" aria-controls="announcement">
                                <svg className="pc-icon">
                                    <use xlinkHref="#custom-flash"></use>
                                </svg>
                            </a>
                        </li>
                        <li className="dropdown pc-h-item">
                            <a className="pc-head-link dropdown-toggle arrow-none me-0" data-bs-toggle="dropdown" href="#!" role="button" aria-haspopup="false" aria-expanded="false">
                                <svg className="pc-icon">
                                    <use xlinkHref="#custom-notification"></use>
                                </svg>
                                <span className="badge bg-success pc-h-badge">2</span>
                            </a>
                            <div className="dropdown-menu dropdown-notification dropdown-menu-end pc-h-dropdown">
                                <div className="dropdown-header d-flex align-items-center justify-content-between">
                                    <h5 className="m-0">Notifications</h5>
                                    <a href="#!" className="btn btn-link btn-sm">
                                        Mark all read
                                    </a>
                                </div>
                                <div className="dropdown-body text-wrap header-notification-scroll position-relative" style={{ maxHeight: "calc(100vh - 215px)" }}>
                                    <p className="text-span">Today</p>
                                    <div className="card mb-2">
                                        <div className="card-body">
                                            <div className="d-flex">
                                                <div className="flex-shrink-0">
                                                    <svg className="pc-icon text-primary">
                                                        <use xlinkHref="#custom-layer"></use>
                                                    </svg>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <span className="float-end text-sm text-muted">2 min ago</span>
                                                    <h5 className="text-body mb-2">UI/UX Design</h5>
                                                    <p className="mb-0">
                                                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                                                        make a type
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-2">
                                        <div className="card-body">
                                            <div className="d-flex">
                                                <div className="flex-shrink-0">
                                                    <svg className="pc-icon text-primary">
                                                        <use xlinkHref="#custom-sms"></use>
                                                    </svg>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <span className="float-end text-sm text-muted">1 hour ago</span>
                                                    <h5 className="text-body mb-2">Message</h5>
                                                    <p className="mb-0">Lorem Ipsum has been the industry's standard dummy text ever since the 1500.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center py-2">
                                    <a href="#!" className="link-danger">
                                        Clear all Notifications
                                    </a>
                                </div>
                            </div>
                        </li>
                        <li className="dropdown pc-h-item header-user-profile">
                            <a
                                className="pc-head-link dropdown-toggle arrow-none me-0"
                                data-bs-toggle="dropdown"
                                href="#!"
                                role="button"
                                aria-haspopup="false"
                                data-bs-auto-close="outside"
                                aria-expanded="false"
                            >
                                <img src="../assets/images/user/avatar-2.jpg" alt="" className="user-avtar" />
                            </a>
                            <div className="dropdown-menu dropdown-user-profile dropdown-menu-end pc-h-dropdown">
                                <div className="dropdown-header d-flex align-items-center justify-content-between">
                                    <h5 className="m-0">Profile</h5>
                                </div>
                                <div className="dropdown-body">
                                    <div className="profile-notification-scroll position-relative" style={{ maxHeight: "calc(100vh - 225px)" }}>
                                        <div className="d-flex mb-1">
                                            <div className="flex-shrink-0">
                                                <img src="../assets/images/user/avatar-2.jpg" alt="" className="user-avtar wid-35" />
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h6 className="mb-1">{fullName} 🖖</h6>
                                                <span>{email}</span>
                                            </div>
                                        </div>
                                        <hr className="border-secondary border-opacity-50" />
                                        <div className="card">
                                            <div className="card-body py-3">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h5 className="mb-0 d-inline-flex align-items-center">
                                                        <svg className="pc-icon text-muted me-2">
                                                            <use xlinkHref="#custom-notification-outline"></use>
                                                        </svg>
                                                        Notification
                                                    </h5>
                                                    <div className="form-check form-switch form-check-reverse m-0">
                                                        <input className="form-check-input f-18" type="checkbox" role="switch" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-span">Manage</p>
                                        <a href="#!" className="dropdown-item">
                                            <span>
                                                <svg className="pc-icon text-muted me-2">
                                                    <use xlinkHref="#custom-setting-outline"></use>
                                                </svg>
                                                <span>Settings</span>
                                            </span>
                                        </a>
                                        <a href="#!" className="dropdown-item">
                                            <span>
                                                <svg className="pc-icon text-muted me-2">
                                                    <use xlinkHref="#custom-share-bold"></use>
                                                </svg>
                                                <span>Share</span>
                                            </span>
                                        </a>
                                        {/* <Link to={config.routes.c} className="dropdown-item">
                                            <span>
                                                <svg className="pc-icon text-muted me-2">
                                                    <use xlinkHref="#custom-lock-outline"></use>
                                                </svg>
                                                <span>Change Password</span>
                                            </span>
                                        </Link>
                                        <hr className="border-secondary border-opacity-50" /> */}

                                        <div className="d-grid mb-3">
                                            <button className="btn btn-primary" onClick={handleLogout}>
                                                <svg className="pc-icon me-2">
                                                    <use xlinkHref="#custom-logout-1-outline"></use>
                                                </svg>
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
