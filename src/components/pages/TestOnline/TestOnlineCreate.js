import { useRef, useState } from "react";
import Layout from "../../layouts";
import ButtonSubmit from "../../layouts/ButtonSubmit";
import url from "../../../services/url";
import api from "../../../services/api";
import { getAccessToken } from "../../../utils/auth";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function TestOnlineCreate() {
    const { topicId } = useParams();
    const fileInputRef = useRef();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        time: "",
        pastMark: "",
        description: "",
        file: null,
    });

    const [formErrors, setFormErrors] = useState({
        title: "",
        time: "",
        pastMark: "",
        description: "",
        file: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        let convertedValue = value;
        if (name === "pastMark" || name === "totalMark") {
            convertedValue = value ? parseInt(value, 10) : "";
        }

        setFormData({
            ...formData,
            [name]: convertedValue,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            file: e.target.files[0],
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

        const allowedExtensions = ["xlsx", "xls", "xlsm"];
        if (!formData.file) {
            newErrors.file = "Please choose question file.";
            valid = false;
        } else {
            const fileExtension = formData.file.name.split(".").pop().toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                newErrors.file = "Invalid file format. Only .xlsx, .xls, .xlsm are allowed.";
                valid = false;
            }
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

            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title);
            formDataToSend.append("time", timeInSeconds);
            formDataToSend.append("pastMark", formData.pastMark);
            formDataToSend.append("totalMark", 100);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("file", formData.file);
            formDataToSend.append("topicId", topicId);

            try {
                const createRequest = await api.post(url.TEST_ONLINE.CREATE, formDataToSend, { headers: { Authorization: `Bearer ${getAccessToken()}`, "Content-Type": "multipart/form-data" } });

                if (createRequest.status === 200) {
                    toast.success("Created Test Online!", {
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
                        totalMark: "",
                        description: "",
                        file: null,
                    });

                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }

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
        <Layout title="Create Test Online">
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
                                        <label className="form-label">Pass Mark</label>
                                        <input
                                            type="text"
                                            name="pastMark"
                                            className={`form-control ${formErrors.pastMark ? "is-invalid" : ""}`}
                                            value={formData.pastMark}
                                            onChange={handleChange}
                                            placeholder="Enter Pass Mark"
                                        />
                                        {formErrors.pastMark && <p className="invalid-feedback">{formErrors.pastMark}</p>}
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
                                            value={formData.time}
                                            onChange={handleChange}
                                            placeholder="Enter Test Duration"
                                        />
                                        {formErrors.time && <p className="invalid-feedback">{formErrors.time}</p>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Question file</label>
                                        <input ref={fileInputRef} type="file" name="file" className={`form-control ${formErrors.file ? "is-invalid" : ""}`} onChange={handleFileChange} />
                                        {formErrors.file && <p className="invalid-feedback">{formErrors.file}</p>}
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

                                <div className="col-md-6">
                                    <div className="text-end btn-page ">
                                        <ButtonSubmit className="btn-primary" value="Create New Test" icon="ti ti-plus" handleEvent={handleSubmit} />
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

export default TestOnlineCreate;
