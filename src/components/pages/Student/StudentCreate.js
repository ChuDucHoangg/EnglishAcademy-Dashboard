import Layout from "../../layouts";

function StudentCreate() {
    return (
        <Layout title="Student Create">
            <div className="col-sm-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Full Name</label>
                                    <input type="text" className="form-control" placeholder="Enter Product Name" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Address</label>
                                    <input type="text" className="form-control" placeholder="Enter Address" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone Number</label>
                                    <input type="text" className="form-control" placeholder="Enter Phone Number" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Gender</label>
                                    <select className="form-select">
                                        <option>FeMale</option>
                                        <option>Male</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Class Name</label>
                                    <select className="form-select">
                                        <option>T2207A</option>
                                        <option>T2208A</option>
                                        <option>T2209A</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Birthday</label>
                                    <input type="date" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input type="text" className="form-control" placeholder="Enter Product Name" />
                                </div>
                                <div className="form-group">
                                    <p>
                                        <span className="text-danger">*</span> Recommended resolution is 640*640 with file size
                                    </p>
                                    <label className="btn btn-outline-secondary" for="flupld">
                                        <i className="ti ti-upload me-2"></i> Click to Upload
                                    </label>
                                    <input type="file" id="flupld" className="d-none" />
                                </div>
                                <div className="text-end btn-page mb-0 mt-4">
                                    <button className="btn btn-outline-secondary">Cancel</button>
                                    <button className="btn btn-primary">Add new Student</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default StudentCreate;
