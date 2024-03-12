import { Link } from "react-router-dom";
import Layout from "../../layouts";

function StaffList() {
    return (
        <Layout title="Staff List">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h5>Staff List</h5>
                    </div>
                    <div className="card-body table-border-style">
                        <div className="table-responsive">
                            <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                                <div className="datatable-top">
                                    <div className="datatable-search">
                                        <input className="datatable-input" placeholder="Search..." type="search" title="Search within table" aria-controls="pc-dt-dynamic-import" />
                                    </div>
                                    <div className="datatable-dropdown">
                                        <Link to="/staff-create" className="btn btn-primary d-flex align-items-center justify-content-center">
                                            <i className="ti ti-plus"></i> Add new Staff
                                        </Link>
                                    </div>
                                </div>
                                <div className="datatable-container">
                                    <table className="table table-hover datatable-table" id="pc-dt-simple">
                                        <thead>
                                            <tr>
                                                <th data-sortable="true">No.</th>
                                                <th data-sortable="true">Full Name</th>
                                                <th data-sortable="true">Birthday</th>
                                                <th data-sortable="true">Address</th>
                                                <th data-sortable="true">Email</th>
                                                <th data-sortable="true">Phone Number</th>
                                                <th data-sortable="true">Gender</th>
                                                <th data-sortable="true">Class Name</th>
                                                <th data-sortable="true" className="text-center">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr data-index="0">
                                                <td>179</td>
                                                <td>
                                                    <div className="row">
                                                        <div className="col-auto">
                                                            <img src="../assets/images/user/avatar-1.jpg" alt="" className="wid-40 rounded-circle" />
                                                        </div>
                                                        <div className="col">
                                                            <h6 className="mb-0">Addie Bass</h6>
                                                            <p className="text-muted f-12 mb-0">mareva@gmail.com</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>01/01/2024</td>
                                                <td>Ton That Thuyet, Ha Noi</td>
                                                <td>englishacademy.edu.vn</td>
                                                <td>+1 (247) 849-6968</td>
                                                <td>Male</td>
                                                <td>T2207A</td>
                                                <td className="text-center">
                                                    <ul className="list-inline me-auto mb-0">
                                                        <li className="list-inline-item align-bottom" data-bs-toggle="tooltip" aria-label="View" data-bs-original-title="View">
                                                            <a href="#!" className="avtar avtar-xs btn-link-secondary btn-pc-default">
                                                                <i className="ti ti-eye f-18"></i>
                                                            </a>
                                                        </li>
                                                        <li className="list-inline-item align-bottom" data-bs-toggle="tooltip" aria-label="Edit" data-bs-original-title="Edit">
                                                            <Link to="/staff-edit" className="avtar avtar-xs btn-link-success btn-pc-default">
                                                                <i className="ti ti-edit-circle f-18"></i>
                                                            </Link>
                                                        </li>
                                                        <li className="list-inline-item align-bottom" data-bs-toggle="tooltip" aria-label="Delete" data-bs-original-title="Delete">
                                                            <a href="#!" className="avtar avtar-xs btn-link-danger btn-pc-default">
                                                                <i className="ti ti-trash f-18"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr data-index="1">
                                                <td>60</td>
                                                <td>
                                                    <div className="row">
                                                        <div className="col-auto">
                                                            <img src="../assets/images/user/avatar-2.jpg" alt="" className="wid-40 rounded-circle" />
                                                        </div>
                                                        <div className="col">
                                                            <h6 className="mb-0">Agnes McGee</h6>
                                                            <p className="text-muted f-12 mb-0">heba@gmail.com</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>01/01/2024</td>
                                                <td>Ton That Thuyet, Ha Noi</td>
                                                <td>englishacademy.edu.vn</td>
                                                <td>+1 (247) 849-6968</td>
                                                <td>Male</td>
                                                <td>T2207A</td>
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
                                            <tr data-index="2">
                                                <td>133</td>
                                                <td>
                                                    <div className="row">
                                                        <div className="col-auto">
                                                            <img src="../assets/images/user/avatar-3.jpg" alt="" className="wid-40 rounded-circle" />
                                                        </div>
                                                        <div className="col">
                                                            <h6 className="mb-0">Alberta Robbins</h6>
                                                            <p className="text-muted f-12 mb-0">miza@gmail.com</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>01/01/2024</td>
                                                <td>Ton That Thuyet, Ha Noi</td>
                                                <td>englishacademy.edu.vn</td>
                                                <td>+1 (247) 849-6968</td>
                                                <td>Male</td>
                                                <td>T2207A</td>
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
                                            <tr data-index="3">
                                                <td>60</td>
                                                <td>
                                                    <div className="row">
                                                        <div className="col-auto">
                                                            <img src="../assets/images/user/avatar-4.jpg" alt="" className="wid-40 rounded-circle" />
                                                        </div>
                                                        <div className="col">
                                                            <h6 className="mb-0">Agnes McGee</h6>
                                                            <p className="text-muted f-12 mb-0">heba@gmail.com</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>01/01/2024</td>
                                                <td>Ton That Thuyet, Ha Noi</td>
                                                <td>englishacademy.edu.vn</td>
                                                <td>+1 (247) 849-6968</td>
                                                <td>Male</td>
                                                <td>T2207A</td>
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
                                            <tr data-index="4">
                                                <td>60</td>
                                                <td>
                                                    <div className="row">
                                                        <div className="col-auto">
                                                            <img src="../assets/images/user/avatar-5.jpg" alt="" className="wid-40 rounded-circle" />
                                                        </div>
                                                        <div className="col">
                                                            <h6 className="mb-0">Agnes McGee</h6>
                                                            <p className="text-muted f-12 mb-0">heba@gmail.com</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>01/01/2024</td>
                                                <td>Ton That Thuyet, Ha Noi</td>
                                                <td>englishacademy.edu.vn</td>
                                                <td>+1 (247) 849-6968</td>
                                                <td>Male</td>
                                                <td>T2207A</td>
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
                                        </tbody>
                                    </table>
                                </div>
                                <div className="datatable-bottom">
                                    <div className="datatable-info">Showing 1 to 10 of 16 entries</div>
                                    <nav className="datatable-pagination">
                                        <ul className="datatable-pagination-list">
                                            <li className="datatable-pagination-list-item datatable-hidden datatable-disabled">
                                                <button data-page="1" className="datatable-pagination-list-item-link" aria-label="Page 1">
                                                    ‹
                                                </button>
                                            </li>
                                            <li className="datatable-pagination-list-item datatable-active">
                                                <button data-page="1" className="datatable-pagination-list-item-link" aria-label="Page 1">
                                                    1
                                                </button>
                                            </li>
                                            <li className="datatable-pagination-list-item">
                                                <button data-page="2" className="datatable-pagination-list-item-link" aria-label="Page 2">
                                                    2
                                                </button>
                                            </li>
                                            <li className="datatable-pagination-list-item">
                                                <button data-page="2" className="datatable-pagination-list-item-link" aria-label="Page 2">
                                                    ›
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
        </Layout>
    );
}

export default StaffList;
