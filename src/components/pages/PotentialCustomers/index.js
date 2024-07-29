import { Link } from "react-router-dom";
import useAxiosGet from "../../../hooks/useAxiosGet";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import Layout from "../../layouts";
import { copyText } from "../../../utils/copyText";
import { format } from "date-fns";

function PotentialCustomers() {
    const potentialCustomerData = useAxiosGet({
        path: url.DASHBOARD_TRAINER.POTENTIAL_CUSTOMER,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const potentialCustomer = potentialCustomerData.response || [];

    return (
        <Layout title="Potential Customers">
            <div className="col-lg-12">
                <div className="card table-card">
                    <div className="card-header border-0">
                        <div className="d-flex align-items-center justify-content-between">
                            <h5 className="mb-0">Potential Customer</h5>
                        </div>
                    </div>
                    <div className="table-responsive px-3">
                        <table className="table table-hover datatable-table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Information</th>
                                    <th>Phone</th>
                                    <th>Mail</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {potentialCustomer.length > 0 ? (
                                    potentialCustomer.map((customer, customerIndex) => (
                                        <tr key={customer.id}>
                                            <td>{customerIndex + 1}</td>
                                            <td>
                                                <div className="row">
                                                    <div className="col-auto">
                                                        <div className="flex-shrink-0">
                                                            <div className="avtar avtar-s border">
                                                                <i className="ti ti-user"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <h6 className="mb-0">{customer.fullname}</h6>
                                                        <p className="text-muted f-12 mb-0">{format(new Date(customer.createdDate), "hh:mm:ss dd-MM-yyyy")}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="cursor-copy" onClick={() => copyText(customer.phone)}>
                                                {customer.phone}
                                            </td>
                                            <td className="cursor-copy" onClick={() => copyText(customer.email)}>
                                                {customer.email}
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center justify-content-center gap-3">
                                                    <Link to={`tel:${customer.phone}`} className="btn btn-icon btn-light-primary">
                                                        <i className="ti ti-phone"></i>
                                                    </Link>
                                                    <Link to={`mailto:${customer.email}`} className="btn btn-icon btn-light-danger">
                                                        <i className="ti ti-mail"></i>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            No data
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default PotentialCustomers;
