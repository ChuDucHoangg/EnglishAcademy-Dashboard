import { Link } from "react-router-dom";
import Layout from "../../layouts";
import useAxiosGet from "../../../hooks/useAxiosGet";
import url from "../../../services/url";
import BookLoading from "../../layouts/BookLoading";
import { getAccessToken } from "../../../utils/auth";

function BookingList() {
    const bookingData = useAxiosGet({
        path: url.TUTOR.BOOKING_LIST,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const bookings = bookingData.response || [];

    const statusColor = (status) => {
        switch (status) {
            case "pending":
                return "text-warning";
            case "confirmed":
                return "text-primary";
            case "process":
                return "text-info";
            case "completed":
                return "text-success";
            case "cancelled":
                return "text-danger";
            default:
                return "color-secondary";
        }
    };

    return (
        <Layout title="Booking List">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-body border-bottom pb-0 table-border-style">
                        <div className="d-flex align-items-center justify-content-between">
                            <h5 className="mb-0">Booking List</h5>
                            <div className="dropdown">
                                <Link to="" className="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="ti ti-dots-vertical f-18"></i>
                                </Link>
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
                            {bookingData.loading ? (
                                <BookLoading />
                            ) : (
                                <div className="table-responsive">
                                    <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                                        <div className="datatable-top">
                                            <div className="datatable-search">
                                                <input className="datatable-input" placeholder="Search..." type="search" title="Search within table" aria-controls="pc-dt-dynamic-import" />
                                            </div>

                                            <div className="datatable-dropdown"></div>
                                        </div>
                                        <div className="datatable-container">
                                            <table className="table table-hover datatable-table" id="pc-dt-simple">
                                                <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Tutor</th>
                                                        <th>Student</th>
                                                        <th>Description</th>
                                                        <th>Status</th>
                                                        <th className="text-center">Actions</th>
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
                                                                        <Link to={`/booking/${booking.id}`} className="avtar avtar-xs btn-link-secondary btn-pc-default">
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
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default BookingList;
