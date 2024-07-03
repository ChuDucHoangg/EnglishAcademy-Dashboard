import Layout from "../../../layouts/index";
import useAxiosGet from "../../../../hooks/useAxiosGet";
import url from "../../../../services/url";
import { getAccessToken } from "../../../../utils/auth";
import PackageTable from "../../../views/Tutor/BookingWaiting/PackageTable";

import { statusColor } from "../../../../utils/statusColor";
import BookLoading from "../../../layouts/BookLoading";

function BookingWaitingList() {
    // Call API
    const bookingData = useAxiosGet({
        path: url.TUTOR.BOOKING_WAITING,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const bookings = bookingData.response || {};

    return (
        <>
            <Layout title="Booking Waiting">
                <div className="col-xl-12">
                    <div className="card">
                        {/* <div className="card-body border-bottom pb-0 table-border-style">
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

                            <ul className="nav nav-tabs analytics-tab" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link active"
                                        id="analytics-tab-1"
                                        data-bs-toggle="tab"
                                        data-bs-target="#analytics-tab-1-pane"
                                        type="button"
                                        role="tab"
                                        aria-controls="analytics-tab-1-pane"
                                        aria-selected="true"
                                    >
                                        Booking by Package
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link"
                                        id="analytics-tab-2"
                                        data-bs-toggle="tab"
                                        data-bs-target="#analytics-tab-2-pane"
                                        type="button"
                                        role="tab"
                                        aria-controls="analytics-tab-2-pane"
                                        aria-selected="false"
                                        tabIndex="-1"
                                    >
                                        Booking by Weeks
                                    </button>
                                </li>
                            </ul>
                        </div> */}

                        {bookingData.loading ? (
                            <BookLoading />
                        ) : (
                            <div className="card-body pb-0 table-border-style">
                                <div className="tab-content" id="myTabContent">
                                    <PackageTable bookings={bookings} setColorStatus={statusColor} />

                                    {/* <WeekTable bookings={bookings} setColorStatus={statusColor} /> */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default BookingWaitingList;
