function Breadcrumb({ title }) {
    return (
        <div className="page-header">
            <div className="page-block">
                <div className="row align-items-center">
                    <div className="col-md-12">
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/">Home</a>
                            </li>
                            <li className="breadcrumb-item" aria-current="page">
                                {title}
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-12">
                        <div className="page-header-title">
                            <h2 className="mb-0">{title}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Breadcrumb;
