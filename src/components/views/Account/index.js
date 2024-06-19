import { useState, useEffect } from "react";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import Swal from "sweetalert2";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { format, differenceInYears } from "date-fns";

function Account() {
    const [info, setInfo] = useState({});
    const [isEditButtonVisible, setEditButtonVisible] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedInfo, setEditedInfo] = useState({});
    const [phoneError, setPhoneError] = useState("");
    const [dobError, setDobError] = useState("");

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
        setDobError("");
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

    const validateDob = (dob) => {
        const today = new Date();
        const selectedDate = new Date(dob);
        const age = differenceInYears(today, selectedDate);

        if (selectedDate > today) {
            return "Birthdate cannot be in the future.";
        } else if (age < 10) {
            return "You must be at least 10 years old.";
        }
        return "";
    };

    const handleDobChange = (e) => {
        const { value } = e.target;
        const error = validateDob(value);
        setEditedInfo({ ...editedInfo, dob: value });
        setDobError(error);
    };

    const handleSaveClick = async () => {
        if (phoneError || dobError) {
            toast.error(phoneError || dobError, {
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
                                                    <>
                                                        <input type="date" className="form-control form-control-sm" value={editedInfo.dob || ""} onChange={handleDobChange} />
                                                        {dobError && <span className="text-danger">{dobError}</span>}
                                                    </>
                                                ) : (
                                                    (editedInfo.dob && format(new Date(editedInfo.dob), "dd-MM-yyyy")) || "N/A"
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
                    <div className="card">
                        <div className="card-header">
                            <h5>Social Network</h5>
                        </div>
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-2">
                                <div className="flex-grow-1 me-3">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <div className="avtar avtar-xs btn-light-twitter">
                                                <i className="fab fa-twitter f-16"></i>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="mb-0">Twitter</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <div className="flex-grow-1 me-3">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <div className="avtar avtar-xs btn-light-facebook">
                                                <i className="fab fa-facebook-f f-16"></i>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="mb-0">Facebook</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1 me-3">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <div className="avtar avtar-xs btn-light-linkedin">
                                                <i className="fab fa-linkedin-in f-16"></i>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="mb-0">Linkedin</h6>
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
