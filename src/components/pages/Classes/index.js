import { useState } from "react";
import useAxiosGet from "../../../hooks/useAxiosGet";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import Layout from "../../layouts";
import Pagination from "../../layouts/Pagination";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import config from "../../../config";

function Classes() {
    const classData = useAxiosGet({
        path: url.CLASS.LIST_BY_ADMIN,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const classes = classData.response || [];

    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPagePackage = 10;
    const [currentPagePackage, setCurrentPagePackage] = useState(1);

    // Filter categories
    const filteredCategories = classes.filter((cl) => cl.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const totalPagesPackage = Math.ceil(filteredCategories.length / itemsPerPagePackage);
    const startIndexPackage = (currentPagePackage - 1) * itemsPerPagePackage;
    const endIndexPackage = Math.min(startIndexPackage + itemsPerPagePackage, filteredCategories.length);

    const currentClass = filteredCategories.slice(startIndexPackage, endIndexPackage);

    const handlePageChangePackage = (pageNumber) => {
        setCurrentPagePackage(pageNumber);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <Layout title="Class List">
            <div className="card">
                <div className="card-header">
                    <div className="datatable-top pb-0">
                        <div className="datatable-search">
                            <input className="datatable-input" placeholder="Search..." type="search" value={searchQuery} onChange={handleSearch} />
                        </div>
                        <div className="datatable-dropdown">
                            <div className="d-flex align-items-center gap-3">
                                <Link to={config.routes.class_create} className="btn btn-primary d-flex align-items-center justify-content-center">
                                    <i className="ti ti-plus"></i> Add new Class
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body table-border-style">
                    <div className="table-responsive">
                        <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                            <div className="datatable-container">
                                <table className="table table-hover datatable-table" id="pc-dt-simple">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="form-check custom-checkbox">
                                                    <input type="checkbox" className="form-check-input" />
                                                </div>
                                            </th>

                                            <th>Name</th>
                                            <th>Room</th>
                                            <th>Created By</th>
                                            <th>Created Date</th>
                                            <th className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody id="orders">
                                        {classes.length === 0 || currentClass.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="text-center">
                                                    No data.
                                                </td>
                                            </tr>
                                        ) : (
                                            currentClass.map((cl, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="form-check custom-checkbox">
                                                            <input type="checkbox" className="form-check-input" />
                                                        </div>
                                                    </td>

                                                    <td>{cl.name}</td>
                                                    <td>{cl.roomName}</td>
                                                    <td>{cl.createdBy || "N/A"}</td>
                                                    <td>{(cl.createdDate && format(new Date(cl.createdDate), "dd-MM-yyyy")) || "N/A"}</td>
                                                    <td className="text-center">
                                                        <Link to={`/teacher/class/${cl.id}`} className="btn btn-icon btn-link-success">
                                                            <i className="ti ti-eye"></i>
                                                        </Link>
                                                        <Link to={``} className="btn btn-icon btn-link-warning">
                                                            <i className="ti ti-edit"></i>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-3">
                        <Pagination currentPage={currentPagePackage} totalPages={totalPagesPackage} onPageChange={handlePageChangePackage} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Classes;
