import { useParams } from "react-router-dom";
import Layout from "../../layouts";
import api from "../../../services/api";
import url from "../../../services/url";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import ReactPlayer from "react-player";

function CourseDetail() {
    const { slug } = useParams();
    const [data, setData] = useState({});

    //show information data
    useEffect(() => {
        api.get(`${url.COURSE.DETAIL.replace("{}", slug)}`)
            .then((response) => {
                const initialData = {
                    ...response.data.data,
                    image: response.data.data.image,
                    createdDate: format(new Date(response.data.data.createdDate), "yyyy-MM-dd"),
                };
                setData(initialData);
            })
            .catch((error) => {
                console.error("Error fetching course details:", error);
            });
    }, [slug]);
    return (
        <>
            <Layout title="Course Online Detail">
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-header d-flex align-items-center justify-content-between">
                            <h5>Information</h5>
                        </div>
                        <div className="card-body">
                            <div className="row g-3">
                                <div className="col-6">
                                    <div className="media align-items-center">
                                        <div className="avtar avtar-s bg-light-primary flex-shrink-0"></div>
                                        <div className="media-body ms-3">
                                            <h5 className="mb-0">Name</h5>
                                            <p className="mb-0 text-sm text-muted">{data.name}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="media align-items-center">
                                        <div className="avtar avtar-s bg-light-warning flex-shrink-0"></div>
                                        <div className="media-body ms-3">
                                            <h5 className="mb-0">Price</h5>
                                            <p className="mb-0 text-sm text-muted">{data.price}$</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="media align-items-center">
                                        <div className="avtar avtar-s bg-light-danger flex-shrink-0"></div>
                                        <div className="media-body ms-3">
                                            <h5 className="mb-0">Level</h5>
                                            <p className="mb-0 text-sm text-muted">{data.level}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="media align-items-center">
                                        <div className="avtar avtar-s bg-light-success flex-shrink-0"></div>
                                        <div className="media-body ms-3">
                                            <h5 className="mb-0">Language</h5>
                                            <p className="mb-0 text-sm text-muted">{data.language}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="my-3 border border-secondary-subtle" />
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a className="d-flex align-items-center text-muted text-hover-primary mb-2" href="https://phoenixcoded.net/" target="_blank">
                                        <div className="avtar avtar-xs bg-light-secondary flex-shrink-0 me-2"> </div>
                                        <span className="text-truncate w-100">320 learner</span>
                                    </a>
                                </li>
                                <li>
                                    <div className="d-flex align-items-center text-muted mb-2">
                                        <div className="avtar avtar-xs bg-light-secondary flex-shrink-0 me-2"> </div>
                                        <span className="text-truncate w-100">5.0 start quality</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex align-items-center text-muted mb-2">
                                        <div className="avtar avtar-xs bg-light-secondary flex-shrink-0 me-2"> </div>
                                        <span className="text-truncate w-100">{data.createdDate}</span>
                                    </div>
                                </li>
                                <li>
                                    <a className="d-flex align-items-center text-muted text-hover-primary mb-2" href="mailto:demo123@mail.com" target="_blank">
                                        <div className="avtar avtar-xs bg-light-secondary flex-shrink-0 me-2"></div>
                                        <span className="text-truncate w-100">{data.createdBy} is the creator</span>
                                    </a>
                                </li>
                            </ul>

                            <hr className="my-3 border border-secondary-subtle" />
                            <p className="mb-0">{data.description}</p>

                            <hr className="my-3 border border-secondary-subtle" />
                            <div className="row g-2">
                                <div className="col-md-12 col-xl-12">
                                    <img src={data.image} alt="img" className="card-img" />
                                </div>
                                <div className="col-md-12 col-xl-12">
                                    <ReactPlayer url={data.trailer} controls className="w-100 h-100" />
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
                                            <div className="card table-card">
                                                <div className="card-body py-0 px-2">
                                                    <div className="d-sm-flex align-items-center">
                                                        <ul className="nav nav-tabs profile-tabs" id="myTab" role="tablist">
                                                            <li className="nav-item">
                                                                <a className="nav-link active" id="profile-tab-1" data-bs-toggle="tab" href="#profile-1" role="tab" aria-selected="true">
                                                                    <i className="ti ti-user me-2"></i>Lesson
                                                                </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" id="profile-tab-2" data-bs-toggle="tab" href="#profile-2" role="tab" aria-selected="true">
                                                                    <i className="ti ti-file-text me-2"></i>Quiz
                                                                </a>
                                                            </li>
                                                        </ul>
                                                        <ul className="list-inline ms-auto mb-3">
                                                            <li className="list-inline-item">
                                                                <div className="form-search">
                                                                    <i className="ti ti-search"></i>
                                                                    <input type="search" className="form-control" placeholder="Search Lesson" />
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="card-body scroll-block ">
                                                    <div className="tab-content">
                                                        <div className="tab-pane show active" id="profile-1" role="tabpanel" aria-labelledby="profile-tab-1">
                                                            <table className="table table-borderless mb-0 mail-table">
                                                                <tbody>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <div className="d-flex align-items-center">
                                                                                <div className="form-check form-check-inline m-0 pc-icon-checkbox">
                                                                                    <input className="form-check-input" type="checkbox" />
                                                                                    <i className="material-icons-two-tone pc-icon-uncheck"></i>
                                                                                    <i className="material-icons-two-tone text-primary pc-icon-check"></i>
                                                                                </div>
                                                                                <div className="form-check form-check-inline my-0 mx-3 pc-icon-checkbox">
                                                                                    <input className="form-check-input" type="checkbox" />
                                                                                    <i className="material-icons-two-tone pc-icon-uncheck"></i>
                                                                                    <i className="material-icons-two-tone text-warning pc-icon-check"></i>
                                                                                </div>
                                                                                <div className="form-check form-check-inline m-0 pc-icon-checkbox">
                                                                                    <input className="form-check-input" type="checkbox" checked />
                                                                                    <i className="material-icons-two-tone pc-icon-uncheck"></i>
                                                                                    <i className="material-icons-two-tone text-secondary pc-icon-check"></i>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="d-flex align-items-center">
                                                                                <img src="../assets/images/user/avatar-1.jpg" alt="user-image" className="img-user rounded-circle" />
                                                                                <h6 className="mb-0 ms-2 text-truncate">Barney Thea</h6>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="d-flex w-100 align-items-center">
                                                                                <div className="flex-grow-1 position-relative">
                                                                                    <p className="mb-0 mail-text text-truncate">
                                                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                                                                        standard dummy text ever since the 1500s.been the industry's standard dummy text ever since the 1500s.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td> </td>
                                                                        <td className="mail-option">
                                                                            12 Jul 22 08:23 AM
                                                                            <div className="mail-buttons">
                                                                                <ul className="list-inline mb-0">
                                                                                    <li className="list-inline-item">
                                                                                        <a href="#" className="avtar avtar-s btn-link-secondary">
                                                                                            <i className="ti ti-archive f-18"></i>
                                                                                        </a>
                                                                                    </li>
                                                                                    <li className="list-inline-item">
                                                                                        <a href="#" className="avtar avtar-s btn-link-secondary">
                                                                                            <i className="ti ti-mail f-18"></i>
                                                                                        </a>
                                                                                    </li>
                                                                                    <li className="list-inline-item">
                                                                                        <a href="#" className="avtar avtar-s btn-link-secondary">
                                                                                            <i className="ti ti-trash f-18"></i>
                                                                                        </a>
                                                                                    </li>
                                                                                    <li className="list-inline-item">
                                                                                        <a href="#" className="avtar avtar-s btn-link-secondary">
                                                                                            <i className="ti ti-eye-off f-18"></i>
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
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
        </>
    );
}
export default CourseDetail;
