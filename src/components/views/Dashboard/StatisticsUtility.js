import { useEffect, useState } from "react";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import Chart from "react-apexcharts";

function StatisticsUtility() {
    const [revenueAll, setRevenueAll] = useState({});
    const [revenueCourseOnline12Month, setRevenueCourseOnline12Month] = useState([]);
    const [revenueCourseOffline12Month, setRevenueCourseOffline12Month] = useState([]);
    const [revenueTutor12Month, setRevenueTutor12Month] = useState([]);

    const [totalRevenueCourseOnline12Month, setTotalRevenueCourseOnline12Month] = useState(0);
    const [totalRevenueCourseOffline12Month, setTotalRevenueCourseOffline12Month] = useState(0);
    const [totalRevenueTutor12Month, setTotalRevenueTutor12Month] = useState(0);

    const loadData = async () => {
        try {
            const headerConfig = {
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            };
            const [revenueAllResponse, revenueCourseOnline12MonthResponse, revenueCourseOffline12MonthResponse, revenueTutor12MonthResponse] = await Promise.all([
                api.get(url.DASHBOARD.REVENUE_ALL, headerConfig),
                api.get(url.DASHBOARD.REVENUE_COURSE_ONLINE_12_MONTH, headerConfig),
                api.get(url.DASHBOARD.REVENUE_COURSE_OFFLINE_12_MONTH, headerConfig),
                api.get(url.DASHBOARD.REVENUE_TUTOR_12_MONTH, headerConfig),
            ]);

            setRevenueAll(revenueAllResponse.data.data);
            setRevenueCourseOnline12Month(revenueCourseOnline12MonthResponse.data.data);
            setRevenueCourseOffline12Month(revenueCourseOffline12MonthResponse.data.data);
            setRevenueTutor12Month(revenueTutor12MonthResponse.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (revenueCourseOnline12Month.length || revenueTutor12Month.length > 0 || revenueCourseOffline12Month.length > 0) {
            const totalCourseOnline = revenueCourseOnline12Month.reduce((acc, item) => acc + item.totalRevenue, 0);
            const totalCourseOffline = revenueCourseOffline12Month.reduce((acc, item) => acc + item.totalRevenue, 0);
            const totalTutor = revenueTutor12Month.reduce((acc, item) => acc + item.totalRevenue, 0);

            setTotalRevenueCourseOnline12Month(totalCourseOnline);
            setTotalRevenueCourseOffline12Month(totalCourseOffline);
            setTotalRevenueTutor12Month(totalTutor);
        }
    }, [revenueCourseOnline12Month, revenueCourseOffline12Month, revenueTutor12Month]);

    const revenueCourseOnlineMonths = revenueCourseOnline12Month.map((item) => `${item.year}-${item.month}`);
    const revenueCourseOfflineMonths = revenueCourseOffline12Month.map((item) => `${item.year}-${item.month}`);
    const revenueTutorMonths = revenueTutor12Month.map((item) => `${item.year}-${item.month}`);

    const statisticsWidget = [
        {
            title: "Total Revenue",
            description: "Total revenue of the system",
            total: `$${(revenueAll.courseOnlineRevenue || 0 + revenueAll.courseOfflineRevenue || 0 + revenueAll.tutorRevenue || 0).toFixed(2)}`,
            icon: `<div class="avtar avtar-s bg-light-primary"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M13 9H7" stroke="#4680FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22.0002 10.9702V13.0302C22.0002 13.5802 21.5602 14.0302 21.0002 14.0502H19.0402C17.9602 14.0502 16.9702 13.2602 16.8802 12.1802C16.8202 11.5502 17.0602 10.9602 17.4802 10.5502C17.8502 10.1702 18.3602 9.9502 18.9202 9.9502H21.0002C21.5602 9.9702 22.0002 10.4202 22.0002 10.9702Z" stroke="#4680FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.48 10.55C17.06 10.96 16.82 11.55 16.88 12.18C16.97 13.26 17.96 14.05 19.04 14.05H21V15.5C21 18.5 19 20.5 16 20.5H7C4 20.5 2 18.5 2 15.5V8.5C2 5.78 3.64 3.88 6.19 3.56C6.45 3.52 6.72 3.5 7 3.5H16C16.26 3.5 16.51 3.50999 16.75 3.54999C19.33 3.84999 21 5.76 21 8.5V9.95001H18.92C18.36 9.95001 17.85 10.17 17.48 10.55Z" stroke="#4680FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>`,
            optionChart: {
                chart: {
                    type: "bar",
                    sparkline: {
                        enabled: true,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                series: [
                    {
                        name: "Online Courses",
                        data: [revenueAll.courseOnlineRevenue || 0, 0],
                    },
                    {
                        name: "Offline Courses",
                        data: [revenueAll.courseOfflineRevenue || 0, 0],
                    },
                    {
                        name: "Tutoring",
                        data: [revenueAll.tutorRevenue || 0, 0],
                    },
                ],
                stroke: {
                    curve: "smooth",
                },
                tooltip: {
                    y: {
                        formatter: (val) => `$${val.toFixed(2)}`,
                    },
                },
            },
        },
        {
            title: "Online Course",
            description: "Total revenue of online courses",
            total: `$${totalRevenueCourseOnline12Month.toFixed(2)}`,
            icon: `<div class="avtar avtar-s bg-light-warning"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z" stroke="#E58A00" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /> <path opacity="0.6" d="M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5" stroke="#E58A00" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /> <path opacity="0.6" d="M8 13H12" stroke="#E58A00" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /> <path opacity="0.6" d="M8 17H16" stroke="#E58A00" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /> </svg> </div>`,
            optionChart: {
                chart: {
                    type: "bar",
                    sparkline: {
                        enabled: true,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                xaxis: {
                    categories: revenueCourseOnlineMonths,
                    labels: {
                        show: false,
                    },
                    title: {
                        text: "",
                    },
                },
                series: [
                    {
                        name: "Revenue",
                        data: revenueCourseOnline12Month.map((item) => item.totalRevenue),
                    },
                ],
                dataLabels: {
                    enabled: false,
                },
                yaxis: {
                    labels: {
                        show: false,
                    },
                    title: {
                        text: "",
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        endingShape: "rounded",
                    },
                },
                fill: {
                    opacity: 1,
                },
                tooltip: {
                    y: {
                        formatter: (val) => `$${val.toFixed(2)}`,
                    },
                },
                legend: {
                    show: false,
                },
                grid: {
                    show: false,
                },
            },
        },
        {
            title: "Offline Course",
            description: "Total revenue of offline courses",
            total: `$${totalRevenueCourseOffline12Month.toFixed(2)}`,
            icon: `<div class="avtar avtar-s bg-light-warning"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z" stroke="#E58A00" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /> <path opacity="0.6" d="M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5" stroke="#E58A00" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /> <path opacity="0.6" d="M8 13H12" stroke="#E58A00" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /> <path opacity="0.6" d="M8 17H16" stroke="#E58A00" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /> </svg> </div>`,
            optionChart: {
                chart: {
                    type: "bar",
                    sparkline: {
                        enabled: true,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                xaxis: {
                    categories: revenueCourseOfflineMonths,
                    labels: {
                        show: false,
                    },
                    title: {
                        text: "",
                    },
                },
                series: [
                    {
                        name: "Revenue",
                        data: revenueCourseOffline12Month.map((item) => item.totalRevenue),
                    },
                ],
                dataLabels: {
                    enabled: false,
                },
                yaxis: {
                    labels: {
                        show: false,
                    },
                    title: {
                        text: "",
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        endingShape: "rounded",
                    },
                },
                fill: {
                    opacity: 1,
                },
                tooltip: {
                    y: {
                        formatter: (val) => `$${val.toFixed(2)}`,
                    },
                },
                legend: {
                    show: false,
                },
                grid: {
                    show: false,
                },
            },
        },
        {
            title: "Tutoring",
            description: "Total revenue of tutoring",
            total: `$${totalRevenueTutor12Month.toFixed(2)}`,
            icon: `<div class="avtar avtar-s bg-light-success"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M8 2V5" stroke="#2ca87f" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /> <path d="M16 2V5" stroke="#2ca87f" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /> <path opacity="0.4" d="M3.5 9.08984H20.5" stroke="#2ca87f" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /> <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#2ca87f" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /> <path opacity="0.4" d="M15.6947 13.7002H15.7037" stroke="#2ca87f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path opacity="0.4" d="M15.6947 16.7002H15.7037" stroke="#2ca87f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path opacity="0.4" d="M11.9955 13.7002H12.0045" stroke="#2ca87f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path opacity="0.4" d="M11.9955 16.7002H12.0045" stroke="#2ca87f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path opacity="0.4" d="M8.29431 13.7002H8.30329" stroke="#2ca87f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path opacity="0.4" d="M8.29395 16.7002H8.30293" stroke="#2ca87f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> </svg> </div>`,
            optionChart: {
                chart: {
                    type: "bar",
                    sparkline: {
                        enabled: true,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                xaxis: {
                    categories: revenueTutorMonths,
                    labels: {
                        show: false,
                    },
                    title: {
                        text: "",
                    },
                },
                series: [
                    {
                        name: "Revenue",
                        data: revenueTutor12Month.map((item) => item.totalRevenue),
                    },
                ],
                dataLabels: {
                    enabled: false,
                },
                yaxis: {
                    labels: {
                        show: false,
                    },
                    title: {
                        text: "",
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        endingShape: "rounded",
                    },
                },
                fill: {
                    opacity: 1,
                },
                tooltip: {
                    y: {
                        formatter: (val) => `$${val.toFixed(2)}`,
                    },
                },
                legend: {
                    show: false,
                },
                grid: {
                    show: false,
                },
            },
        },
    ];

    return (
        <>
            {statisticsWidget.map((widget, widgetIndex) => (
                <div className="col-md-6 col-xxl-3" key={widgetIndex}>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0" dangerouslySetInnerHTML={{ __html: widget.icon }}></div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-0">{widget.title}</h6>
                                    <p className="f-10 m-0">{widget.description}</p>
                                </div>
                            </div>
                            <div className="bg-body p-3 mt-3 rounded">
                                <div className="mt-3 row align-items-center">
                                    <div className="col-7">
                                        <div id="total-task-graph">
                                            <Chart options={widget.optionChart} series={widget.optionChart.series} type={widget.optionChart.chart.type} />
                                        </div>
                                    </div>
                                    <div className="col-5">
                                        <h6 className="mb-1">{widget.total}</h6>
                                        {/* <p className="text-success mb-0">
                                            <i className="ti ti-arrow-up-right"></i> 12 mth
                                        </p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default StatisticsUtility;
