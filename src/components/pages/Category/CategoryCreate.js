import { useState } from "react";
import Layout from "../../layouts";
import ButtonSubmit from "../../layouts/ButtonSubmit";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import { toast } from "react-toastify";
import config from "../../../config";
import { useNavigate } from "react-router-dom";

function CategoryCreate() {
    const navigate = useNavigate();

    const [categoryName, setCategoryName] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!categoryName) {
            newErrors.categoryName = "The category field cannot be left blank.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreate = async () => {
        if (validateForm()) {
            try {
                setSubmitting(true);
                const data = {
                    name: categoryName,
                };
                const createRequest = await api.post(url.CATEGORY.CREATE, data, { headers: { Authorization: `Bearer ${getAccessToken()}` } });

                if (createRequest.status === 200) {
                    setCategoryName("");
                    navigate(config.routes.category_list);

                    toast.success("Created successfully!", {
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

    return (
        <Layout title="Category Create">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <label className="form-label" htmlFor="category">
                                Category Name
                            </label>

                            <div className="col-md-6">
                                <input
                                    type="text"
                                    id="category"
                                    className={`form-control ${errors.categoryName ? "is-invalid" : ""}`}
                                    value={categoryName}
                                    placeholder="Enter category name"
                                    onChange={(e) => setCategoryName(e.target.value)}
                                />
                                {errors.categoryName && <div className="text-danger mt-2">{errors.categoryName}</div>}
                            </div>

                            <div className="col-md-6">
                                <ButtonSubmit submitting={submitting} handleEvent={handleCreate} value="Create Category" className="btn-primary" style={{ height: 48 }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CategoryCreate;
