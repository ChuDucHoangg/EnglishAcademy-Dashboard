import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import { formatLevelCourse } from "../../../utils/formatLevelCourse";

function Top10Tutor() {
    const [tutors, setTutors] = useState([]);

    const loadData = async () => {
        try {
            const tutorResponse = await api.get(url.DASHBOARD.TOP_10_TUTOR, { headers: { Authorization: `Bearer ${getAccessToken()}` } });
            setTutors(tutorResponse.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="col-md-6">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h5 className="m-0">Top 10 Outstanding Teachers/Tutors</h5>
                        <div className="dropdown">
                            <Link to="" className="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="ti ti-dots-vertical f-18"></i>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-end">
                                <Link to="" className="dropdown-item">
                                    Today
                                </Link>
                                <Link Link to="" className="dropdown-item">
                                    Weekly
                                </Link>
                                <Link Link to="" className="dropdown-item">
                                    Monthly
                                </Link>
                            </div>
                        </div>
                    </div>
                    <ul className="list-group list-group-flush">
                        {tutors.map((tutor) => (
                            <li className="list-group-item px-0" key={tutor.id}>
                                <Link to={``}>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <img className="avtar avtar-s object-fit-cover border" src={tutor.avatar} alt={tutor.fullname} />
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <div className="row g-1">
                                                <div className="col-6">
                                                    <h6 className="mb-0">{tutor.fullname}</h6>
                                                    <p className="text-muted mb-0">
                                                        <small>{formatLevelCourse(tutor.level)}</small>
                                                    </p>
                                                </div>
                                                <div className="col-6 text-end">
                                                    <h6 className="mb-1">Hourly Rate{tutor.hourlyRate}h</h6>
                                                    <p className="text-success mb-0">Revenue: ${tutor.totalRevenue.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Top10Tutor;
