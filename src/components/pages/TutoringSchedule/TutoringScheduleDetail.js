import { useCallback, useEffect, useState } from "react";
import Layout from "../../layouts";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { format, isSameDay } from "date-fns";
import { formatNumber } from "../../../utils/formatNumber";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ButtonSubmit from "../../layouts/ButtonSubmit";

function TutoringScheduleDetail() {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [lessonBookings, setLessonBookings] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [currentDate, setCurrentDate] = useState(new Date());

    const loadData = useCallback(async () => {
        try {
            const lessonRequest = await api.get(url.LESSON_BOOKING.DETAIL + `/${bookingId}`, {
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            });

            setLessonBookings(lessonRequest.data.data);
        } catch (error) {
            console.log(error);
        }
    }, [bookingId]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const getLastSegment = (url) => {
        try {
            const pathSegments = url.split("/");
            return pathSegments[pathSegments.length - 1];
        } catch (error) {
            return "N/A";
        }
    };

    const formatDateTime = (dateTime) => {
        return dateTime ? format(new Date(dateTime), "HH:mm:ss dd-MM-yyyy") : "N/A";
    };

    const statusColor = (status) => {
        switch (status) {
            case "scheduled":
                return "text-info";
            case "inprogress":
                return "text-primary";
            case "completed":
                return "text-success";
            case "cancelled":
                return "text-danger";
            case "rescheduled":
                return "text-warning";
            default:
                return "color-success";
        }
    };

    const handleStatusChange = async (lessonId, statusUrl, successMessage) => {
        try {
            const isConfirmed = await Swal.fire({
                title: "Are you sure?",
                text: "Are you sure you want to update status?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "I'm sure",
                reverseButtons: true,
            });

            if (isConfirmed.isConfirmed) {
                const response = await api.put(
                    statusUrl + `/${lessonId}`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${getAccessToken()}` },
                    }
                );

                if (response.status === 200) {
                    loadData();
                    toast.success(successMessage);
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    const isSameDate = (date1, date2) => {
        return isSameDay(new Date(date1), new Date(date2));
    };

    const generateRandomCode = () => {
        const segments = [];
        const characters = "abcdefghijklmnopqrstuvwxyz";

        for (let i = 0; i < 3; i++) {
            let segment = "";
            for (let j = 0; j < 3; j++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                segment += characters[randomIndex];
            }
            segments.push(segment);
        }

        return segments.join("-");
    };

    const handleCreateRoom = async (id) => {
        try {
            const randomCode = generateRandomCode();

            const roomData = {
                id: id,
                path: randomCode,
            };

            const roomRequest = await api.put(url.LESSON_BOOKING.CREATE_ROOM, roomData, { headers: { Authorization: `Bearer ${getAccessToken()}` } });
            if (roomRequest.status === 200) {
                navigate(`/room/${randomCode}`);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    const handleInProcess = async (id) => {
        try {
            const isConfirmed = await Swal.fire({
                title: "Are you sure?",
                text: "Are you sure you want to update status?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "I'm sure",
                reverseButtons: true,
            });

            if (isConfirmed.isConfirmed) {
                const response = await api.put(
                    url.LESSON_BOOKING.STATUS_INPROCESS + `/${id}`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${getAccessToken()}` },
                    }
                );

                if (response.status === 200) {
                    handleCreateRoom(id);

                    toast.success("Updated status to In Progress successfully");
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <Layout title={`Tutoring Schedule Session`}>
            {lessonBookings.map((lesson, lessonIndex) => (
                <div className="card p-0" key={lessonIndex}>
                    <div className="card-header">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h4 className="card-title">Session: {formatNumber(lessonIndex + 1)}</h4>
                                <p className={`d-block mb-0 ${statusColor(lesson.status)}`}>Status: {lesson.status}</p>
                            </div>
                            <div className="d-flex gap-2">
                                {isSameDate(currentDate, lesson.scheduledStartTime) && lesson.status === "scheduled" && (
                                    <>
                                        <button
                                            className="btn btn-light-danger"
                                            onClick={() => handleStatusChange(lesson.id, url.LESSON_BOOKING.STATUS_CANCEL, "Updated status to Cancelled successfully")}
                                        >
                                            Cancel
                                        </button>

                                        <ButtonSubmit className="btn-light-primary" value="In Progress" handleEvent={() => handleInProcess(lesson.id)} />
                                    </>
                                )}
                                {isSameDate(currentDate, lesson.scheduledStartTime) && lesson.status === "inprogress" && (
                                    <button
                                        className="btn btn-light-success"
                                        onClick={() => handleStatusChange(lesson.id, url.LESSON_BOOKING.STATUS_COMPLETE, "Updated status to Completed successfully")}
                                    >
                                        Completed
                                    </button>
                                )}
                                {isSameDate(currentDate, lesson.scheduledStartTime) && lesson.status === "cancelled" && (
                                    <button
                                        className="btn btn-light-info"
                                        onClick={() => handleStatusChange(lesson.id, url.LESSON_BOOKING.STATUS_RESCHEDULE, "Updated status to Rescheduled successfully")}
                                    >
                                        Rescheduled
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item px-0 pt-3">
                                <div className="row">
                                    <div className="col-md-6">
                                        <p className="mb-1 text-muted">Room</p>
                                        <p className="mb-0">
                                            {lesson.path === null || lesson.path === "" ? (
                                                "N/A"
                                            ) : (
                                                <Link to={`${`/room/${lesson.path}`}`} className="text-primary" target="_blank">
                                                    {getLastSegment(lesson.path)}
                                                </Link>
                                            )}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <p className="mb-1 text-muted">Code</p>
                                        <p className="mb-0">{lesson.code || "N/A"}</p>
                                    </div>
                                </div>
                            </li>

                            <li className="list-group-item px-0 pt-3">
                                <div className="row">
                                    <div className="col-md-3">
                                        <p className="mb-1 text-muted">Scheduled Start Time</p>
                                        <p className="mb-0">{formatDateTime(lesson.scheduledStartTime)}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <p className="mb-1 text-muted">Scheduled End Time</p>
                                        <p className="mb-0">{formatDateTime(lesson.scheduledEndTime)}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <p className="mb-1 text-muted">Actual Start Time</p>
                                        <p className="mb-0">{formatDateTime(lesson.actualStartTime)}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <p className="mb-1 text-muted">Actual End Time</p>
                                        <p className="mb-0">{formatDateTime(lesson.actualEndTime)}</p>
                                    </div>
                                </div>
                            </li>

                            <li className="list-group-item px-0 pt-3">
                                <div className="row">
                                    <div className="col-md-3"></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            ))}
        </Layout>
    );
}

export default TutoringScheduleDetail;
