import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import Layout from "../../layouts";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useAxiosGet from "../../../hooks/useAxiosGet";

function TutoringSchedule() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);

    const loadData = async () => {
        try {
            const lessonRequest = await api.get(url.TUTOR.BOOKING_BY_TUTOR, {
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            });

            setBookings(lessonRequest.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const lessonsData = useAxiosGet({
        path: url.LESSON_BOOKING.LIST,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const lessons = lessonsData.response || [];

    useEffect(() => {
        loadData();
    }, []);

    const formattedEvents = lessons.map((event) => {
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
        <Layout title={`Tutoring Schedule`}>
            <div className="col-lg-6 col-12">
                <div className="card">
                    <div class="card-body ">
                        <ul className="p-0">
                            {bookings.map((booking, bookingsIndex) => (
                                <li class="list-group-item" key={bookingsIndex}>
                                    <Link to={`/tutoring-schedule/${booking.id}`}>
                                        <div class="d-flex align-items-center">
                                            <div class="flex-shrink-0">
                                                <div class="avtar avtar-s border">
                                                    <i className="fas fa-graduation-cap"></i>
                                                </div>
                                            </div>
                                            <div class="flex-grow-1 ms-3">
                                                <div class="row g-1">
                                                    <div class="col-6">
                                                        <h6 class="mb-0">{booking.studentName}</h6>
                                                        <p class="text-muted mb-0">
                                                            <small>Status: {booking.status}</small>
                                                        </p>
                                                    </div>
                                                    <div className="col-6 text-end my-auto">
                                                        <i className="ti ti-dots-vertical"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    <ul className="mt-3">
                                        {booking.lessonDays.map((lesson, lessonIndex) => (
                                            <li key={lessonIndex} className="mt-2">
                                                Session {lessonIndex + 1}: {lesson.dayOfWeek} {lesson.startTime} - {lesson.endTime}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-lg-6 col-12">
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
        </Layout>
    );
}

export default TutoringSchedule;
