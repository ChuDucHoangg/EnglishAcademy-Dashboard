import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../../layouts/Pagination";
import { format } from "date-fns";

function WeekTable({ bookings, setColorStatus }) {
    const itemsPerPageWeekly = 10;
    const [currentPageWeekly, setCurrentPageWeekly] = useState(1);

    const totalPagesWeekly = Math.ceil((bookings.subscriptionDTOS || []).length / itemsPerPageWeekly);
    const startIndexWeekly = (currentPageWeekly - 1) * itemsPerPageWeekly;
    const endIndexWeekly = Math.min(startIndexWeekly + itemsPerPageWeekly, (bookings.subscriptionDTOS || []).length);

    const currentBookingsWeekly = (bookings.subscriptionDTOS || []).slice(startIndexWeekly, endIndexWeekly);

    const handlePageChangeWeekly = (pageNumber) => {
        setCurrentPageWeekly(pageNumber);
    };

    return (
        <div className="tab-pane fade" id="analytics-tab-2-pane" role="tabpanel" aria-labelledby="analytics-tab-2" tabIndex="0">
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
                                        <th data-sortable="true">Student Name</th>
                                        <th>Total</th>
                                        <th>Next Payment Date</th>
                                        <th data-sortable="true">Status</th>
                                        <th data-sortable="true" className="text-center">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentBookingsWeekly.map((booking, bookingIndex) => (
                                        <tr data-index={bookingIndex} key={bookingIndex}>
                                            <td>{bookingIndex + 1}</td>
                                            <td>{booking.studentName}</td>
                                            <td>${booking.price.toFixed(2)}</td>
                                            <td>{booking && booking?.nextPaymentDate && format(new Date(booking?.nextPaymentDate), "dd-MM-yyyy")}</td>
                                            <td>
                                                <span className={setColorStatus(booking.status)}>{booking.status}</span>
                                            </td>
                                            {/* <td>{booking.lessonDays}</td> */}
                                            <td className="text-center">
                                                <ul className="list-inline me-auto mb-0">
                                                    <li className="list-inline-item align-bottom" data-bs-toggle="tooltip" aria-label="View" data-bs-original-title="View">
                                                        <Link to={`/booking-waiting/weeks/${booking.id}`} className="avtar avtar-xs btn-link-secondary btn-pc-default">
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
                <Pagination currentPage={currentPageWeekly} totalPages={totalPagesWeekly} onPageChange={handlePageChangeWeekly} />
            </div>
        </div>
    );
}

export default WeekTable;
