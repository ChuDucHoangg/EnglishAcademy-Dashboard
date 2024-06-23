import Layout from "../../layouts";
import useAxiosGet from "../../../hooks/useAxiosGet";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import { Link } from "react-router-dom";

function ClassList() {
    const classData = useAxiosGet({
        path: url.CLASS.LIST,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const classes = classData.response || [];

    return (
        <Layout title="Class List">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-body table-border-style">
                        <div className="table-responsive">
                            <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                                <div className="datatable-container">
                                    <table className="table table-hover datatable-table" id="pc-dt-simple">
                                        <thead>
                                            <tr>
                                                <th data-sortable="true">No.</th>
                                                <th data-sortable="true">Class Name</th>
                                                <th data-sortable="true">Room</th>
                                                <th data-sortable="true" className="text-center">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody id="orders">
                                            {classes.map((cl, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{cl.name}</td>
                                                    <td>{cl.roomName}</td>
                                                    <td className="text-center">
                                                        <Link to={`/class/${cl.id}`} className="btn btn-icon btn-light-success">
                                                            <i className="ti ti-eye"></i>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ClassList;
