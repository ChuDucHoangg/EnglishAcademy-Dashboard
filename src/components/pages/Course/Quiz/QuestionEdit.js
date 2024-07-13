import { useEffect, useMemo, useState } from "react";
import useAxiosGet from "../../../../hooks/useAxiosGet";
import url from "../../../../services/url";
import { getAccessToken } from "../../../../utils/auth";
import { toast } from "react-toastify";
import ButtonSubmit from "../../../layouts/ButtonSubmit";
import api from "../../../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../layouts";

function QuestionEdit() {
    const { itemOnlineId, id } = useParams();
    const navigate = useNavigate();

    const questionData = useAxiosGet({
        path: url.QUESTION_ITEM_ONLINE.DETAIL + `/${id}`,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const questionDetail = useMemo(() => questionData.response || {}, [questionData.response]);

    const [formData, setFormData] = useState({
        id: null,
        title: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        answerCorrect: "",
        orderTop: null,
        itemOnlineId: null,
    });

    const [formErrors, setFormErrors] = useState({
        title: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        answerCorrect: "",
        orderTop: null,
    });

    useEffect(() => {
        if (questionDetail) {
            setFormData({
                id: questionDetail.id,
                title: questionDetail.title || "",
                answer1: questionDetail.answer1 || "",
                answer2: questionDetail.answer2 || "",
                answer3: questionDetail.answer3 || "",
                answer4: questionDetail.answer4 || "",
                answerCorrect: questionDetail.answerCorrect || "",
                orderTop: questionDetail.orderTop || null,
                itemOnlineId: Number(itemOnlineId),
            });
        }
    }, [questionDetail, itemOnlineId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        let convertedValue = value;
        if (name === "orderTop") {
            convertedValue = value ? parseInt(value, 10) : null;
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: convertedValue,
        }));
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.title) {
            newErrors.title = "Please enter title.";
            valid = false;
        } else if (formData.title.length < 3) {
            newErrors.title = "Title must be at least 3 characters.";
            valid = false;
        } else if (formData.title.length > 255) {
            newErrors.title = "Title must be less than 255 characters.";
            valid = false;
        }

        if (formData.answer1 === "") {
            newErrors.answer1 = "Please enter answer A.";
            valid = false;
        }

        if (formData.answer2 === "") {
            newErrors.answer2 = "Please enter answer B.";
            valid = false;
        }

        if (formData.answer3 === "") {
            newErrors.answer3 = "Please enter answer C.";
            valid = false;
        }

        if (formData.answer4 === "") {
            newErrors.answer4 = "Please enter answer D.";
            valid = false;
        }

        if (formData.answerCorrect === "") {
            newErrors.answerCorrect = "Please enter choose correct answer.";
            valid = false;
        }

        const regexOrderTop = /^[1-9][0-9]*$/;
        if (formData.orderTop === null) {
            newErrors.orderTop = "Please enter ordinal.";
            valid = false;
        } else if (!regexOrderTop.test(formData.orderTop)) {
            newErrors.orderTop = "Ordinal must be a positive integer.";
            valid = false;
        }

        // Check for duplicate answers
        const answers = [
            { value: formData.answer1, field: "answer1" },
            { value: formData.answer2, field: "answer2" },
            { value: formData.answer3, field: "answer3" },
            { value: formData.answer4, field: "answer4" },
        ];

        const seen = {};
        answers.forEach((answer) => {
            if (seen[answer.value]) {
                seen[answer.value].push(answer.field);
            } else {
                seen[answer.value] = [answer.field];
            }
        });

        Object.values(seen).forEach((fields) => {
            if (fields.length > 1) {
                fields.forEach((field) => {
                    newErrors[field] = "This answer is duplicated.";
                });
                valid = false;
            }
        });

        setFormErrors(newErrors);
        return valid;
    };

    const [submitting, setSubmitting] = useState(false);

    const handleUpdateQuestion = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                setSubmitting(true);
                const updateRequest = await api.put(url.QUESTION_ITEM_ONLINE.UPDATE, formData, {
                    headers: { Authorization: `Bearer ${getAccessToken()}` },
                });

                if (updateRequest.status === 200) {
                    setFormData({
                        title: "",
                        answer1: "",
                        answer2: "",
                        answer3: "",
                        answer4: "",
                        answerCorrect: "",
                        orderTop: null,
                    });

                    toast.success("Updated Item Successfully!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                    navigate(-1);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setSubmitting(false);
            }
        }
    };

    const optionAnswerCorrect = [
        {
            value: formData.answer1,
            label: `A - ${formData.answer1}`,
        },
        {
            value: formData.answer2,
            label: `B - ${formData.answer2}`,
        },
        {
            value: formData.answer3,
            label: `C - ${formData.answer3}`,
        },
        {
            value: formData.answer4,
            label: `D - ${formData.answer4}`,
        },
    ];

    return (
        <Layout title={``}>
            <div className="col-sm-12">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleUpdateQuestion}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            className={`form-control ${formErrors.title ? "is-invalid" : ""}`}
                                            placeholder="Enter Title"
                                            value={formData.title}
                                            onChange={handleChange}
                                        />
                                        {formErrors.title && <p className="invalid-feedback">{formErrors.title}</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Order Top</label>
                                        <input
                                            type="number"
                                            name="orderTop"
                                            className={`form-control ${formErrors.orderTop ? "is-invalid" : ""}`}
                                            value={formData.orderTop || ""}
                                            onChange={handleChange}
                                        />
                                        {formErrors.orderTop && <p className="invalid-feedback">{formErrors.orderTop}</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Answer A</label>
                                        <input type="text" name="answer1" className={`form-control ${formErrors.answer1 ? "is-invalid" : ""}`} value={formData.answer1} onChange={handleChange} />
                                        {formErrors.answer1 && <p className="invalid-feedback">{formErrors.answer1}</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Answer B</label>
                                        <input type="text" name="answer2" className={`form-control ${formErrors.answer2 ? "is-invalid" : ""}`} value={formData.answer2} onChange={handleChange} />
                                        {formErrors.answer2 && <p className="invalid-feedback">{formErrors.answer2}</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Answer C</label>
                                        <input type="text" name="answer3" className={`form-control ${formErrors.answer3 ? "is-invalid" : ""}`} value={formData.answer3} onChange={handleChange} />
                                        {formErrors.answer3 && <p className="invalid-feedback">{formErrors.answer3}</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Answer D</label>
                                        <input type="text" name="answer4" className={`form-control ${formErrors.answer4 ? "is-invalid" : ""}`} value={formData.answer4} onChange={handleChange} />
                                        {formErrors.answer4 && <p className="invalid-feedback">{formErrors.answer4}</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Correct Answer</label>
                                        <select name="answerCorrect" className={`form-control ${formErrors.answerCorrect ? "is-invalid" : ""}`} value={formData.answerCorrect} onChange={handleChange}>
                                            <option value="">Choose Correct Answer</option>
                                            {optionAnswerCorrect.map((option, index) => (
                                                <option key={index} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        {formErrors.answerCorrect && <p className="invalid-feedback">{formErrors.answerCorrect}</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <ButtonSubmit submitting={submitting} className="btn-primary" value="Update Question" handleEvent={handleUpdateQuestion} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default QuestionEdit;
