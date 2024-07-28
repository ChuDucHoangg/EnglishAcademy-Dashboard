import { Link } from "react-router-dom";
import Layout from "../../layouts";
import useAxiosGet from "../../../hooks/useAxiosGet";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import { formatNumber } from "../../../utils/formatNumber";
import { format } from "date-fns";
import { useState } from "react";
import Pagination from "../../layouts/Pagination";

function StudentList() {
    const studentData = useAxiosGet({
        path: url.STUDENT.LIST,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const students = studentData.response || [];

    const [searchQuery, setSearchQuery] = useState("");
    const [emailQuery, setEmailQuery] = useState("");
    const [birthdayQuery, setBirthdayQuery] = useState("");
    const itemsPerPagePackage = 10;
    const [currentPagePackage, setCurrentPagePackage] = useState(1);

    const filteredOrders = students.filter((student) => {
        const matchesStudentName = student.fullName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesEmail = student.email.toLowerCase().includes(emailQuery.toLowerCase());
        const matchesBirthday = !birthdayQuery || (student.dayOfBirth && format(new Date(student.dayOfBirth), "yyyy-MM-dd") === birthdayQuery);
        return matchesStudentName && matchesEmail && matchesBirthday;
    });

    const totalPagesPackage = Math.ceil(filteredOrders.length / itemsPerPagePackage);
    const startIndexPackage = (currentPagePackage - 1) * itemsPerPagePackage;
    const endIndexPackage = Math.min(startIndexPackage + itemsPerPagePackage, filteredOrders.length);

    const currentStudent = filteredOrders.slice(startIndexPackage, endIndexPackage);

    const handlePageChangePackage = (pageNumber) => {
        setCurrentPagePackage(pageNumber);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPagePackage(1);
    };

    const handleSearchEmail = (e) => {
        setEmailQuery(e.target.value);
        setCurrentPagePackage(1);
    };

    const handleSearchBirthday = (e) => {
        setBirthdayQuery(e.target.value);
        setCurrentPagePackage(1);
    };

    const handleResetSearchValue = () => {
        setSearchQuery("");
        setEmailQuery("");
        setBirthdayQuery("");
        setCurrentPagePackage(1);
    };

    return (
        <Layout title="Student List">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h5>Student List</h5>
                    </div>
                    <div className="card-body table-border-style">
                        <div className="table-responsive">
                            <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                                <div className="datatable-top">
                                    <div className="d-flex align-items-center gap-5">
                                        <div className="datatable-search">
                                            <input className="datatable-input" placeholder="Search by Student Name" type="search" value={searchQuery} onChange={handleSearch} />
                                        </div>

                                        <div className="datatable-search">
                                            <input className="datatable-input" placeholder="Search by Email" type="search" value={emailQuery} onChange={handleSearchEmail} />
                                        </div>

                                        <div className="datatable-search">
                                            <input className="datatable-input" type="date" value={birthdayQuery} onChange={handleSearchBirthday} />
                                        </div>
                                    </div>
                                    <div className="datatable-dropdown">
                                        <div className="d-flex align-content-center gap-3">
                                            {(searchQuery || emailQuery || birthdayQuery) && (
                                                <button type="reset" className="btn btn-warning" onClick={handleResetSearchValue}>
                                                    Reset
                                                </button>
                                            )}

                                            <Link to="/student-create" className="btn btn-primary d-flex align-items-center justify-content-center">
                                                <i className="ti ti-plus"></i> Add new Student
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="datatable-container  mt-3">
                                    <table className="table table-hover datatable-table" id="pc-dt-simple">
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Full Name</th>
                                                <th>Birthday</th>
                                                <th>Address</th>
                                                <th>Email</th>
                                                <th>Phone Number</th>
                                                <th>Gender</th>
                                                <th>Status</th>
                                                <th>Created Date</th>
                                                <th className="text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentStudent.length === 0 ? (
                                                <tr>
                                                    <td colSpan="10" className="text-center">
                                                        No data.
                                                    </td>
                                                </tr>
                                            ) : (
                                                currentStudent.map((student, studentIndex) => (
                                                    <tr key={student.id}>
                                                        <td>{formatNumber(studentIndex + 1)}</td>
                                                        <td>
                                                            <div className="row">
                                                                <div className="col-auto">
                                                                    <img src="/assets/images/user/user-placeholder.png" alt={student.fullName} className="wid-40 rounded-circle" />
                                                                </div>
                                                                <div className="col">
                                                                    <h6 className="mb-0">{student.fullName}</h6>
                                                                    <p className="text-muted f-12 mb-0">{student.code}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{student.dayOfBirth || "N/A"}</td>
                                                        <td>{student.address || "N/A"}</td>
                                                        <td>{student.email || "N/A"}</td>
                                                        <td>{student.phone || "N/A"}</td>

                                                        <td>{student.gender || "N/A"}</td>
                                                        <td>{student.status || "N/A"}</td>
                                                        <td>{(student.createdDate && format(new Date(student.createdDate), "hh:mm:ss dd-MM-yyyy")) || "N/A"}</td>
                                                        <td className="text-center">
                                                            <ul className="list-inline me-auto mb-0">
                                                                <li className="list-inline-item align-bottom" data-bs-toggle="tooltip" aria-label="View" data-bs-original-title="View">
                                                                    <Link to="" className="avtar avtar-xs btn-link-secondary btn-pc-default">
                                                                        <i className="ti ti-eye f-18"></i>
                                                                    </Link>
                                                                </li>
                                                                <li className="list-inline-item align-bottom" data-bs-toggle="tooltip" aria-label="Edit" data-bs-original-title="Edit">
                                                                    <Link to="" className="avtar avtar-xs btn-link-success btn-pc-default">
                                                                        <i className="ti ti-edit-circle f-18"></i>
                                                                    </Link>
                                                                </li>
                                                                <li className="list-inline-item align-bottom" data-bs-toggle="tooltip" aria-label="Delete" data-bs-original-title="Delete">
                                                                    <Link to="" className="avtar avtar-xs btn-link-danger btn-pc-default">
                                                                        <i className="ti ti-trash f-18"></i>
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
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

export default StudentList;
