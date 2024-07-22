import { useEffect, useMemo, useState } from "react";
import Layout from "../../layouts";
import ButtonSubmit from "../../layouts/ButtonSubmit";
import url from "../../../services/url";
import api from "../../../services/api";
import { getAccessToken } from "../../../utils/auth";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../../config";
import useAxiosGet from "../../../hooks/useAxiosGet";

function EntranceTestEdit() {
    const { testSlug } = useParams();
    const navigate = useNavigate();

    const testDetailData = useAxiosGet({
        path: `${url.ENTRANCE_TEST.DETAIL}/${testSlug}`,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const testDetail = useMemo(() => testDetailData.response || {}, [testDetailData]);

    const [formData, setFormData] = useState({
        id: null,
        title: "",
        time: "",
        type: "",
        description: "",
        totalQuestion: null,
    });

    const [formErrors, setFormErrors] = useState({
        title: "",
        time: "",
        type: "",
        description: "",
        totalQuestion: null,
    });

    useEffect(() => {
        if (testDetail && Object.keys(testDetail).length > 0) {
            setFormData({
                id: testDetail.id || null,
                title: testDetail.title || "",
                time: secondsToTime(testDetail.time) || "",
                type: testDetail.type !== undefined ? testDetail.type : "",
                totalQuestion: testDetail.totalQuestion || null,
                description: testDetail.description || "",
            });
        }
    }, [testDetail]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const convertTimeToSeconds = (time) => {
        const timeParts = time.split(":");
        if (timeParts.length === 3) {
            const hours = parseInt(timeParts[0], 10);
            const minutes = parseInt(timeParts[1], 10);
            const seconds = parseInt(timeParts[2], 10);

            if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
                return hours * 3600 + minutes * 60 + seconds;
            }
        }
        return null;
    };

    const secondsToTime = (seconds) => {
        const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
        const secs = String(seconds % 60).padStart(2, "0");
        return `${hours}:${minutes}:${secs}`;
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.title) {
            newErrors.title = "Please enter title.";
            valid = false;
        } else if (formData.title.length < 3) {
            newErrors.title = "Title must be at least 3 characters.";
            valid = false;
        } else if (formData.title.length > 255) {
            newErrors.title = "Title must be less than 255 characters.";
            valid = false;
        }

        if (formData.type === "" || formData.type === null) {
            newErrors.type = "Please choose type test.";
            valid = false;
        }

        const timeInSeconds = convertTimeToSeconds(formData.time);
        if (!formData.time) {
            newErrors.time = "Please enter time.";
            valid = false;
        } else if (timeInSeconds === null) {
            newErrors.time = "Time must be in hh:mm:ss format.";
            valid = false;
        }

        if (!formData.description) {
            newErrors.description = "Please enter description.";
            valid = false;
        }

        if (!formData.totalQuestion) {
            newErrors.totalQuestion = "Please enter total question.";
            valid = false;
        } else if (isNaN(formData.totalQuestion)) {
            newErrors.totalQuestion = "Total question must be a number.";
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const timeInSeconds = convertTimeToSeconds(formData.time);

            const formDataToSend = {
                ...formData,
                time: timeInSeconds,
            };

            try {
                const updateRequest = await api.put(url.ENTRANCE_TEST.UPDATE, formDataToSend, { headers: { Authorization: `Bearer ${getAccessToken()}`, "Content-Type": "application/json" } });

                if (updateRequest.status === 200) {
                    toast.success("Updated Successfully!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                    setFormData({
                        id: null,
                        title: "",
                        time: "",
                        type: "",
                        description: "",
                        totalQuestion: null,
                    });

                    navigate(config.routes.entrance_test);
                }
            } catch (error) {
                console.log(error);

                toast.error(error.response?.data?.data || "Update failed. Please try again.", {
                    position: "top-right",
                });
            }
        }
    };

    const typeTest = [
        { title: "Toeic", value: 0 },
        { title: "Ielts", value: 1 },
    ];

    return (
        <Layout title="Edit Entrance Test">
            <form onSubmit={handleSubmit}>
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            className={`form-control ${formErrors.title ? "is-invalid" : ""}`}
                                            onChange={handleChange}
                                            placeholder="Enter Test Title"
                                            autoFocus
                                        />
                                        {formErrors.title && <p className="invalid-feedback">{formErrors.title}</p>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            Test Duration <span className="text-secondary">(hh:mm:ss)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="time"
                                            className={`form-control ${formErrors.time ? "is-invalid" : ""}`}
                                            value={formData.time}
                                            onChange={handleChange}
                                            placeholder="Enter Test Duration"
                                        />
                                        {formErrors.time && <p className="invalid-feedback">{formErrors.time}</p>}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Type</label>
                                        <select name="type" className={`form-select ${formErrors.type ? "is-invalid" : ""}`} value={formData.type} onChange={handleChange}>
                                            <option value="">Choose Type</option>
                                            {typeTest.map((type, index) => (
                                                <option value={type.value} key={index}>
                                                    {type.title}
                                                </option>
                                            ))}
                                        </select>
                                        {formErrors.type && <p className="invalid-feedback">{formErrors.type}</p>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Total Question</label>
                                        <input
                                            type="number"
                                            name="totalQuestion"
                                            className={`form-control ${formErrors.totalQuestion ? "is-invalid" : ""}`}
                                            value={formData.totalQuestion}
                                            onChange={handleChange}
                                            placeholder="Enter Total Question"
                                        />
                                        {formErrors.totalQuestion && <p className="invalid-feedback">{formErrors.totalQuestion}</p>}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            name="description"
                                            rows="3"
                                            className={`form-control ${formErrors.description ? "is-invalid" : ""}`}
                                            value={formData.description}
                                            onChange={handleChange}
                                        ></textarea>
                                        {formErrors.description && <p className="invalid-feedback">{formErrors.description}</p>}
                                    </div>
                                </div>

                                <div className="col-md-6 mt-auto">
                                    <div className="text-end btn-page">
                                        <ButtonSubmit className="btn-primary" value="Update This Test" icon="ti ti-plus" handleEvent={handleSubmit} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    );
}

export default EntranceTestEdit;
