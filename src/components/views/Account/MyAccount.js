function MyAccount() {
    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h5>General Settings</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label className="form-label">
                                        Username <span className="text-danger">*</span>
                                    </label>
                                    <input type="text" className="form-control" value="Ashoka_Tano_16" />
                                    <small className="form-text text-muted">Your Profile URL: https://pc.com/Ashoka_Tano_16</small>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label className="form-label">
                                        Account Email <span className="text-danger">*</span>
                                    </label>
                                    <input type="text" className="form-control" value="demo@sample.com" />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label className="form-label">Language</label>
                                    <select className="form-control">
                                        <option>Washington</option>
                                        <option>India</option>
                                        <option>Africa</option>
                                        <option>New York</option>
                                        <option>Malaysia</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label className="form-label">Sign in Using</label>
                                    <select className="form-control">
                                        <option>Password</option>
                                        <option>Face Recognition</option>
                                        <option>Thumb Impression</option>
                                        <option>Key</option>
                                        <option>Pin</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="card">
                    <div className="card-header">
                        <h5>Advance Settings</h5>
                    </div>
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item px-0 pt-0">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <p className="mb-1">Secure Browsing</p>
                                        <p className="text-muted text-sm mb-0">Browsing Securely ( https ) when it's necessary</p>
                                    </div>
                                    <div className="form-check form-switch p-0">
                                        <input className="form-check-input h4 position-relative m-0" type="checkbox" role="switch" />
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item px-0">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <p className="mb-1">Login Notifications</p>
                                        <p className="text-muted text-sm mb-0">Notify when login attempted from other place</p>
                                    </div>
                                    <div className="form-check form-switch p-0">
                                        <input className="form-check-input h4 position-relative m-0" type="checkbox" role="switch" />
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item px-0 pb-0">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <p className="mb-1">Login Approvals</p>
                                        <p className="text-muted text-sm mb-0">Approvals is not required when login from unrecognized devices.</p>
                                    </div>
                                    <div className="form-check form-switch p-0">
                                        <input className="form-check-input h4 position-relative m-0" type="checkbox" role="switch" />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="card">
                    <div className="card-header">
                        <h5>Recognized Devices</h5>
                    </div>
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item px-0 pt-0">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="me-2">
                                        <p className="mb-2">Celt Desktop</p>
                                        <p className="mb-0 text-muted">4351 Deans Lane</p>
                                    </div>
                                    <div className="">
                                        <div className="text-success d-inline-block me-2">
                                            <i className="fas fa-circle f-10 me-2"></i>
                                            Current Active
                                        </div>
                                        <a href="#!" className="text-danger">
                                            <i className="feather icon-x-circle"></i>
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item px-0">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="me-2">
                                        <p className="mb-2">Imco Tablet</p>
                                        <p className="mb-0 text-muted">4185 Michigan Avenue</p>
                                    </div>
                                    <div className="">
                                        <div className="text-muted d-inline-block me-2">
                                            <i className="fas fa-circle f-10 me-2"></i>
                                            Active 5 days ago
                                        </div>
                                        <a href="#!" className="text-danger">
                                            <i className="feather icon-x-circle"></i>
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item px-0 pb-0">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="me-2">
                                        <p className="mb-2">Albs Mobile</p>
                                        <p className="mb-0 text-muted">3462 Fairfax Drive</p>
                                    </div>
                                    <div className="">
                                        <div className="text-muted d-inline-block me-2">
                                            <i className="fas fa-circle f-10 me-2"></i>
                                            Active 1 month ago
                                        </div>
                                        <a href="#!" className="text-danger">
                                            <i className="feather icon-x-circle"></i>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h5>Active Sessions</h5>
                    </div>
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item px-0 pt-0">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="me-2">
                                        <p className="mb-2">Celt Desktop</p>
                                        <p className="mb-0 text-muted">4351 Deans Lane</p>
                                    </div>
                                    <button className="btn btn-link-danger">Logout</button>
                                </div>
                            </li>
                            <li className="list-group-item px-0 pb-0">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="me-2">
                                        <p className="mb-2">Moon Tablet</p>
                                        <p className="mb-0 text-muted">4185 Michigan Avenue</p>
                                    </div>
                                    <button className="btn btn-link-danger">Logout</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-12 text-end">
                <button className="btn btn-outline-dark ms-2">Clear</button>
                <button className="btn btn-primary">Update Profile</button>
            </div>
        </div>
    );
}

export default MyAccount;
