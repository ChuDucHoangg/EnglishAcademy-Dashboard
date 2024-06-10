import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../layouts";
import { useEffect, useState } from "react";
import url from "../../../services/url";
import api from "../../../services/api";
import { format } from "date-fns";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";

function CourseEdit() {
    const { slug } = useParams();
    const [data, setData] = useState({});
    const [ImgePreview, setImagePreview] = useState("");
    // const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    //show video trailer
    const [videoUrl, setVideoUrl] = useState("");

    //validate
    const validateForm = () => {
        let valid = true;
        const newErrors = {};
        if (!data.name) {
            newErrors.name = "Please enter name.";
            valid = false;
        } else if (data.name.length < 3) {
            newErrors.name = "Name must be at least 3 characters.";
            valid = false;
        } else if (data.name.length > 255) {
            newErrors.name = "Name must be less than 255 characters.";
            valid = false;
        }
        if (data.image === null) {
            newErrors.image = "Please choose image course";
            valid = false;
        }
        if (data.price === "") {
            newErrors.price = "Please enter price";
            valid = false;
        }
        if (data.description === "") {
            newErrors.description = "Please enter description";
            valid = false;
        }
        if (data.level === "") {
            newErrors.level = "Please choose level";
            valid = false;
        }
        if (data.language === "") {
            newErrors.language = "Please enter language";
            valid = false;
        }
        if (data.trailer === "") {
            newErrors.trailer = "Please enter trailer";
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    //show information data
    useEffect(() => {
        api.get(`${url.COURSE.DETAIL.replace("{}", slug)}`)
            .then((response) => {
                const initialData = {
                    ...response.data.data,
                    image: response.data.data.image,
                    createdDate: format(new Date(response.data.data.createdDate), "yyyy-MM-dd"),
                };
                setData(initialData);
            })
            .catch((error) => {
                console.error("Error fetching course details:", error);
            });
    }, [slug]);

    //hanlde update data
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = validateForm();
        if (isFormValid) {
            try {
                const response = await api.put(url.COURSE.UPDATE, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                if (response && response.data) {
                    // console.log(response.data);
                    toast.success("Update Course Successffuly.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                    setTimeout(() => {
                        navigate(`/course-online`);
                    }, 3000);
                } else {
                }
            } catch (error) {
                toast.error("Unable to update course, please try again", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                // console.error("Error creating test:", error);
                // console.error("Response data:", error.response.data);
            }
        }
    };
    return (
        <Layout title="Course Edit">
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
                                            value={data.name}
                                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    name: e.target.value,
                                                })
                                            }
                                            placeholder="Enter Course Name"
                                            autoFocus
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Language</label>
                                        <input
                                            type="text"
                                            value={data.language}
                                            className={`form-control ${errors.language ? "is-invalid" : ""}`}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    language: e.target.value,
                                                })
                                            }
                                            placeholder="Enter Course Language"
                                        />
                                        {errors.language && <div className="invalid-feedback">{errors.language}</div>}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Image</label>
                                        <input
                                            type="file"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file && /\.(jpg|png|jpeg)$/.test(file.name)) {
                                                    setImagePreview(URL.createObjectURL(file));

                                                    setData({
                                                        ...data,
                                                        image: file,
                                                    });
                                                } else {
                                                    console.error("Unsupported file format or no file selected");
                                                }
                                            }}
                                            className={`form-control ${errors.image ? "is-invalid" : ""}`}
                                            accept=".jpg, .png, .etc"
                                        />
                                        {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Price</label>
                                        <input
                                            type="number"
                                            value={data.price}
                                            className={`form-control ${errors.price ? "is-invalid" : ""}`}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    price: e.target.value,
                                                })
                                            }
                                            placeholder="Enter Course Price"
                                        />
                                        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Level</label>
                                        <select
                                            value={data.level}
                                            className={`form-control ${errors.level ? "is-invalid" : ""}`}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    level: e.target.value,
                                                })
                                            }
                                        >
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
                                        <textarea
                                            value={data.description}
                                            className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    description: e.target.value,
                                                })
                                            }
                                            rows="1"
                                        ></textarea>
                                        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Trailer</label>
                                        <input
                                            type="text"
                                            name="trailer"
                                            value={data.trailer}
                                            className={`form-control ${errors.trailer ? "is-invalid" : ""}`}
                                            onChange={(e) => {
                                                setVideoUrl(e.target.value);
                                                setData({ ...data, trailer: e.target.value });
                                            }}
                                            placeholder="Please enter YouTube video URL"
                                        />
                                        {errors.trailer && <div className="invalid-feedback">{errors.trailer}</div>}
                                    </div>

                                    <div className="text-end btn-page mb-0 mt-5">
                                        <button type="submit" className="btn btn-primary">
                                            Update This Course Online
                                        </button>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="text-label form-label">Preview course image</label>
                                        <img
                                            id="imgPreview"
                                            src={ImgePreview || data.image}
                                            alt="Preview"
                                            style={{ width: "100%", height: "200px", objectFit: "cover" }}
                                            onError={(e) => console.error("Image Preview Error:", e)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="text-label form-label">Preview Trailer</label>
                                        {data.trailer && <ReactPlayer url={data.trailer} width="100%" height="200px" controls />}
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

export default CourseEdit;
