import { useState } from "react";

function ForgotPassword() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
    });

    const [formErrors, setFormErrors] = useState({
        email: "",
    });

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

        setFormErrors(newErrors);

        return valid;
    };

    const submitResponse = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                setSubmitting(true);
            } catch (error) {}
            // finally {
            //     setSubmitting(false);
            // }
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
                                    <b>Forgot Password</b>
                                </h3>
                                <a href="/login" className="link-primary">
                                    Back to Login
                                </a>
                            </div>
                            <form onSubmit={submitResponse}>
                                <div className="form-group">
                                    <label className="form-label">Email Address</label>
                                    <div className="form-group__custom">
                                        <input
                                            type="email"
                                            className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                                            name="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            autoFocus
                                        />
                                        {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                                    </div>
                                </div>
                                <p className="mt-4 text-sm text-muted">Do not forgot to check SPAM box.</p>
                                <div className="d-grid mt-3">
                                    {submitting && (
                                        <button type="button" className="btn btn-primary btn-block" disabled style={{ width: "100%" }}>
                                            <i className="fa fa-spinner fa-spin"></i> Submitting...
                                        </button>
                                    )}

                                    {!submitting && !formSubmitted && (
                                        <>
                                            <button type="submit" className="btn btn-primary">
                                                Send Password Reset Email
                                            </button>
                                        </>
                                    )}

                                    {formSubmitted && (
                                        <div className="text-start mt-2">
                                            <p className="text-success">Your password reset email has been sent.</p>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
