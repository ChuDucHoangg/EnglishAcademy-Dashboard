import Layout from "../../layouts";

function StudentEdit() {
    return (
        <Layout title="Student Edit">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">Full Name</label>
                                    <input type="text" class="form-control" placeholder="Enter Product Name" />
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Address</label>
                                    <input type="text" class="form-control" placeholder="Enter Address" />
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Phone Number</label>
                                    <input type="text" class="form-control" placeholder="Enter Phone Number" />
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Gender</label>
                                    <select class="form-select">
                                        <option>FeMale</option>
                                        <option>Male</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Class Name</label>
                                    <select class="form-select">
                                        <option>T2207A</option>
                                        <option>T2208A</option>
                                        <option>T2209A</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">Birthday</label>
                                    <input type="date" class="form-control" />
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Email</label>
                                    <input type="text" class="form-control" placeholder="Enter Product Name" />
                                </div>
                                <div class="form-group">
                                    <p>
                                        <span class="text-danger">*</span> Recommended resolution is 640*640 with file size
                                    </p>
                                    <label class="btn btn-outline-secondary" for="flupld">
                                        <i class="ti ti-upload me-2"></i> Click to Upload
                                    </label>
                                    <input type="file" id="flupld" class="d-none" />
                                </div>
                                <div class="text-end btn-page mb-0 mt-4">
                                    <button class="btn btn-outline-secondary">Cancel</button>
                                    <button class="btn btn-primary">Save Change</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default StudentEdit;
