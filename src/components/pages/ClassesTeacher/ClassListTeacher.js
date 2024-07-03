import Layout from "../../layouts";
import useAxiosGet from "../../../hooks/useAxiosGet";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import { Link } from "react-router-dom";
import { useState } from "react";
import Pagination from "../../layouts/Pagination";

function ClassListTeacher() {
    const classData = useAxiosGet({
        path: url.CLASS.LIST,
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
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header text-start">
                        <div className="row">
                            <div className="col-lg-4">
                                <input className="datatable-input" placeholder="Search..." type="search" value={searchQuery} onChange={handleSearch} />
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
                                                <th data-sortable="true">No.</th>
                                                <th data-sortable="true">Class Name</th>
                                                <th data-sortable="true">Room</th>
                                                <th data-sortable="true" className="text-center">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody id="orders">
                                            {currentClass.map((cl, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{cl.name}</td>
                                                    <td>{cl.roomName}</td>
                                                    <td className="text-center">
                                                        <Link to={`/teacher/class/${cl.id}`} className="btn btn-icon btn-light-success">
                                                            <i className="ti ti-eye"></i>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
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
            </div>
        </Layout>
    );
}

export default ClassListTeacher;
