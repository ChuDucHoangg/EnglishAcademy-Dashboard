import { Link, NavLink } from "react-router-dom";
import Layout from "../../layouts";
import { useEffect, useState } from "react";
import url from "../../../services/url";
import api from "../../../services/api";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import config from "../../../config";
import { getAccessToken } from "../../../utils/auth";

function CourseList() {
    const [courses, setCourses] = useState([]);
    const [isDeleteVisible, setDeleteVisible] = useState(false);
    const [tbodyCheckboxes, setTbodyCheckboxes] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    //show list data
    useEffect(() => {
        const loadCourses = async () => {
            try {
                const response = await api.get(url.COURSE.LIST, { headers: { Authorization: `Bearer ${getAccessToken()}` } });
                setCourses(response.data.data);
                setTbodyCheckboxes(Array.from({ length: response.data.data.length }).fill(false));
                // console.log(response.data.data);
            } catch (error) {}
        };
        loadCourses();
    }, []);

    //hanlde check all and show trash
    const handleSelectAll = () => {
        const updatedCheckboxes = !selectAll ? Array.from({ length: courses.length }).fill(true) : Array.from({ length: courses.length }).fill(false);
        setTbodyCheckboxes(updatedCheckboxes);
        setSelectAll(!selectAll);
        const checkboxes = document.querySelectorAll('#orders input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = !selectAll;
        });
        setDeleteVisible(!selectAll);
    };
    const handleCheckboxChange = () => {
        const checkboxes = document.querySelectorAll('#orders input[type="checkbox"]');
        const selectedCheckboxes = Array.from(checkboxes).filter((checkbox) => checkbox.checked);
        setDeleteVisible(selectedCheckboxes.length > 0);
    };
    const handleTbodyCheckboxChange = (index) => {
        const updatedTbodyCheckboxes = [...tbodyCheckboxes];
        updatedTbodyCheckboxes[index] = !updatedTbodyCheckboxes[index];
        setTbodyCheckboxes(updatedTbodyCheckboxes);
        const isDeleteVisible = selectAll || updatedTbodyCheckboxes.some((checkbox) => checkbox);
        setDeleteVisible(isDeleteVisible);
    };

    //hanlde delete data
    const handleDeleteData = async () => {
        const selectedDataIds = [];

        // get id of data
        courses.forEach((item, index) => {
            if (selectAll || tbodyCheckboxes[index]) {
                selectedDataIds.push(item.id);
            }
        });

        const isConfirmed = await Swal.fire({
            title: "Are you sure?",
            text: "You want to delete selected data?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I'm sure",
        });
        if (isConfirmed.isConfirmed) {
            try {
                const deleteResponse = await api.delete(url.COURSE.DELETE, {
                    data: selectedDataIds,
                });
                if (deleteResponse.status === 200) {
                    setCourses((prevDatas) => prevDatas.filter((data) => !selectedDataIds.includes(data.id)));
                    setTbodyCheckboxes((prevCheckboxes) => prevCheckboxes.filter((_, index) => !selectedDataIds.includes(courses[index].id)));
                    setDeleteVisible(false);
                    toast.success("Delete Datas Successfully.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                    // console.log("data:", deleteResponse.data);
                } else {
                }
            } catch (error) {
                toast.error("Failed to delete data!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                console.error("Failed to delete promotions:", error);
            }
        }
    };

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
                    <div className="row" style={{ marginTop: "20px" }}>
                        <div className="col-lg-5"></div>
                        <div className="col-lg-1 text-end">
                            <NavLink onClick={handleDeleteData}>
                                <button type="button" className={`btn btn-danger ${isDeleteVisible ? "" : "d-none"}`}>
                                    <i className="ti ti-trash"></i>
                                </button>
                            </NavLink>
                        </div>
                        <div className="col-lg-4 text-end">
                            <Link to={config.routes.course_online_create} className="btn btn-primary d-flex align-items-center justify-content-center">
                                <i className="ti ti-plus"></i> Add New Course Online
                            </Link>
                        </div>
                        <div className="col-lg-2">
                            <NavLink to="/course-online-delete-at">
                                <button type="button" className="btn btn-warning d-flex align-items-center justify-content-center">
                                    <i className="ti ti-trash"></i>
                                    Deleted List
                                </button>
                            </NavLink>
                        </div>
                    </div>
                    <div className="card-body table-border-style">
                        <div className="table-responsive">
                            <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                                <div className="datatable-container">
                                    <table className="table table-hover datatable-table" id="pc-dt-simple">
                                        <thead>
                                            <tr>
                                                <th data-sortable="true">
                                                    {" "}
                                                    <div className="form-check custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            onChange={() => {
                                                                handleSelectAll();
                                                                handleCheckboxChange();
                                                            }}
                                                            checked={selectAll}
                                                        />
                                                    </div>
                                                </th>
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
                                        <tbody id="orders">
                                            {currentContents.map((item, index) => {
                                                return (
                                                    <tr data-index="0" key={index}>
                                                        <td>
                                                            {" "}
                                                            <div className="form-check custom-checkbox checkbox-primary">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    onChange={() => handleTbodyCheckboxChange(index)}
                                                                    checked={tbodyCheckboxes[index]}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="row">
                                                                <div className="col-auto">
                                                                    <img src={item.image} alt="" className="rounded-circle object-fit-cover" width={40} height={40} />
                                                                </div>
                                                                <div className="col">
                                                                    <h6 className="mb-0">{item.name}</h6>
                                                                    <p className="text-muted f-12 mb-0">{item.createdBy}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>${item.price.toFixed(2)}</td>
                                                        <td>{item.language}</td>
                                                        <td>{item.trailer}</td>
                                                        <td>{item.description}</td>
                                                        <td>{item.status}</td>
                                                        <td className="text-center">
                                                            <ul className="list-inline me-auto mb-0">
                                                                <li className="list-inline-item align-bottom" data-bs-toggle="tooltip" aria-label="View" data-bs-original-title="View">
                                                                    <Link to={`/course-online/detail/${item.slug}`} className="avtar avtar-xs btn-link-secondary btn-pc-default">
                                                                        <i className="ti ti-eye f-18"></i>
                                                                    </Link>
                                                                </li>
                                                                <Link to={`/course-online/edit/${item.slug}`} className="avtar avtar-xs btn-link-success btn-pc-default">
                                                                    <i className="ti ti-edit-circle f-18"></i>
                                                                </Link>
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
                                                    <button className="page-link" onClick={handlePrevPage}>
                                                        «
                                                    </button>
                                                </li>
                                                {Array.from({ length: totalPages }).map((_, index) => (
                                                    <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                                                        <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                                            {index + 1}
                                                        </button>
                                                    </li>
                                                ))}
                                                <li className={`page-item page-indicator ${currentPage === totalPages ? "disabled" : ""}`}>
                                                    <button className="page-link" onClick={handleNextPage}>
                                                        »
                                                    </button>
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
