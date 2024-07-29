import Layout from "../../layouts/index";
import NewsFeed from "../../views/Dashboard/NewsFeed";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState } from "react";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import { useEffect } from "react";
import { useCallback } from "react";
import { formatNumber } from "../../../utils/formatNumber";
import config from "../../../config";
import Generality from "../../views/Dashboard/Generality";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function DashboardTeacher() {
    const navigate = useNavigate();

    const [totalClasses, setTotalClasses] = useState({});
    const [totalStudentTutoring, setTotalStudentTutoring] = useState({});
    const [lessonBooking, setLessonBooking] = useState([]);
    const [classes, setClasses] = useState([]);
    const [bookingWaitings, setBookingWaitings] = useState({});
    const [tutoring, setTutoring] = useState([]);

    const loadData = useCallback(async () => {
        try {
            const headerConfig = {
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            };

            const [totalClassResponse, totalStudentTutoringResponse, lessonBookingResponse, classesResponse, bookingWaitingResponse, tutoringResponse] = await Promise.all([
                api.get(url.DASHBOARD_TEACHER.TOTAL_CLASS, headerConfig),
                api.get(url.DASHBOARD_TEACHER.COUNT_STUDENT_STUDYING, headerConfig),
                api.get(url.LESSON_BOOKING.LIST, headerConfig),
                api.get(url.CLASS.LIST_BY_TEACHER, headerConfig),
                api.get(url.TUTOR.BOOKING_WAITING, headerConfig),
                api.get(url.TUTOR.BOOKING_BY_TUTOR, headerConfig),
            ]);

            setTotalClasses(totalClassResponse.data.data);
            setTotalStudentTutoring(totalStudentTutoringResponse.data.data);
            setLessonBooking(lessonBookingResponse.data.data);
            setClasses(classesResponse.data.data);
            setBookingWaitings(bookingWaitingResponse.data.data);
            setTutoring(tutoringResponse.data.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const pendingBookings = bookingWaitings.studentPackageDTOS ? bookingWaitings.studentPackageDTOS.filter((booking) => booking.status === "pending") : [];
    const totalBookingWaiting = pendingBookings.length;

    const generality = [
        {
            title: "Booking Waiting",
            response: formatNumber(totalBookingWaiting),
            icon: "assets/icons/dash-icon-07.svg",
            description: "Number of tutoring registrations.",
            path: config.routes.booking_waiting_list,
        },
        {
            title: "Tutoring of day",
            response: formatNumber(totalStudentTutoring.totalStudents),
            icon: "assets/icons/dash-icon-08.svg",
            description: "Number of students being tutored.",
        },
        {
            title: "Classes",
            response: formatNumber(totalClasses.totalClasses),
            icon: "assets/icons/dash-icon-01.svg",
            description: "Number of classes being taught.",
            path: config.routes.class_list_teacher,
        },
        {
            title: "Tutoring",
            response: formatNumber(tutoring.length),
            icon: "assets/icons/dash-icon-06.svg",
            description: "Number of students being tutored.",
            path: config.routes.tutoring_schedule,
        },
    ];

    const formattedEvents = lessonBooking.map((event) => {
        const formattedStartTime = event.scheduledStartTime.slice(0, 19);
        const formattedEndTime = event.scheduledEndTime.slice(0, 19);

        const isNullEvent = event.path === null;
        const eventTitle = isNullEvent ? "N/A" : event.path;

        return {
            title: eventTitle,
            start: formattedStartTime,
            end: formattedEndTime,
            backgroundColor: isNullEvent ? "#eff0f2" : "#ecfafb",
            textColor: isNullEvent ? "#5b6b79" : "#2ca87f",
            borderColor: isNullEvent ? "#5b6b79" : "#2ca87f",
            isNullEvent: isNullEvent,
        };
    });

    return (
        <Layout title="Dashboard Teacher">
            {generality.map((item, index) => (
                <Generality item={item} key={index} />
            ))}

            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between">
                            <h5 className="mb-0">Classes being taught: {formatNumber(classes.length)}</h5>
                            <div className="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none">
                                <i className="ti ti-dots-vertical f-18"></i>
                            </div>
                        </div>
                        <ul className="list-group list-group-flush">
                            {classes.map((cl, index) => (
                                <li className="list-group-item px-0" key={index}>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <div className="avtar avtar-s border">
                                                <i className="fas fa-user-graduate"></i>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <div className="row g-1">
                                                <div className="col-6">
                                                    <Link to={`/teacher/class/${cl.id}`}>
                                                        <h6 className="mb-0">{cl.name}</h6>
                                                        <p className="text-muted mb-0">
                                                            <small>Room: {cl.roomName}</small>
                                                        </p>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <FullCalendar
                            initialView="dayGridMonth"
                            plugins={[dayGridPlugin, timeGridPlugin]}
                            headerToolbar={{
                                left: "prev,next today",
                                center: "title",
                                right: "dayGridMonth,timeGridWeek",
                            }}
                            eventDisplay="block"
                            displayEventTime={false}
                            events={formattedEvents}
                            eventContent={(arg) => {
                                return { html: arg.event.title };
                            }}
                            eventClick={(info) => {
                                const eventId = info.event.title;
                                if (!info.event.extendedProps.isNullEvent) {
                                    navigate(`/room/${eventId}`);
                                } else {
                                    toast.error("Event not available.");
                                }
                            }}
                            eventBackgroundColor="#ecfafb"
                            eventTextColor="#2ca87f"
                            eventBorderColor="#2ca87f"
                        />
                    </div>
                </div>
            </div>

            <NewsFeed />
        </Layout>
    );
}

export default DashboardTeacher;
