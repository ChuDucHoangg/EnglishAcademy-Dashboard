import { Link, useParams } from "react-router-dom";
import Layout from "../../../layouts";
import ButtonSubmit from "../../../layouts/ButtonSubmit";

function SubjectDetail() {
    const { slug } = useParams();

    return (
        <Layout title={`Subject Detail`}>
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header text-start">
                        <div className="datatable-top pb-0">
                            <div className="datatable-search">
                                <input className="datatable-input" placeholder="Search..." type="search" />
                            </div>
                            <div className="datatable-dropdown">
                                <div className="d-flex align-items-center gap-3">
                                    <Link to={`/course-offline/exam/create/`} className="btn btn-outline-secondary d-flex align-items-center justify-content-end">
                                        <i className="fas fa-file-signature"></i> Create Final Exam
                                    </Link>

                                    <Link to={``} className="btn btn-outline-primary d-flex align-items-center justify-content-end">
                                        <i className="ti ti-plus"></i> Create Slot
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body pc-component">
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id={`flush-heading-`}>
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#flush-collapse-`}
                                        aria-expanded="false"
                                        aria-controls={`flush-collapse-`}
                                    >
                                        bac
                                        <p className="fw-light px-3 f-10 m-0">30</p>
                                    </button>
                                </h2>
                                <div id={`flush-collapse-`} className="accordion-collapse collapse" aria-labelledby={`flush-heading-`} data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        <div className="py-2">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <Link to={``}>
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0">
                                                            <div className="avtar avtar-s border" data-bs-toggle="tooltip">
                                                                <span className="text-secondary"></span>
                                                            </div>
                                                        </div>

                                                        <div className="flex-grow-1 ms-3">
                                                            <div className="row g-1">
                                                                <div className="col-6">
                                                                    <h6 className="mb-0">asdads</h6>
                                                                </div>
                                                                <p className="text-muted mb-0">
                                                                    <small>Created: </small>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="d-flex gap-3">
                                                    <ButtonSubmit className="btn-icon btn-light-danger" icon="ti ti-trash" valueSubmit="" />
                                                    <Link to={``} className="btn btn-icon btn-light-info">
                                                        <i className="ti ti-edit"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id={`flush-heading-2-`}>
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#flush-collapse-2-`}
                                        aria-expanded="false"
                                        aria-controls={`flush-collapse-2-`}
                                    >
                                        Final Exam
                                        <p className="fw-light px-3 f-10 m-0"> Start Date: </p>
                                    </button>
                                </h2>
                                <div id={`flush-collapse-2-`} className="accordion-collapse collapse" aria-labelledby={`flush-heading-2-`} data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        <Link to={``} className="text-secondary d-block">
                                            <i className="fas fa-file-signature"></i>s
                                        </Link>
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

export default SubjectDetail;
