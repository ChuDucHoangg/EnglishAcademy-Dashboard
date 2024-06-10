const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages === 1) return null;

    return (
        <nav>
            <ul className="pagination pagination-gutter pagination-primary no-bg">
                <li className={`page-item page-indicator ${currentPage === 1 ? "disabled" : ""}`}>
                    <button className="page-link">«</button>
                </li>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                        <button className="page-link" onClick={() => onPageChange(index + 1)}>
                            {index + 1}
                        </button>
                    </li>
                ))}
                <li className={`page-item page-indicator ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button className="page-link">»</button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
