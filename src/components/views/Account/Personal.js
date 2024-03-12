function Personal() {
    return (
        <div className="row">
            <div className="col-lg-6">
                <div className="card">
                    <div className="card-header">
                        <h5>Personal Information</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-12 text-center mb-3">
                                <div className="user-upload wid-75">
                                    <img src="../assets/images/user/avatar-4.jpg" alt="" className="img-fluid" />
                                    <label htmlFor="uplfile" className="img-avtar-upload">
                                        <i className="ti ti-camera f-24 mb-1"></i>
                                        <span>Upload</span>
                                    </label>
                                    <input type="file" id="uplfile" className="d-none" />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label className="form-label">First Name</label>
                                    <input type="text" className="form-control" value="Anshan" />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label className="form-label">Last Name</label>
                                    <input type="text" className="form-control" value="Handgun" />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label className="form-label">Country</label>
                                    <input type="text" className="form-control" value="New York" />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label className="form-label">Zip code</label>
                                    <input type="text" className="form-control" value="956754" />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label className="form-label">Bio</label>
                                    <textarea className="form-control">
                                        Hello, I’m Anshan Handgun Creative Graphic Designer & User Experience Designer based in Website, I create digital Products a more Beautiful and usable place.
                                        Morbid accusant ipsum. Nam nec tellus at.
                                    </textarea>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label className="form-label">Experience</label>
                                    <select className="form-control">
                                        <option>Startup</option>
                                        <option>2 year</option>
                                        <option>3 year</option>
                                        <option selected>4 year</option>
                                        <option>5 year</option>
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
                            <div className="flex-shrink-0">
                                <button className="btn btn-link-primary">Connect</button>
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
                                        <h6 className="mb-0">
                                            Facebook <small className="text-muted f-w-400">/Anshan Handgun</small>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <button className="btn btn-link-danger">Remove</button>
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
                            <div className="flex-shrink-0">
                                <button className="btn btn-link-primary">Connect</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h5>Contact Information</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label className="form-label">Contact Phone</label>
                                    <input type="text" className="form-control" value="(+99) 9999 999 999" />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label className="form-label">
                                        Email <span className="text-danger">*</span>
                                    </label>
                                    <input type="text" className="form-control" value="demo@sample.com" />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label className="form-label">Portfolio Url</label>
                                    <input type="text" className="form-control" value="https://demo.com" />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label className="form-label">Address</label>
                                    <textarea className="form-control">3379 Monroe Avenue, Fort Myers, Florida(33912)</textarea>
                                </div>
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

export default Personal;
