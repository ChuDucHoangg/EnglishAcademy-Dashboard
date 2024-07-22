import { useEffect, useMemo, useState } from "react";
import Layout from "../../../layouts";
import ButtonSubmit from "../../../layouts/ButtonSubmit";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../services/api";
import url from "../../../../services/url";
import { getAccessToken } from "../../../../utils/auth";
import { toast } from "react-toastify";
import useAxiosGet from "../../../../hooks/useAxiosGet";

function SubjectEdit() {
    const { courseId, subjectSlug } = useParams();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    const subjectDetailData = useAxiosGet({
        path: url.SUBJECT.UPDATE + `/${subjectSlug}`,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const subjectData = useMemo(() => subjectDetailData.response || {}, [subjectDetailData]);

    const [formData, setFormData] = useState({
        id: null,
        name: "",
        orderTop: null,
        totalSlot: null,
        courseOfflineId: null,
    });

    useEffect(() => {
        if (subjectData) {
            setFormData({
                id: subjectData.id || null,
                name: subjectData.name || "",
                orderTop: subjectData.orderTop || null,
                totalSlot: subjectData.totalSlot || null,
                courseOfflineId: courseId,
            });
        }
    }, [subjectData, courseId]);

    const [formErrors, setFormErrors] = useState({
        name: "",
        orderTop: "",
        totalSlot: "",
        courseOfflineId: parseInt(courseId),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        let convertedValue = value;
        if ((name === "orderTop", name === "courseOnlineId", name === "totalSlot")) {
            convertedValue = value ? parseInt(value, 10) : "";
        }

        setFormData({
            ...formData,
            [name]: convertedValue,
        });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (formData.name === "") {
            newErrors.name = "Please enter a topic name.";
            valid = false;
        }

        if (formData.totalSlot === "") {
            newErrors.totalSlot = "Please enter an total slot.";
            valid = false;
        }

        if (formData.orderTop === "") {
            newErrors.orderTop = "Please enter an order top.";
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    const handleEdit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                setSubmitting(true);
                const createRequest = await api.put(url.SUBJECT.UPDATE, formData, { headers: { Authorization: `Bearer ${getAccessToken()}` } });
                if (createRequest.status === 200) {
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

                    setFormData({
                        id: null,
                        name: "",
                        orderTop: null,
                        totalSlot: null,
                        courseOfflineId: null,
                    });

                    navigate(-1);
                }
            } catch (error) {
                toast.error(error.response.data.message, {});
            } finally {
                setSubmitting(false);
            }
        }
    };

    return (
        <Layout title="Subject Edit">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Subject Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
                                        placeholder="Enter order top"
                                    />
                                    {formErrors.name && <p className="invalid-feedback">{formErrors.name}</p>}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Total Slot</label>
                                    <input
                                        type="number"
                                        id="totalSlot"
                                        name="totalSlot"
                                        value={formData.totalSlot}
                                        onChange={handleChange}
                                        className={`form-control ${formErrors.totalSlot ? "is-invalid" : ""}`}
                                        placeholder="Enter order top"
                                    />
                                    {formErrors.totalSlot && <p className="invalid-feedback">{formErrors.totalSlot}</p>}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Order Top</label>
                                    <input
                                        type="number"
                                        id="orderTop"
                                        name="orderTop"
                                        value={formData.orderTop}
                                        onChange={handleChange}
                                        className={`form-control ${formErrors.orderTop ? "is-invalid" : ""}`}
                                        placeholder="Enter order top"
                                    />
                                    {formErrors.orderTop && <p className="invalid-feedback">{formErrors.orderTop}</p>}
                                </div>
                            </div>
                            <div className="text-end col-md-6 mt-auto">
                                <ButtonSubmit className="btn-primary" value="Save Change" valueSubmit="Saving..." icon="ti ti-edit" submitting={submitting} handleEvent={handleEdit} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default SubjectEdit;
