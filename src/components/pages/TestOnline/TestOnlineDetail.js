import { useParams } from "react-router-dom";
import Layout from "../../layouts";
import useAxiosGet from "../../../hooks/useAxiosGet";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import AudioPlayer from "react-h5-audio-player";
import { formatHour } from "../../../utils/formatTime";
import { format } from "date-fns";

function TestOnlineDetail() {
    const { testSlug } = useParams();

    const testDetailData = useAxiosGet({
        path: url.TEST_ONLINE.DETAIL + `/${testSlug}`,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const testDetail = testDetailData.response || {};
    console.log(testDetail);

    const sessionTest = testDetail.testOnlineSessionDetails || [];
    const totalSession = testDetail.testOnlineSessionDetails ? testDetail.testOnlineSessionDetails.length : 0;

    return (
        <Layout title="Test Detail">
            <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between">
                    <h5>Information</h5>
                </div>
                <div className="card-body">
                    <div className="row g-3">
                        <div className="col-lg-6">
                            <div className="bg-gray-100 p-4 rounded-3">
                                <div className="row">
                                    <div className="col-6 mb-3">
                                        <div className="media align-items-center">
                                            <div className="avtar avtar-s bg-light-primary flex-shrink-0">
                                                <i className="fas fa-signature"></i>
                                            </div>
                                            <div className="media-body ms-3">
                                                <h5 className="mb-0">Name</h5>
                                                <p className="mb-0 text-sm text-muted">{testDetail.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <div className="media align-items-center">
                                            <div className="avtar avtar-s bg-light-warning flex-shrink-0">
                                                <i className="ti ti-box-margin"></i>
                                            </div>
                                            <div className="media-body ms-3">
                                                <h5 className="mb-0">Type</h5>
                                                <p className="mb-0 text-sm text-muted">son</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <div className="media align-items-center">
                                            <div className="avtar avtar-s bg-light-success flex-shrink-0">?</div>
                                            <div className="media-body ms-3">
                                                <h5 className="mb-0">Question</h5>
                                                <p className="mb-0 text-sm text-muted">{testDetail.totalQuestion}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <div className="media align-items-center">
                                            <div className="avtar avtar-s bg-light-danger flex-shrink-0">
                                                <i className="ti ti-clock"></i>
                                            </div>
                                            <div className="media-body ms-3">
                                                <h5 className="mb-0">Time</h5>
                                                <p className="mb-0 text-sm text-muted">{formatHour(testDetail.time)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="my-3 border" />

                                    <div className="col-6">
                                        <div className="d-flex align-items-center text-muted mb-2">
                                            <div className="avtar avtar-xs bg-light-secondary flex-shrink-0 me-2">
                                                <i className="fas fa-user-plus"></i>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <p className="mb-0 f-12">Created By</p>
                                                <span className="text-truncate w-100 f-10">{testDetail.createdBy || "N/A"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="d-flex align-items-center text-muted mb-2">
                                            <div className="avtar avtar-xs bg-light-secondary flex-shrink-0 me-2">
                                                <i className="fas fa-calendar-alt"></i>
                                            </div>

                                            <div className="d-flex flex-column">
                                                <p className="mb-0 f-12">Created Date</p>
                                                <span className="text-truncate w-100 f-10">{(testDetail.createdDate && format(new Date(testDetail.createdDate), "dd-MM-yyy")) || "N/A"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="d-flex align-items-center text-muted mb-2">
                                            <div className="avtar avtar-xs bg-light-secondary flex-shrink-0 me-2">
                                                <i className="fas fa-calendar-check"></i>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <p className="mb-0 f-12">Modified Date</p>
                                                <span className="text-truncate w-100 f-10">{(testDetail.modifiedDate && format(new Date(testDetail.modifiedDate), "dd-MM-yyy")) || "N/A"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="d-flex align-items-center text-muted mb-2">
                                            <div className="avtar avtar-xs bg-light-secondary flex-shrink-0 me-2">
                                                <i className="fas fa-user-edit"></i>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <p className="mb-0 f-12">Created By</p>
                                                <span className="text-truncate w-100 f-10">{testDetail.modifiedBy || "N/A"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="bg-gray-100 p-4 rounded-3 h-100">
                                <p className="font-system fw-300 m-0">
                                    The test has a total of {totalSession} part and {testDetail.totalQuestion} questions:
                                </p>
                                <ul className="my-3">
                                    {testDetail.testOnlineSessionDetails?.map((session, sessionIndex) => (
                                        <li className="font-system fw-300 mb-2" key={sessionIndex}>
                                            Part {sessionIndex + 1}: {session.sessionName} <span>{session.totalQuestion} questions.</span>
                                        </li>
                                    ))}
                                </ul>

                                <p>Instructions for taking the test: {testDetail.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {sessionTest.map((session, sessionIndex) => (
                <div className="card" key={sessionIndex}>
                    <div className="card-header bg-white py-4" style={{ position: "sticky", top: 74, zIndex: 5 }}>
                        <h4>
                            Part {sessionIndex + 1}: {session.sessionName}
                        </h4>
                        <p className="mb-0">The total number of questions: {session.totalQuestion}</p>
                    </div>
                    <div className="card-body">
                        {session.questionTestOnlineDTOS.map((question, questionIndex) => (
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
                                        const isCorrect = question.correctAnswer === question[option];
                                        const btnClass = isCorrect ? "bg-cs-success text-white" : "bg-danger text-white";
                                        const labelClass = isCorrect ? "bg-cs-success-opacity border-cs-success" : "bg-cs-danger-opacity border-cs-danger";

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
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </Layout>
    );
}

export default TestOnlineDetail;
