import { useParams } from "react-router-dom";
import Layout from "../../../layouts";
import useAxiosGet from "../../../../hooks/useAxiosGet";
import url from "../../../../services/url";
import { getAccessToken } from "../../../../utils/auth";
import AnswerStudent from "../../../views/Classes/AnswerStudent";
import Pagination from "../../../layouts/Pagination";
import { useState } from "react";

function ClassCourseSlotAnswerTeacher() {
    const { classId, slug } = useParams();

    const slotData = useAxiosGet({
        path: url.CLASS.COURSE_SLOT_DETAIL_BY_CLASS + `/${slug}/${classId}`,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const slotDetail = slotData.response || {};

    const answerStudents = slotDetail.answerStudentItemSlotResponseListList;

    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(answerStudents?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, answerStudents?.length);

    const currentAnswer = answerStudents?.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <Layout title={`Answer ${slotDetail.title || "Loading..."}`}>
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-body">
                        {currentAnswer?.map((answer, index) => (
                            <AnswerStudent answer={answer} key={index} />
                        ))}
                    </div>

                    <div className="px-3">
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ClassCourseSlotAnswerTeacher;
