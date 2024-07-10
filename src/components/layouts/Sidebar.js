import { Link, NavLink } from "react-router-dom";
import config from "../../config/index";
import { getDecodedToken, getRole, removeAccessToken } from "../../utils/auth";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

const decodeToken = getDecodedToken();

const handleLogout = () => {
    removeAccessToken();
};

const sidebarItem = [
    {
        label: "Dashboard",
        items: [
            {
                title: "Dashboard",
                path: config.routes.dashboard,
                icon: "far fa-chart-bar",
            },
        ],
    },
    {
        label: "Course & Lesson",
        items: [
            {
                title: "Course Online",
                path: config.routes.course_online,
                icon: "fas fa-book-reader",
            },
            {
                title: "Course Offline",
                path: config.routes.course_offline,
                icon: "fas fa-book-reader",
            },
            {
                title: "Categories",
                path: config.routes.category_list,
                icon: "fas fa-stream",
            },
        ],
    },
    {
        label: "Teacher & Tutor",
        items: [
            {
                title: "Booking",
                path: config.routes.booking_list,
                icon: "fas fa-calendar-alt",
            },
            {
                title: "Booking Waiting",
                path: config.routes.booking_waiting_list,
                icon: "fas fa-calendar-alt",
            },
            {
                title: "Tutor Registration",
                path: config.routes.tutor_registration,
                icon: "fas fa-user-edit",
            },
        ],
    },
    {
        label: "Class",
        items: [
            {
                title: "Class (Teacher)",
                path: config.routes.class_list_teacher,
                icon: "fas fa-door-open",
            },
        ],
    },
    {
        label: "Information",
        items: [
            {
                title: "Profile",
                path: config.routes.profile,
                icon: "fas fa-user-shield",
            },
        ],
    },
];

const userRole = getRole();

function Sidebar() {
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
                                    <a href="#!">
                                        <i className="ti ti-settings"></i>
                                        <span>Settings</span>
                                    </a>
                                    <a href="#!">
                                        <i className="ti ti-lock"></i>
                                        <span>Lock Screen</span>
                                    </a>
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

                        {/* <li className="pc-item pc-caption">
                            <label>Class & Room</label>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to={config.routes.class_list} className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-chalkboard-teacher"></i>
                                </span>
                                <span className="pc-mtext">Class</span>
                            </NavLink>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to={config.routes.classroom} className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-door-open"></i>
                                </span>
                                <span className="pc-mtext">Classroom</span>
                            </NavLink>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to={config.routes.device} className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-network-wired"></i>
                                </span>
                                <span className="pc-mtext">Device</span>
                            </NavLink>
                        </li>

                        <li className="pc-item pc-caption">
                            <label>Student</label>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to={config.routes.student_list} className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-user-graduate"></i>
                                </span>
                                <span className="pc-mtext">Student</span>
                            </NavLink>
                        </li>

                        <li className="pc-item pc-caption">
                            <label>Staff</label>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to={config.routes.staff_list} className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-users"></i>
                                </span>
                                <span className="pc-mtext">Staff</span>
                            </NavLink>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
