import { Link } from "react-router-dom";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function CourseOfflineSubject({ subjects, courseId, reloadData }) {
    const handleDelete = async (id) => {
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
                const data = [id];
                const deleteRequest = await api.delete(url.SUBJECT.DELETE, { data, headers: { Authorization: `Bearer ${getAccessToken()}` } });

                if (deleteRequest.status === 200) {
                    toast.success("Delete subject successfully!");
                    reloadData();
                }
            }
        } catch (error) {
            if (error.response.status === 400) {
                toast.error("The subject cannot be deleted!");
            } else {
                toast.error(error.response.data.message);
            }
        }
    };
    return (
        <div className="row">
            {subjects?.map((subject, index) => (
                <div className="col-sm-6 mt-4" key={index}>
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
                                    <div className="dropdown">
                                        <Link to="" className="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="ti ti-dots-vertical f-18"></i>
                                        </Link>
                                        <div className="dropdown-menu dropdown-menu-end p-2">
                                            <Link to={`/subject/edit/${courseId}/${subject.slug}`} className="dropdown-item">
                                                Edit
                                            </Link>
                                            <button className="dropdown-item" onClick={() => handleDelete(subject.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
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
                                <Link to={`/course-offline/subject/${subject.slug}`} className="btn btn-sm btn-outline-primary">
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CourseOfflineSubject;
