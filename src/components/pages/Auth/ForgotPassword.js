function ForgotPassword() {
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
                            <div className="form-group mb-3">
                                <label className="form-label">Email Address</label>
                                <input type="email" className="form-control" id="floatingInput" placeholder="Email Address" autoFocus />
                            </div>
                            <p className="mt-4 text-sm text-muted">Do not forgot to check SPAM box.</p>
                            <div className="d-grid mt-3">
                                <button type="button" className="btn btn-primary">
                                    Send Password Reset Email
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
