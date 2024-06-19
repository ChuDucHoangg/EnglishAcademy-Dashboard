import { useState } from "react";
import Layout from "../../../layouts";
import { useParams } from "react-router-dom";
import ButtonSubmit from "../../../layouts/ButtonSubmit";
import api from "../../../../services/api";
import url from "../../../../services/url";
import { toast } from "react-toastify";
import useAxiosGet from "../../../../hooks/useAxiosGet";
import { useEffect } from "react";

function CourseTopicEdit() {
    const { courseId } = useParams();
    const { topicSlug } = useParams();

    const topicData = useAxiosGet({
        path: url.TOPIC.DETAIL + `/${topicSlug}`,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const topic = topicData.response || {};

    const [formData, setFormData] = useState({
        name: "",
        orderTop: "",
        courseOnlineId: parseInt(courseId),
    });

    const [formErrors, setFormErrors] = useState({
        name: "",
        orderTop: "",
        courseOnlineId: parseInt(courseId),
    });

    useEffect(() => {
        if (topic) {
            setFormData({
                id: topic.id || "",
                name: topic.name || "",
                orderTop: topic.orderTop || "",
                courseOnlineId: parseInt(courseId),
            });
        }
    }, [courseId, topic]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        let convertedValue = value;
        if (name === "orderTop") {
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

        if (formData.orderTop === "") {
            newErrors.orderTop = "Please enter an order top.";
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const createRequest = await api.put(url.TOPIC.UPDATE, formData);

                if (createRequest.status === 200) {
                    toast.success("Created Item Successfully!", {
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
                        name: "",
                        orderTop: "",
                        courseOnlineId: "",
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
            }
        }
    };

    return (
        <Layout title="Topic Edit">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleUpdate}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="name">
                                                Topic Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
                                                placeholder="Enter topic name"
                                            />
                                            {formErrors.name && <p className="invalid-feedback">{formErrors.name}</p>}
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

                                    <div className="text-end col-md-12">
                                        <ButtonSubmit className="btn-primary" value="Update Topic" handleEvent={handleUpdate} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CourseTopicEdit;
