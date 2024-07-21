import { useCallback, useEffect, useState } from "react";
import Layout from "../../layouts";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";

function TutoringScheduleDetail() {
    const { bookingId } = useParams();
    const [lessonBookings, setLessonBookings] = useState([]);

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
            console.log(error);
        }
    };

    const formatDateTime = (dateTime) => {
        return dateTime ? format(new Date(dateTime), "HH:mm:ss dd-MM-yyyy") : "N/A";
    };

    return (
        <Layout title={`Tutoring Schedule`}>
            <div className="card">
                <div class="card-body ">
                    <div className="card-body table-border-style">
                        <div className="table-responsive">
                            <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                                <div className="datatable-container">
                                    <table className="table table-hover datatable-table" id="pc-dt-simple">
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Room</th>
                                                <th>Scheduled Start</th>
                                                <th>Scheduled End</th>
                                                <th>Actual Start Time</th>
                                                <th>Actual End Time</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        {lessonBookings.map((lesson, lessonIndex) => (
                                            <tbody id="orders">
                                                <tr key={lessonIndex}>
                                                    <td>{lessonIndex + 1}</td>
                                                    <td>
                                                        {lesson.path === null ? (
                                                            "N/A"
                                                        ) : (
                                                            <Link to={`${lesson.path === null ? "" : `/room/${lesson.path}`}`} className="text-primary" target="_blank">
                                                                {getLastSegment(lesson.path) || "N/A"}
                                                            </Link>
                                                        )}
                                                    </td>

                                                    <td>{formatDateTime(lesson.scheduledStartTime)}</td>
                                                    <td>{formatDateTime(lesson.scheduledEndTime)}</td>
                                                    <td>{formatDateTime(lesson.actualStartTime)}</td>
                                                    <td>{formatDateTime(lesson.actualEndTime)}</td>
                                                    <td className="color-success">{lesson.status}</td>
                                                    <td>
                                                        <Link to={`/tutoring-schedule/${bookingId}/lesson/${lesson.id}`} className="btn btn-icon btn-light-primary">
                                                            <i className="ti ti-eye"></i>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default TutoringScheduleDetail;
