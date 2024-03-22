import { Link } from "react-router-dom";
import Layout from "../../layouts";
import { useEffect, useState } from "react";
import url from "../../../services/url";
import api from "../../../services/api";
import { format } from "date-fns";

function CourseList() {
    const [error, setError] = useState(null);
    const [courses, setCourses] = useState([]);

    //show list course online
    useEffect(() => {
        const loadCourses = async () => {
            try {
                const response = await api.get(url.COURSE.LIST);
                setCourses(response.data.data);
                console.log(response.data.data);
            } catch (error) {}
        };
        loadCourses();
    }, []);

    //search, filter
    const [searchName, setSearchName] = useState("");
    const [searchDescription, setSearchDescription] = useState("");
    const [createdDate, setCreatedDate] = useState("");
    const handleSearchNameChange = (e) => {
        setSearchName(e.target.value);
    };
    const handleSearchDescriptionChange = (e) => {
        setSearchDescription(e.target.value);
    };
    const handleCreatedDateChange = (e) => {
        setCreatedDate(e.target.value);
    };
    const filteredCourses = courses.filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(searchName.toLowerCase());
        const descriptionMatch = item.description.toLowerCase().includes(searchDescription.toLowerCase());
        const createdDateMatch = createdDate ? new Date(item.createdDate) >= new Date(createdDate) : true;
        return nameMatch && descriptionMatch && createdDateMatch;
    });

    //paginate
    const [currentPage, setCurrentPage] = useState(1);
    const contentsPerPage = 10;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
    const totalPages = Math.ceil(courses.length / contentsPerPage);
    const indexOfLastContent = currentPage * contentsPerPage;
    const indexOfFirstContent = indexOfLastContent - contentsPerPage;
    const currentContents = filteredCourses.slice(indexOfFirstContent, indexOfLastContent);
    return (
        <Layout title="Course Online List">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <div className="row page-titles">
                            <div className="col-lg-4">
                                <input type="text" className="form-control input-rounded" placeholder="Search name course . . ." value={searchName} onChange={handleSearchNameChange} />
                            </div>
                            <div className="col-lg-4">
                                <input
                                    type="text"
                                    className="form-control input-rounded"
                                    placeholder="Search description course . . ."
                                    value={searchDescription}
                                    onChange={handleSearchDescriptionChange}
                                />
                            </div>
                            <div className="col-lg-4">
                                <input type="datetime-local" className="form-control input-rounded" value={createdDate} onChange={handleCreatedDateChange} />
                            </div>
                        </div>
                    </div>
                    <div className="card-body table-border-style">
                        <div className="table-responsive">
                            <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                                <div className="datatable-top">
                                    <div className="datatable-dropdown">
                                        <Link to="/course-online-create" className="btn btn-primary d-flex align-items-center justify-content-center">
                                            <i className="ti ti-plus"></i> Add New Course Online
                                        </Link>
                                    </div>
                                </div>
                                <div className="datatable-container">
                                    <table className="table table-hover datatable-table" id="pc-dt-simple">
                                        <thead>
                                            <tr>
                                                <th data-sortable="true">No.</th>
                                                <th data-sortable="true">Course Name</th>
                                                <th data-sortable="true">Price</th>
                                                <th data-sortable="true">Language</th>
                                                <th data-sortable="true">Trailer</th>
                                                <th data-sortable="true">Description</th>
                                                <th data-sortable="true">Status</th>
                                                <th data-sortable="true" className="text-center">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentContents.map((item, index) => {
                                                return (
                                                    <tr data-index="0">
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <div className="row">
                                                                <div className="col-auto">
                                                                    <img src={item.image} alt="" className="wid-40 rounded-circle" />
                                                                </div>
                                                                <div className="col">
                                                                    <h6 className="mb-0">{item.name}</h6>
                                                                    <p className="text-muted f-12 mb-0">{item.createdBy}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{item.price}$</td>
                                                        <td>{item.language}</td>
                                                        <td>{item.trailer}</td>
                                                        <td>{item.description}</td>
                                                        <td>{item.status}</td>
                                                        <td className="text-center">
                                                            <ul className="list-inline me-auto mb-0">
                                                                <li className="list-inline-item align-bottom" data-bs-toggle="tooltip" aria-label="View" data-bs-original-title="View">
                                                                    <a href="#!" className="avtar avtar-xs btn-link-secondary btn-pc-default">
                                                                        <i className="ti ti-eye f-18"></i>
                                                                    </a>
                                                                </li>
                                                                <Link to="/staff-edit" className="avtar avtar-xs btn-link-success btn-pc-default">
                                                                    <i className="ti ti-edit-circle f-18"></i>
                                                                </Link>
                                                                <li className="list-inline-item align-bottom" data-bs-toggle="tooltip" aria-label="Delete" data-bs-original-title="Delete">
                                                                    <a href="#!" className="avtar avtar-xs btn-link-danger btn-pc-default">
                                                                        <i className="ti ti-trash f-18"></i>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3">
                                        <nav>
                                            <ul className="pagination pagination-gutter pagination-primary no-bg">
                                                <li className={`page-item page-indicator ${currentPage === 1 ? "disabled" : ""}`}>
                                                    <a className="page-link" href="javascript:void(0)" onClick={handlePrevPage}>
                                                        «
                                                    </a>
                                                </li>
                                                {Array.from({ length: totalPages }).map((_, index) => (
                                                    <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                                                        <a className="page-link" href="javascript:void(0)" onClick={() => handlePageChange(index + 1)}>
                                                            {index + 1}
                                                        </a>
                                                    </li>
                                                ))}
                                                <li className={`page-item page-indicator ${currentPage === totalPages ? "disabled" : ""}`}>
                                                    <a className="page-link" href="javascript:void(0)" onClick={handleNextPage}>
                                                        »
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CourseList;
