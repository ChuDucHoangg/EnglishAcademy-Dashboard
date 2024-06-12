import { Link } from "react-router-dom";
import Pagination from "../../../layouts/Pagination";
import { useState } from "react";

function PackageTable({ bookings, setColorStatus }) {
    const itemsPerPagePackage = 10;
    const [currentPagePackage, setCurrentPagePackage] = useState(1);

    const totalPagesPackage = Math.ceil((bookings.studentPackageDTOS || []).length / itemsPerPagePackage);
    const startIndexPackage = (currentPagePackage - 1) * itemsPerPagePackage;
    const endIndexPackage = Math.min(startIndexPackage + itemsPerPagePackage, (bookings.studentPackageDTOS || []).length);

    const currentBookingsPackage = (bookings.studentPackageDTOS || []).slice(startIndexPackage, endIndexPackage);

    const handlePageChangePackage = (pageNumber) => {
        setCurrentPagePackage(pageNumber);
    };

    return (
        <div className="tab-pane fade active show" id="analytics-tab-1-pane" role="tabpanel" aria-labelledby="analytics-tab-1" tabIndex="0">
            <div className="pt-3">
                <div className="table-responsive">
                    <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                        <div className="datatable-top">
                            <div className="datatable-search">
                                <input className="datatable-input" placeholder="Search..." type="search" title="Search within table" aria-controls="pc-dt-dynamic-import" />
                            </div>
                            <div className="datatable-dropdown">
                                <a className="btn btn-primary d-flex align-items-center justify-content-center" href="/student-create">
                                    <i className="ti ti-plus"></i> Add new Booking
                                </a>
                            </div>
                        </div>
                        <div className="datatable-container">
                            <table className="table table-hover datatable-table" id="pc-dt-simple">
                                <thead>
                                    <tr>
                                        <th data-sortable="true">No.</th>
                                        <th data-sortable="true">Package</th>
                                        <th data-sortable="true">Student</th>
                                        <th data-sortable="true">Sessions</th>
                                        <th data-sortable="true">Status</th>
                                        <th data-sortable="true" className="text-center">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentBookingsPackage.map((booking, bookingIndex) => (
                                        <tr data-index={bookingIndex} key={bookingIndex}>
                                            <td>{bookingIndex + 1}</td>
                                            <td>{booking.packageId}</td>
                                            <td>{booking.studentName}</td>
                                            <td>{booking.remainingSessions}</td>
                                            <td>
                                                <span className={setColorStatus(booking.status)}>{booking.status}</span>
                                            </td>
                                            <td className="text-center">
                                                <ul className="list-inline me-auto mb-0">
                                                    <li className="list-inline-item align-bottom" data-bs-toggle="tooltip" aria-label="View" data-bs-original-title="View">
                                                        <Link to={`/booking-waiting/package/${booking.id}`} className="avtar avtar-xs btn-link-secondary btn-pc-default">
                                                            <i className="ti ti-eye f-18"></i>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <Pagination currentPage={currentPagePackage} totalPages={totalPagesPackage} onPageChange={handlePageChangePackage} />
            </div>
        </div>
    );
}

export default PackageTable;
