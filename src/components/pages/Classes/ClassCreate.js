import { useEffect, useState } from "react";
import Layout from "../../layouts";
import ButtonSubmit from "../../layouts/ButtonSubmit";
import { getAccessToken } from "../../../utils/auth";
import api from "../../../services/api";
import url from "../../../services/url";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import config from "../../../config";
import { useNavigate } from "react-router-dom";

function ClassCreate() {
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);

    const loadData = async () => {
        try {
            const headerConfig = {
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            };

            const [coursesResponse, roomResponse, teachersResponse, studentResponse] = await Promise.all([
                api.get(url.COURSE_OFFLINE.LIST, headerConfig),
                api.get(url.ROOM.LIST, headerConfig),
                api.get(url.TEACHER.LIST, headerConfig),
                api.get(url.STUDENT.LIST, headerConfig),
            ]);

            setCourses(coursesResponse.data.data);
            setRooms(roomResponse.data.data);
            setTeachers(teachersResponse.data.data);
            setStudents(studentResponse.data.data);
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

    const teacherOptions = teachers.map((teacher) => ({
        value: teacher.id,
        label: `${teacher.fullName} - ${teacher.code}`,
    }));

    const studentOptions = students.map((student) => ({
        value: student.id,
        label: `${student.fullName} - ${student.code}`,
    }));

    const [formData, setFormData] = useState({
        courseOfflineId: null,
        teacherId: null,
        roomId: null,
        studentIds: [],
        name: "",
    });

    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSelectChange = (selectedOption, { name }) => {
        const value = Array.isArray(selectedOption) ? selectedOption.map((option) => option.value) : selectedOption?.value || null;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = "Please enter name.";
            valid = false;
        } else if (formData.name.length < 3) {
            newErrors.name = "Name must be at least 3 characters.";
            valid = false;
        } else if (formData.name.length > 255) {
            newErrors.name = "Name must be less than 255 characters.";
            valid = false;
        }

        if (!formData.courseOfflineId) {
            newErrors.courseOfflineId = "Please choose a course.";
            valid = false;
        }

        if (!formData.teacherId) {
            newErrors.teacherId = "Please choose a teacher.";
            valid = false;
        }

        if (!formData.roomId) {
            newErrors.roomId = "Please choose a room.";
            valid = false;
        }

        if (formData.studentIds.length === 0) {
            newErrors.studentIds = "Please choose at least one student.";
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    const handleCreateClass = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const headerConfig = {
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            };
            const createRequest = await api.post(url.CLASS.CREATE_BY_ADMIN, formData, headerConfig);

            if (createRequest.status === 200) {
                toast.success("Created successfully!");
                setFormData({
                    courseOfflineId: null,
                    teacherId: null,
                    roomId: null,
                    studentIds: [],
                    name: "",
                });

                navigate(config.routes.class_list);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <Layout title="Create Class">
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleCreateClass}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">
                                        Class Name<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
                                        style={{ height: 38 }}
                                        placeholder="Enter Class Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        autoFocus
                                    />
                                    {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        Room<span className="text-danger">*</span>
                                    </label>
                                    <ReactSelect options={roomOptions} placeholder="Please Choose Room" name="roomId" onChange={handleSelectChange} className={formErrors.roomId ? "is-invalid" : ""} />
                                    {formErrors.roomId && <div className="invalid-feedback d-block">{formErrors.roomId}</div>}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">
                                        Course Offline<span className="text-danger">*</span>
                                    </label>
                                    <ReactSelect
                                        options={courseOptions}
                                        placeholder="Please Choose Course"
                                        name="courseOfflineId"
                                        onChange={handleSelectChange}
                                        className={formErrors.courseOfflineId ? "is-invalid" : ""}
                                    />
                                    {formErrors.courseOfflineId && <div className="invalid-feedback d-block">{formErrors.courseOfflineId}</div>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        Teacher<span className="text-danger">*</span>
                                    </label>
                                    <ReactSelect
                                        placeholder="Please Choose Teacher"
                                        options={teacherOptions}
                                        name="teacherId"
                                        onChange={handleSelectChange}
                                        className={formErrors.teacherId ? "is-invalid" : ""}
                                    />
                                    {formErrors.teacherId && <div className="invalid-feedback d-block">{formErrors.teacherId}</div>}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">
                                        Students<span className="text-danger">*</span>
                                    </label>
                                    <ReactSelect
                                        placeholder="Please Choose Student"
                                        isMulti
                                        options={studentOptions}
                                        name="studentIds"
                                        onChange={handleSelectChange}
                                        className={formErrors.studentIds ? "is-invalid" : ""}
                                    />
                                    {formErrors.studentIds && <div className="invalid-feedback d-block">{formErrors.studentIds}</div>}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="text-end btn-page mb-0 mt-5">
                                        <ButtonSubmit type="submit" className="btn-primary" value="Create Class" icon="ti ti-plus" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default ClassCreate;
