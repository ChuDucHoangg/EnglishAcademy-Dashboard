import { Link, NavLink } from "react-router-dom";
import config from "../../config/index";
import { getDecodedToken, removeAccessToken } from "../../utils/auth";

const decodeToken = getDecodedToken();

const handleLogout = () => {
    removeAccessToken();
};

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
                                    <small>Administrator</small>
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
                        <li className="pc-item pc-caption">
                            <label>Dashboard</label>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to={config.routes.dashboard} className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-status-up"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Dashboard</span>
                            </NavLink>
                        </li>

                        <li className="pc-item pc-caption">
                            <label>Course & Lesson</label>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to={config.routes.course_online} className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-book-reader"></i>
                                </span>
                                <span className="pc-mtext">Course Online</span>
                            </NavLink>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to={config.routes.category_list} className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-stream"></i>
                                </span>
                                <span className="pc-mtext">Categories</span>
                            </NavLink>
                        </li>

                        <li className="pc-item pc-hasmenu">
                            <NavLink to={config.routes.lesson_online} className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-book-open"></i>
                                </span>
                                <span className="pc-mtext">Lesson</span>
                            </NavLink>
                        </li>

                        <li className="pc-item pc-caption">
                            <label>Exam & Test</label>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to={config.routes.exam_online} className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-scroll"></i>
                                </span>
                                <span className="pc-mtext">Exam</span>
                            </NavLink>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to={config.routes.test_online} className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-edit"></i>
                                </span>
                                <span className="pc-mtext">Test</span>
                            </NavLink>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to={config.routes.entrance_test} className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-inbox"></i>
                                </span>
                                <span className="pc-mtext">Entrance Test</span>
                            </NavLink>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to={config.routes.question_online} className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-info-circle"></i>
                                </span>
                                <span className="pc-mtext">Question</span>
                            </NavLink>
                        </li>

                        <li className="pc-item pc-caption">
                            <label>Timetable</label>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to={config.routes.timetable} className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-calendar-alt"></i>
                                </span>
                                <span className="pc-mtext">Timetable</span>
                            </NavLink>
                        </li>

                        <li className="pc-item pc-caption">
                            <label>Tutor</label>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to={config.routes.tutor_booking_list} className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-calendar-alt"></i>
                                </span>
                                <span className="pc-mtext">Bookings</span>
                            </NavLink>
                        </li>

                        <li className="pc-item pc-caption">
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
                        </li>

                        <li className="pc-item pc-caption">
                            <label>Information</label>
                            <svg className="pc-icon">
                                <use xlinkHref="#custom-user-square"></use>
                            </svg>
                        </li>
                        <li className="pc-item">
                            <NavLink to={config.routes.profile} className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-user-square"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Profile</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
