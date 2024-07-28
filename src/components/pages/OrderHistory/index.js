import useAxiosGet from "../../../hooks/useAxiosGet";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import Layout from "../../layouts";
import BookLoading from "../../layouts/BookLoading";
import { format } from "date-fns";
import { formatNumber } from "../../../utils/formatNumber";
import { useState } from "react";
import Pagination from "../../layouts/Pagination";

function OrderHistory() {
    const ordersHistory = useAxiosGet({
        path: url.ORDER_HISTORY.LIST,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const orders = ordersHistory.response || [];

    const [searchQuery, setSearchQuery] = useState("");
    const [courseQuery, setCourseQuery] = useState("");
    const [datePurchase, setDatePurchase] = useState("");
    const itemsPerPagePackage = 10;
    const [currentPagePackage, setCurrentPagePackage] = useState(1);

    const filteredOrders = orders.filter((order) => {
        const matchesStudentName = order.studentName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCourseName = order.courseOnlineName.toLowerCase().includes(courseQuery.toLowerCase());
        const matchesCreateDate = !datePurchase || (order.createddate && format(new Date(order.createddate), "yyyy-MM-dd") === datePurchase);
        return matchesStudentName && matchesCourseName && matchesCreateDate;
    });

    const totalPagesPackage = Math.ceil(filteredOrders.length / itemsPerPagePackage);
    const startIndexPackage = (currentPagePackage - 1) * itemsPerPagePackage;
    const endIndexPackage = Math.min(startIndexPackage + itemsPerPagePackage, filteredOrders.length);

    const currentOrder = filteredOrders.slice(startIndexPackage, endIndexPackage);

    const handlePageChangePackage = (pageNumber) => {
        setCurrentPagePackage(pageNumber);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPagePackage(1);
    };

    const handleCourseSearch = (e) => {
        setCourseQuery(e.target.value);
        setCurrentPagePackage(1);
    };

    const handleCreateDateChange = (e) => {
        setDatePurchase(e.target.value);
        setCurrentPagePackage(1);
    };

    const handleResetSearchValue = () => {
        setSearchQuery("");
        setCourseQuery("");
        setDatePurchase("");
        setCurrentPagePackage(1);
    };

    return (
        <Layout title="Online course purchase history">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <div className="datatable-top pb-0">
                            <div className="d-flex align-items-center gap-5">
                                <div className="datatable-search">
                                    <input className="datatable-input" placeholder="Search by Student Name..." type="search" value={searchQuery} onChange={handleSearch} />
                                </div>
                                <div className="datatable-search">
                                    <input className="datatable-input" placeholder="Search by Course Name..." type="search" value={courseQuery} onChange={handleCourseSearch} />
                                </div>
                                <div className="datatable-search">
                                    <input type="date" className="datatable-input" placeholder="Create Date" value={datePurchase} onChange={handleCreateDateChange} />
                                </div>
                            </div>
                            <div className="datatable-dropdown">
                                {(searchQuery || courseQuery || datePurchase) && (
                                    <button type="reset" className="btn btn-warning" onClick={handleResetSearchValue}>
                                        Reset
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="card-body">
                        {ordersHistory.loading ? (
                            <BookLoading />
                        ) : (
                            <div className="table-responsive">
                                <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                                    <div className="datatable-container">
                                        <table className="table table-hover datatable-table" id="pc-dt-simple">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Student</th>
                                                    <th>Course Name</th>
                                                    <th>Price</th>
                                                    <th>Payment Method</th>
                                                    <th>Date purchase</th>
                                                </tr>
                                            </thead>
                                            <tbody id="orders">
                                                {currentOrder.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="6" className="text-center">
                                                            No data.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    currentOrder.map((order, orderIndex) => (
                                                        <tr data-index="0" key={order.id}>
                                                            <td>{formatNumber(orderIndex + 1)}</td>
                                                            <td>{order.studentName}</td>
                                                            <td>{order.courseOnlineName}</td>
                                                            <td>${order.totalPrice.toFixed(2)}</td>
                                                            <td>{order.paymentMethod}</td>
                                                            <td>{order.createddate && format(new Date(order.createddate), "hh:mm:ss dd-MM-yyyy")}</td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    <Pagination currentPage={currentPagePackage} totalPages={totalPagesPackage} onPageChange={handlePageChangePackage} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default OrderHistory;
