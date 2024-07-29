import { useParams } from "react-router-dom";
import Layout from "../../../layouts";
import useAxiosGet from "../../../../hooks/useAxiosGet";
import url from "../../../../services/url";
import { getAccessToken } from "../../../../utils/auth";
import AudioPlayer from "react-h5-audio-player";
import NotFound from "../../Other/NotFound";

function ExamDetailOfStudent() {
    const { examDetailCode } = useParams();

    const examOfStudentData = useAxiosGet({
        path: url.TEST_OFFLINE.DETAIL_OF_STUDENT + `/${examDetailCode}`,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const examOfStudent = examOfStudentData.response || [];

    return (
        <>
            {examOfStudentData.errorStatus === 404 ? (
                <NotFound />
            ) : (
                <Layout title={`as`}>
                    {examOfStudent.map((session, sessionIndex) => (
                        <div className="card" key={sessionIndex}>
                            <div className="card-header bg-white py-4" style={{ position: "sticky", top: 74, zIndex: 5 }}>
                                <h4>
                                    Part {sessionIndex + 1}: {session.sessionName}
                                </h4>
                                <p className="mb-0">The total number of questions: {session.totalQuestion}</p>
                            </div>
                            <div className="card-body">
                                {session?.questionTestOfflineDetailResults.map((question, questionIndex) => (
                                    <div className="mb-4" key={questionIndex}>
                                        <h5 className="mb-3">
                                            Question {questionIndex + 1}: {question.title}
                                        </h5>
                                        {question.image && question.image.trim() !== "" && <img src={question.image} alt="" className="mb-5 w-100" />}
                                        {question.audiomp3 && question.audiomp3 !== null && question.audiomp3.trim() !== "" && (
                                            <AudioPlayer src={question.audiomp3} autoPlay={false} controls className="mb-5 w-100" />
                                        )}

                                        <div className="row">
                                            {["option1", "option2", "option3", "option4"].map((option, optionIndex) => {
                                                const isCorrect = question.answerCorrect === question[option];
                                                const isSelected = question.answerForStudent === question[option];
                                                const btnClass = isSelected ? (isCorrect ? "bg-cs-success text-white" : "bg-danger text-white") : "bg-light text-black";
                                                const labelClass = isSelected ? (isCorrect ? "bg-cs-success-opacity border-cs-success" : "bg-cs-danger-opacity border-cs-danger") : "bg-white border";

                                                return (
                                                    <div className="col-lg-6 mb-3" key={optionIndex}>
                                                        {question[option] !== null && question[option] !== "" && (
                                                            <label className={`p-3 rounded d-block ${labelClass}`}>
                                                                <div className="d-flex align-items-center">
                                                                    <div className={`btn-choose ${btnClass}`}>{String.fromCharCode(65 + optionIndex)}</div>
                                                                    <p className="m-0">{question[option]}</p>
                                                                </div>
                                                            </label>
                                                        )}
                                                    </div>
                                                );
                                            })}

                                            {question.type === 2 && (
                                                <>
                                                    <p>Audio Recording by Student:</p>
                                                    <audio className="size-initial" controls src={question.answerForStudent} />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </Layout>
            )}
        </>
    );
}

export default ExamDetailOfStudent;
