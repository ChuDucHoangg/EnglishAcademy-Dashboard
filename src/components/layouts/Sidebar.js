import { Link, NavLink } from "react-router-dom";
import config from "../../config/index";
import { getAccessToken, getDecodedToken, getRole, removeAccessToken } from "../../utils/auth";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { useEffect, useState } from "react";
import useAxiosGet from "../../hooks/useAxiosGet";
import url from "../../services/url";

function Sidebar() {
    const decodeToken = getDecodedToken();

    const handleLogout = () => {
        removeAccessToken();
    };

    const menuData = useAxiosGet({
        path: url.MENU.GET_ALL,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const sidebarItem = menuData.response || [];

    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const token = getDecodedToken();
        if (token) {
            const role = getRole();
            setUserRole(role);
        }
    }, []);

    return (
        <nav className="pc-sidebar">
            <div className="navbar-wrapper">
                <div className="m-header">
                    <Link to={config.routes.dashboard} className="b-brand text-primary">
                        <img src="../assets/images/logo.png" alt="" className="img-fluid" />
                    </Link>
                </div>
                <div className="navbar-content">
                    <div className="card pc-user-card">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                    <img src="../assets/images/user/avatar-2.jpg" alt="" className="user-avtar wid-45 rounded-circle" />
                                </div>
                                <div className="flex-grow-1 ms-3 me-2">
                                    <h6 className="mb-0">{decodeToken?.Fullname || "Loading..."}</h6>
                                    <small>{capitalizeFirstLetter(userRole)}</small>
                                </div>
                                <a className="btn btn-icon btn-link-secondary avtar" data-bs-toggle="collapse" href="#pc_sidebar_userlink">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-sort-outline"></use>
                                    </svg>
                                </a>
                            </div>
                            <div className="collapse pc-user-links" id="pc_sidebar_userlink">
                                <div className="pt-3">
                                    <Link to={config.routes.profile}>
                                        <i className="ti ti-user"></i>
                                        <span>My Account</span>
                                    </Link>
                                    <Link to="">
                                        <i className="ti ti-settings"></i>
                                        <span>Settings</span>
                                    </Link>
                                    <Link to="">
                                        <i className="ti ti-lock"></i>
                                        <span>Lock Screen</span>
                                    </Link>
                                    <Link to={config.routes.login} onClick={handleLogout}>
                                        <i className="ti ti-power"></i>
                                        <span>Logout</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ul className="pc-navbar">
                        {sidebarItem.map((menu, index) => (
                            <div className="menu-wrap mt-3" key={index}>
                                <li className="pc-item pc-caption">
                                    <label>{menu.label}</label>
                                </li>
                                {menu.items.map((item, index) => (
                                    <li className="pc-item pc-hasmenu" key={index}>
                                        <NavLink to={item.path} className="pc-link">
                                            <span className="pc-micon">
                                                <i className={item.icon}></i>
                                            </span>
                                            <span className="pc-mtext">{item.title}</span>
                                        </NavLink>
                                    </li>
                                ))}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
