import Layout from "../../layouts";
import useAxiosGet from "../../../hooks/useAxiosGet";
import url from "../../../services/url";
import { Link, useParams } from "react-router-dom";
import { getAccessToken } from "../../../utils/auth";
import { format } from "date-fns";

function BookingDetail() {
    const { bookingId } = useParams();

    const bookingData = useAxiosGet({
        path: url.TUTOR.BOOKING_DETAIL + `/${bookingId}`,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const bookingDetail = bookingData.response || {};

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
        <Layout title="Booking Detail">
            <div className="col-xl-12">
                <div className="mail-wrapper">
                    <div className="mail-content">
                        <div className="card">
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item px-0 pt-3">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <p className="mb-1 text-muted">Student Name</p>
                                                <p className="mb-0">{bookingDetail.studentName}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <p className="mb-1 text-muted">Package Name</p>
                                                <p className="mb-0">{bookingDetail.tutorName}</p>
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

                                <div className="datatable-container">
                                    <table className="table table-hover datatable-table" id="pc-dt-simple">
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Room Meeting</th>
                                                <th>Scheduled Start</th>
                                                <th>Scheduled End</th>
                                                <th>Actual Start Time</th>
                                                <th>Actual End Time</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookingDetail?.lessionBookingDTOS?.map((lesson, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <Link to={`${lesson.path === null ? "" : `/room/${lesson.path}`}`} target="_blank" className="text-primary">
                                                            {getLastSegment(lesson.path) || "N/A"}
                                                        </Link>
                                                    </td>

                                                    <td>{formatDateTime(lesson.scheduledStartTime)}</td>
                                                    <td>{formatDateTime(lesson.scheduledEndTime)}</td>
                                                    <td>{formatDateTime(lesson.actualStartTime)}</td>
                                                    <td>{formatDateTime(lesson.actualEndTime)}</td>
                                                    <td className="color-success">{lesson.status}</td>
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
    );
}

export default BookingDetail;
