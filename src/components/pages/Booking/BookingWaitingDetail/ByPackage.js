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
import ButtonSubmit from "../../../layouts/ButtonSubmit";

function ByPackage() {
    const { bookingId } = useParams();

    const [bookingDetail, setBookingDetail] = useState([]);

    const loadData = useCallback(async () => {
        try {
            const responseData = await api.get(url.TUTOR.BOOKING_WAITING_PACKAGE + `/${bookingId}`, {
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
                const confirmRequest = await api.put(url.TUTOR.BOOKING_CONFIRM_PACKAGE + `/${bookingId}`, null, { headers: { Authorization: `Bearer ${getAccessToken()}` } });

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
                const cancelRequest = await api.put(url.TUTOR.BOOKING_CANCEL_PACKAGE + `/${bookingId}`, null, { headers: { Authorization: `Bearer ${getAccessToken()}` } });
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

    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        bookingId: parseInt(bookingId),
        startTime: "",
        endTime: "",
    });

    const [formErrors, setFormErrors] = useState({
        bookingId: parseInt(bookingId),
        startTime: "",
        endTime: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        const currentDate = new Date();
        const selectedDate = new Date(value);

        if (selectedDate < currentDate) {
            setFormErrors({
                ...formErrors,
                [name]: "The selected date cannot be after the current date.",
            });
        } else {
            setFormErrors({
                ...formErrors,
                [name]: "",
            });

            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};
        const currentDate = new Date();

        if (formData.startTime === "") {
            newErrors.startTime = "Please enter a topic start time.";
            valid = false;
        } else if (new Date(formData.startTime) < currentDate) {
            newErrors.startTime = "The selected start time cannot be before the current date.";
            valid = false;
        }

        if (formData.endTime === "") {
            newErrors.endTime = "Please enter a topic end time.";
            valid = false;
        } else if (new Date(formData.endTime) < currentDate) {
            newErrors.endTime = "The selected end time cannot be before the current date.";
            valid = false;
        } else if (new Date(formData.endTime) - new Date(formData.startTime) < 2 * 60 * 60 * 1000) {
            newErrors.endTime = "The end time cannot be more than 2 hours after the start time.";
            valid = false;
        } else if (new Date(formData.endTime) - new Date(formData.startTime) >= 2 * 61 * 60 * 1000) {
            newErrors.endTime = "The end time cannot be less than 2 hours after the start time.";
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    const handleCreateLesson = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                setSubmitting(true);
                const createRequest = await api.post(url.LESSON_BOOKING.CREATE, formData, { headers: { Authorization: `Bearer ${getAccessToken()}` } });
                if (createRequest.status === 200) {
                    toast.success("Created successful study sessions!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                    setFormData({ bookingId: parseInt(bookingId), startTime: "", endTime: "" });
                }
            } catch (error) {
                console.log(error);
            } finally {
                setSubmitting(false);
            }
        }
    };

    return (
        <>
            {bookingDetail.status === 404 ? (
                <NotFound />
            ) : (
                <Layout title="Booking Detail by Package">
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

                                                {bookingDetail?.status === "confirmed" && (
                                                    <div className="text-end">
                                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createLesson">
                                                            <i className="ti ti-plus"></i> Create Lesson
                                                        </button>

                                                        <div id="createLesson" className="modal fade" tabIndex="-1" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h5 className="modal-title" id="exampleModalCenterTitle">
                                                                            Create Lesson
                                                                        </h5>
                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <div className="row">
                                                                            <div className="col-12">
                                                                                <div className="form-group text-start">
                                                                                    <label className="form-label" htmlFor="start-time">
                                                                                        Start Time
                                                                                    </label>

                                                                                    <input
                                                                                        type="datetime-local"
                                                                                        id="start-time"
                                                                                        name="startTime"
                                                                                        className={`form-control ${formErrors.startTime ? "is-invalid" : ""}`}
                                                                                        onChange={handleChange}
                                                                                        value={formData.startTime}
                                                                                    />
                                                                                    {formErrors.startTime && <p className="invalid-feedback">{formErrors.startTime}</p>}
                                                                                </div>

                                                                                <div className="form-group text-start">
                                                                                    <label className="form-label" htmlFor="end-time">
                                                                                        End Time
                                                                                    </label>

                                                                                    <input
                                                                                        type="datetime-local"
                                                                                        id="end-time"
                                                                                        name="endTime"
                                                                                        className={`form-control ${formErrors.endTime ? "is-invalid" : ""}`}
                                                                                        onChange={handleChange}
                                                                                        value={formData.endTime}
                                                                                    />
                                                                                    {formErrors.endTime && <p className="invalid-feedback">{formErrors.endTime}</p>}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                                                            Close
                                                                        </button>

                                                                        <ButtonSubmit value="Save changes" className="btn-primary" submitting={submitting} handleEvent={handleCreateLesson} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                <li className="list-group-item px-0 pt-3">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <p className="mb-1 text-muted">Student Name</p>
                                                            <p className="mb-0">{bookingDetail?.studentName}</p>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <p className="mb-1 text-muted">Package Name</p>
                                                            <p className="mb-0">{bookingDetail?.packageName}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item px-0">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <p className="mb-1 text-muted">Number of Session</p>
                                                            <p className="mb-0">{bookingDetail?.remainingSessions}</p>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <p className="mb-1 text-muted">Purchase Date</p>
                                                            <p className="mb-0">{bookingDetail.purchaseDate && format(new Date(bookingDetail.purchaseDate), "dd-MM-yyyy")}</p>
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
                                                            <p className="mb-1 text-muted">Crated Date</p>
                                                            <p className="mb-0">{bookingDetail?.createdDate || "N/A"}</p>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li className="list-group-item px-0 pb-0">
                                                    <p className="mb-1 text-muted">Lessons</p>
                                                    <p>
                                                        {bookingDetail?.lessonDays?.map((lesson, lessonIndex) => (
                                                            <span key={lessonIndex} className="mb-2 d-block">
                                                                {lessonIndex + 1}: {lesson.dayOfWeek}: {lesson.startTime} - {lesson.endTime}
                                                            </span>
                                                        ))}
                                                    </p>
                                                </li>
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

export default ByPackage;
