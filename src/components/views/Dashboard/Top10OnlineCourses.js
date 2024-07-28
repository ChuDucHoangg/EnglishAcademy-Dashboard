import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";

function Top10OnlineCourses() {
    const [courses, setCourses] = useState([]);

    const loadData = async () => {
        try {
            const courseResponse = await api.get(url.DASHBOARD.TOP_10_COURSE_ONLINE, { headers: { Authorization: `Bearer ${getAccessToken()}` } });
            setCourses(courseResponse.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="col-md-6">
            <div className="card h-100">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h5 className="mb-0">Top 10 Outstanding Online Courses</h5>
                        <div className="dropdown">
                            <Link to="" className="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                    <ul className="list-group list-group-flush">
                        {courses.map((course) => (
                            <li className="list-group-item px-0" key={course.courseId}>
                                <Link to={`/course-online/detail/${course.courseSlug}`}>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <img className="avtar avtar-s object-fit-cover border" src={course.image} alt={course.courseName} />
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <div className="row g-1">
                                                <div className="col-6">
                                                    <h6 className="mb-0">{course.courseName}</h6>
                                                    <p className="text-muted mb-0">
                                                        <small>
                                                            <i className="fas fa-star text-warning"></i>
                                                            {course.star}
                                                        </small>
                                                    </p>
                                                </div>
                                                <div className="col-6 text-end">
                                                    <h6 className="mb-1">${course.price.toFixed(2)}</h6>
                                                    <p className="text-primary mb-0">Revenue: ${course.totalRevenue.toFixed(2)}</p>
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

export default Top10OnlineCourses;
