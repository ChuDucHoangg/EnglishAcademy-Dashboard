import Layout from "../../layouts";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { format } from "date-fns";
import { formatLevelCourse } from "../../../utils/formatLevelCourse";
import { formatMinute } from "../../../utils/formatTime";
import { useState } from "react";
import api from "../../../services/api";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useCallback } from "react";

function CourseDetail() {
    const { slug } = useParams();

    const [courseDetail, setCourseDetail] = useState([]);

    const loadData = useCallback(async () => {
        try {
            const courseData = await api.get(url.COURSE.DETAIL + `/${slug}`, { headers: { Authorization: `Bearer ${getAccessToken()}` } });
            setCourseDetail(courseData.data.data);
        } catch (error) {
            console.log(error);
        }
    }, [slug]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const topics = courseDetail.topicOnlineDetailList || [];

    const handleDeleteTopic = async (id) => {
        const data = [id];
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
                const deleteRequest = await api.delete(url.TOPIC.DELETE, { data, headers: { Authorization: `Bearer ${getAccessToken()}` } });
                if (deleteRequest.status === 200) {
                    toast.success("Deleted Successfully!", {
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
            if (error.response.status === 400) {
                toast.error("The item cannot be deleted!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                toast.error("Error! An error occurred. Please try again later!", {
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
        }
    };

    const handleDeleteItem = async (id) => {
        const data = [id];
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
                const deleteRequest = await api.delete(url.ITEM.DELETE, { data, headers: { Authorization: `Bearer ${getAccessToken()}` } });
                if (deleteRequest.status === 200) {
                    toast.success("Deleted Successfully!", {
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
            if (error.response.status === 400) {
                toast.error("The item cannot be deleted!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                toast.error("Error! An error occurred. Please try again later!", {
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
        }
    };

    return (
        <Layout title="Course  Detail">
            <div className="row">
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
                                            <p className="mb-0 text-sm text-muted">{formatLevelCourse(courseDetail.level)}</p>
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
                                <div className="col-md-12 col-xl-12 mt-3">
                                    <div className="w-100" style={{ height: 250 }}>
                                        <ReactPlayer url={courseDetail.trailer} controls className="w-100 h-100" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="mail-wrapper">
                        <div className="mail-content">
                            <div className="card">
                                <div className="card-body">
                                    <div className="tab-content" id="nav-tabContent">
                                        <div className="tab-pane fade show active" id="list-mail-1" role="tabpanel" aria-labelledby="list-mailtab-1">
                                            <div className="card table-card">
                                                <div className="card-body py-0 px-2">
                                                    <div className="d-sm-flex align-items-center">
                                                        <ul className="nav nav-tabs profile-tabs" id="myTab" role="tablist">
                                                            <li className="nav-item" role="presentation">
                                                                <a className="nav-link active" id="profile-tab-1" data-bs-toggle="tab" href="!#profile-1" role="tab" aria-selected="true">
                                                                    <i className="fas fa-file-signature me-2"></i> Lesson
                                                                </a>
                                                            </li>
                                                            <li className="nav-item" role="presentation">
                                                                <a className="nav-link" id="profile-tab-2" data-bs-toggle="tab" href="!#profile-2" role="tab" aria-selected="false" tabIndex="-1">
                                                                    <i className="ti ti-file-text me-2"></i>Test Lesson
                                                                </a>
                                                            </li>
                                                        </ul>
                                                        <ul className="list-inline ms-auto mb-3">
                                                            <li className="list-inline-item">
                                                                <Link to={`/course-online/topic-create/${courseDetail.id}`} className="btn btn-primary">
                                                                    Add Topic
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="card-body scroll-block">
                                                    <div className="tab-content">
                                                        <div className="tab-pane active show" id="profile-1" role="tabpanel" aria-labelledby="profile-tab-1">
                                                            <div className="card">
                                                                <div className="card-body pc-component">
                                                                    <div className="accordion accordion-flush" id="accordionFlushExample">
                                                                        {topics.map((topic, index) => (
                                                                            <div className="accordion-item" key={index}>
                                                                                <h2 className="accordion-header" id={`flush-heading${index}`}>
                                                                                    <button
                                                                                        className="accordion-button collapsed"
                                                                                        type="button"
                                                                                        data-bs-toggle="collapse"
                                                                                        data-bs-target={`#flush-collapse${index}`}
                                                                                        aria-expanded="false"
                                                                                        aria-controls={`flush-collapse${index}`}
                                                                                    >
                                                                                        {index + 1}. {topic.name}
                                                                                    </button>
                                                                                </h2>

                                                                                <div
                                                                                    id={`flush-collapse${index}`}
                                                                                    className="accordion-collapse collapse"
                                                                                    aria-labelledby={`flush-heading${index}`}
                                                                                    data-bs-parent="#accordionFlushExample"
                                                                                >
                                                                                    {topic.itemOnlineDTOList.length === 0 ? (
                                                                                        <p className="text-warning px-4 pt-3">This item has no content.</p>
                                                                                    ) : (
                                                                                        <>
                                                                                            <div className="d-flex align-items-center justify-content-between my-3">
                                                                                                <div>
                                                                                                    <Link
                                                                                                        to={`/course-online/topic-edit/${courseDetail.id}/${topic.slug}`}
                                                                                                        className="btn btn-icon btn-link-success"
                                                                                                    >
                                                                                                        <i className="ti ti-edit"></i>
                                                                                                    </Link>
                                                                                                    <button onClick={() => handleDeleteTopic(topic.id)} className="btn btn-icon btn-link-danger">
                                                                                                        <i className="ti ti-trash"></i>
                                                                                                    </button>
                                                                                                </div>
                                                                                                <Link
                                                                                                    to={`/course-online/item-create/${courseDetail.slug}`}
                                                                                                    className="btn btn-outline-primary d-flex align-items-center"
                                                                                                >
                                                                                                    <i className="ti ti-plus"></i> Add Item
                                                                                                </Link>
                                                                                            </div>

                                                                                            <ul className="list-group list-group-flush mb-3 border">
                                                                                                {topic.itemOnlineDTOList?.map((item, index) => (
                                                                                                    <li className="list-group-item" key={index}>
                                                                                                        <div className="d-flex align-items-center">
                                                                                                            <div className="flex-shrink-0">
                                                                                                                <div
                                                                                                                    className="avtar avtar-s border"
                                                                                                                    data-bs-toggle="tooltip"
                                                                                                                    data-bs-title="143 Posts"
                                                                                                                >
                                                                                                                    <span>
                                                                                                                        {item.itemType === 0 && <i className="ti ti-player-play"></i>}
                                                                                                                        {item.itemType === 1 && <i className="ti ti-help"></i>}
                                                                                                                        {item.itemType === 2 && <i className="ti ti-hash"></i>}
                                                                                                                    </span>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <div className="row g-1">
                                                                                                                    <div className="col-6">
                                                                                                                        <h6 className="mb-0">{item.title}</h6>
                                                                                                                        <p className="text-muted mb-0">
                                                                                                                            <small>
                                                                                                                                {(item.createdDate &&
                                                                                                                                    format(new Date(item.createdDate), "dd-MM-yyyy")) ||
                                                                                                                                    "N/A"}
                                                                                                                            </small>
                                                                                                                        </p>
                                                                                                                    </div>
                                                                                                                    <div className="col-6 text-end">
                                                                                                                        <div className="mail-buttons">
                                                                                                                            <ul className="list-inline mb-0">
                                                                                                                                <li className="list-inline-item">
                                                                                                                                    <Link
                                                                                                                                        to={`/course-online/item/${item.slug}`}
                                                                                                                                        className="avtar avtar-s btn-link-secondary"
                                                                                                                                    >
                                                                                                                                        <i className="ti ti-eye f-18"></i>
                                                                                                                                    </Link>
                                                                                                                                </li>
                                                                                                                                <li className="list-inline-item">
                                                                                                                                    <Link
                                                                                                                                        to={`/course-online/item-edit/${item.slug}`}
                                                                                                                                        className="avtar avtar-s btn-link-secondary"
                                                                                                                                    >
                                                                                                                                        <i className="ti ti-edit f-18"></i>
                                                                                                                                    </Link>
                                                                                                                                </li>
                                                                                                                                <li className="list-inline-item">
                                                                                                                                    <button
                                                                                                                                        onClick={() => handleDeleteItem(item.id)}
                                                                                                                                        className="avtar avtar-s btn-link-secondary"
                                                                                                                                    >
                                                                                                                                        <i className="ti ti-trash f-18"></i>
                                                                                                                                    </button>
                                                                                                                                </li>
                                                                                                                            </ul>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </li>
                                                                                                ))}
                                                                                            </ul>
                                                                                        </>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="tab-pane" id="profile-2" role="tabpanel" aria-labelledby="profile-tab-1">
                                                            <div className="card">
                                                                <div className="card-body pc-component">
                                                                    <div className="accordion accordion-flush" id="accordionFlush2">
                                                                        {topics.map((topic, index) => (
                                                                            <div className="accordion-item" key={index}>
                                                                                <h2 className="accordion-header" id={`flush-heading2${index}`}>
                                                                                    <button
                                                                                        className="accordion-button collapsed"
                                                                                        type="button"
                                                                                        data-bs-toggle="collapse"
                                                                                        data-bs-target={`#flush-collapse2${index}`}
                                                                                        aria-expanded="false"
                                                                                        aria-controls={`flush-collapse2${index}`}
                                                                                    >
                                                                                        {index + 1}. {topic.name}
                                                                                    </button>
                                                                                </h2>
                                                                                <div
                                                                                    id={`flush-collapse2${index}`}
                                                                                    className="accordion-collapse collapse"
                                                                                    aria-labelledby={`flush-heading2${index}`}
                                                                                    data-bs-parent="#accordionFlush2"
                                                                                >
                                                                                    {topic.testOnlineDTOList.length === 0 ? (
                                                                                        <p className="text-warning px-4 pt-3">This item has no content.</p>
                                                                                    ) : (
                                                                                        <table className="table table-hover datatable-table border" id="pc-dt-simple" key={index}>
                                                                                            <thead>
                                                                                                <tr>
                                                                                                    <th data-sortable="true">Name</th>
                                                                                                    <th data-sortable="true">Pass Mark</th>
                                                                                                    <th data-sortable="true">Question</th>
                                                                                                    <th data-sortable>Time</th>
                                                                                                    <th data-sortable="true" className="text-center">
                                                                                                        Actions
                                                                                                    </th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody id="orders">
                                                                                                {topic.testOnlineDTOList.map((item, index) => (
                                                                                                    <tr data-index="0" key={index}>
                                                                                                        <td>{item.title}</td>
                                                                                                        <td>
                                                                                                            {item.pastMark} / {item.totalMark}
                                                                                                        </td>
                                                                                                        <td>{item.totalQuestion}</td>
                                                                                                        <td>{formatMinute(item.time)}</td>
                                                                                                        <td className="text-center">
                                                                                                            <Link to="" className="avtar avtar-xs btn-link-success btn-pc-default">
                                                                                                                <i className="ti ti-eye f-18"></i>
                                                                                                            </Link>
                                                                                                            <a className="avtar avtar-xs btn-link-success btn-pc-default" href="/category-edit/ielts">
                                                                                                                <i className="ti ti-edit-circle f-18"></i>
                                                                                                            </a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                ))}
                                                                                            </tbody>
                                                                                        </table>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        ))}
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
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CourseDetail;
