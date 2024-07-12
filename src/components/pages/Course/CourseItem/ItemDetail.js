import { Link, useParams } from "react-router-dom";
import api from "../../../../services/api";
import url from "../../../../services/url";
import Layout from "../../../layouts";
import { format } from "date-fns";
import Question from "../../../views/CourseOnline/Question";
import { useState, useEffect, useCallback } from "react";
import CreateQuestion from "../../../views/CourseOnline/CreateQuestion";
import ReactPlayer from "react-player";

function ItemDetail() {
    const { slug } = useParams();

    // const courseData = useAxiosGet({
    //     path: url.COURSE_ITEM.DETAIL + `/${slug}`,
    // });

    const [courseDetail, setCourseDetail] = useState({});

    const loadData = useCallback(async () => {
        try {
            const courseResponse = await api.get(url.COURSE_ITEM.DETAIL + `/${slug}`);
            setCourseDetail(courseResponse.data.data);
        } catch (error) {
            console.log(error);
        }
    }, [slug]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <Layout title="Course Item Detail">
            {(courseDetail.itemType === 0 || courseDetail.itemType === 2) && (
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card h-100">
                            <div className="card-header d-flex align-items-center justify-content-between py-3">
                                <h5>Information</h5>
                                <Link to={`/course-online/item-edit/${courseDetail.slug}`} className="btn btn-icon btn-link-secondary">
                                    <i className="ti ti-edit"></i>
                                </Link>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-6">
                                        <div className="media align-items-center">
                                            <div className="avtar avtar-s bg-light-primary flex-shrink-0">
                                                <i className="fas fa-signature"></i>
                                            </div>
                                            <div className="media-body ms-3">
                                                <h5 className="mb-0">Name</h5>
                                                <p className="mb-0 text-sm text-muted">{courseDetail.title}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="media align-items-center">
                                            <div className="avtar avtar-s bg-light-danger flex-shrink-0">
                                                <i className="fas fa-chart-line"></i>
                                            </div>
                                            <div className="media-body ms-3">
                                                <h5 className="mb-0">No.</h5>
                                                <p className="mb-0 text-sm text-muted">{courseDetail.orderTop}</p>
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
                                                <span className="text-truncate w-100 f-10">{courseDetail.createdBy || "N/A"}</span>
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
                                                <span className="text-truncate w-100 f-10">{(courseDetail.createdDate && format(new Date(courseDetail.createdDate), "dd-MM-yyy")) || "N/A"}</span>
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
                                                <span className="text-truncate w-100 f-10">{(courseDetail.modifiedDate && format(new Date(courseDetail.modifiedDate), "dd-MM-yyy")) || "N/A"}</span>
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
                                                <span className="text-truncate w-100 f-10">{courseDetail.modifiedBy || "N/A"}</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <hr className="my-3 border border-secondary-subtle" />
                                <div>
                                    <h5>Content: </h5>
                                    <p className="mb-0" dangerouslySetInnerHTML={{ __html: courseDetail.content }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card h-100">
                            <div className="p-4 h-100">
                                <ReactPlayer url={courseDetail.pathUrl} controls className="w-100 h-100" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {courseDetail.itemType === 1 && (
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-header d-flex align-items-center justify-content-between py-3">
                                <h5>Information</h5>
                                <Link to={`/course-online/item-edit/${courseDetail.slug}`} className="btn btn-icon btn-link-secondary">
                                    <i className="ti ti-edit"></i>
                                </Link>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-6">
                                        <div className="media align-items-center">
                                            <div className="avtar avtar-s bg-light-primary flex-shrink-0">
                                                <i className="fas fa-signature"></i>
                                            </div>
                                            <div className="media-body ms-3">
                                                <h5 className="mb-0">Name</h5>
                                                <p className="mb-0 text-sm text-muted">{courseDetail.title}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="media align-items-center">
                                            <div className="avtar avtar-s bg-light-danger flex-shrink-0">
                                                <i className="fas fa-chart-line"></i>
                                            </div>
                                            <div className="media-body ms-3">
                                                <h5 className="mb-0">No.</h5>
                                                <p className="mb-0 text-sm text-muted">{courseDetail.orderTop}</p>
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
                                                <span className="text-truncate w-100 f-10">{courseDetail.createdBy || "N/A"}</span>
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
                                                <span className="text-truncate w-100 f-10">{(courseDetail.createdDate && format(new Date(courseDetail.createdDate), "dd-MM-yyy")) || "N/A"}</span>
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
                                                <span className="text-truncate w-100 f-10">{(courseDetail.modifiedDate && format(new Date(courseDetail.modifiedDate), "dd-MM-yyy")) || "N/A"}</span>
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
                                                <span className="text-truncate w-100 f-10">{courseDetail.modifiedBy || "N/A"}</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <div className="card h-100">
                            <div className="card-header d-flex align-items-center justify-content-between py-3">
                                <h5>Question</h5>
                                <button className="btn btn-primary rounded-1" data-bs-toggle="modal" data-bs-target="#createQuestionModal" data-bs-whatever="@mdo">
                                    Add New Question
                                </button>

                                <CreateQuestion courseDetail={courseDetail} loadData={loadData} />
                            </div>

                            <div className="card-body">
                                {courseDetail?.questionItemOnlineDTOList.map((questions, questionIndex) => (
                                    <Question key={questionIndex} courseDetail={courseDetail} questions={questions} questionIndex={questionIndex} loadData={loadData} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default ItemDetail;
