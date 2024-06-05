import { Link } from "react-router-dom";
import Layout from "../../../layouts/index";
import useAxiosGet from "../../../../hooks/useAxiosGet";
import url from "../../../../services/url";
import { getAccessToken } from "../../../../utils/auth";

import Loading from "../../../layouts/Loading";

function BookingList() {
    const bookingData = useAxiosGet({
        path: url.TUTOR.BOOKINGS,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const bookings = bookingData.response || [];

    return (
        <>
            {bookingData.loading && <Loading />}
            <Layout title="Booking List">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Booking Tutor</h5>
                        </div>
                        <div className="card-body table-border-style">
                            <div className="table-responsive">
                                <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                                    {/* <div className="datatable-top">
                                        <div className="datatable-search">
                                            <input className="datatable-input" placeholder="Search..." type="search" title="Search within table" aria-controls="pc-dt-dynamic-import" />
                                        </div>
                                        <div className="datatable-dropdown">
                                            <Link to="/lesson-create" className="btn btn-primary d-flex align-items-center justify-content-center">
                                                <i className="ti ti-plus"></i> Add new 
                                            </Link>
                                        </div>
                                    </div> */}
                                    <div className="datatable-container">
                                        <table className="table table-hover datatable-table" id="pc-dt-simple">
                                            <thead>
                                                <tr>
                                                    <th data-sortable="true">No.</th>
                                                    <th data-sortable="true">Tutor Name</th>
                                                    <th data-sortable="true">Student Name</th>
                                                    <th data-sortable="true">Description</th>
                                                    <th data-sortable="true">Status</th>
                                                    <th data-sortable="true">Lesson</th>
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
                                                        <td>{booking.status}</td>
                                                        <td>{booking.lessonDays}</td>
                                                        <td className="text-center">
                                                            <ul className="list-inline me-auto mb-0">
                                                                <li className="list-inline-item align-bottom" data-bs-toggle="tooltip" aria-label="View" data-bs-original-title="View">
                                                                    <Link to={`/tutor/booking-detail/${booking.id}`} className="avtar avtar-xs btn-link-secondary btn-pc-default">
                                                                        <i className="ti ti-eye f-18"></i>
                                                                    </Link>
                                                                </li>
                                                                <Link to="" className="avtar avtar-xs btn-link-success btn-pc-default">
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
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default BookingList;
