import { useEffect, useState } from "react";
import Layout from "../../layouts";
import ButtonSubmit from "../../layouts/ButtonSubmit";
import { getAccessToken } from "../../../utils/auth";
import api from "../../../services/api";
import url from "../../../services/url";
import ReactSelect from "react-select";

function ClassCreate() {
    const [courses, setCourses] = useState([]);
    const [rooms, setRooms] = useState([]);
    // const [teachers, setTeachers] = useState([]);

    const loadData = async () => {
        try {
            const headerConfig = {
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            };

            const [coursesResponse, roomResponse] = await Promise.all([api.get(url.COURSE_OFFLINE.LIST, headerConfig), api.get(url.ROOM.LIST, headerConfig)]);

            setCourses(coursesResponse.data.data);
            setRooms(roomResponse.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const roomOptions = rooms.map((room) => ({
        value: room.id,
        label: room.name,
    }));

    const courseOptions = courses.map((course) => ({
        value: course.id,
        label: course.name,
    }));

    // const [formData, setFormData] = useState({
    //     courseOfflineId: null,
    //     teacherId: null,
    //     roomId: null,
    //     studentIds: [null],
    //     name: "",
    // });

    return (
        <Layout title="Create Class">
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">
                                        Class Name<span className="text-danger">*</span>
                                    </label>
                                    <input type="text" name="name" className={`form-control`} style={{ height: 38 }} placeholder="Enter Class Name" autoFocus />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        Room
                                        <span className="text-danger">*</span>
                                    </label>
                                    <ReactSelect options={roomOptions} placeholder="Please Choose Room" />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">
                                        Course Offline
                                        <span className="text-danger">*</span>
                                    </label>
                                    <ReactSelect options={courseOptions} placeholder="Please Choose Course" />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        Teacher
                                        <span className="text-danger">*</span>
                                    </label>
                                    <ReactSelect placeholder="Please Choose Teacher" />
                                </div>
                            </div>

                            <div className="text-end btn-page mb-0 mt-5">
                                <ButtonSubmit className="btn-primary" value="Create Class" icon="ti ti-plus" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default ClassCreate;
