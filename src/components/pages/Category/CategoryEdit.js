import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../layouts";
import useAxiosGet from "../../../hooks/useAxiosGet";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../../services/api";
import { toast } from "react-toastify";
import config from "../../../config";
import ButtonSubmit from "../../layouts/ButtonSubmit";

function CategoryEdit() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const categoryData = useAxiosGet({
        path: url.CATEGORY.DETAIL + `/${slug}`,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const [categoryName, setCategoryName] = useState("");

    const categoryDetail = categoryData.response || {};
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (categoryData.response) {
            setCategoryName(categoryData.response.name);
        }
    }, [categoryData.response]);

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!categoryName) {
            newErrors.categoryName = "The category field cannot be left blank.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleEditCategory = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            setSubmitting(true);

            const data = {
                id: categoryDetail.id,
                name: categoryName,
            };

            const editRequest = await api.put(url.CATEGORY.EDIT, data, {
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            });

            if (editRequest.status === 200) {
                navigate(config.routes.category_list);
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
    };

    return (
        <Layout title="Category Edit">
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
                                    onChange={(e) => setCategoryName(e.target.value)}
                                />
                                {errors.categoryName && <div className="text-danger mt-2">{errors.categoryName}</div>}
                            </div>

                            <div className="col-md-6">
                                <ButtonSubmit submitting={submitting} handleEvent={handleEditCategory} value="Save Change" className="btn-primary" style={{ height: 48 }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CategoryEdit;
