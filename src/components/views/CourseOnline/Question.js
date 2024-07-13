import { toast } from "react-toastify";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function Question({ courseDetail, questions, questionIndex, loadData }) {
    const handleDeleteQuestion = async (id) => {
        try {
            const isConfirmed = await Swal.fire({
                title: "Are you sure?",
                text: "Are you sure you want to delete?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "I'm sure",
                reverseButtons: true,
            });

            if (isConfirmed.isConfirmed) {
                const data = [id];
                const deleteRequest = await api.delete(url.QUESTION_ITEM_ONLINE.DELETE, { data, headers: { Authorization: `Bearer ${getAccessToken()}` } });

                if (deleteRequest.status === 200) {
                    toast.success("Deleted successfully!", {
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
                }
            }
        } catch (error) {
            toast.error(error.response.data.data, {
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
    };

    return (
        <div className="bg-gray-100 p-3 rounded-3 mb-3">
            <div className="d-flex align-items-center justify-content-between">
                <h4 className="text-dark f-w-500">
                    Question {questionIndex + 1}: {questions.title}
                </h4>

                <div className="d-flex align-items-center">
                    <Link to={`/course-online/question-item-edit/${courseDetail.id}/${questions.id}`} className="btn btn-icon btn-link-secondary">
                        <i className="ti ti-edit"></i>
                    </Link>

                    <button className="btn btn-icon btn-link-danger" onClick={() => handleDeleteQuestion(questions.id)}>
                        <i className="ti ti-trash"></i>
                    </button>
                </div>
            </div>
            {[questions.answer1, questions.answer2, questions.answer3, questions.answer4].map((answer, answerIndex) => {
                const isCorrect = answer === questions.answerCorrect;
                const answerClass = isCorrect ? "bg-cs-success-opacity border-cs-success" : "bg-white border";
                const answerLabelClass = isCorrect ? "bg-cs-success text-white" : "bg-light text-black";

                return (
                    <div className="mt-2" key={answerIndex}>
                        <label className={`p-3 rounded d-block ${answerClass}`}>
                            <div className="d-flex align-items-center">
                                <div className={`btn-choose ${answerLabelClass}`}>{String.fromCharCode(65 + answerIndex)}</div>
                                <p className="m-0">{answer}</p>
                            </div>
                        </label>
                    </div>
                );
            })}
        </div>
    );
}

export default Question;
