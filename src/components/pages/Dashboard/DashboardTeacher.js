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

function DashboardTeacher() {
    const [totalClasses, setTotalClasses] = useState({});
    const [totalStudentTutoring, setTotalStudentTutoring] = useState({});
    const [lessonBooking, setLessonBooking] = useState([]);

    const loadData = useCallback(async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            };

            const totalClassRequest = await api.get(url.DASHBOARD_TEACHER.TOTAL_CLASS, config);
            const totalStudentTutoringRequest = await api.get(url.DASHBOARD_TEACHER.COUNT_STUDENT_STUDYING, config);

            const lessonBookingRequest = await api.get(url.LESSON_BOOKING.LIST, config);

            setTotalClasses(totalClassRequest.data.data);
            setTotalStudentTutoring(totalStudentTutoringRequest.data.data);
            setLessonBooking(lessonBookingRequest.data.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const generality = [
        {
            title: "Booking Waiting",
            response: formatNumber(totalClasses.totalClasses),
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
            response: formatNumber(5),
            icon: "assets/icons/dash-icon-01.svg",
            description: "Number of classes being taught.",
            path: config.routes.class_list_teacher,
        },
        {
            title: "Tutoring",
            response: formatNumber(9),
            icon: "assets/icons/dash-icon-06.svg",
            description: "Number of students being tutored.",
            path: config.routes.tutoring_schedule,
        },
    ];

    const formattedEvents = lessonBooking.map((event) => {
        const formattedStartTime = event.scheduledStartTime.slice(0, 19);
        const formattedEndTime = event.scheduledEndTime.slice(0, 19);

        const isNullEvent = event.path === null;
        const eventTitle = isNullEvent ? "N/A" : `room: ${event.path}`;

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
            <>
                {generality.map((item, index) => (
                    <Generality item={item} key={index} />
                ))}

                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h5 className="mb-0">Classes during the day</h5>
                                <div className="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none">
                                    <i className="ti ti-dots-vertical f-18"></i>
                                </div>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item px-0">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <div className="avtar avtar-s border">AI</div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <div className="row g-1">
                                                <div className="col-6">
                                                    <h6 className="mb-0">Apple Inc.</h6>
                                                    <p className="text-muted mb-0">
                                                        <small>#ABLE-PRO-T00232</small>
                                                    </p>
                                                </div>
                                                <div className="col-6 text-end">
                                                    <h6 className="mb-1">$210,000</h6>
                                                    <p className="text-danger mb-0">
                                                        <i className="ti ti-arrow-down-left"></i> 10.6%
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item px-0">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <div className="avtar avtar-s border" data-bs-toggle="tooltip" data-bs-title="10,000 Tracks">
                                                <span>SM</span>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <div className="row g-1">
                                                <div className="col-6">
                                                    <h6 className="mb-0">Spotify Music</h6>
                                                    <p className="text-muted mb-0">
                                                        <small>#ABLE-PRO-T10232</small>
                                                    </p>
                                                </div>
                                                <div className="col-6 text-end">
                                                    <h6 className="mb-1">- 10,000</h6>
                                                    <p className="text-success mb-0">
                                                        <i className="ti ti-arrow-up-right"></i> 30.6%
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item px-0">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <div className="avtar avtar-s border bg-light-primary" data-bs-toggle="tooltip" data-bs-title="143 Posts">
                                                <span>MD</span>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <div className="row g-1">
                                                <div className="col-6">
                                                    <h6 className="mb-0">Medium</h6>
                                                    <p className="text-muted mb-0">
                                                        <small>06:30 pm</small>
                                                    </p>
                                                </div>
                                                <div className="col-6 text-end">
                                                    <h6 className="mb-1">-26</h6>
                                                    <p className="text-warning mb-0">
                                                        <i className="ti ti-arrows-left-right"></i> 5%
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item px-0">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <div className="avtar avtar-s border" data-bs-toggle="tooltip" data-bs-title="143 Posts">
                                                <span>U</span>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <div className="row g-1">
                                                <div className="col-6">
                                                    <h6 className="mb-0">Uber</h6>
                                                    <p className="text-muted mb-0">
                                                        <small>08:40 pm</small>
                                                    </p>
                                                </div>
                                                <div className="col-6 text-end">
                                                    <h6 className="mb-1">+210,000</h6>
                                                    <p className="text-success mb-0">
                                                        <i className="ti ti-arrow-up-right"></i> 10.6%
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item px-0">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <div className="avtar avtar-s border bg-light-warning" data-bs-toggle="tooltip" data-bs-title="143 Posts">
                                                <span>OC</span>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <div className="row g-1">
                                                <div className="col-6">
                                                    <h6 className="mb-0">Ola Cabs</h6>
                                                    <p className="text-muted mb-0">
                                                        <small>07:40 pm</small>
                                                    </p>
                                                </div>
                                                <div className="col-6 text-end">
                                                    <h6 className="mb-1">+210,000</h6>
                                                    <p className="text-success mb-0">
                                                        <i className="ti ti-arrow-up-right"></i> 10.6%
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
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
                                eventBackgroundColor="#ecfafb"
                                eventTextColor="#2ca87f"
                                eventBorderColor="#2ca87f"
                            />
                        </div>
                    </div>
                </div>
            </>

            <NewsFeed />
        </Layout>
    );
}

export default DashboardTeacher;
