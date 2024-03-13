import Layout from "../../layouts";

function ExamCreate() {
    return (
        <Layout title="Exam Create">
            <div className="col-sm-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Exam Name</label>
                                    <input type="text" className="form-control" placeholder="Enter Product Name" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Start Date</label>
                                    <input type="date" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="course">
                                        Select Course
                                    </label>
                                    <select className="form-select" id="course">
                                        <option>Please choose an option</option>
                                        <option>ReactJS</option>
                                        <option>Laravel Framework</option>
                                        <option>Spring Boot</option>
                                    </select>
                                </div>

                                <div className="text-end btn-page mb-0 mt-5">
                                    <button className="btn btn-outline-secondary">Cancel</button>
                                    <button className="btn btn-primary">Add new Exam</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ExamCreate;
