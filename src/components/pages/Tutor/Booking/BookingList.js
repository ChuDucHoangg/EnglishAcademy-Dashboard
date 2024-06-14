import { Link } from "react-router-dom";
import Layout from "../../../layouts";
import useAxiosGet from "../../../../hooks/useAxiosGet";
import url from "../../../../services/url";
import { getAccessToken } from "../../../../utils/auth";
import { statusColor } from "../../../../utils/statusColor";

function BookingList() {
    const bookingData = useAxiosGet({
        path: url.TUTOR.BOOKING_BY_TUTOR,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const bookings = bookingData.response || [];

    return (
        <Layout title="Booking Waiting">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-body border-bottom pb-0 table-border-style">
                        <div className="d-flex align-items-center justify-content-between">
                            <h5 className="mb-0">Booking Waiting</h5>
                            <div className="dropdown">
                                <a className="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none" href="#!" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="ti ti-dots-vertical f-18"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                    <Link to="" className="dropdown-item">
                                        Today
                                    </Link>
                                    <Link to="" className="dropdown-item">
                                        Weekly
                                    </Link>
                                    <Link to="" className="dropdown-item">
                                        Monthly
                                    </Link>
                                </div>
                            </div>
                        </div>

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
                                                    <th data-sortable="true">Tutor</th>
                                                    <th data-sortable="true">Student</th>
                                                    <th data-sortable="true">Description</th>
                                                    <th data-sortable="true">Status</th>
                                                    <th data-sortable="true" className="text-center">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {bookings.map((booking, bookingIndex) => (
                                                    <tr data-index={bookingIndex} key={bookingIndex}>
                                                        <td>{bookingIndex + 1}</td>
                                                        <td>{booking.tutorName}</td>
                                                        <td>{booking.studentName}</td>
                                                        <td>{booking.description}</td>
                                                        <td>
                                                            <span className={statusColor(booking.status)}>{booking.status}</span>
                                                        </td>
                                                        <td className="text-center">
                                                            <ul className="list-inline me-auto mb-0">
                                                                <li className="list-inline-item align-bottom" data-bs-toggle="tooltip" aria-label="View" data-bs-original-title="View">
                                                                    <Link to={``} className="avtar avtar-xs btn-link-secondary btn-pc-default">
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
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default BookingList;
