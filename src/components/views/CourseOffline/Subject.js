import { Link } from "react-router-dom";

function CourseOfflineSubject({ subjects }) {
    return (
        <div className="row mt-4">
            {subjects.map((subject, index) => (
                <div className="col-sm-6" key={index}>
                    <div className="card border">
                        <div className="card-header p-3">
                            <div className="d-flex align-items-start">
                                <div className="flex-shrink-0">
                                    <div className="avtar avtar-s bg-light-danger">
                                        <i className="ti ti-book f-18"></i>
                                    </div>
                                </div>
                                <div className="flex-grow-1 mx-3">
                                    <h6 className="mb-0">{subject.name}</h6>
                                    <p className="mb-1">No. {index + 1 < 10 ? `0${index + 1}` : index + 1}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <Link to="" className="avtar avtar-s btn-link-secondary">
                                        <i className="ti ti-bookmarks f-18"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-3">
                            <div className="d-flex align-items-center justify-content-between">
                                <ul className="list-inline mb-0 me-2 d-flex justify-content-between">
                                    <li className="list-inline-item">
                                        <i className="ti ti-circles"></i> {subject.totalSlot < 10 ? `0${subject.totalSlot}` : `${subject.totalSlot}`} slot
                                    </li>
                                    <li className="list-inline-item">
                                        <i className="ti ti-cloud-upload"></i> {subject.createdBy || "N/A"}
                                    </li>
                                </ul>
                                <Link className="btn btn-sm btn-outline-primary">View</Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CourseOfflineSubject;
