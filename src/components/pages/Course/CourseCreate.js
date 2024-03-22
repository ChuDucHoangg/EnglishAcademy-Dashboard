import { useState } from "react";
import Layout from "../../layouts";
import { useNavigate } from "react-router-dom";
import url from "../../../services/url";
import api from "../../../services/api";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";
function CourseCreate() {
    const [form, setForm] = useState({
        name: "",
        image: null,
        price: "",
        description: "",
        level: "",
        language: "",
        trailer: "",
        image_preview: null,
    });
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    //show video trailer
    const [videoUrl, setVideoUrl] = useState("");

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
            newErrors.image = "Please choose image course";
            valid = false;
        }
        if (form.price === "") {
            newErrors.price = "Please enter price";
            valid = false;
        }
        if (form.description === "") {
            newErrors.description = "Please enter description";
            valid = false;
        }
        if (form.level === "") {
            newErrors.level = "Please choose level";
            valid = false;
        }
        if (form.language === "") {
            newErrors.language = "Please enter language";
            valid = false;
        }
        if (form.trailer === "") {
            newErrors.trailer = "Please enter trailer";
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
                    headers: { "Content-Type": "multipart/form-data" },
                });
                if (response && response.data) {
                    toast.success("Added course successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                    setTimeout(() => {
                        navigate(`/course-online`);
                    }, 3000);
                } else {
                }
            } catch (error) {
                toast.error("Unable to add course, please try again", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                // console.error("Error creating test:", error);
                // console.error("Response data:", error.response.data);
            }
        }
    };

    //hanlde upload file image
    const handleImageCourseChange = (e, fieldName) => {
        const { files } = e.target;
        const selectedImage = files.length > 0 ? URL.createObjectURL(files[0]) : null;

        setForm({
            ...form,
            [fieldName]: fieldName === "image" ? (files.length > 0 ? files[0] : null) : null,
            image_preview: selectedImage,
        });
    };

    const handleChange = (e) => {
        const { name } = e.target;
        if (name === "image") {
            handleImageCourseChange(e, name);
        } else {
            const { value } = e.target;
            setForm({ ...form, [name]: value });
        }
    };
    return (
        <Layout title="Course Online Create">
            <div className="col-sm-12">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Course Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                            onChange={handleChange}
                                            placeholder="Enter Course Name"
                                            autoFocus
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Language</label>
                                        <input
                                            type="text"
                                            name="language"
                                            className={`form-control ${errors.language ? "is-invalid" : ""}`}
                                            onChange={handleChange}
                                            placeholder="Enter Course Language"
                                        />
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
                                            <option value="">Please select level</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
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

                                    <div className="text-end btn-page mb-0 mt-5">
                                        <button type="submit" className="btn btn-primary">
                                            Add New Course Online
                                        </button>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="text-label form-label">Preview course image</label>
                                        {form.image_preview && <img src={form.image_preview} alt="Course Image Preview" style={{ width: "100%", height: "200px", objectFit: "cover" }} />}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="text-label form-label">Preview Trailer</label>
                                        {videoUrl && <ReactPlayer url={videoUrl} width="100%" height="200px" controls />}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CourseCreate;
