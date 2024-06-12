import { useState, useEffect } from "react";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import Swal from "sweetalert2";
import api from "../../../services/api";
import { toast } from "react-toastify";

function Account() {
    const [info, setInfo] = useState({});
    const [isEditButtonVisible, setEditButtonVisible] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedInfo, setEditedInfo] = useState({});
    const [phoneError, setPhoneError] = useState("");

    const userData = async () => {
        try {
            const userInfo = await api.get(url.AUTH.PROFILE, {
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            });

            setInfo(userInfo.data.data);
            setEditedInfo(userInfo.data.data);
        } catch (error) {
            toast.error("Failed to fetch user data", {
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

    useEffect(() => {
        userData();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditButtonVisible(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditButtonVisible(true);
        setEditedInfo({ ...info });
        setPhoneError("");
    };

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    };

    const handlePhoneChange = (e) => {
        const { value } = e.target;
        setEditedInfo({ ...editedInfo, phone: value });

        if (validatePhoneNumber(value)) {
            setPhoneError("");
        } else {
            setPhoneError("Invalid phone number. It should be a 10-digit number.");
        }
    };

    const handleSaveClick = async () => {
        if (phoneError) {
            toast.error(phoneError, {
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

        setEditButtonVisible(true);

        try {
            const isConfirmed = await Swal.fire({
                title: "Are you sure?",
                text: "You want to update your information?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "I'm sure",
                reverseButtons: true,
            });

            if (isConfirmed.isConfirmed) {
                const updateResponse = await api.put(url.AUTH.UPDATE_PROFILE, editedInfo, {
                    headers: { Authorization: `Bearer ${getAccessToken()}` },
                });

                if (updateResponse.status === 200) {
                    toast.success("Updated successfully!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                    setInfo(editedInfo);
                    setIsEditing(false);
                    setEditButtonVisible(true);
                    await userData();
                }
            }
        } catch (error) {
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
    };

    return (
        <div className="tab-pane show active" id="profile-1" role="tabpanel" aria-labelledby="profile-tab-1">
            <div className="row">
                <div className="col-lg-8 col-xxl-9">
                    <div className="card">
                        <div className="card-header d-flex align-items-center justify-content-between">
                            <h5>Personal Information</h5>
                            <button className="btn btn-icon btn-link-secondary" onClick={handleEditClick} style={{ display: isEditButtonVisible ? "block" : "none" }}>
                                <i className="ti ti-edit"></i>
                            </button>
                        </div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item px-0 pt-0">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p className="mb-1 text-muted">Full Name</p>
                                            <p className="mb-0">{editedInfo.fullName}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="mb-1 text-muted">Email</p>
                                            <p className="mb-0">{editedInfo.email}</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item px-0">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p className="mb-1 text-muted">User code</p>
                                            <p className="mb-0">{editedInfo.code}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="mb-1 text-muted">Phone Number</p>
                                            <p className="mb-0">
                                                {isEditing ? (
                                                    <>
                                                        <input type="tel" className="form-control form-control-sm" value={editedInfo.phone || ""} onChange={handlePhoneChange} />
                                                        {phoneError && <span className="text-danger">{phoneError}</span>}
                                                    </>
                                                ) : (
                                                    editedInfo.phone || "N/A"
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item px-0">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p className="mb-1 text-muted">Birthday</p>
                                            <p className="mb-0">
                                                {isEditing ? (
                                                    <input
                                                        type="date"
                                                        className="form-control form-control-sm"
                                                        value={editedInfo.dob || ""}
                                                        onChange={(e) => setEditedInfo({ ...editedInfo, dob: e.target.value })}
                                                    />
                                                ) : (
                                                    editedInfo.dob || "N/A"
                                                )}
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="mb-1 text-muted">Address</p>
                                            <p className="mb-0">
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm"
                                                        value={editedInfo.address || ""}
                                                        onChange={(e) => setEditedInfo({ ...editedInfo, address: e.target.value })}
                                                    />
                                                ) : (
                                                    editedInfo.address || "N/A"
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>

                            {isEditing && (
                                <div className="d-flex justify-content-end mt-5 gap-3">
                                    <button className="btn btn-light-danger" onClick={handleCancelClick}>
                                        Cancel
                                    </button>
                                    <button className="btn btn-primary" onClick={handleSaveClick}>
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-xxl-3">
                    {/* <div className="card">
                        <div className="card-body position-relative">
                            <div className="position-absolute end-0 top-0 p-3">
                                <span className="badge bg-primary">Pro</span>
                            </div>
                            <div className="text-center mt-3">
                                <div className="chat-avtar d-inline-flex mx-auto">
                                    <img className="rounded-circle img-fluid wid-70" src="../assets/images/user/avatar-5.jpg" alt="" />
                                </div>
                                <h5 className="mb-0">Anshan H.</h5>
                                <p className="text-muted text-sm">Project Manager</p>
                                <hr className="my-3 border border-secondary-subtle" />
                                <div className="row g-3">
                                    <div className="col-4">
                                        <h5 className="mb-0">86</h5>
                                        <small className="text-muted">Post</small>
                                    </div>
                                    <div className="col-4 border border-top-0 border-bottom-0">
                                        <h5 className="mb-0">40</h5>
                                        <small className="text-muted">Project</small>
                                    </div>
                                    <div className="col-4">
                                        <h5 className="mb-0">4.5K</h5>
                                        <small className="text-muted">Members</small>
                                    </div>
                                </div>
                                <hr className="my-3 border border-secondary-subtle" />
                                <div className="d-inline-flex align-items-center justify-content-start w-100 mb-3">
                                    <i className="ti ti-mail me-2"></i>
                                    <p className="mb-0">anshan@gmail.com</p>
                                </div>
                                <div className="d-inline-flex align-items-center justify-content-start w-100 mb-3">
                                    <i className="ti ti-phone me-2"></i>
                                    <p className="mb-0">(+1-876) 8654 239 581</p>
                                </div>
                                <div className="d-inline-flex align-items-center justify-content-start w-100 mb-3">
                                    <i className="ti ti-map-pin me-2"></i>
                                    <p className="mb-0">New York</p>
                                </div>
                                <div className="d-inline-flex align-items-center justify-content-start w-100">
                                    <i className="ti ti-link me-2"></i>
                                    <a href="#!" className="link-primary">
                                        <p className="mb-0">https://anshan.dh.url</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div class="card">
                        <div class="card-header">
                            <h5>Social Network</h5>
                        </div>
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-2">
                                <div class="flex-grow-1 me-3">
                                    <div class="d-flex align-items-center">
                                        <div class="flex-shrink-0">
                                            <div class="avtar avtar-xs btn-light-twitter">
                                                <i class="fab fa-twitter f-16"></i>
                                            </div>
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                            <h6 class="mb-0">Twitter</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex align-items-center mb-2">
                                <div class="flex-grow-1 me-3">
                                    <div class="d-flex align-items-center">
                                        <div class="flex-shrink-0">
                                            <div class="avtar avtar-xs btn-light-facebook">
                                                <i class="fab fa-facebook-f f-16"></i>
                                            </div>
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                            <h6 class="mb-0">Facebook</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 me-3">
                                    <div class="d-flex align-items-center">
                                        <div class="flex-shrink-0">
                                            <div class="avtar avtar-xs btn-light-linkedin">
                                                <i class="fab fa-linkedin-in f-16"></i>
                                            </div>
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                            <h6 class="mb-0">Linkedin</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
