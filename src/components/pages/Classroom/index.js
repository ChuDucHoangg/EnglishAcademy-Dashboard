import Layout from "../../layouts";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState, useEffect } from "react";
import { getAccessToken } from "../../../utils/auth";
import api from "../../../services/api";
import url from "../../../services/url";

function Classroom() {
    const [rooms, setRooms] = useState([]);
    const [activeRoom, setActiveRoom] = useState(null);

    const loadData = async () => {
        try {
            const headerConfig = {
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            };

            const [roomResponse] = await Promise.all([api.get(url.ROOM.LIST, headerConfig)]);

            setRooms(roomResponse.data.data);
            setActiveRoom(roomResponse.data.data[0]?.id);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <Layout title="List of classrooms">
            <div className="row">
                <div className="col-lg-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5>Room List</h5>
                            <p className="mb-4">Click on a room to see that room's calendar.</p>
                            <ul className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                {rooms.map((room, roomIndex) => (
                                    <li key={room.id}>
                                        <a
                                            className={`nav-link p-3 mb-2 ${activeRoom === room.id ? "active" : ""}`}
                                            id={`v-pills-${room.id}-tab`}
                                            data-bs-toggle="pill"
                                            href="!#"
                                            role="tab"
                                            aria-controls={`v-pills-${room.id}`}
                                            aria-selected={activeRoom === room.id}
                                            onClick={() => setActiveRoom(room.id)}
                                        >
                                            Room {roomIndex + 1}: {room.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="card h-100">
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
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Classroom;
