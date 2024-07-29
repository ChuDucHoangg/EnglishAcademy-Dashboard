import FullCalendar from "@fullcalendar/react";
import useAxiosGet from "../../../hooks/useAxiosGet";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import { formatNumber } from "../../../utils/formatNumber";
import Layout from "../../layouts";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { copyText } from "../../../utils/copyText";
import config from "../../../config";

function DashboardAdmissions() {
    const potentialCustomerData = useAxiosGet({
        path: url.DASHBOARD_TRAINER.POTENTIAL_CUSTOMER,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const studentData = useAxiosGet({
        path: url.STUDENT.LIST,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const potentialCustomer = potentialCustomerData.response || [];

    const students = studentData.response || [];

    return (
        <Layout title="Dashboard Admissions">
            <div className="col-lg-6">
                <div className="card table-card">
                    <div className="card-header p-3 border-0">
                        <div className="d-flex align-items-center justify-content-between">
                            <h5 className="mb-0">Potential Customer</h5>
                            <Link to={config.routes.potential_customers} className="btn btn-sm btn-link-primary">
                                View All
                            </Link>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <tbody>
                                {potentialCustomer.length > 0 ? (
                                    potentialCustomer.map((customer) => (
                                        <tr key={customer.id}>
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
                                                        <p className="text-muted f-12 mb-0">{format(new Date(customer.createdDate), "dd-MM-yyyy")}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="cursor-copy" onClick={() => copyText(customer.phone)}>
                                                {customer.phone}
                                            </td>
                                            <td className="cursor-copy" onClick={() => copyText(customer.email)}>
                                                {customer.email}
                                            </td>
                                            <td className="d-flex align-items-center gap-3">
                                                <Link to={`tel:${customer.phone}`} className="btn btn-icon btn-light-primary">
                                                    <i className="ti ti-phone"></i>
                                                </Link>
                                                <Link to={`mailto:${customer.email}`} className="btn btn-icon btn-light-danger">
                                                    <i className="ti ti-mail"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td>No data</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card  m-0 h-100">
                    <div className="card-body">
                        <FullCalendar
                            initialView="dayGridMonth"
                            plugins={[dayGridPlugin, timeGridPlugin]}
                            headerToolbar={{
                                left: "prev,next today",
                                center: "title",
                                right: "dayGridMonth,timeGridWeek",
                            }}
                            eventDisplay="block"
                            displayEventTime={false}
                            eventContent={(arg) => {
                                return { html: arg.event.title };
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive px-3">
                            <table className="table table-hover datatable-table" id="pc-dt-simple">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Full Name</th>
                                        <th>Birthday</th>
                                        <th>Address</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Gender</th>
                                        <th>Status</th>
                                        <th>Created Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.length === 0 ? (
                                        <tr>
                                            <td colSpan="10" className="text-center">
                                                No data.
                                            </td>
                                        </tr>
                                    ) : (
                                        students.map((student, studentIndex) => (
                                            <tr key={student.id}>
                                                <td>{formatNumber(studentIndex + 1)}</td>
                                                <td>
                                                    <div className="row">
                                                        <div className="col-auto">
                                                            <img src="/assets/images/user/user-placeholder.png" alt={student.fullName} className="wid-40 rounded-circle" />
                                                        </div>
                                                        <div className="col">
                                                            <h6 className="mb-0">{student.fullName}</h6>
                                                            <p className="text-muted f-12 mb-0">{student.code}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{student.dayOfBirth || "N/A"}</td>
                                                <td>{student.address || "N/A"}</td>
                                                <td>{student.email || "N/A"}</td>
                                                <td>{student.phone || "N/A"}</td>

                                                <td>{student.gender || "N/A"}</td>
                                                <td>{student.status || "N/A"}</td>
                                                <td>{(student.createdDate && format(new Date(student.createdDate), "hh:mm:ss dd-MM-yyyy")) || "N/A"}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default DashboardAdmissions;
