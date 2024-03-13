function ResetPassword() {
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
                            <div className="form-group mb-3">
                                <label className="form-label">Email Address</label>
                                <input type="email" className="form-control" id="email" placeholder="Email Address" autoFocus />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">New Password</label>
                                <input type="password" className="form-control" id="newPassword" placeholder="********" />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="confirmPassword" placeholder="********" />
                            </div>
                            <div className="d-grid mt-3">
                                <button type="button" className="btn btn-primary">
                                    Update Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
