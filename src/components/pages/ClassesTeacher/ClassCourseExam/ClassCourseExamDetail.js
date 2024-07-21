import { Link, useParams } from "react-router-dom";
import Layout from "../../../layouts";
import { useCallback, useEffect, useState } from "react";
import api from "../../../../services/api";
import url from "../../../../services/url";
import { getAccessToken } from "../../../../utils/auth";
import ButtonSubmit from "../../../layouts/ButtonSubmit";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function ClassCourseExamDetail() {
    const { classId, slotSlug } = useParams();

    const [listTest, setListTest] = useState([]);
    const [toggleMarker, setToggleMarker] = useState(false);
    const [scores, setScores] = useState([]);

    const loadData = useCallback(async () => {
        try {
            const listTestRequest = await api.get(url.TEST_OFFLINE.LIST_STUDENT_TEST + `/${classId}/${slotSlug}`, {
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            });
            setListTest(listTestRequest.data.data);
            setScores(listTestRequest.data.data.map((test) => ({ id: test.id, score: 0 || test.score })));
        } catch (error) {
            toast.error("Failed to load data", {
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
    }, [classId, slotSlug]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleScoreChange = (index, value) => {
        const score = parseInt(value, 10);
        if (score < 0 || score > 100) {
            toast.error("Score must be between 0 and 100", {
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
        const newScores = [...scores];
        newScores[index].score = score;
        setScores(newScores);
    };

    const handleMarkPoint = async () => {
        try {
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
                // Filter out scores that are null
                const filteredScores = scores.filter((score) => score.score !== null);

                const markPointRequest = await api.put(url.TEST_OFFLINE.MARK_POINT, filteredScores, {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                });

                if (markPointRequest.status === 200) {
                    setToggleMarker(!toggleMarker);
                    toast.success("Points marked successfully", {
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
    };

    return (
        <Layout title={`Class Course Exam Detail`}>
            <div className="col-lg-4">
                <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between">
                        <h5>Information</h5>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-12">
                                <div className="media align-items-center">
                                    <div className="avtar avtar-s bg-light-primary flex-shrink-0">
                                        <i className="fas fa-signature"></i>
                                    </div>
                                    <div className="media-body ms-3">
                                        <h5 className="mb-0">Title</h5>
                                        <p className="mb-0 text-sm text-muted">{"Class Title"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="my-3 border border-secondary-subtle" />
                        <ul className="list-unstyled row mb-0">
                            <li className="col-6">
                                <div className="d-flex align-items-center text-muted mb-2">
                                    <div className="avtar avtar-xs bg-light-secondary flex-shrink-0 me-2">
                                        <i className="fas fa-calendar-alt"></i>
                                    </div>

                                    <div className="d-flex flex-column">
                                        <p className="mb-0 f-12">Start Date</p>
                                        <span className="text-truncate w-100 f-10">{"N/A"}</span>
                                    </div>
                                </div>
                            </li>

                            <li className="col-6">
                                <div className="d-flex align-items-center text-muted mb-2">
                                    <div className="avtar avtar-xs bg-light-secondary flex-shrink-0 me-2">
                                        <i className="fas fa-calendar-check"></i>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <p className="mb-0 f-12">End Date</p>
                                        <span className="text-truncate w-100 f-10">{"N/A"}</span>
                                    </div>
                                </div>
                            </li>

                            <li className="col-6">
                                <div className="d-flex align-items-center text-muted mb-2">
                                    <div className="avtar avtar-xs bg-light-secondary flex-shrink-0 me-2">
                                        <i className="fas fa-user-plus"></i>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <p className="mb-0 f-12">Created By</p>
                                        <span className="text-truncate w-100 f-10">{"N/A"}</span>
                                    </div>
                                </div>
                            </li>

                            <li className="col-6">
                                <div className="d-flex align-items-center text-muted mb-2">
                                    <div className="avtar avtar-xs bg-light-secondary flex-shrink-0 me-2">
                                        <i className="fas fa-user-edit"></i>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <p className="mb-0 f-12">Modified By</p>
                                        <span className="text-truncate w-100 f-10">{"N/A"}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
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
                    <div className="card-body">{/* <div dangerouslySetInnerHTML={{ __html: slotDetail.content }} /> */}</div>
                </div>
            </div>

            <div className="col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <div className="d-flex align-items-center justify-content-between">
                            <h4 className="mb-0">asdads</h4>

                            {!toggleMarker && (
                                <button className="btn btn-outline-secondary d-inline-flex" onClick={() => setToggleMarker(!toggleMarker)}>
                                    <i className="ti ti-edit"></i> Mark
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                                <div className="datatable-container">
                                    <table className="table table-hover datatable-table" id="pc-dt-simple">
                                        <thead>
                                            <tr>
                                                <th>Ordinal</th>
                                                <th>Code</th>
                                                <th>Student</th>
                                                <th>Submission</th>
                                                <th>Status</th>
                                                <th>Point</th>
                                                <th className="text-center">View</th>
                                            </tr>
                                        </thead>
                                        <tbody id="orders">
                                            {listTest.map((test, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{test.code}</td>
                                                    <td>Ngo Manh Son</td>
                                                    <td>{test.time}</td>
                                                    <td className={`${test.passed === true ? "text-success" : "text-danger"} `}>{test.passed === true ? "Passed" : "Not Pass"}</td>
                                                    <td style={{ maxWidth: 50 }}>
                                                        {toggleMarker ? (
                                                            <input
                                                                type="number"
                                                                className="form-control form-control-sm text-center"
                                                                value={scores[index].score}
                                                                onChange={(e) => handleScoreChange(index, e.target.value)}
                                                            />
                                                        ) : (
                                                            test.score || "N/A"
                                                        )}
                                                    </td>
                                                    <td className="text-center">
                                                        {!toggleMarker && (
                                                            <Link to={`/teacher/class/${classId}/view-exam/detail/${test.code}`} className="btn btn-icon btn-light-primary">
                                                                <i className="ti ti-eye"></i>
                                                            </Link>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {toggleMarker && (
                                <div className="text-end">
                                    <button className="btn btn-outline-secondary me-3" onClick={() => setToggleMarker(false)}>
                                        Cancel
                                    </button>

                                    <ButtonSubmit value="Save Point" valueSubmit="Saving..." className="btn-primary" handleEvent={handleMarkPoint} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ClassCourseExamDetail;
