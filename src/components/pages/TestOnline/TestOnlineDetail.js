import { useParams } from "react-router-dom";
import Layout from "../../layouts";
import useAxiosGet from "../../../hooks/useAxiosGet";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import AudioPlayer from "react-h5-audio-player";

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

    return (
        <Layout title="Test Detail">
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
                                {question.image && <img style={{ maxWidth: 350 }} src={question.image} className="w-100 mb-5" alt="" />}
                                {question.audiomp3 && <AudioPlayer src={question.audiomp3} autoPlay={false} controls className="mb-5 w-100" />}

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
