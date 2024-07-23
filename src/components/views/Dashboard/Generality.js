import { Link } from "react-router-dom";

function Generality({ item }) {
    return (
        <div className="col-lg-3 col-md-6">
            <Link to={item.path} className="card-link">
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
            </Link>
        </div>
    );
}

export default Generality;
