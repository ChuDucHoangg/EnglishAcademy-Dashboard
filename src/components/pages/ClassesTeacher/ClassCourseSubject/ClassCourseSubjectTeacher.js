import { Link, useParams } from "react-router-dom";
import Layout from "../../../layouts";
import useAxiosGet from "../../../../hooks/useAxiosGet";
import url from "../../../../services/url";
import { getAccessToken } from "../../../../utils/auth";
import { format } from "date-fns";
import api from "../../../../services/api";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useState } from "react";
import ButtonSubmit from "../../../layouts/ButtonSubmit";

function ClassCourseSubjectTeacher() {
    const { classId, courseSlug } = useParams();

    const subjectData = useAxiosGet({
        path: url.CLASS.COURSE_SUBJECT_LIST_BY_CLASS + `/${courseSlug}/${classId}`,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const slots = subjectData.response || [];
    const [submitting, setSubmitting] = useState(false);

    const handleDeleteSlot = async (id) => {
        try {
            const data = [id];

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

            setSubmitting(true);

            if (isConfirmed.isConfirmed) {
                const deleteRequest = await api.delete(url.CLASS.COURSE_ITEM_SLOT_DELETE, { data, headers: { Authorization: `Bearer ${getAccessToken()}` } });
                if (deleteRequest.status === 200) {
                    toast.success("Deleted successfully!", {
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
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Layout title={`${slots.name || "Loading..."}`}>
            <div className="card">
                <div className="card-header text-start">
                    <div className="datatable-top pb-0">
                        <div className="datatable-search">
                            <input className="datatable-input" placeholder="Search..." type="search" />
                        </div>
                        <div className="datatable-dropdown">
                            <div className="d-flex align-items-center gap-3">
                                {slots?.testOfflineResponseList?.length === 0 && (
                                    <Link to={`/teacher/class/${classId}/exam-create/${slots.id}`} className="btn btn-outline-secondary d-flex align-items-center justify-content-end">
                                        <i className="fas fa-file-signature"></i> Create Final Exam
                                    </Link>
                                )}

                                <Link to={`/teacher/class/${classId}/${courseSlug}/item-slot/create`} className="btn btn-outline-primary d-flex align-items-center justify-content-end">
                                    <i className="ti ti-plus"></i> Create Slot
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body pc-component">
                    <div className="accordion accordion-flush" id="accordionFlushExample">
                        {slots?.slotResponseDetailList?.map((subject, subjectIndex) => (
                            <div className="accordion-item" key={subjectIndex}>
                                <h2 className="accordion-header" id={`flush-heading-${subjectIndex}`}>
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#flush-collapse-${subjectIndex}`}
                                        aria-expanded="false"
                                        aria-controls={`flush-collapse-${subjectIndex}`}
                                    >
                                        {subject.name}
                                        <p className="fw-light px-3 f-10 m-0">{subject.time}</p>
                                    </button>
                                </h2>
                                <div
                                    id={`flush-collapse-${subjectIndex}`}
                                    className="accordion-collapse collapse"
                                    aria-labelledby={`flush-heading-${subjectIndex}`}
                                    data-bs-parent="#accordionFlushExample"
                                >
                                    <div className="accordion-body">
                                        {subject.itemSlotResponseList.length === 0 ? (
                                            <p className="text-warning">This slot has no content.</p>
                                        ) : (
                                            subject.itemSlotResponseList.map((slot, slotIndex) => (
                                                <div className="py-2" key={slotIndex}>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <Link to={`/teacher/class/${classId}/slot/${slot.slug}`}>
                                                            <div className="d-flex align-items-center">
                                                                <div className="flex-shrink-0">
                                                                    <div className="avtar avtar-s border" data-bs-toggle="tooltip">
                                                                        <span className="text-secondary">
                                                                            {slot.itemType === 0 && <i className="ti ti-hash"></i>}
                                                                            {slot.itemType === 1 && <i className="ti ti-clipboard"></i>}
                                                                            {slot.itemType === 2 && <i className="ti ti-help"></i>}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <div className="flex-grow-1 ms-3">
                                                                    <div className="row g-1">
                                                                        <h6 className="mb-0">{slot.title}</h6>
                                                                        <p className="text-muted mb-0">
                                                                            <small>Created: {(slot.createdDate && format(new Date(slot.createdDate), "HH:mm:ss dd-MM-yyyy")) || "N/A"}</small>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className="d-flex gap-3">
                                                            <ButtonSubmit
                                                                className="btn-icon btn-light-danger"
                                                                icon="ti ti-trash"
                                                                submitting={submitting}
                                                                valueSubmit=""
                                                                handleEvent={() => handleDeleteSlot(slot.id)}
                                                            />
                                                            <Link to={`/teacher/class/${classId}/${courseSlug}/item-slot/edit/${slot.slug}`} className="btn btn-icon btn-light-info">
                                                                <i className="ti ti-edit"></i>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {slots?.testOfflineResponseList?.[0] && (
                            <div className="accordion-item" key={0}>
                                <h2 className="accordion-header" id={`flush-heading-2-0`}>
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#flush-collapse-2-0`}
                                        aria-expanded="false"
                                        aria-controls={`flush-collapse-2-0`}
                                    >
                                        Final Exam
                                        <p className="fw-light px-3 f-10 m-0"> Start Date: {format(new Date(slots.testOfflineResponseList[0].startDate), "HH:mm:ss dd-MM-yyyy")}</p>
                                    </button>
                                </h2>
                                <div id={`flush-collapse-2-0`} className="accordion-collapse collapse" aria-labelledby={`flush-heading-2-0`} data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        <Link to={`/teacher/class/${classId}/slot-test/${slots.testOfflineResponseList[0].slug}`} className="text-secondary d-block">
                                            <i className="fas fa-file-signature"></i>
                                            {slots.testOfflineResponseList[0].title}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ClassCourseSubjectTeacher;
