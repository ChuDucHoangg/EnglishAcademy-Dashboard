import Layout from "../../layouts";
import useAxiosGet from "../../../hooks/useAxiosGet";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { format } from "date-fns";
import CourseOfflineSubject from "../../views/CourseOffline/Subject";

function CourseOfflineDetail() {
    const { slug } = useParams();

    const courseOfflineData = useAxiosGet({
        path: url.COURSE_OFFLINE.DETAIL + `/${slug}`,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const courseDetail = courseOfflineData.response || {};

    const subjects = courseDetail.subjectList || [];

    return (
        <Layout title="Course Offline Detail">
            <div className="row">
                <div className="col-sm-4">
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
                                            <h5 className="mb-0">Name</h5>
                                            <p className="mb-0 text-sm text-muted">{courseDetail.name}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="media align-items-center">
                                        <div className="avtar avtar-s bg-light-warning flex-shrink-0">$</div>
                                        <div className="media-body ms-3">
                                            <h5 className="mb-0">Price</h5>
                                            <p className="mb-0 text-sm text-muted">${courseDetail.price?.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="media align-items-center">
                                        <div className="avtar avtar-s bg-light-success flex-shrink-0">
                                            <i className="fas fa-globe-asia"></i>
                                        </div>
                                        <div className="media-body ms-3">
                                            <h5 className="mb-0">Language</h5>
                                            <p className="mb-0 text-sm text-muted">{courseDetail.language}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="media align-items-center">
                                        <div className="avtar avtar-s bg-light-danger flex-shrink-0">
                                            <i className="fas fa-chart-line"></i>
                                        </div>
                                        <div className="media-body ms-3">
                                            <h5 className="mb-0">Level</h5>
                                            <p className="mb-0 text-sm text-muted">{courseDetail.level}</p>
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
                            <p className="mb-0">Description: {courseDetail.description}</p>
                            <hr className="my-3 border border-secondary-subtle" />
                            <div className="row g-2">
                                <div className="col-md-12 col-xl-12">
                                    <img className="card-img" src={courseDetail.image} alt={courseDetail.name} />
                                </div>
                                <div className="col-md-12 col-xl-12">
                                    <div className="w-100 h-100">
                                        <ReactPlayer url={courseDetail.trailer} controls className="w-100 h-100" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-8">
                    <div className="mail-wrapper">
                        <div className="mail-content">
                            <div className="card">
                                <div className="card-body">
                                    <div className="tab-content" id="nav-tabContent">
                                        <div className="tab-pane fade show active" id="list-mail-1" role="tabpanel" aria-labelledby="list-mailtab-1">
                                            <div className="table-card">
                                                <div className="py-0 px-2">
                                                    <div className="d-sm-flex align-items-center">
                                                        <ul className="nav nav-tabs profile-tabs" id="myTab" role="tablist">
                                                            <li className="nav-item" role="presentation">
                                                                <a className="nav-link active" id="profile-tab-1" data-bs-toggle="tab" href="!#profile-1" role="tab" aria-selected="true">
                                                                    <i className="ti ti-user me-2"></i>Subject
                                                                </a>
                                                            </li>
                                                            <li className="nav-item" role="presentation">
                                                                <a className="nav-link" id="profile-tab-2" data-bs-toggle="tab" href="!#profile-2" role="tab" aria-selected="false" tabIndex="-1">
                                                                    <i className="ti ti-file-text me-2"></i>Exam
                                                                </a>
                                                            </li>
                                                        </ul>
                                                        <ul className="list-inline ms-auto mb-3">
                                                            <li className="list-inline-item">
                                                                <Link className="btn btn-link-primary">View All</Link>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <div className="form-search">
                                                                    <Link to={`/subject/create/${courseDetail.id}`} className="btn btn-outline-primary">
                                                                        Create Subject
                                                                    </Link>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="card-body scroll-block">
                                                    <div className="tab-content">
                                                        <div className="tab-pane active show" id="profile-1" role="tabpanel" aria-labelledby="profile-tab-1">
                                                            <CourseOfflineSubject subjects={subjects} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CourseOfflineDetail;
