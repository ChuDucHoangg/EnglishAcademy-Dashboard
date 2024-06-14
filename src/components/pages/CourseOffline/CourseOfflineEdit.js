import { useEffect, useMemo, useState } from "react";
import Layout from "../../layouts";
import ButtonSubmit from "../../layouts/ButtonSubmit";
import { formatLevelCourse, levelCourse } from "../../../utils/formatLevelCourse";
import ReactPlayer from "react-player";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import { toast } from "react-toastify";
import useAxiosGet from "../../../hooks/useAxiosGet";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../../config";
import NotFound from "../Other/NotFound";

function CourseOfflineEdit() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const levels = levelCourse();

    const [submitting, setSubmitting] = useState(false);

    const courseData = useAxiosGet({
        path: url.COURSE_OFFLINE.DETAIL + `/${slug}`,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const courseDetail = useMemo(() => courseData.response || {}, [courseData.response]);

    useEffect(() => {
        if (courseDetail) {
            setFormData({
                id: courseDetail.id || null,
                name: courseDetail.name || "",
                image: courseDetail.image || null,
                price: courseDetail.price || "",
                description: courseDetail.description || "",
                level: courseDetail.level || "",
                language: courseDetail.language || "",
                trailer: courseDetail.trailer || "",
            });
            setVideoUrl(courseDetail.trailer || "");
        }
    }, [courseDetail]);

    const [formData, setFormData] = useState({
        id: courseDetail.id,
        name: "",
        image: null,
        price: "",
        description: "",
        level: "",
        language: "",
        trailer: "",
    });

    const [formErrors, setFormErrors] = useState({
        name: "",
        image: "",
        price: "",
        description: "",
        level: "",
        language: "",
        trailer: "",
    });

    const [videoUrl, setVideoUrl] = useState("");

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image" && files.length > 0) {
            setFormData({ ...formData, image: files[0] });
            setFormErrors({ ...formErrors, [name]: "https://www.shutterstock.com/image-vector/3d-web-vector-illustrations-online-600nw-2152289507.jpg" });

            const reader = new FileReader();
            reader.onload = () => {
                document.getElementById("imgPreview").src = reader.result;
            };
            reader.readAsDataURL(files[0]);
        } else {
            setFormData({ ...formData, [name]: value });
            setFormErrors({ ...formErrors, [name]: "" });
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};
        if (!formData.name) {
            newErrors.name = "Please enter name.";
            valid = false;
        } else if (formData.name.length < 3) {
            newErrors.name = "Name must be at least 3 characters.";
            valid = false;
        } else if (formData.name.length > 255) {
            newErrors.name = "Name must be less than 255 characters.";
            valid = false;
        }
        if (!formData.image) {
            newErrors.image = "Please choose image course";
            valid = false;
        }
        if (formData.price === "") {
            newErrors.price = "Please enter price";
            valid = false;
        }
        if (formData.description === "") {
            newErrors.description = "Please enter description";
            valid = false;
        }
        if (formData.level === "") {
            newErrors.level = "Please choose level";
            valid = false;
        }
        if (formData.language === "") {
            newErrors.language = "Please enter language";
            valid = false;
        }
        if (formData.trailer === "") {
            newErrors.trailer = "Please enter trailer";
            valid = false;
        }
        setFormErrors(newErrors);
        return valid;
    };

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                setSubmitting(true);
                const createRequest = await api.put(url.COURSE_OFFLINE.UPDATE, formData, { headers: { Authorization: `Bearer ${getAccessToken()}` } });

                if (createRequest.status === 200) {
                    navigate(config.routes.course_offline);

                    setFormData({
                        id: null,
                        name: "",
                        image: null,
                        price: "",
                        description: "",
                        level: "",
                        language: "",
                        trailer: "",
                    });

                    toast.success("Course Offline updated successfully!", {
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
        <>
            {courseData.errorStatus === 404 ? (
                <NotFound />
            ) : (
                <Layout title="Course Offline Update">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleCreateCourse}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Course Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Enter Course Name"
                                                    autoFocus
                                                />
                                                {formErrors.name && <p className="invalid-feedback">{formErrors.name}</p>}
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">Language</label>
                                                <input
                                                    type="text"
                                                    name="language"
                                                    className={`form-control ${formErrors.language ? "is-invalid" : ""}`}
                                                    value={formData.language}
                                                    onChange={handleChange}
                                                    placeholder="Enter Course Language"
                                                />
                                                {formErrors.language && <p className="invalid-feedback">{formErrors.language}</p>}
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Image</label>
                                                <input type="file" name="image" className={`form-control ${formErrors.image ? "is-invalid" : ""}`} accept=".jpg, .png, .etc" onChange={handleChange} />
                                                {formErrors.image && <p className="invalid-feedback">{formErrors.image}</p>}
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">Price</label>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    className={`form-control ${formErrors.price ? "is-invalid" : ""}`}
                                                    value={formData.price}
                                                    onChange={handleChange}
                                                    placeholder="Enter Course Price"
                                                />
                                                {formErrors.price && <p className="invalid-feedback">{formErrors.price}</p>}
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Level</label>
                                                <select name="level" className={`form-control ${formErrors.level ? "is-invalid" : ""}`} value={formData.level} onChange={handleChange}>
                                                    <option value="">Choose Level</option>
                                                    {levels.map((level, index) => (
                                                        <option value={level.level} key={index}>
                                                            {formatLevelCourse(level.level)}
                                                        </option>
                                                    ))}
                                                </select>
                                                {formErrors.level && <p className="invalid-feedback">{formErrors.level}</p>}
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">Description</label>
                                                <textarea
                                                    name="description"
                                                    className={`form-control ${formErrors.description ? "is-invalid" : ""}`}
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    rows="3"
                                                ></textarea>
                                                {formErrors.description && <p className="invalid-feedback">{formErrors.description}</p>}
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Trailer</label>
                                                <input
                                                    type="text"
                                                    name="trailer"
                                                    className={`form-control ${formErrors.trailer ? "is-invalid" : ""}`}
                                                    value={formData.trailer}
                                                    onChange={(e) => {
                                                        setVideoUrl(e.target.value);
                                                        setFormData({ ...formData, trailer: e.target.value });
                                                    }}
                                                    placeholder="Please enter YouTube video URL"
                                                />
                                                {formErrors.trailer && <p className="invalid-feedback">{formErrors.trailer}</p>}
                                            </div>

                                            <div className="text-end btn-page mb-0 mt-5">
                                                <ButtonSubmit className="btn-primary" value="Update This Course" icon="ti ti-edit" submitting={submitting} handleEvent={handleCreateCourse} />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="text-label form-label">Preview course image</label>
                                                {formData.image && <img id="imgPreview" src={formData.image} alt="Preview" style={{ width: "100%", height: "200px", objectFit: "cover" }} />}
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
            )}
        </>
    );
}

export default CourseOfflineEdit;
