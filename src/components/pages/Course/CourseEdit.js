import Layout from "../../layouts";

function CourseEdit() {
    return (
        <Layout title="Course Edit">
            <div className="col-sm-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Course Name</label>
                                    <input type="text" className="form-control" placeholder="Enter Product Name" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" rows="1"></textarea>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Number of lessons</label>
                                    <input type="text" className="form-control" placeholder="Enter Number of lessons" />
                                </div>

                                <div className="text-end btn-page mb-0 mt-5">
                                    <button className="btn btn-outline-secondary">Cancel</button>
                                    <button className="btn btn-primary">Save Change</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CourseEdit;
