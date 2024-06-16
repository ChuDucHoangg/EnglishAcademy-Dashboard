import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../layouts";
import { getAccessToken } from "../../../utils/auth";
import api from "../../../services/api";
import url from "../../../services/url";
import ButtonSubmit from "../../layouts/ButtonSubmit";
import config from "../../../config";

function LessonBookingEdit() {
    const { bookingId } = useParams();
    const navigate = useNavigate();

    const [path, setPath] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        if (path.trim() === "") {
            errors.path = "Room code is required.";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleUpdate = async () => {
        if (validateForm()) {
            try {
                const data = {
                    id: bookingId,
                    path: path,
                };

                setSubmitting(true);
                const updateRequest = await api.put(url.TUTOR.BOOKING_ROOM, data, { headers: { Authorization: `Bearer ${getAccessToken()}` } });

                if (updateRequest.status === 200) {
                    navigate(config.routes.booking_list);
                    toast.success("Updated successfully!", {
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
            } catch (error) {
                toast.error("Error! An error occurred. Please try again later!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } finally {
                setSubmitting(false);
            }
        }
    };

    const generateRoomCode = () => {
        const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
        setPath(randomCode);
    };

    return (
        <Layout title="Booking Edit">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <label className="form-label" htmlFor="room">
                                    Room code
                                </label>
                                <div className="col-md-6">
                                    <input type="text" id="room" className={`form-control ${formErrors.path ? "is-invalid" : ""}`} value={path} onChange={(e) => setPath(e.target.value)} />
                                    {formErrors.path && <p className="invalid-feedback">{formErrors.path}</p>}
                                </div>
                                <div className="col-md-3">
                                    <button type="button" className="btn btn-secondary" onClick={generateRoomCode} style={{ height: 48 }}>
                                        Generate
                                    </button>
                                </div>
                                <div className="col-md-3">
                                    <ButtonSubmit submitting={submitting} handleEvent={handleUpdate} value="Save Change" className="btn-primary" style={{ height: 48 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default LessonBookingEdit;
