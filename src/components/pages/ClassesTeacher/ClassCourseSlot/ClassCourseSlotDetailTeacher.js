import { Link, useParams } from "react-router-dom";
import Layout from "../../../layouts";
import useAxiosGet from "../../../../hooks/useAxiosGet";
import url from "../../../../services/url";
import { getAccessToken } from "../../../../utils/auth";
import { format } from "date-fns";
import ReactPlayer from "react-player";
import AnswerStudent from "../../../views/Classes/AnswerStudent";

function ClassCourseSlotDetailTeacher() {
    const { classId, slug } = useParams();

    const slotData = useAxiosGet({
        path: url.CLASS.COURSE_SLOT_DETAIL_BY_CLASS + `/${slug}/${classId}`,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const slotDetail = slotData.response || {};
    const answerStudents = slotDetail.answerStudentItemSlotResponseListList;

    return (
        <Layout title={`${slotDetail.title || "Loading..."}`}>
            <div className="col-lg-4">
                <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between">
                        <h5>Information</h5>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-6">
                                <div className="media align-items-center">
                                    <div className="avtar avtar-s bg-light-primary flex-shrink-0">
                                        <i className="fas fa-signature"></i>
                                    </div>
                                    <div className="media-body ms-3">
                                        <h5 className="mb-0">Title</h5>
                                        <p className="mb-0 text-sm text-muted">{slotDetail.title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="my-3 border border-secondary-subtle" />
                        <ul className="list-unstyled row mb-0">
                            <li className="col-6">
                                <div className="d-flex align-items-center text-muted mb-2">
                                    <div className="avtar avtar-xs bg-light-secondary flex-shrink-0 me-2">
                                        <i className="fas fa-user-plus"></i>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <p className="mb-0 f-12">Created By</p>
                                        <span className="text-truncate w-100 f-10">{slotDetail.createdBy || "N/A"}</span>
                                    </div>
                                </div>
                            </li>

                            <li className="col-6">
                                <div className="d-flex align-items-center text-muted mb-2">
                                    <div className="avtar avtar-xs bg-light-secondary flex-shrink-0 me-2">
                                        <i className="fas fa-calendar-alt"></i>
                                    </div>

                                    <div className="d-flex flex-column">
                                        <p className="mb-0 f-12">Created Date</p>
                                        <span className="text-truncate w-100 f-10">{(slotDetail.createdDate && format(new Date(slotDetail.createdDate), "dd-MM-yyy")) || "N/A"}</span>
                                    </div>
                                </div>
                            </li>

                            <li className="col-6">
                                <div className="d-flex align-items-center text-muted mb-2">
                                    <div className="avtar avtar-xs bg-light-secondary flex-shrink-0 me-2">
                                        <i className="fas fa-calendar-check"></i>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <p className="mb-0 f-12">Modified Date</p>
                                        <span className="text-truncate w-100 f-10">{(slotDetail.modifiedDate && format(new Date(slotDetail.modifiedDate), "dd-MM-yyy")) || "N/A"}</span>
                                    </div>
                                </div>
                            </li>

                            <li className="col-6">
                                <div className="d-flex align-items-center text-muted mb-2">
                                    <div className="avtar avtar-xs bg-light-secondary flex-shrink-0 me-2">
                                        <i className="fas fa-user-edit"></i>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <p className="mb-0 f-12">Created By</p>
                                        <span className="text-truncate w-100 f-10">{slotDetail.modifiedBy || "N/A"}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <hr className="my-3 border border-secondary-subtle" />

                        <div className="row g-2">
                            <div className="col-md-12 col-xl-12 mt-3">
                                <div className="w-100" style={{ height: 250 }}>
                                    <ReactPlayer url={slotDetail.pathUrl} controls className="w-100 h-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-8">
                <div className="card h-auto">
                    <div className="card-header">
                        <div className="d-flex align-items-center justify-content-between">
                            <h5>Content</h5>
                        </div>
                    </div>
                    <div className="card-body">
                        <div dangerouslySetInnerHTML={{ __html: slotDetail.content }} />
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <div className="d-flex align-items-center justify-content-between">
                            <h5>Answer Student</h5>
                            <Link to={`/teacher/class/${classId}/answer/${slug}`}>View All</Link>
                        </div>
                    </div>
                    <div className="card-body">
                        {answerStudents?.map((answer, index) => (
                            <AnswerStudent answer={answer} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ClassCourseSlotDetailTeacher;
