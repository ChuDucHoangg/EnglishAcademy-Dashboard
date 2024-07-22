import { Link } from "react-router-dom";
import Layout from "../../layouts/index";
import config from "../../../config";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import { format } from "date-fns";
import Pagination from "../../layouts/Pagination";
import ButtonSubmit from "../../layouts/ButtonSubmit";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function EntranceTest() {
    const [entranceTest, setEntranceTest] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [createDate, setCreateDate] = useState("");
    const itemsPerPagePackage = 10;
    const [currentPagePackage, setCurrentPagePackage] = useState(1);

    // Call API
    const loadData = async () => {
        try {
            const entranceTestResponse = await api.get(url.ENTRANCE_TEST.LIST, { headers: { Authorization: `Bearer ${getAccessToken()}` } });
            setEntranceTest(entranceTestResponse.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Filter test
    const filteredTests = entranceTest.filter((test) => {
        const matchesSearchQuery = test.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCreateDate = !createDate || (entranceTest.createDate && format(new Date(test.createDate), "yyyy-MM-dd")) === createDate;
        return matchesSearchQuery && matchesCreateDate;
    });

    const totalPagesPackage = Math.ceil(filteredTests.length / itemsPerPagePackage);
    const startIndexPackage = (currentPagePackage - 1) * itemsPerPagePackage;
    const endIndexPackage = Math.min(startIndexPackage + itemsPerPagePackage, filteredTests.length);

    const currentTest = filteredTests.slice(startIndexPackage, endIndexPackage);

    const handlePageChangePackage = (pageNumber) => {
        setCurrentPagePackage(pageNumber);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPagePackage(1);
    };

    const handleCreateDateChange = (e) => {
        setCreateDate(e.target.value);
        setCurrentPagePackage(1);
    };

    // Select input
    const [inputCheck, setInputCheck] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleInputChange = (id) => {
        setInputCheck((prevInputCheck) => (prevInputCheck.includes(id) ? prevInputCheck.filter((item) => item !== id) : [...prevInputCheck, id]));
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            const allIds = currentTest.map((category) => category.id);
            setInputCheck(allIds);
        } else {
            setInputCheck([]);
        }
    };

    const handleResetSearchValue = () => {
        setSearchQuery("");
        setCreateDate("");
        setCurrentPagePackage(1);
    };

    const handleDelete = async (id) => {
        try {
            const data = inputCheck;

            const isConfirmed = await Swal.fire({
                title: "Are you sure?",
                text: "Are you sure you want to delete?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "I'm sure",
                reverseButtons: true,
            });

            if (isConfirmed.isConfirmed) {
                const deleteRequest = await api.delete(url.ENTRANCE_TEST.DELETE, { data, headers: { Authorization: `Bearer ${getAccessToken()}` } });
                if (deleteRequest.status === 200) {
                    toast.success("Deleted successfully!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
                loadData();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <Layout title="Entrance Test">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <div className="datatable-top pb-0">
                            <div className="d-flex align-items-center gap-5">
                                <div className="datatable-search">
                                    <input className="datatable-input" placeholder="Search..." type="search" value={searchQuery} onChange={handleSearch} />
                                </div>
                                <div className="datatable-search">
                                    <input type="date" className="datatable-input" placeholder="Create Date" value={createDate} onChange={handleCreateDateChange} />
                                </div>

                                {(searchQuery || createDate) && (
                                    <button type="reset" className="btn btn-warning" onClick={handleResetSearchValue}>
                                        Reset
                                    </button>
                                )}
                            </div>
                            <div className="datatable-dropdown">
                                <div className="d-flex align-items-center gap-3">
                                    {inputCheck.length > 0 && <ButtonSubmit className="btn-light-danger" value="Delete" icon="ti ti-trash" handleEvent={handleDelete} />}
                                    <Link to={config.routes.entrance_test_create} className="btn btn-primary d-flex align-items-center justify-content-center">
                                        <i className="ti ti-plus"></i> Add new Test
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-body table-border-style">
                        <div className="table-responsive">
                            <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                                <table className="table table-hover datatable-table" id="pc-dt-simple">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="form-check custom-checkbox">
                                                    <input type="checkbox" className="form-check-input" checked={selectAll} onChange={handleSelectAll} />
                                                </div>
                                            </th>
                                            <th>Test Name</th>
                                            <th>Type</th>
                                            <th>Question</th>
                                            <th>Created By</th>
                                            <th>Created Date</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody id="orders">
                                        {currentTest.map((test) => (
                                            <tr data-index="0" key={test.id}>
                                                <td>
                                                    <div className="form-check custom-checkbox checkbox-primary">
                                                        <input type="checkbox" className="form-check-input" checked={inputCheck.includes(test.id)} onChange={() => handleInputChange(test.id)} />
                                                    </div>
                                                </td>
                                                <td>{test.title}</td>
                                                <td>
                                                    {{
                                                        0: "Toeic",
                                                        1: "Ielts",
                                                    }[test.type] || ""}
                                                </td>
                                                <td>{test.totalQuestion}</td>
                                                <td>{test.createBy || "N/A"}</td>
                                                <td>{(test.createDate && format(new Date(test.createDate), "dd-MM-yyyy")) || "N/A"}</td>
                                                <td className="text-center">
                                                    <Link to={`/entrance-test/detail/${test.slug}`} className="btn btn-icon btn-link-success">
                                                        <i className="ti ti-eye f-18"></i>
                                                    </Link>
                                                    <Link to={`/entrance-test/edit/${test.slug}`} className="btn btn-icon btn-link-warning">
                                                        <i className="ti ti-edit f-18"></i>
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

            <Pagination currentPage={currentPagePackage} totalPages={totalPagesPackage} onPageChange={handlePageChangePackage} />
        </Layout>
    );
}

export default EntranceTest;
