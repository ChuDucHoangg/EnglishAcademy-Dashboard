import { Link, useParams } from "react-router-dom";
import Layout from "../../../layouts";
import useAxiosGet from "../../../../hooks/useAxiosGet";
import url from "../../../../services/url";
import { getAccessToken } from "../../../../utils/auth";
import { formatLevelCourse } from "../../../../utils/formatLevelCourse";
import Pagination from "../../../layouts/Pagination";
import { useState } from "react";

function ClassCourseListTeacher() {
    const { classId } = useParams();

    const courseData = useAxiosGet({
        path: url.CLASS.COURSE_BY_CLASS + `/${classId}`,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const courses = courseData.response || [];

    const [searchQuery, setSearchQuery] = useState("");

    const itemsPerPagePackage = 10;
    const [currentPagePackage, setCurrentPagePackage] = useState(1);

    // Filter categories
    const filteredCategories = courses.filter((category) => category.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const totalPagesPackage = Math.ceil(filteredCategories.length / itemsPerPagePackage);
    const startIndexPackage = (currentPagePackage - 1) * itemsPerPagePackage;
    const endIndexPackage = Math.min(startIndexPackage + itemsPerPagePackage, filteredCategories.length);

    const currentCourse = filteredCategories.slice(startIndexPackage, endIndexPackage);

    const handlePageChangePackage = (pageNumber) => {
        setCurrentPagePackage(pageNumber);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPagePackage(1);
    };

    return (
        <Layout title="Course List">
            <div className="card">
                <div className="card-header text-start">
                    <div className="row">
                        <div className="col-lg-3">
                            <input className="datatable-input" placeholder="Search..." type="search" value={searchQuery} onChange={handleSearch} />
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="datatable-container">
                        <table className="table table-hover datatable-table" id="pc-dt-simple">
                            <thead>
                                <tr>
                                    <th className="text-center">No.</th>
                                    <th>Course Name</th>
                                    <th>Level</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="orders">
                                {currentCourse.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            No data.
                                        </td>
                                    </tr>
                                ) : (
                                    currentCourse.map((course, index) => (
                                        <tr data-index="0" key={index}>
                                            <td className="text-center">{index + 1}</td>
                                            <td>
                                                <div className="row">
                                                    <div className="col-auto pe-0">
                                                        <img src={course.image} alt="" className="wid-40 rounded" />
                                                    </div>
                                                    <div className="col">
                                                        <h6 className="mb-1">{course.name}</h6>
                                                        <p className="text-muted f-12 mb-0">{formatLevelCourse(course.level)}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{course.language}</td>
                                            <td>${course.price.toFixed(2)}</td>
                                            <td>
                                                <span className="badge bg-light-success f-12">{course.status}</span>
                                            </td>
                                            <td className="text-center">
                                                <ul className="list-inline me-auto mb-0">
                                                    <li className="list-inline-item align-bottom" data-bs-toggle="tooltip" title="View">
                                                        <Link to={`/teacher/class/${classId}/detail/${course.slug}`} className="avtar avtar-xs btn-link-secondary btn-pc-default">
                                                            <i className="fas fa-door-open f-18"></i>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        <div className="row">
                            <div className="col-lg-3">
                                <Pagination currentPage={currentPagePackage} totalPages={totalPagesPackage} onPageChange={handlePageChangePackage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ClassCourseListTeacher;
