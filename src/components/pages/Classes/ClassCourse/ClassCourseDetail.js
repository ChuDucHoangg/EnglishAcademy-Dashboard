import { Link, useParams } from "react-router-dom";
import Layout from "../../../layouts";
import useAxiosGet from "../../../../hooks/useAxiosGet";
import url from "../../../../services/url";
import { getAccessToken } from "../../../../utils/auth";
import { useState } from "react";
import Pagination from "../../../layouts/Pagination";

function ClassCourseDetail() {
    const { classId, courseSlug } = useParams();

    const courseData = useAxiosGet({
        path: url.CLASS.COURSE_DETAIL_BY_CLASS + `/${courseSlug}`,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const courseDetail = courseData.response || {};
    const subjects = courseDetail?.subjectList || [];

    const itemsPerPagePackage = 10;
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPagePackage, setCurrentPagePackage] = useState(1);

    // Filter categories
    const filteredCategories = subjects.filter((subject) => subject.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const totalPagesPackage = Math.ceil(filteredCategories.length / itemsPerPagePackage);
    const startIndexPackage = (currentPagePackage - 1) * itemsPerPagePackage;
    const endIndexPackage = Math.min(startIndexPackage + itemsPerPagePackage, filteredCategories.length);

    const currentSubject = filteredCategories.slice(startIndexPackage, endIndexPackage);

    const handlePageChangePackage = (pageNumber) => {
        setCurrentPagePackage(pageNumber);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPagePackage(1);
    };

    return (
        <Layout title={courseDetail.name || "Loading..."}>
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
                        <div className="row">
                            {currentSubject.map((subject, index) => (
                                <div className="col-sm-4 mt-4" key={index}>
                                    <div className="card border">
                                        <div className="card-header p-3">
                                            <div className="d-flex align-items-start">
                                                <div className="flex-shrink-0">
                                                    <div className="avtar avtar-s bg-light-danger">
                                                        <i className="ti ti-book f-18"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 mx-3">
                                                    <h6 className="mb-0">{subject.name}</h6>
                                                    <p className="mb-1">No. {index + 1 < 10 ? `0${index + 1}` : index + 1}</p>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <Link to="" className="avtar avtar-s btn-link-secondary">
                                                        <i className="ti ti-bookmarks f-18"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body p-3">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <ul className="list-inline mb-0 me-2 d-flex justify-content-between">
                                                    <li className="list-inline-item">
                                                        <i className="ti ti-circles"></i> {subject.totalSlot < 10 ? `0${subject.totalSlot}` : `${subject.totalSlot}`} slot
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <i className="ti ti-cloud-upload"></i> {subject.createdBy || "N/A"}
                                                    </li>
                                                </ul>
                                                <Link to={`/class/${classId}/subject/${subject.slug}`} className="btn btn-sm btn-outline-primary">
                                                    View
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="px-3">
                        <Pagination currentPage={currentPagePackage} totalPages={totalPagesPackage} onPageChange={handlePageChangePackage} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ClassCourseDetail;
