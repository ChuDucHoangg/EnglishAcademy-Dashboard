import Layout from "../../layouts";

function LessonEdit() {
    return (
        <Layout title="Lesson Edit">
            <div className="col-sm-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" placeholder="Enter Product Name" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Resources in the lesson</label>
                                    <input type="text" className="form-control" placeholder="Enter resources" />
                                </div>
                                <div className="form-group">
                                    <p>
                                        <span className="text-danger">*</span> Recommended minimum video resolution is 1080p
                                    </p>
                                    <label className="btn btn-outline-secondary" htmlFor="flupld">
                                        <i className="ti ti-upload me-2"></i> Click to Upload
                                    </label>
                                    <input type="file" id="flupld" className="d-none" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" rows="1"></textarea>
                                </div>

                                <div className="text-end btn-page mb-0 mt-5">
                                    <button className="btn btn-outline-secondary">Cancel</button>
                                    <button className="btn btn-primary">Add new Lesson</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default LessonEdit;
