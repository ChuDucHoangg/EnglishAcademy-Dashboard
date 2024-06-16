import { Link } from "react-router-dom";
import url from "../../../services/url";
import Layout from "../../layouts";
import { format } from "date-fns";
import config from "../../../config";
import Pagination from "../../layouts/Pagination";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { getAccessToken } from "../../../utils/auth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ButtonSubmit from "../../layouts/ButtonSubmit";
import BookLoading from "../../layouts/BookLoading";

function CategoryList() {
    // const categoryData = useAxiosGet({
    //     path: url.CATEGORY.LIST,
    // });
    // const categories = categoryData.response || [];

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadData = async () => {
        try {
            setLoading(true);
            const categoryResponse = await api.get(url.CATEGORY.LIST);
            setCategories(categoryResponse.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const [searchQuery, setSearchQuery] = useState("");

    const itemsPerPagePackage = 10;
    const [currentPagePackage, setCurrentPagePackage] = useState(1);

    // Filter categories
    const filteredCategories = categories.filter((category) => category.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const totalPagesPackage = Math.ceil(filteredCategories.length / itemsPerPagePackage);
    const startIndexPackage = (currentPagePackage - 1) * itemsPerPagePackage;
    const endIndexPackage = Math.min(startIndexPackage + itemsPerPagePackage, filteredCategories.length);

    const currentCategory = filteredCategories.slice(startIndexPackage, endIndexPackage);

    const handlePageChangePackage = (pageNumber) => {
        setCurrentPagePackage(pageNumber);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPagePackage(1);
    };

    const [inputCheck, setInputCheck] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleInputChange = (id) => {
        setInputCheck((prevInputCheck) => (prevInputCheck.includes(id) ? prevInputCheck.filter((item) => item !== id) : [...prevInputCheck, id]));
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            const allIds = currentCategory.map((category) => category.id);
            setInputCheck(allIds);
        } else {
            setInputCheck([]);
        }
    };

    const handleDeleteCategory = async () => {
        try {
            const data = inputCheck;

            const isConfirmed = await Swal.fire({
                title: "Are you sure?",
                text: "Are you sure you want to cancel?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "I'm sure",
                reverseButtons: true,
            });

            if (isConfirmed.isConfirmed) {
                const deleteRequest = await api.delete(url.CATEGORY.DELETE, { data, headers: { Authorization: `Bearer ${getAccessToken()}` } });
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
            console.log(error);
        }
    };

    return (
        <Layout title="Category List">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <div className="datatable-top pb-0">
                            <div className="datatable-search">
                                <input className="datatable-input" placeholder="Search..." type="search" value={searchQuery} onChange={handleSearch} />
                            </div>
                            <div className="datatable-dropdown">
                                <div className="d-flex align-items-center gap-3">
                                    {inputCheck.length > 0 && <ButtonSubmit className="btn-light-danger" value="Delete" icon="ti ti-trash" handleEvent={handleDeleteCategory} />}
                                    <Link to={config.routes.category_create} className="btn btn-primary d-flex align-items-center justify-content-center">
                                        <i className="ti ti-plus"></i> Add new Category
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-body table-border-style">
                        <div className="table-responsive">
                            <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                                {loading ? (
                                    <BookLoading />
                                ) : (
                                    <div className="datatable-container">
                                        <table className="table table-hover datatable-table" id="pc-dt-simple">
                                            <thead>
                                                <tr>
                                                    <th data-sortable="true">
                                                        <div className="form-check custom-checkbox">
                                                            <input type="checkbox" className="form-check-input" checked={selectAll} onChange={handleSelectAll} />
                                                        </div>
                                                    </th>
                                                    <th data-sortable="true">Name</th>
                                                    <th data-sortable="true">Slug</th>
                                                    <th data-sortable="true">Created Date</th>
                                                    <th data-sortable="true">Created By</th>
                                                    <th data-sortable="true" className="text-center">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody id="orders">
                                                {currentCategory.map((category) => (
                                                    <tr data-index="0" key={category.id}>
                                                        <td>
                                                            <div className="form-check custom-checkbox checkbox-primary">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    checked={inputCheck.includes(category.id)}
                                                                    onChange={() => handleInputChange(category.id)}
                                                                />
                                                            </div>
                                                        </td>

                                                        <td>{category.name}</td>
                                                        <td>{category.slug}</td>
                                                        <td>{(category.createdDate && format(new Date(category.createdDate), "dd-MM-yyyy")) || "N/A"}</td>
                                                        <td>{category.createdBy || "N/A"}</td>
                                                        <td className="text-center">
                                                            <Link to={`/category-edit/${category.slug}`} className="avtar avtar-xs btn-link-success btn-pc-default">
                                                                <i className="ti ti-edit-circle f-18"></i>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                <div className="row">
                                    <div className="col-lg-3">
                                        <Pagination currentPage={currentPagePackage} totalPages={totalPagesPackage} onPageChange={handlePageChangePackage} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CategoryList;
