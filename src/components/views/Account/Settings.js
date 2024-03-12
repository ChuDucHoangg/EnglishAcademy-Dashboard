function Settings() {
    return (
        <div className="row">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h5>Email Settings</h5>
                    </div>
                    <div className="card-body">
                        <h6 className="mb-4">Setup Email Notification</h6>
                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <div>
                                <p className="text-muted mb-0">Email Notification</p>
                            </div>
                            <div className="form-check form-switch p-0">
                                <input className="m-0 form-check-input h5 position-relative" type="checkbox" role="switch" defaultChecked />
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <div>
                                <p className="text-muted mb-0">Send Copy To Personal Email</p>
                            </div>
                            <div className="form-check form-switch p-0">
                                <input className="m-0 form-check-input h5 position-relative" type="checkbox" role="switch" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h5>Updates from System Notification</h5>
                    </div>
                    <div className="card-body">
                        <h6 className="mb-4">Email you with?</h6>
                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <div>
                                <p className="text-muted mb-0">News about PCT-themes products and feature updates</p>
                            </div>
                            <div className="form-check p-0">
                                <input className="m-0 form-check-input h5 position-relative" type="checkbox" role="switch" defaultChecked />
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <div>
                                <p className="text-muted mb-0">Tips on getting more out of PCT-themes</p>
                            </div>
                            <div className="form-check p-0">
                                <input className="m-0 form-check-input h5 position-relative" type="checkbox" role="switch" defaultChecked />
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <div>
                                <p className="text-muted mb-0">Things you missed since you last logged into PCT-themes</p>
                            </div>
                            <div className="form-check p-0">
                                <input className="m-0 form-check-input h5 position-relative" type="checkbox" role="switch" />
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <div>
                                <p className="text-muted mb-0">News about products and other services</p>
                            </div>
                            <div className="form-check p-0">
                                <input className="m-0 form-check-input h5 position-relative" type="checkbox" role="switch" />
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <div>
                                <p className="text-muted mb-0">Tips and Document business products</p>
                            </div>
                            <div className="form-check p-0">
                                <input className="m-0 form-check-input h5 position-relative" type="checkbox" role="switch" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h5>Activity Related Emails</h5>
                    </div>
                    <div className="card-body">
                        <h6 className="mb-4">When to email?</h6>
                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <div>
                                <p className="text-muted mb-0">Have new notifications</p>
                            </div>
                            <div className="form-check form-switch p-0">
                                <input className="m-0 form-check-input h5 position-relative" type="checkbox" role="switch" defaultChecked />
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <div>
                                <p className="text-muted mb-0">You're sent a direct message</p>
                            </div>
                            <div className="form-check form-switch p-0">
                                <input className="m-0 form-check-input h5 position-relative" type="checkbox" role="switch" />
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <div>
                                <p className="text-muted mb-0">Someone adds you as a connection</p>
                            </div>
                            <div className="form-check form-switch p-0">
                                <input className="m-0 form-check-input h5 position-relative" type="checkbox" role="switch" defaultChecked />
                            </div>
                        </div>
                        <hr className="my-4 border border-secondary-subtle" />
                        <h6 className="mb-4">When to escalate emails?</h6>
                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <div>
                                <p className="text-muted mb-0">Upon new order</p>
                            </div>
                            <div className="form-check form-switch p-0">
                                <input className="m-0 form-check-input h5 position-relative" type="checkbox" role="switch" defaultChecked />
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <div>
                                <p className="text-muted mb-0">New membership approval</p>
                            </div>
                            <div className="form-check form-switch p-0">
                                <input className="m-0 form-check-input h5 position-relative" type="checkbox" role="switch" />
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <div>
                                <p className="text-muted mb-0">Member registration</p>
                            </div>
                            <div className="form-check form-switch p-0">
                                <input className="m-0 form-check-input h5 position-relative" type="checkbox" role="switch" defaultChecked />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 text-end btn-page">
                <div className="btn btn-outline-secondary">Cancel</div>
                <div className="btn btn-primary">Update Profile</div>
            </div>
        </div>
    );
}

export default Settings;
