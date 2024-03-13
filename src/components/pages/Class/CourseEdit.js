import Layout from "../../layouts";

function ClassEdit() {
    return (
        <Layout title="Class Edit">
            <div className="col-sm-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Class Name</label>
                                    <input type="text" className="form-control" placeholder="Enter Product Name" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Teacher</label>
                                    <select className="form-select">
                                        <option>Chu Duc Hoang</option>
                                        <option>Trinh Van Trung</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Class Name</label>
                                    <select className="form-select">
                                        <option>T2207A</option>
                                        <option>T2208A</option>
                                        <option>T2209A</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Room</label>
                                    <select className="form-select">
                                        <option>B9</option>
                                        <option>B12</option>
                                        <option>B14</option>
                                    </select>
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

export default ClassEdit;
