import { useParams } from "react-router-dom";
import Layout from "../../../layouts/index";
import url from "../../../../services/url";
import { getAccessToken } from "../../../../utils/auth";
import { format } from "date-fns";
import api from "../../../../services/api";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import NotFound from "../../Other/NotFound";
import { useCallback, useEffect, useState } from "react";
import { statusColor } from "../../../../utils/statusColor";

function ByWeeks() {
    const { bookingId } = useParams();

    const [bookingDetail, setBookingDetail] = useState([]);

    const loadData = useCallback(async () => {
        try {
            const responseData = await api.get(url.TUTOR.BOOKING_WAITING_WEEKS + `/${bookingId}`, {
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            });

            setBookingDetail(responseData.data.data);
        } catch (error) {
            console.log(error);
        }
    }, [bookingId]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleConfirmBooking = async () => {
        try {
            const isConfirmed = await Swal.fire({
                title: "Are you sure?",
                text: "Are you sure you want to confirm?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "I'm sure",
                reverseButtons: true,
            });

            if (isConfirmed.isConfirmed) {
                const confirmRequest = await api.put(url.TUTOR.BOOKING_CONFIRM_WEEKS + `/${bookingId}`, null, { headers: { Authorization: `Bearer ${getAccessToken()}` } });

                if (confirmRequest.status === 200) {
                    toast.success("Successfully confirmed!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    loadData();
                }
            }
        } catch (error) {
            toast.error("Error! An error occurred. Please try again later!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    const handleCancelBooking = async () => {
        try {
            const isConfirmed = await Swal.fire({
                title: "Are you sure?",
                text: "Are you sure you want to cancel?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "I'm sure",
                reverseButtons: true,
            });

            if (isConfirmed.isConfirmed) {
                const cancelRequest = await api.put(url.TUTOR.BOOKING_CANCEL_WEEKS + `/${bookingId}`, null, { headers: { Authorization: `Bearer ${getAccessToken()}` } });
                if (cancelRequest.status === 200) {
                    toast.success("Successfully cancelled!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    loadData();
                }
            }
        } catch (error) {
            toast.error("Error! An error occurred. Please try again later!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    return (
        <>
            {bookingDetail.status === 404 ? (
                <NotFound />
            ) : (
                <Layout title="Booking Detail by Weeks">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="mail-wrapper">
                                <div className="mail-content">
                                    <div className="card">
                                        <div className="card-body">
                                            <ul className="list-group list-group-flush">
                                                {bookingDetail?.status === "confirmed" || bookingDetail?.status === "cancelled" || (
                                                    <li className="list-group-item px-0">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <h3>{bookingDetail?.studentName}</h3>

                                                            <div className="">
                                                                <button type="button" className="btn btn-outline-danger d-inline-flex" onClick={handleCancelBooking}>
                                                                    <i className="ti ti-x me-1"></i>Cancel
                                                                </button>
                                                                <button type="button" className="btn btn-outline-primary d-inline-flex" style={{ marginLeft: 10 }} onClick={handleConfirmBooking}>
                                                                    <i className="ti ti-circle-check me-1"></i>Confirm
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )}

                                                <li className="list-group-item px-0 pt-3">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <p className="mb-1 text-muted">Student Name</p>
                                                            <p className="mb-0">{bookingDetail?.studentName}</p>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <p className="mb-1 text-muted">Total</p>
                                                            <p className="mb-0">${bookingDetail?.price && bookingDetail?.price.toFixed(2)}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item px-0">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <p className="mb-1 text-muted">Status</p>
                                                            <p className={`mb-0 ${statusColor(bookingDetail?.status)}`}>{bookingDetail?.status}</p>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <p className="mb-1 text-muted">Next Payment Date</p>
                                                            <p className="mb-0">{bookingDetail.nextPaymentDate && format(new Date(bookingDetail.nextPaymentDate), "dd-MM-yyyy")}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item px-0">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <p className="mb-1 text-muted">Start Date</p>
                                                            <p className="mb-0">{bookingDetail && bookingDetail?.startTime && format(new Date(bookingDetail?.startTime), "dd-MM-yyyy")}</p>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <p className="mb-1 text-muted">End Date</p>
                                                            <p className="mb-0">{bookingDetail && bookingDetail?.endTime && format(new Date(bookingDetail?.endTime), "dd-MM-yyyy")}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {bookingDetail?.lessonDays === 0 && (
                                                    <li className="list-group-item px-0 pb-0">
                                                        <p className="mb-1 text-muted">Lessons</p>
                                                        <p>
                                                            {bookingDetail?.lessonDays.map((lesson, lessonIndex) => (
                                                                <span key={lessonIndex} className="mb-2 d-block">
                                                                    {lessonIndex + 1}. {lesson.dayOfWeek}: {lesson.startTime} - {lesson.endTime}
                                                                </span>
                                                            ))}
                                                        </p>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            )}
        </>
    );
}

export default ByWeeks;
