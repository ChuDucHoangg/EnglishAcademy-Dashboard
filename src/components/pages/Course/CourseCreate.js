import { useState } from "react";
import Layout from "../../layouts";
import { useNavigate } from "react-router-dom";
import url from "../../../services/url";
import api from "../../../services/api";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";
import { getAccessToken } from "../../../utils/auth";
import { formatLevelCourse, levelCourse } from "../../../utils/formatLevelCourse";
import config from "../../../config";
import useAxiosGet from "../../../hooks/useAxiosGet";
import ButtonSubmit from "../../layouts/ButtonSubmit";

function CourseCreate() {
    // Call API categories
    const categoriesData = useAxiosGet({
        path: url.CATEGORY.LIST,
    });

    const categories = categoriesData.response || [];

    const [form, setForm] = useState({
        name: "",
        image: null,
        price: "",
        description: "",
        level: "",
        language: "",
        trailer: "",
        categoryId: null,
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    //show video trailer
    const [videoUrl, setVideoUrl] = useState("");

    const levels = levelCourse();

    //validate
    const validateForm = () => {
        let valid = true;
        const newErrors = {};
        if (!form.name) {
            newErrors.name = "Please enter name.";
            valid = false;
        } else if (form.name.length < 3) {
            newErrors.name = "Name must be at least 3 characters.";
            valid = false;
        } else if (form.name.length > 255) {
            newErrors.name = "Name must be less than 255 characters.";
            valid = false;
        }
        if (form.image === null) {
            newErrors.image = "Please choose image course.";
            valid = false;
        }
        if (form.price === "") {
            newErrors.price = "Please enter price.";
            valid = false;
        }
        if (form.description === "") {
            newErrors.description = "Please enter description.";
            valid = false;
        }
        if (form.level === "") {
            newErrors.level = "Please choose level.";
            valid = false;
        }
        if (form.language === "") {
            newErrors.language = "Please enter language.";
            valid = false;
        }
        if (form.categoryId === null) {
            newErrors.categoryId = "Please choose category.";
            valid = false;
        }
        if (form.trailer === "") {
            newErrors.trailer = "Please enter trailer.";
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    //handle add course
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = validateForm();

        if (isFormValid) {
            try {
                const response = await api.post(url.COURSE.CREATE, form, {
                    headers: { Authorization: `Bearer ${getAccessToken()}` },
                });
                if (response && response.data) {
                    toast.success("Added course successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                    navigate(config.routes.course_online);
                }
            } catch (error) {
                if (error.response.status === 400) {
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
            }
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        let newValue = value;

        // Convert level and price to number
        if (name === "level" || name === "price" || name === "categoryId") {
            newValue = value ? parseInt(value, 10) : "";
        }

        if (name === "image" && files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                document.getElementById("imgPreview").src = reader.result;
                setForm((prevForm) => ({
                    ...prevForm,
                    image: "https://www.shutterstock.com/image-vector/3d-web-vector-illustrations-online-600nw-2152289507.jpg",
                }));
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "",
                }));
            };
            reader.readAsDataURL(files[0]);
        } else {
            setForm((prevForm) => ({
                ...prevForm,
                [name]: newValue,
            }));
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "",
            }));
        }
    };

    return (
        <Layout title="Course Online Create">
            <div className="col-sm-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Course Name</label>
                                    <input type="text" name="name" className={`form-control ${errors.name ? "is-invalid" : ""}`} onChange={handleChange} placeholder="Enter Course Name" autoFocus />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Language</label>
                                    <input type="text" name="language" className={`form-control ${errors.language ? "is-invalid" : ""}`} onChange={handleChange} placeholder="Enter Course Language" />
                                    {errors.language && <div className="invalid-feedback">{errors.language}</div>}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Image</label>
                                    <input type="file" name="image" className={`form-control ${errors.image ? "is-invalid" : ""}`} onChange={handleChange} accept=".jpg, .png, .etc" />
                                    {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Price</label>
                                    <input type="number" name="price" className={`form-control ${errors.price ? "is-invalid" : ""}`} onChange={handleChange} placeholder="Enter Course Price" />
                                    {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Level</label>
                                    <select name="level" className={`form-control ${errors.level ? "is-invalid" : ""}`} onChange={handleChange}>
                                        <option value="">Please choose level</option>
                                        {levels.map((level, index) => (
                                            <option value={level.level} key={index}>
                                                {formatLevelCourse(level.level)}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.level && <div className="invalid-feedback">{errors.level}</div>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Description</label>
                                    <textarea name="description" className={`form-control ${errors.description ? "is-invalid" : ""}`} onChange={handleChange} rows="1"></textarea>
                                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Trailer</label>
                                    <input
                                        type="text"
                                        name="trailer"
                                        className={`form-control ${errors.trailer ? "is-invalid" : ""}`}
                                        value={videoUrl}
                                        onChange={(e) => {
                                            setVideoUrl(e.target.value);
                                            setForm({ ...form, trailer: e.target.value });
                                        }}
                                        placeholder="Please enter YouTube video URL"
                                    />
                                    {errors.trailer && <div className="invalid-feedback">{errors.trailer}</div>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Category</label>
                                    <select name="categoryId" className={`form-control ${errors.categoryId ? "is-invalid" : ""}`} onChange={handleChange}>
                                        <option value="">Please choose category</option>
                                        {categories.map((category) => (
                                            <option value={category.id} key={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.categoryId && <div className="invalid-feedback">{errors.categoryId}</div>}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="text-label form-label">Preview course image</label>
                                    <img id="imgPreview" src="" alt="Preview" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="text-label form-label">Preview Trailer</label>
                                    {videoUrl && <ReactPlayer url={videoUrl} width="100%" height="200px" controls />}
                                </div>
                            </div>

                            <div className="text-end">
                                <ButtonSubmit className="btn-primary" value="Create Course" valueSubmit="Creating..." icon="ti ti-plus" handleEvent={handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CourseCreate;
