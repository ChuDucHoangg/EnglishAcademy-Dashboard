import Layout from "../../layouts";
import { Link } from "react-router-dom";
import Pagination from "../../layouts/Pagination";
import { useState } from "react";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import { useEffect } from "react";
import ButtonSubmit from "../../layouts/ButtonSubmit";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { formatLevelCourse } from "../../../utils/formatLevelCourse";
import config from "../../../config";
import BookLoading from "../../layouts/BookLoading";

function CourseOfflineList() {
    const [inputCheck, setInputCheck] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const [courseOffline, setCourseOffline] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadData = async () => {
        try {
            setLoading(true);
            const courseResponse = await api.get(url.COURSE_OFFLINE.LIST, { headers: { Authorization: `Bearer ${getAccessToken()}` } });
            setCourseOffline(courseResponse.data.data);
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
    const filteredCategories = courseOffline.filter((category) => category.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const totalPagesPackage = Math.ceil(filteredCategories.length / itemsPerPagePackage);
    const startIndexPackage = (currentPagePackage - 1) * itemsPerPagePackage;
    const endIndexPackage = Math.min(startIndexPackage + itemsPerPagePackage, filteredCategories.length);

    const currentCourse = filteredCategories.slice(startIndexPackage, endIndexPackage);

    const handlePageChangePackage = (pageNumber) => {
        setCurrentPagePackage(pageNumber);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPagePackage(1);
    };

    const handleInputChange = (id) => {
        setInputCheck((prevInputCheck) => (prevInputCheck.includes(id) ? prevInputCheck.filter((item) => item !== id) : [...prevInputCheck, id]));
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            const allIds = courseOffline.map((category) => category.id);
            setInputCheck(allIds);
        } else {
            setInputCheck([]);
        }
    };

    const handleDeleteCourse = async () => {
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
                const deleteRequest = await api.delete(url.COURSE_OFFLINE.DELETE, { data, headers: { Authorization: `Bearer ${getAccessToken()}` } });
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

    const imgNotFound =
        "https://www.shutterstock.com/shutterstock/photos/1869705316/display_1500/stock-vector-online-education-on-website-application-learning-computer-with-open-pages-d-vector-1869705316.jpg";

    const handleImageError = (e) => {
        e.target.src = imgNotFound;
    };

    return (
        <Layout title="Course Offline List">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <div className="datatable-top pb-0">
                            <div className="datatable-search">
                                <input className="datatable-input" placeholder="Search..." type="search" value={searchQuery} onChange={handleSearch} />
                            </div>
                            <div className="datatable-dropdown">
                                <div className="d-flex align-items-center gap-3">
                                    {inputCheck.length > 0 && <ButtonSubmit className="btn-light-danger" value="Delete" icon="ti ti-trash" handleEvent={handleDeleteCourse} />}
                                    <Link to={config.routes.course_offline_create} className="btn btn-primary d-flex align-items-center justify-content-center">
                                        <i className="ti ti-plus"></i> Add new Course Offline
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-body table-border-style">
                        {loading ? (
                            <BookLoading />
                        ) : (
                            <div className="table-responsive">
                                <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                                    <div className="datatable-container">
                                        <table className="table table-hover datatable-table" id="pc-dt-simple">
                                            <thead>
                                                <tr>
                                                    <th data-sortable="true">
                                                        <div className="form-check custom-checkbox">
                                                            <input type="checkbox" className="form-check-input" checked={selectAll} onChange={handleSelectAll} />
                                                        </div>
                                                    </th>
                                                    <th data-sortable="true">Course Name</th>
                                                    <th data-sortable="true">Price</th>
                                                    <th data-sortable="true">LANGUAGE</th>
                                                    <th data-sortable="true">TRAILER</th>
                                                    <th data-sortable="true">DESCRIPTION</th>
                                                    <th data-sortable="true">Status</th>
                                                    <th data-sortable="true" className="text-center">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody id="orders">
                                                {currentCourse.map((course) => (
                                                    <tr data-index="0" key={course.id}>
                                                        <td>
                                                            <div className="form-check custom-checkbox checkbox-primary">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    checked={inputCheck.includes(course.id)}
                                                                    onChange={() => handleInputChange(course.id)}
                                                                />
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="row">
                                                                <div className="col-auto">
                                                                    {/* /assets/images/graduation.png */}
                                                                    <img
                                                                        src={course.image}
                                                                        alt={course.name}
                                                                        className="rounded-circle object-fit-cover"
                                                                        onError={handleImageError}
                                                                        width="40"
                                                                        height="40"
                                                                    />
                                                                </div>
                                                                <div className="col">
                                                                    <h6 className="mb-0">{course.name}</h6>
                                                                    <p className="text-muted f-12 mb-0">{formatLevelCourse(course.level)}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>${course.price.toFixed(2)}</td>
                                                        <td>{course.language}</td>
                                                        <td>{course.trailer}</td>
                                                        <td>{course.description}</td>
                                                        <td>{course.status}</td>
                                                        <td className="text-center">
                                                            <Link to={`/course-offline/${course.slug}`} className="avtar avtar-xs btn-link-success btn-pc-default">
                                                                <i className="ti ti-eye f-18"></i>
                                                            </Link>
                                                            <Link to={`/course-offline/edit/${course.slug}`} className="avtar avtar-xs btn-link-success btn-pc-default">
                                                                <i className="ti ti-edit-circle f-18"></i>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <Pagination currentPage={currentPagePackage} totalPages={totalPagesPackage} onPageChange={handlePageChangePackage} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CourseOfflineList;
