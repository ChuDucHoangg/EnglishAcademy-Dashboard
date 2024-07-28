import { useEffect, useState } from "react";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import config from "../../../config";
import { Link } from "react-router-dom";

function GeneralStatistics() {
    const [counts, setCounts] = useState([]);

    const loadData = async () => {
        try {
            const countResponse = await api.get(url.DASHBOARD.COUNT_ALL, { headers: { Authorization: `Bearer ${getAccessToken()}` } });
            setCounts(countResponse.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const generalWidget = [
        {
            title: "Total Classes",
            count: counts.countClasses,
            dotColor: "bg-primary",
            path: config.routes.class_list,
        },
        {
            title: "Total Online Course",
            count: counts.countOnline,
            dotColor: "bg-warning",
            path: config.routes.course_online,
        },
        {
            title: "Total Offline Course",
            count: counts.countOffline,
            dotColor: "bg-success",
            path: config.routes.course_offline,
        },
        {
            title: "Total Teacher/Tutors",
            count: counts.countStaff,
            dotColor: "bg-info",
            path: "",
        },
    ];

    return (
        <div className="col-md-6">
            <div className="card h-100">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="mb-0">General statistics</h5>
                        <div className="dropdown">
                            <Link className="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="ti ti-dots-vertical f-18"></i>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-end">
                                <Link to="" className="dropdown-item">
                                    Today
                                </Link>
                                <Link to="" className="dropdown-item">
                                    Weekly
                                </Link>
                                <Link to="" className="dropdown-item">
                                    Monthly
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div id="total-income-graph"></div>
                    <div className="row g-3 mt-3">
                        {generalWidget.map((general, generalIndex) => (
                            <div className="col-sm-6" key={generalIndex}>
                                <Link to={general.path} className="text-dark">
                                    <div className="bg-body p-3 rounded">
                                        <div className="d-flex align-items-center mb-2">
                                            <div className="flex-shrink-0">
                                                <span className={`p-1 d-block ${general.dotColor} rounded-circle`}></span>
                                            </div>
                                            <div className="flex-grow-1 ms-2">
                                                <p className="mb-0">{general.title}</p>
                                            </div>
                                        </div>
                                        <h6 className="mb-0">
                                            {general.count}
                                            <small className="text-muted">
                                                <i className="ti ti-chevrons-up"></i> +$763,43
                                            </small>
                                        </h6>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <div className="card">
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
        </div> */}
        </div>
    );
}

export default GeneralStatistics;
