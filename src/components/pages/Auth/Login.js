import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setAccessToken } from "../../../utils/auth";
import api from "../../../services/api";
import url from "../../../services/url";
import ButtonSubmit from "../../layouts/ButtonSubmit";

function Login() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [formStaff, setFormStaff] = useState({
        email: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
    });

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormStaff({ ...formStaff, [name]: value });
        setFormErrors({ ...formErrors, [name]: "" });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formStaff.email) {
            newErrors.email = "Please enter your email address.";
            valid = false;
        }

        if (!formStaff.password) {
            newErrors.password = "Please enter your password.";
            valid = false;
        } else if (formStaff.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
            valid = false;
        } else if (formStaff.password.length > 50) {
            newErrors.password = "Password must be less than 50 characters.";
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                setSubmitting(true);
                const loginRequest = await api.post(url.AUTH.LOGIN, formStaff);

                if (loginRequest.status === 200) {
                    const token = loginRequest.data.token;
                    setAccessToken(token);

                    const redirectPath = localStorage.getItem("redirect_path");
                    if (redirectPath) {
                        navigate(`${redirectPath}`);
                        localStorage.removeItem("redirect_path");
                    } else {
                        navigate("/");
                    }
                } else {
                    setFormErrors({
                        email: "Invalid email or password.",
                        password: "Invalid email or password.",
                    });
                }
            } catch (error) {
                setFormErrors({
                    email: "Invalid email or password.",
                    password: "Invalid email or password.",
                });
            } finally {
                setSubmitting(false);
            }
        }
    };

    return (
        <div className="auth-main">
            <div className="auth-wrapper v1">
                <div className="auth-form">
                    <div className="card my-5">
                        <div className="card-body">
                            <div className="text-center">
                                <img src="../assets/images/logo.png" alt="img" />
                            </div>

                            <h4 className="text-center f-w-500 m-3">Login with your email</h4>
                            <div className="form-group">
                                <div className="form-control__custom mb-3">
                                    <input
                                        type="email"
                                        className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                                        placeholder="Email Address"
                                        name="email"
                                        value={formStaff.email}
                                        onChange={handleChange}
                                        autoFocus
                                    />
                                    {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <div className="form-group__custom">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className={`form-control ${formErrors.password ? "is-invalid" : ""}`}
                                        name="password"
                                        placeholder="Password"
                                        value={formStaff.password}
                                        onChange={handleChange}
                                        onClick={handleTogglePassword}
                                    />
                                    {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
                                    {!formErrors.password && (
                                        <span className="view-password" onClick={handleTogglePassword}>
                                            {!showPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="d-flex mt-1 justify-content-between align-items-center">
                                <div className="form-check">
                                    <input className="form-check-input input-primary" type="checkbox" />
                                    <label className="form-check-label text-muted" htmlFor="customCheckc1">
                                        Remember me?
                                    </label>
                                </div>
                                <Link to="/forgot-password" className="text-secondary f-w-400 mb-0">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="d-grid mt-4">
                                <ButtonSubmit value="Login" valueSubmit="Login..." handleEvent={handleLogin} className="btn-primary" submitting={submitting} />
                            </div>
                            <div className="saprator my-3">
                                <span>OR</span>
                            </div>
                            <div className="d-grid my-3">
                                <button type="button" className="btn mt-2 btn-light-primary bg-light text-muted">
                                    <img src="../assets/images/authentication/facebook.svg" alt="img" /> <span> Sign In with Facebook</span>
                                </button>
                                <button type="button" className="btn mt-2 btn-light-primary bg-light text-muted">
                                    <img src="../assets/images/authentication/twitter.svg" alt="img" /> <span> Sign In with Twitter</span>
                                </button>
                                <button type="button" className="btn mt-2 btn-light-primary bg-light text-muted">
                                    <img src="../assets/images/authentication/google.svg" alt="img" /> <span> Sign In with Google</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
