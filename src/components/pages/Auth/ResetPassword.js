import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import url from "../../../services/url";
import api from "../../../services/api";
import { toast } from "react-toastify";
import config from "../../../config/index";

function ResetPassword() {
    const { resetToken } = useParams();
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        newPassword: "",
    });

    const [formErrors, setFormErrors] = useState({
        email: "",
        newPassword: "",
    });

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: "" });
    };

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.email) {
            valid = false;
            newErrors.email = "Please enter your email.";
        } else if (!isEmailValid(formData.email)) {
            valid = false;
            newErrors.email = "Please enter a valid email address.";
        }

        if (!formData.newPassword) {
            newErrors.newPassword = "Please enter a new password.";
            valid = false;
        } else if (formData.newPassword.length < 6) {
            newErrors.newPassword = "New password must be at least 6 characters.";
            valid = false;
        } else if (formData.newPassword.length > 50) {
            newErrors.newPassword = "New password must be less than 50 characters.";
            valid = false;
        }

        setFormErrors(newErrors);

        return valid;
    };

    const submitResponse = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await api.post(url.AUTH.RESET_PASSWORD + `/${resetToken}`, formData);
                if (response.status === 200) {
                    setTimeout(() => {
                        toast.success("Password reset successful. Please login again.", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 5000,
                        });
                    }, 1500);
                    navigate(`${config.routes.login}`);
                }
            } catch (error) {
                toast.error("Error! An error occurred. Please try again later.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                });
            }
        }
    };
    return (
        <div className="auth-main">
            <div className="auth-wrapper v1">
                <div className="auth-form">
                    <div className="card my-5">
                        <div className="card-body">
                            <img src="../assets/images/logo.png" className="mb-4 img-fluid" alt="" style={{ marginLeft: -60 }} />
                            <div className="d-flex justify-content-between align-items-end mb-4">
                                <h3 className="mb-0">
                                    <b>Reset Password</b>
                                </h3>
                                <a href="/login" className="link-primary">
                                    Back to Login
                                </a>
                            </div>
                            <form onSubmit={submitResponse}>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email">
                                        Email Address
                                    </label>
                                    <div className="form-group__custom mb-3">
                                        <input
                                            type="email"
                                            className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                                            id="email"
                                            name="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            autoFocus
                                        />
                                        {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="newPassword">
                                        New Password
                                    </label>
                                    <div className="form-group__custom mb-3">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className={`form-control ${formErrors.newPassword ? "is-invalid" : ""}`}
                                            name="newPassword"
                                            id="newPassword"
                                            placeholder="********"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                        />
                                        {formErrors.newPassword && <div className="invalid-feedback">{formErrors.newPassword}</div>}
                                        {!formErrors.newPassword && (
                                            <span className="view-password" onClick={handleTogglePassword}>
                                                {!showPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="d-grid mt-3">
                                    <button type="submit" className="btn btn-primary">
                                        Update Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
