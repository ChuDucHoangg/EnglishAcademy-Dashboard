import React, { useState } from "react";
import { getAccessToken, getDecodedToken } from "../../../utils/auth";
import Layout from "../../layouts/index";
import { levelCourse } from "../../../utils/formatLevelCourse";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import url from "../../../services/url";
import api from "../../../services/api";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ButtonSubmit from "../../layouts/ButtonSubmit";

function TutorRegistration() {
    const decodeToken = getDecodedToken();
    const levels = levelCourse();

    const initialFormData = {
        teachingSubject: "",
        hourlyRate: "",
        level: "",
        phone: "",
        address: "",
        cetificate: "",
        experience: "",
        avatar: null,
        avatarPreview: null,
        errors: {},
    };

    const [formData, setFormData] = useState(initialFormData);
    const [submitting, setSubmitting] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData({ ...formData, avatar: file, avatarPreview: URL.createObjectURL(file) });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.teachingSubject) newErrors.teachingSubject = "Teaching subject is required";
        if (!formData.hourlyRate) newErrors.hourlyRate = "Hourly rate is required";
        if (!formData.level) newErrors.level = "Level is required";
        if (!formData.phone) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[0-9]{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone number must be 10 digits long and contain only numbers";
        }
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.cetificate) newErrors.cetificate = "Certificate is required";
        if (!formData.experience) newErrors.experience = "Experience is required";
        if (!formData.avatar) newErrors.avatar = "Avatar is required";
        setFormData({ ...formData, errors: newErrors });
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        const formDataToSend = new FormData();
        formDataToSend.append("userId", decodeToken.Id);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("level", formData.level);
        formDataToSend.append("avatar", formData.avatar);
        formDataToSend.append("address", formData.address);
        formDataToSend.append("cetificate", formData.cetificate);
        formDataToSend.append("experience", formData.experience);
        formDataToSend.append("teachingSubject", formData.teachingSubject);
        formDataToSend.append("hourlyRate", formData.hourlyRate);
        setSubmitting(true);
        try {
            const response = await api.post(url.TUTOR.TUTOR_REGISTRATION, formDataToSend, { headers: { Authorization: `Bearer ${getAccessToken()}` } });

            if (response.status === 200) {
                Swal.fire({
                    title: "Registration successful!",
                    text: "We will notify you of the results as soon as possible!",
                    icon: "success",
                });

                setFormData(initialFormData);
            }
        } catch (error) {
            if (error.response.status === 404) {
                Swal.fire({
                    title: "Registration error!",
                    text: "You are already a tutor. Cannot re-register!",
                    icon: "error",
                });
            } else {
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
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Layout title="Tutor Registration">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h5>Personal Information</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-lg-2 col-sm-6 mb-3">
                                    <div className="user-upload ">
                                        {formData.avatarPreview ? (
                                            <img src={formData.avatarPreview} alt="Avatar Preview" className="img-fluid wid-150 hei-150 object-fit-cover" />
                                        ) : (
                                            <img src="../assets/images/user/user-placeholder.png" alt="Placeholder" className="img-fluid wid-150 hei-150 object-fit-cover" />
                                        )}

                                        <label htmlFor="uplfile" className="img-avtar-upload">
                                            <i className="ti ti-camera f-24 mb-1"></i> <span>Upload</span>
                                        </label>

                                        <input type="file" id="uplfile" className="d-none" onChange={handleFileChange} />
                                    </div>
                                    {formData.errors.avatar && <div className="text-danger">{formData.errors.avatar}</div>}
                                </div>

                                <div className="col-lg-10 col-sm-6 my-3">
                                    <h2>{decodeToken.Fullname || "Loading..."}</h2>
                                    <p>{decodeToken.Email || "Loading..."}</p>
                                </div>

                                <div className="col-sm-6">
                                    <div className="mb-4">
                                        <label className="form-label">Teaching Subject</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Ex: English"
                                            value={formData.teachingSubject}
                                            onChange={(e) => setFormData({ ...formData, teachingSubject: e.target.value })}
                                        />
                                        {formData.errors.teachingSubject && <div className="text-danger">{formData.errors.teachingSubject}</div>}
                                    </div>
                                </div>

                                <div className="col-sm-3">
                                    <div className="mb-4">
                                        <label className="form-label">Hourly Rate</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Ex: 02"
                                            value={formData.hourlyRate}
                                            onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                                        />
                                        {formData.errors.hourlyRate && <div className="text-danger">{formData.errors.hourlyRate}</div>}
                                    </div>
                                </div>

                                <div className="col-sm-3">
                                    <div className="mb-4">
                                        <label className="form-label">Level</label>
                                        <select className="form-control" value={formData.level} onChange={(e) => setFormData({ ...formData, level: e.target.value })}>
                                            <option value="">Choose option</option>
                                            {levels.map((level, index) => (
                                                <option value={level.level} key={index}>
                                                    {level.title}
                                                </option>
                                            ))}
                                        </select>
                                        {formData.errors.level && <div className="text-danger">{formData.errors.level}</div>}
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="mb-4">
                                        <label className="form-label">Phone Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Ex: 234234"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                        {formData.errors.phone && <div className="text-danger">{formData.errors.phone}</div>}
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="mb-4">
                                        <label className="form-label">Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Ex: Ton That Thuyet, Ha Noi"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        />
                                        {formData.errors.address && <div className="text-danger">{formData.errors.address}</div>}
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="mb-3">
                                        <label className="form-label">Certificate</label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={formData.cetificate}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setFormData({ ...formData, cetificate: data });
                                            }}
                                        />
                                        {formData.errors.cetificate && <div className="text-danger">{formData.errors.cetificate}</div>}
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="mb-3">
                                        <label className="form-label">Experience</label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={formData.experience}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setFormData({ ...formData, experience: data });
                                            }}
                                        />
                                        {formData.errors.experience && <div className="text-danger">{formData.errors.experience}</div>}
                                    </div>
                                </div>

                                <div className="text-end">
                                    <ButtonSubmit className="btn-primary" handleEvent={handleSubmit} submitting={submitting} value="Submit" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default TutorRegistration;
