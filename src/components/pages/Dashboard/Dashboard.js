import { Link } from "react-router-dom";
import useCheckRole from "../../../hooks/useCheckRole";
import Layout from "../../layouts/index";
import NewsFeed from "../../views/Dashboard/NewsFeed";

function Dashboard() {
    useCheckRole();

    return (
        <Layout title="Dashboard">
            <div className="col-md-6 col-xxl-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                                <div className="avtar avtar-s bg-light-primary">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M13 9H7" stroke="#4680FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path
                                            d="M22.0002 10.9702V13.0302C22.0002 13.5802 21.5602 14.0302 21.0002 14.0502H19.0402C17.9602 14.0502 16.9702 13.2602 16.8802 12.1802C16.8202 11.5502 17.0602 10.9602 17.4802 10.5502C17.8502 10.1702 18.3602 9.9502 18.9202 9.9502H21.0002C21.5602 9.9702 22.0002 10.4202 22.0002 10.9702Z"
                                            stroke="#4680FF"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M17.48 10.55C17.06 10.96 16.82 11.55 16.88 12.18C16.97 13.26 17.96 14.05 19.04 14.05H21V15.5C21 18.5 19 20.5 16 20.5H7C4 20.5 2 18.5 2 15.5V8.5C2 5.78 3.64 3.88 6.19 3.56C6.45 3.52 6.72 3.5 7 3.5H16C16.26 3.5 16.51 3.50999 16.75 3.54999C19.33 3.84999 21 5.76 21 8.5V9.95001H18.92C18.36 9.95001 17.85 10.17 17.48 10.55Z"
                                            stroke="#4680FF"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                                <h6 className="mb-0">Total Revenue</h6>
                                <p className="f-10 m-0">Total revenue of the system</p>
                            </div>
                        </div>
                        <div className="bg-body p-3 mt-3 rounded">
                            <div className="mt-3 row align-items-center">
                                <div className="col-7">
                                    <div id="all-earnings-graph"></div>
                                </div>
                                <div className="col-5">
                                    <h5 className="mb-1">$3,020</h5>
                                    <p className="text-primary mb-0">
                                        <i className="ti ti-arrow-up-right"></i> 30.6%
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-xxl-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                                <div className="avtar avtar-s bg-light-warning">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z"
                                            stroke="#E58A00"
                                            strokeWidth="1.5"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            opacity="0.6"
                                            d="M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5"
                                            stroke="#E58A00"
                                            strokeWidth="1.5"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path opacity="0.6" d="M8 13H12" stroke="#E58A00" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path opacity="0.6" d="M8 17H16" stroke="#E58A00" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                                <h6 className="mb-0">Online Course</h6>
                                <p className="f-10 m-0">Total revenue of online courses</p>
                            </div>
                        </div>
                        <div className="bg-body p-3 mt-3 rounded">
                            <div className="mt-3 row align-items-center">
                                <div className="col-7">
                                    <div id="page-views-graph"></div>
                                </div>
                                <div className="col-5">
                                    <h5 className="mb-1">290K+</h5>
                                    <p className="text-warning mb-0">
                                        <i className="ti ti-arrow-up-right"></i> 30.6%
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-xxl-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                                <div className="avtar avtar-s bg-light-warning">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z"
                                            stroke="#E58A00"
                                            strokeWidth="1.5"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            opacity="0.6"
                                            d="M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5"
                                            stroke="#E58A00"
                                            strokeWidth="1.5"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path opacity="0.6" d="M8 13H12" stroke="#E58A00" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path opacity="0.6" d="M8 17H16" stroke="#E58A00" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                                <h6 className="mb-0">Offline Course</h6>
                                <p className="f-10 m-0">Total revenue of offline courses</p>
                            </div>
                        </div>
                        <div className="bg-body p-3 mt-3 rounded">
                            <div className="mt-3 row align-items-center">
                                <div className="col-7">
                                    <div id="download-graph"></div>
                                </div>
                                <div className="col-5">
                                    <h5 className="mb-1">2,067</h5>
                                    <p className="text-warning mb-0">
                                        <i className="ti ti-arrow-up-right"></i> 30.6%
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-xxl-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                                <div className="avtar avtar-s bg-light-success">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 2V5" stroke="#2ca87f" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M16 2V5" stroke="#2ca87f" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path opacity="0.4" d="M3.5 9.08984H20.5" stroke="#2ca87f" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path
                                            d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                                            stroke="#2ca87f"
                                            strokeWidth="1.5"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path opacity="0.4" d="M15.6947 13.7002H15.7037" stroke="#2ca87f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path opacity="0.4" d="M15.6947 16.7002H15.7037" stroke="#2ca87f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path opacity="0.4" d="M11.9955 13.7002H12.0045" stroke="#2ca87f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path opacity="0.4" d="M11.9955 16.7002H12.0045" stroke="#2ca87f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path opacity="0.4" d="M8.29431 13.7002H8.30329" stroke="#2ca87f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path opacity="0.4" d="M8.29395 16.7002H8.30293" stroke="#2ca87f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                                <h6 className="mb-0">Tutoring</h6>
                                <p className="f-10 m-0">Total revenue of tutoring</p>
                            </div>
                        </div>
                        <div className="bg-body p-3 mt-3 rounded">
                            <div className="mt-3 row align-items-center">
                                <div className="col-7">
                                    <div id="total-task-graph"></div>
                                </div>
                                <div className="col-5">
                                    <h5 className="mb-1">839</h5>
                                    <p className="text-success mb-0">
                                        <i className="ti ti-arrow-up-right"></i> New
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <h5 class="mb-0">Top 10 Outstanding Online Courses</h5>
                            <div class="dropdown">
                                <Link to="" class="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="ti ti-dots-vertical f-18"></i>
                                </Link>
                                <div class="dropdown-menu dropdown-menu-end">
                                    <Link to="" class="dropdown-item">
                                        Today
                                    </Link>
                                    <Link to="" class="dropdown-item">
                                        Weekly
                                    </Link>
                                    <Link to="" class="dropdown-item">
                                        Monthly
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item px-0">
                                <div class="d-flex align-items-center">
                                    <div class="flex-shrink-0">
                                        <div class="avtar avtar-s border">AI</div>
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <div class="row g-1">
                                            <div class="col-6">
                                                <h6 class="mb-0">Apple Inc.</h6>
                                                <p class="text-muted mb-0">
                                                    <small>#ABLE-PRO-T00232</small>
                                                </p>
                                            </div>
                                            <div class="col-6 text-end">
                                                <h6 class="mb-1">$210,000</h6>
                                                <p class="text-danger mb-0">
                                                    <i class="ti ti-arrow-down-left"></i> 10.6%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item px-0">
                                <div class="d-flex align-items-center">
                                    <div class="flex-shrink-0">
                                        <div class="avtar avtar-s border" data-bs-toggle="tooltip" data-bs-title="10,000 Tracks">
                                            <span>SM</span>
                                        </div>
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <div class="row g-1">
                                            <div class="col-6">
                                                <h6 class="mb-0">Spotify Music</h6>
                                                <p class="text-muted mb-0">
                                                    <small>#ABLE-PRO-T10232</small>
                                                </p>
                                            </div>
                                            <div class="col-6 text-end">
                                                <h6 class="mb-1">- 10,000</h6>
                                                <p class="text-success mb-0">
                                                    <i class="ti ti-arrow-up-right"></i> 30.6%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item px-0">
                                <div class="d-flex align-items-center">
                                    <div class="flex-shrink-0">
                                        <div class="avtar avtar-s border bg-light-primary" data-bs-toggle="tooltip" data-bs-title="143 Posts">
                                            <span>MD</span>
                                        </div>
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <div class="row g-1">
                                            <div class="col-6">
                                                <h6 class="mb-0">Medium</h6>
                                                <p class="text-muted mb-0">
                                                    <small>06:30 pm</small>
                                                </p>
                                            </div>
                                            <div class="col-6 text-end">
                                                <h6 class="mb-1">-26</h6>
                                                <p class="text-warning mb-0">
                                                    <i class="ti ti-arrows-left-right"></i> 5%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item px-0">
                                <div class="d-flex align-items-center">
                                    <div class="flex-shrink-0">
                                        <div class="avtar avtar-s border" data-bs-toggle="tooltip" data-bs-title="143 Posts">
                                            <span>U</span>
                                        </div>
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <div class="row g-1">
                                            <div class="col-6">
                                                <h6 class="mb-0">Uber</h6>
                                                <p class="text-muted mb-0">
                                                    <small>08:40 pm</small>
                                                </p>
                                            </div>
                                            <div class="col-6 text-end">
                                                <h6 class="mb-1">+210,000</h6>
                                                <p class="text-success mb-0">
                                                    <i class="ti ti-arrow-up-right"></i> 10.6%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item px-0">
                                <div class="d-flex align-items-center">
                                    <div class="flex-shrink-0">
                                        <div class="avtar avtar-s border bg-light-warning" data-bs-toggle="tooltip" data-bs-title="143 Posts">
                                            <span>OC</span>
                                        </div>
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <div class="row g-1">
                                            <div class="col-6">
                                                <h6 class="mb-0">Ola Cabs</h6>
                                                <p class="text-muted mb-0">
                                                    <small>07:40 pm</small>
                                                </p>
                                            </div>
                                            <div class="col-6 text-end">
                                                <h6 class="mb-1">+210,000</h6>
                                                <p class="text-success mb-0">
                                                    <i class="ti ti-arrow-up-right"></i> 10.6%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* <div className="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <h5 class="m-0">Top 10 Outstanding Teachers/Tutors</h5>
                            <div class="dropdown">
                                <Link to="" class="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="ti ti-dots-vertical f-18"></i>
                                </Link>
                                <div class="dropdown-menu dropdown-menu-end">
                                    <Link to="" class="dropdown-item">
                                        Today
                                    </Link>
                                    <Link Link to="" class="dropdown-item">
                                        Weekly
                                    </Link>
                                    <Link Link to="" class="dropdown-item">
                                        Monthly
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item px-0">
                                <div class="d-flex align-items-center">
                                    <div class="flex-shrink-0">
                                        <div class="avtar avtar-s border">AI</div>
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <div class="row g-1">
                                            <div class="col-6">
                                                <h6 class="mb-0">Apple Inc.</h6>
                                                <p class="text-muted mb-0">
                                                    <small>#ABLE-PRO-T00232</small>
                                                </p>
                                            </div>
                                            <div class="col-6 text-end">
                                                <h6 class="mb-1">$210,000</h6>
                                                <p class="text-danger mb-0">
                                                    <i class="ti ti-arrow-down-left"></i> 10.6%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item px-0">
                                <div class="d-flex align-items-center">
                                    <div class="flex-shrink-0">
                                        <div class="avtar avtar-s border" data-bs-toggle="tooltip" data-bs-title="10,000 Tracks">
                                            <span>SM</span>
                                        </div>
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <div class="row g-1">
                                            <div class="col-6">
                                                <h6 class="mb-0">Spotify Music</h6>
                                                <p class="text-muted mb-0">
                                                    <small>#ABLE-PRO-T10232</small>
                                                </p>
                                            </div>
                                            <div class="col-6 text-end">
                                                <h6 class="mb-1">- 10,000</h6>
                                                <p class="text-success mb-0">
                                                    <i class="ti ti-arrow-up-right"></i> 30.6%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item px-0">
                                <div class="d-flex align-items-center">
                                    <div class="flex-shrink-0">
                                        <div class="avtar avtar-s border bg-light-primary" data-bs-toggle="tooltip" data-bs-title="143 Posts">
                                            <span>MD</span>
                                        </div>
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <div class="row g-1">
                                            <div class="col-6">
                                                <h6 class="mb-0">Medium</h6>
                                                <p class="text-muted mb-0">
                                                    <small>06:30 pm</small>
                                                </p>
                                            </div>
                                            <div class="col-6 text-end">
                                                <h6 class="mb-1">-26</h6>
                                                <p class="text-warning mb-0">
                                                    <i class="ti ti-arrows-left-right"></i> 5%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item px-0">
                                <div class="d-flex align-items-center">
                                    <div class="flex-shrink-0">
                                        <div class="avtar avtar-s border" data-bs-toggle="tooltip" data-bs-title="143 Posts">
                                            <span>U</span>
                                        </div>
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <div class="row g-1">
                                            <div class="col-6">
                                                <h6 class="mb-0">Uber</h6>
                                                <p class="text-muted mb-0">
                                                    <small>08:40 pm</small>
                                                </p>
                                            </div>
                                            <div class="col-6 text-end">
                                                <h6 class="mb-1">+210,000</h6>
                                                <p class="text-success mb-0">
                                                    <i class="ti ti-arrow-up-right"></i> 10.6%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item px-0">
                                <div class="d-flex align-items-center">
                                    <div class="flex-shrink-0">
                                        <div class="avtar avtar-s border bg-light-warning" data-bs-toggle="tooltip" data-bs-title="143 Posts">
                                            <span>OC</span>
                                        </div>
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <div class="row g-1">
                                            <div class="col-6">
                                                <h6 class="mb-0">Ola Cabs</h6>
                                                <p class="text-muted mb-0">
                                                    <small>07:40 pm</small>
                                                </p>
                                            </div>
                                            <div class="col-6 text-end">
                                                <h6 class="mb-1">+210,000</h6>
                                                <p class="text-success mb-0">
                                                    <i class="ti ti-arrow-up-right"></i> 10.6%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> */}
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between">
                            <h5 className="mb-0">Total Income</h5>
                            <div className="dropdown">
                                <a className="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none" href="#!" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="ti ti-dots-vertical f-18"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                    <a className="dropdown-item" href="#!">
                                        Today
                                    </a>
                                    <a className="dropdown-item" href="#!">
                                        Weekly
                                    </a>
                                    <a className="dropdown-item" href="#!">
                                        Monthly
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div id="total-income-graph"></div>
                        <div className="row g-3 mt-3">
                            <div className="col-sm-6">
                                <div className="bg-body p-3 rounded">
                                    <div className="d-flex align-items-center mb-2">
                                        <div className="flex-shrink-0">
                                            <span className="p-1 d-block bg-primary rounded-circle">
                                                <span className="visually-hidden">New alerts</span>
                                            </span>
                                        </div>
                                        <div className="flex-grow-1 ms-2">
                                            <p className="mb-0">Income</p>
                                        </div>
                                    </div>
                                    <h6 className="mb-0">
                                        $23,876
                                        <small className="text-muted">
                                            <i className="ti ti-chevrons-up"></i> +$763,43
                                        </small>
                                    </h6>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="bg-body p-3 rounded">
                                    <div className="d-flex align-items-center mb-2">
                                        <div className="flex-shrink-0">
                                            <span className="p-1 d-block bg-warning rounded-circle">
                                                <span className="visually-hidden">New alerts</span>
                                            </span>
                                        </div>
                                        <div className="flex-grow-1 ms-2">
                                            <p className="mb-0">Rent</p>
                                        </div>
                                    </div>
                                    <h6 className="mb-0">
                                        $23,876
                                        <small className="text-muted">
                                            <i className="ti ti-chevrons-up"></i> +$763,43
                                        </small>
                                    </h6>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="bg-body p-3 rounded">
                                    <div className="d-flex align-items-center mb-2">
                                        <div className="flex-shrink-0">
                                            <span className="p-1 d-block bg-success rounded-circle">
                                                <span className="visually-hidden">New alerts</span>
                                            </span>
                                        </div>
                                        <div className="flex-grow-1 ms-2">
                                            <p className="mb-0">Download</p>
                                        </div>
                                    </div>
                                    <h6 className="mb-0">
                                        $23,876
                                        <small className="text-muted">
                                            <i className="ti ti-chevrons-up"></i> +$763,43
                                        </small>
                                    </h6>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="bg-body p-3 rounded">
                                    <div className="d-flex align-items-center mb-2">
                                        <div className="flex-shrink-0">
                                            <span className="p-1 d-block bg-light-primary rounded-circle">
                                                <span className="visually-hidden">New alerts</span>
                                            </span>
                                        </div>
                                        <div className="flex-grow-1 ms-2">
                                            <p className="mb-0">Views</p>
                                        </div>
                                    </div>
                                    <h6 className="mb-0">
                                        $23,876
                                        <small className="text-muted">
                                            <i className="ti ti-chevrons-up"></i> +$763,43
                                        </small>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between">
                            <h5 className="mb-0">Project overview</h5>
                            <div className="dropdown">
                                <a className="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none" href="#!" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="ti ti-dots f-18"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                    <a className="dropdown-item" href="#!">
                                        Today
                                    </a>
                                    <a className="dropdown-item" href="#!">
                                        Weekly
                                    </a>
                                    <a className="dropdown-item" href="#!">
                                        Monthly
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-6 col-xl-4">
                                <div className="mt-3 row align-items-center">
                                    <div className="col-6">
                                        <p className="text-muted mb-1">Total Tasks</p>
                                        <h5 className="mb-0">34,686</h5>
                                    </div>
                                    <div className="col-6">
                                        <div id="total-tasks-graph"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <div className="mt-3 row align-items-center">
                                    <div className="col-6">
                                        <p className="text-muted mb-1">Pending Tasks</p>
                                        <h5 className="mb-0">3,786</h5>
                                    </div>
                                    <div className="col-6">
                                        <div id="pending-tasks-graph"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <div className="mt-3 d-grid">
                                    <button className="btn btn-primary d-flex align-items-center justify-content-center">
                                        <i className="ti ti-plus"></i> Add project
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <NewsFeed />
        </Layout>
    );
}

export default Dashboard;
