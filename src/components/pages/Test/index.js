import { Link } from "react-router-dom";
import Layout from "../../layouts";

function TestList() {
    return (
        <Layout title="Test List">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h5>Test List</h5>
                    </div>
                    <div className="card-body table-border-style">
                        <div className="table-responsive">
                            <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                                <div className="datatable-top">
                                    <div className="datatable-search">
                                        <input className="datatable-input" placeholder="Search..." type="search" title="Search within table" aria-controls="pc-dt-dynamic-import" />
                                    </div>
                                    <div className="datatable-dropdown">
                                        <button className="btn btn-primary d-flex align-items-center justify-content-center" data-bs-toggle="modal" data-bs-target="#exampleModalLive">
                                            <i className="ti ti-plus"></i> Add new Test
                                        </button>
                                    </div>
                                </div>
                                <div className="datatable-container">
                                    <table className="table table-hover datatable-table" id="pc-dt-simple">
                                        <thead>
                                            <tr>
                                                <th data-sortable="true">No.</th>
                                                <th data-sortable="true">Test Name</th>
                                                <th data-sortable="true">Type Test</th>
                                                <th data-sortable="true">Start Date</th>
                                                <th data-sortable="true">End Date</th>
                                                <th data-sortable="true">Pass Marks</th>
                                                <th data-sortable="true" className="text-center">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr data-index="0">
                                                <td>60</td>
                                                <td>English Academy</td>
                                                <td>Practical Exam</td>
                                                <td>15/03/2024</td>
                                                <td>12/03/2024</td>
                                                <td>40/100</td>
                                                <td className="text-center">
                                                    <ul className="list-inline me-auto mb-0">
                                                        <li className="list-inline-item align-bottom" data-bs-toggle="tooltip" aria-label="View" data-bs-original-title="View">
                                                            <a href="#!" className="avtar avtar-xs btn-link-secondary btn-pc-default">
                                                                <i className="ti ti-eye f-18"></i>
                                                            </a>
                                                        </li>
                                                        <Link to="/test-edit" className="avtar avtar-xs btn-link-success btn-pc-default">
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
                                            <tr data-index="1">
                                                <td>60</td>
                                                <td>English Academy</td>
                                                <td>Multiple Choice</td>
                                                <td>15/03/2024</td>
                                                <td>12/03/2024</td>
                                                <td>40/100</td>
                                                <td className="text-center">
                                                    <ul className="list-inline me-auto mb-0">
                                                        <li className="list-inline-item align-bottom" data-bs-toggle="tooltip" aria-label="View" data-bs-original-title="View">
                                                            <a href="#!" className="avtar avtar-xs btn-link-secondary btn-pc-default">
                                                                <i className="ti ti-eye f-18"></i>
                                                            </a>
                                                        </li>
                                                        <Link to="/test-edit" className="avtar avtar-xs btn-link-success btn-pc-default">
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
                                                <td>60</td>
                                                <td>English Academy</td>
                                                <td>Practical Exam</td>
                                                <td>15/03/2024</td>
                                                <td>12/03/2024</td>
                                                <td>40/100</td>
                                                <td className="text-center">
                                                    <ul className="list-inline me-auto mb-0">
                                                        <li className="list-inline-item align-bottom" data-bs-toggle="tooltip" aria-label="View" data-bs-original-title="View">
                                                            <a href="#!" className="avtar avtar-xs btn-link-secondary btn-pc-default">
                                                                <i className="ti ti-eye f-18"></i>
                                                            </a>
                                                        </li>
                                                        <Link to="/test-edit" className="avtar avtar-xs btn-link-success btn-pc-default">
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
                                                <td>English Academy</td>
                                                <td>Multiple Choice</td>
                                                <td>15/03/2024</td>
                                                <td>12/03/2024</td>
                                                <td>40/100</td>
                                                <td className="text-center">
                                                    <ul className="list-inline me-auto mb-0">
                                                        <li className="list-inline-item align-bottom" data-bs-toggle="tooltip" aria-label="View" data-bs-original-title="View">
                                                            <a href="#!" className="avtar avtar-xs btn-link-secondary btn-pc-default">
                                                                <i className="ti ti-eye f-18"></i>
                                                            </a>
                                                        </li>
                                                        <Link to="/test-edit" className="avtar avtar-xs btn-link-success btn-pc-default">
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
                                                <td>English Academy</td>
                                                <td>Multiple Choice</td>
                                                <td>15/03/2024</td>
                                                <td>12/03/2024</td>
                                                <td>40/100</td>
                                                <td className="text-center">
                                                    <ul className="list-inline me-auto mb-0">
                                                        <li className="list-inline-item align-bottom" data-bs-toggle="tooltip" aria-label="View" data-bs-original-title="View">
                                                            <a href="#!" className="avtar avtar-xs btn-link-secondary btn-pc-default">
                                                                <i className="ti ti-eye f-18"></i>
                                                            </a>
                                                        </li>
                                                        <Link to="/test-edit" className="avtar avtar-xs btn-link-success btn-pc-default">
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
            <div id="exampleModalLive" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="text-center">
                                <img src="../assets/images/logo.png" alt="" />
                                <p className="mt-2">Do you want to create a Multiple Choice or Practical Exam?</p>
                            </div>

                            <div className="d-flex justify-content-center mt-2">
                                {/* <Link to="/multiple-choice" className="btn btn-primary">
                                    Multiple Choice
                                </Link>
                                <Link
                                    to="/practical-exam"
                                    className="btn btn-primary"
                                    style={{
                                        marginLeft: "10px",
                                    }}
                                >
                                    Practical Exam
                                </Link> */}

                                <a href="/multiple-choice" className="btn btn-primary">
                                    Multiple Choice
                                </a>
                                <a
                                    href="/practical-exam"
                                    className="btn btn-primary"
                                    style={{
                                        marginLeft: "10px",
                                    }}
                                >
                                    Practical Exam
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default TestList;
