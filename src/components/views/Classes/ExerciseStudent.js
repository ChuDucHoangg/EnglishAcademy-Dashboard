import { format } from "date-fns";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";

function ExerciseStudent({ answerStudents, classId, reloadData }) {
    const [toggleMarker, setToggleMarker] = useState(false);
    const [point, setPoint] = useState("");

    const handleMarkPoint = async (id) => {
        try {
            const pointValue = Number(point);
            if (pointValue < 0 || pointValue > 100) {
                toast.error("Point must be between 0 and 100", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return;
            }

            const isConfirmed = await Swal.fire({
                title: "Are you sure?",
                text: "Please check again before agreeing",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "I'm sure",
                reverseButtons: true,
            });

            if (isConfirmed.isConfirmed) {
                const pointData = {
                    answerStudentItemSlotId: id,
                    star: pointValue,
                };

                const pointRequest = await api.put(url.CLASS.ITEM_SLOT_MARK_POINT + `/${classId}`, pointData, {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                });

                if (pointRequest.status === 200) {
                    toast.success("Marked successfully", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                    reloadData();
                }
            }
        } catch (error) {
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
        }
        setToggleMarker(false);
    };

    return (
        <div className="table-responsive">
            <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                <div className="datatable-container">
                    <table className="table table-hover datatable-table" id="pc-dt-simple">
                        <thead>
                            <tr>
                                <th>Ordinal</th>
                                <th>Student</th>
                                <th>Assignment</th>
                                <th>Submission</th>
                                <th>Point</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="orders">
                            {answerStudents.map((answer, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{answer.createdBy}</td>
                                    <td>
                                        <Link className="p-0 text-primary" to={answer.content} target="_blank">
                                            {answer.content}
                                        </Link>
                                    </td>
                                    <td>{answer.time && format(new Date(answer.time), "hh:mm:ss dd-MM-yyyy")}</td>
                                    <td>
                                        {toggleMarker ? (
                                            <input
                                                type="number"
                                                name="point"
                                                value={point}
                                                onChange={(e) => setPoint(e.target.value)}
                                                style={{ maxWidth: 60 }}
                                                className="form-control form-control-sm text-center"
                                            />
                                        ) : (
                                            answer.star
                                        )}
                                    </td>
                                    <td className="text-center">
                                        {toggleMarker ? (
                                            <button className="btn btn-icon btn-link-success" onClick={() => handleMarkPoint(answer.id)}>
                                                <i className="ti ti-device-floppy"></i>
                                            </button>
                                        ) : (
                                            <button className="btn btn-icon btn-link-primary" onClick={() => setToggleMarker(!toggleMarker)}>
                                                <i className="ti ti-edit"></i>
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ExerciseStudent;
