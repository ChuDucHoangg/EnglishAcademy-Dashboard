function ChangePassword() {
    return (
        <div className="card">
            <div className="card-header">
                <h5>Change Password</h5>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label className="form-label">Old Password</label>
                            <input type="password" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">New Password</label>
                            <input type="password" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <h5>New password must contain:</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <i className="ti ti-circle-check text-success f-16 me-2"></i> At least 8 characters
                            </li>
                            <li className="list-group-item">
                                <i className="ti ti-circle-check text-success f-16 me-2"></i> At least 1 lower letter (a-z)
                            </li>
                            <li className="list-group-item">
                                <i className="ti ti-circle-check text-success f-16 me-2"></i> At least 1 uppercase letter(A-Z)
                            </li>
                            <li className="list-group-item">
                                <i className="ti ti-circle-check text-success f-16 me-2"></i> At least 1 number (0-9)
                            </li>
                            <li className="list-group-item">
                                <i className="ti ti-circle-check text-success f-16 me-2"></i> At least 1 special characters
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="card-footer text-end btn-page">
                <div className="btn btn-outline-secondary">Cancel</div>
                <div className="btn btn-primary">Update Profile</div>
            </div>
        </div>
    );
}

export default ChangePassword;
