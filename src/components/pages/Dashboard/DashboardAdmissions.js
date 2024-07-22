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
import Chart from "react-apexcharts";
import config from "../../../config";

function DashboardAdmissions() {
    const potentialCustomerData = useAxiosGet({
        path: url.DASHBOARD_TRAINER.POTENTIAL_CUSTOMER,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const potentialCustomer = potentialCustomerData.response || [];

    const generality = [
        {
            title: "Class of day",
            response: formatNumber(2),
            icon: "assets/icons/dash-icon-07.svg",
            description: "Number of classes being taught.",
        },
        {
            title: "Tutoring of day",
            response: formatNumber(4),
            icon: "assets/icons/dash-icon-08.svg",
            description: "Number of students being tutored.",
        },
        {
            title: "Class",
            response: formatNumber(5),
            icon: "assets/icons/dash-icon-01.svg",
            description: "Number of classes being taught.",
        },
        {
            title: "Tutoring",
            response: formatNumber(9),
            icon: "assets/icons/dash-icon-06.svg",
            description: "Number of students being tutored.",
        },
    ];

    const options = {
        chart: {
            type: "area",
        },
        dataLabels: {
            enabled: false,
        },
        series: [
            {
                name: "Sales 2",
                data: [30, 20, 45, 60, 69, 90, 91, 100, 125],
            },
            {
                name: "Sales",
                data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
            },
        ],
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        },
        stroke: {
            curve: "smooth",
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100],
            },
        },
    };

    return (
        <Layout title="Dashboard Admissions">
            {generality.map((item, index) => (
                <div className="col-lg-3 col-md-6" key={index}>
                    <div className="card border-0">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-8">
                                    <h6 className="mb-2 text-muted">{item.title}</h6>
                                    <h4 className="mb-2">{item.response}</h4>
                                </div>
                                <div className="col-4 text-end">
                                    <img src={item.icon} alt="" className="dash-icon" />
                                </div>
                            </div>
                            <p className="mb-0 text-muted text-sm">{item.description}</p>
                        </div>
                    </div>
                </div>
            ))}

            <div className="col-md-6">
                <div className="card m-0 h-100">
                    <div className="card-header border-0">
                        <h5 className="m-0">Statistics of the day</h5>
                    </div>
                    <div className="card-body">
                        <Chart options={options} series={options.series} type="area" />
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

            <div className="col-lg-12 mt-5">
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
                                {potentialCustomer.map((customer) => (
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default DashboardAdmissions;
