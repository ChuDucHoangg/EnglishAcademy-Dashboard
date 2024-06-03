import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken, removeAccessToken } from "../../../utils/auth";
import api from "../../../services/api";
import url from "../../../services/url";
import { toast } from "react-toastify";

function ChangePassword() {
    const [incorrectPassword, setIncorrectPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [formErrors, setFormErrors] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleTogglePassword = (fieldName) => {
        switch (fieldName) {
            case "currentPassword":
                setShowCurrentPassword(!showCurrentPassword);
                break;
            case "newPassword":
                setShowNewPassword(!showNewPassword);
                break;
            case "confirmPassword":
                setShowConfirmPassword(!showConfirmPassword);
                break;
            default:
                break;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: "" });
    };

    const validatePassword = (password) => {
        const eightCharacters = /.{8,}/;
        const lowercase = /[a-z]+/;
        const uppercase = /[A-Z]+/;
        const number = /[0-9]+/;
        const specialCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

        if (!eightCharacters.test(password)) {
            return "Password must be at least 8 characters long.";
        }
        if (!lowercase.test(password)) {
            return "Password must contain at least 1 lowercase letter.";
        }
        if (!uppercase.test(password)) {
            return "Password must contain at least 1 uppercase letter.";
        }
        if (!number.test(password)) {
            return "Password must contain at least 1 number.";
        }
        if (!specialCharacter.test(password)) {
            return "Password must contain at least 1 special character.";
        }

        return "";
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.currentPassword) {
            newErrors.currentPassword = "Please enter your password.";
            valid = false;
        } else if (formData.currentPassword.length < 6) {
            newErrors.currentPassword = "Password must be at least 6 characters.";
            valid = false;
        } else if (formData.currentPassword.length > 50) {
            newErrors.currentPassword = "Password must be less than 50 characters.";
            valid = false;
        }

        if (!formData.newPassword) {
            newErrors.newPassword = "Please enter a new password.";
            valid = false;
        } else {
            const newPasswordError = validatePassword(formData.newPassword);
            if (newPasswordError) {
                newErrors.newPassword = newPasswordError;
                valid = false;
            }
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password.";
            valid = false;
        } else if (formData.confirmPassword !== formData.newPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const passwordResponse = await api.post(url.AUTH.CHANGE_PASSWORD, formData, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                });

                if (passwordResponse.status === 200) {
                    removeAccessToken();

                    navigate("/login");

                    setTimeout(() => {
                        toast.success("Password changed successfully. Please login again!", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 2000,
                        });
                    }, 1500);
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    setIncorrectPassword(true);
                } else {
                    toast.error("An error occurred while changing the password.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                    });
                }
            }
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5>Change Password</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleChangePassword}>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label className="form-label" htmlFor="currentPassword">
                                    Old Password
                                </label>
                                <div className="form-group__custom">
                                    <input
                                        type={showCurrentPassword ? "text" : "password"}
                                        className={`form-control ${formErrors.currentPassword || incorrectPassword ? "is-invalid" : ""}`}
                                        name="currentPassword"
                                        id="currentPassword"
                                        value={formData.currentPassword}
                                        onChange={handleChange}
                                    />
                                    {formErrors.currentPassword && <div className="invalid-feedback">{formErrors.currentPassword}</div>}
                                    {incorrectPassword && <div className="invalid-feedback">Incorrect old password.</div>}
                                    {!formErrors.currentPassword && !incorrectPassword && (
                                        <span className="view-password" onClick={() => handleTogglePassword("currentPassword")}>
                                            {!showCurrentPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="newPassword">
                                    New Password
                                </label>
                                <div className="form-group__custom">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        className={`form-control ${formErrors.newPassword ? "is-invalid" : ""}`}
                                        name="newPassword"
                                        id="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                    />
                                    {formErrors.newPassword && <div className="invalid-feedback">{formErrors.newPassword}</div>}
                                    {!formErrors.newPassword && (
                                        <span className="view-password" onClick={() => handleTogglePassword("newPassword")}>
                                            {!showNewPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <div className="form-group__custom">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        className={`form-control ${formErrors.confirmPassword ? "is-invalid" : ""}`}
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    {formErrors.confirmPassword && <div className="invalid-feedback">{formErrors.confirmPassword}</div>}
                                    {!formErrors.confirmPassword && (
                                        <span className="view-password" onClick={() => handleTogglePassword("confirmPassword")}>
                                            {!showConfirmPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <h5>New password must contain:</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <i className="ti ti-unlink text-secondary f-16 me-2"></i> At least 8 characters
                                </li>
                                <li className="list-group-item">
                                    <i className="ti ti-unlink text-secondary f-16 me-2"></i> At least 1 lower letter (a-z)
                                </li>
                                <li className="list-group-item">
                                    <i className="ti ti-unlink text-secondary f-16 me-2"></i> At least 1 uppercase letter(A-Z)
                                </li>
                                <li className="list-group-item">
                                    <i className="ti ti-unlink text-secondary f-16 me-2"></i> At least 1 number (0-9)
                                </li>
                                <li className="list-group-item">
                                    <i className="ti ti-unlink text-secondary f-16 me-2"></i> At least 1 special characters
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card-footer text-end btn-page">
                        <button className="btn btn-outline-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary">
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;
