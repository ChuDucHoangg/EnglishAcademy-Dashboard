import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import ButtonSubmit from "../../layouts/ButtonSubmit";
import useAxiosGet from "../../../hooks/useAxiosGet";

function EditQuestion({ id, courseDetail, loadData }) {
    const questionData = useAxiosGet({
        path: url.QUESTION_ITEM_ONLINE.DETAIL + `/${id}`,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const questionDetail = useMemo(() => questionData.response || {}, [questionData.response]);

    console.log(questionDetail);

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

    // useEffect(() => {
    //     if (questionDetail && courseDetail.id) {
    //         setFormData({
    //             id: questionDetail.id,
    //             title: questionDetail.title || "",
    //             answer1: questionDetail.answer1 || "",
    //             answer2: questionDetail.answer2 || "",
    //             answer3: questionDetail.answer3 || "",
    //             answer4: questionDetail.answer4 || "",
    //             answerCorrect: questionDetail.answerCorrect || "",
    //             orderTop: questionDetail.orderTop || null,
    //             itemOnlineId: courseDetail.id,
    //         });
    //     }
    // }, [questionDetail, id, courseDetail.id]);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;

    //     let convertedValue = value;
    //     if (name === "orderTop") {
    //         convertedValue = value ? parseInt(value, 10) : null;
    //     }

    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         [name]: convertedValue,
    //     }));
    // };

    useEffect(() => {
        if (questionDetail && courseDetail.id) {
            // Check for data availability
            const initialFormData = {
                title: questionDetail.title || "", // Default to empty string if undefined
                answer1: questionDetail.answer1 || "",
                answer2: questionDetail.answer2 || "",
                answer3: questionDetail.answer3 || "",
                answer4: questionDetail.answer4 || "",
                answerCorrect: questionDetail.answerCorrect || "",
                orderTop: questionDetail.orderTop || null, // Assuming orderTop can be null
                // Add any other fields from questionDetail that need to be included in formData
            };

            setFormData(initialFormData);
        }
    }, [questionDetail, id, courseDetail.id]); // Dependency array

    // Corrected handleChange function to properly handle setting the value of 'orderTop' input
    const handleChange = (e) => {
        const { name, value } = e.target;
        let convertedValue = value;
        if (name === "orderTop") {
            // Ensure that empty string is converted to null for 'orderTop'
            convertedValue = value === "" ? null : parseInt(value, 10);
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

    const handleCreateQuestion = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                setSubmitting(true);
                const createRequest = await api.put(url.QUESTION_ITEM_ONLINE.UPDATE, formData, {
                    headers: { Authorization: `Bearer ${getAccessToken()}` },
                });

                if (createRequest.status === 200) {
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

                    loadData();

                    setFormData({
                        title: "",
                        answer1: "",
                        answer2: "",
                        answer3: "",
                        answer4: "",
                        answerCorrect: "",
                        orderTop: null,
                    });
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
        <div className="modal fade" id="editQuestionModal" tabIndex="-1" aria-labelledby="editQuestionModalLabel" aria-modal="true" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editQuestionModalLabel">
                            Edit Question
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="title" className="col-form-label pt-0 pb-2">
                                    Title
                                </label>
                                <input type="text" name="title" value={formData.title} className={`form-control ${formErrors.title ? "is-invalid" : ""}`} onChange={handleChange} />
                                {formErrors.title && <p className="invalid-feedback">{formErrors.title}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="answer1" className="col-form-label pt-0 pb-2">
                                    Answer A
                                </label>
                                <input type="text" name="answer1" value={formData.answer1} className={`form-control ${formErrors.answer1 ? "is-invalid" : ""}`} onChange={handleChange} />
                                {formErrors.answer1 && <p className="invalid-feedback">{formErrors.answer1}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="answer2" className="col-form-label pt-0 pb-2">
                                    Answer B
                                </label>
                                <input type="text" name="answer2" value={formData.answer2} className={`form-control ${formErrors.answer2 ? "is-invalid" : ""}`} onChange={handleChange} />
                                {formErrors.answer2 && <p className="invalid-feedback">{formErrors.answer2}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="answer3" className="col-form-label pt-0 pb-2">
                                    Answer C
                                </label>
                                <input type="text" name="answer3" value={formData.answer3} className={`form-control ${formErrors.answer3 ? "is-invalid" : ""}`} onChange={handleChange} />
                                {formErrors.answer3 && <p className="invalid-feedback">{formErrors.answer3}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="answer4" className="col-form-label pt-0 pb-2">
                                    Answer D
                                </label>
                                <input type="text" name="answer4" value={formData.answer4} className={`form-control ${formErrors.answer4 ? "is-invalid" : ""}`} onChange={handleChange} />
                                {formErrors.answer4 && <p className="invalid-feedback">{formErrors.answer4}</p>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="answerCorrect">
                                    Correct Answer
                                </label>
                                <select name="answerCorrect" className={`form-select ${formErrors.answerCorrect ? "is-invalid" : ""}`} value={formData.answerCorrect} onChange={handleChange}>
                                    <option value="">Choose the correct answer</option>

                                    {optionAnswerCorrect.map((option, optionIndex) => (
                                        <option key={optionIndex} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.answerCorrect && <p className="invalid-feedback">{formErrors.answerCorrect}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="orderTop" className="col-form-label pt-0 pb-2">
                                    Ordinal
                                </label>
                                <input type="number" name="orderTop" value={formData.orderTop || ""} className={`form-control ${formErrors.orderTop ? "is-invalid" : ""}`} onChange={handleChange} />
                                {formErrors.orderTop && <p className="invalid-feedback">{formErrors.orderTop}</p>}
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary rounded-2" data-bs-dismiss="modal">
                            Cancel
                        </button>
                        <ButtonSubmit className="btn-primary rounded-2" submitting={submitting} value="Save Change" valueSubmit="Saving..." handleEvent={handleCreateQuestion} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditQuestion;
