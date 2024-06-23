import { Link, useParams } from "react-router-dom";
import Layout from "../../../layouts";
import useAxiosGet from "../../../../hooks/useAxiosGet";
import url from "../../../../services/url";
import { getAccessToken } from "../../../../utils/auth";
import { formatLevelCourse } from "../../../../utils/formatLevelCourse";
import Pagination from "../../../layouts/Pagination";
import { useState } from "react";

function ClassCourseList() {
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
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header text-start">
                        <div className="row">
                            <div className="col-lg-4">
                                <input className="datatable-input" placeholder="Search..." type="search" value={searchQuery} onChange={handleSearch} />
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-card">
                            <div className="py-0 px-2">
                                <div className="d-sm-flex align-items-center">
                                    <ul className="nav nav-tabs profile-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link active" id="profile-tab-1" data-bs-toggle="tab" href="!#profile-1" role="tab" aria-selected="true">
                                                <i className="fas fa-file-signature me-2"></i> Lesson
                                            </a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="profile-tab-2" data-bs-toggle="tab" href="!#profile-2" role="tab" aria-selected="false" tabIndex="-1">
                                                <i className="ti ti-file-text me-2"></i>Test Lesson
                                            </a>
                                        </li>
                                    </ul>
                                    <ul className="list-inline ms-auto mb-3">
                                        <li className="list-inline-item">
                                            {/* <Link to={`/course-online/topic-create/${courseDetail.id}`} className="btn btn-primary">
                                                Add Topic
                                            </Link> */}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="datatable-container">
                            <table className="table table-hover datatable-table" id="pc-dt-simple">
                                <thead>
                                    <tr>
                                        <th data-sortable="true" className="text-center">
                                            No.
                                        </th>
                                        <th data-sortable="true">Course Name</th>
                                        <th data-sortable="true">Level</th>
                                        <th data-sortable="true">Price</th>
                                        <th data-sortable="true">Status</th>
                                        <th data-sortable="true" className="text-center">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="orders">
                                    {currentCourse.map((course, index) => (
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
                                                        <Link to={`/class/${classId}/detail/${course.slug}`} className="avtar avtar-xs btn-link-secondary btn-pc-default">
                                                            <i className="fas fa-door-open f-18"></i>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                    ))}
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
            </div>
        </Layout>
    );
}

export default ClassCourseList;
