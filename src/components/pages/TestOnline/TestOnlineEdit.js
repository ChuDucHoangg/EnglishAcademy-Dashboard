import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonSubmit from "../../layouts/ButtonSubmit";
import { toast } from "react-toastify";
import Layout from "../../layouts";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import useAxiosGet from "../../../hooks/useAxiosGet";
import NotFound from "../Other/NotFound";

function TestOnlineEdit() {
    const { testSlug } = useParams();
    const navigate = useNavigate();

    const testDetailData = useAxiosGet({
        path: url.TEST_ONLINE.DETAIL + `/${testSlug}`,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const testDetail = useMemo(() => testDetailData.response || {}, [testDetailData.response]);

    const [formData, setFormData] = useState({
        id: null,
        title: "",
        time: "",
        pastMark: "",
        totalMark: "",
        description: "",
    });

    const [formErrors, setFormErrors] = useState({
        title: "",
        time: "",
        pastMark: "",
        description: "",
    });

    useEffect(() => {
        if (testDetail) {
            setFormData({
                id: testDetail.id || null,
                title: testDetail.title || "",
                time: secondsToTime(testDetail.time) || "",
                pastMark: testDetail.pastMark || "",
                totalMark: 100,
                description: testDetail.description || "",
            });
        }
    }, [testDetail]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        let convertedValue = value;
        if (name === "pastMark" || name === "totalMark") {
            convertedValue = value ? parseInt(value, 10) : "";
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: convertedValue !== "" ? convertedValue : prevFormData[name],
        }));
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

        const timeInSeconds = convertTimeToSeconds(formData.time);
        if (!formData.time) {
            newErrors.time = "Please enter time.";
            valid = false;
        } else if (timeInSeconds === null) {
            newErrors.time = "Time must be in hh:mm:ss format.";
            valid = false;
        }

        if (!formData.pastMark) {
            newErrors.pastMark = "Please enter Pass Mark.";
            valid = false;
        } else if (isNaN(formData.pastMark)) {
            newErrors.pastMark = "Pass Mark must be a number.";
            valid = false;
        } else if (formData.pastMark > 100) {
            newErrors.pastMark = "Points cannot exceed 100.";
            valid = false;
        }

        if (!formData.description) {
            newErrors.description = "Please enter description.";
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const timeInSeconds = convertTimeToSeconds(formData.time);

            const submitData = { ...formData, time: timeInSeconds };

            console.log(submitData);

            try {
                const createRequest = await api.put(url.TEST_ONLINE.EDIT, submitData, {
                    headers: { Authorization: `Bearer ${getAccessToken()}` },
                });

                if (createRequest.status === 200) {
                    toast.success("Updated Test Online!", {
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
                        title: "",
                        time: "",
                        pastMark: "",
                        description: "",
                    });

                    navigate(-1);
                }
            } catch (error) {
                console.log(error);

                toast.error(error.response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }
    };

    return (
        <>
            {testDetailData.errorStatus === 404 ? (
                <NotFound />
            ) : (
                <Layout title="Edit Test Online">
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
                                                value={formData.title || ""}
                                                className={`form-control ${formErrors.title ? "is-invalid" : ""}`}
                                                onChange={handleChange}
                                                placeholder="Enter Test Title"
                                                autoFocus
                                            />
                                            {formErrors.title && <p className="invalid-feedback">{formErrors.title}</p>}
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                name="description"
                                                rows="3"
                                                className={`form-control ${formErrors.description ? "is-invalid" : ""}`}
                                                value={formData.description || ""}
                                                onChange={handleChange}
                                            ></textarea>
                                            {formErrors.description && <p className="invalid-feedback">{formErrors.description}</p>}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label">
                                                Test Duration <span className="text-secondary">(hh:mm:ss)</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="time"
                                                className={`form-control ${formErrors.time ? "is-invalid" : ""}`}
                                                value={formData.time || ""}
                                                onChange={handleChange}
                                                placeholder="Enter Test Duration"
                                            />
                                            {formErrors.time && <p className="invalid-feedback">{formErrors.time}</p>}
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Pass Mark</label>
                                            <input
                                                type="text"
                                                name="pastMark"
                                                className={`form-control ${formErrors.pastMark ? "is-invalid" : ""}`}
                                                value={formData.pastMark || ""}
                                                onChange={handleChange}
                                                placeholder="Enter Pass Mark"
                                            />
                                            {formErrors.pastMark && <p className="invalid-feedback">{formErrors.pastMark}</p>}
                                        </div>
                                    </div>

                                    <div className="col-md-6"></div>

                                    <div className="col-md-6 mt-auto">
                                        <div className="text-end btn-page ">
                                            <ButtonSubmit className="btn-primary" value="Create New Test" icon="ti ti-plus" handleEvent={handleSubmit} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            )}
        </>
    );
}

export default TestOnlineEdit;
