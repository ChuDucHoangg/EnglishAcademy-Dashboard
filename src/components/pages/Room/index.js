import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import config from "../../../config";

function Room() {
    const navigate = useNavigate();
    const [roomCode, setRoomCode] = useState("");

    const handleFormSubmit = () => {
        navigate(`/room/${roomCode}`);
    };

    return (
        <>
            <Helmet>
                <title>Room | English Academy</title>
            </Helmet>
            <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
                <div className="container">
                    <div className="row gy-5 row--30">
                        <div className="col-lg-4 mx-auto">
                            <div className="card border-0">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link to={config.routes.dashboard}>
                                            <img src="assets/images/logo.png" alt="English Academy" style={{ marginLeft: -55, maxWidth: 260 }} />
                                        </Link>

                                        <Link to={config.routes.dashboard} className="text-primary fw-300 fz-14">
                                            Back to Home
                                        </Link>
                                    </div>

                                    <form onSubmit={handleFormSubmit} className="mt-3">
                                        <div className="rbt-form-group">
                                            <div className="d-flex align-items-center justify-content-between gap-3">
                                                <input type="text" id="room" className="form-control" value={roomCode} onChange={(e) => setRoomCode(e.target.value)} placeholder="Enter room code" />

                                                <button type="submit" className={`btn btn-primary rounded ${!roomCode ? "disabled" : ""}`} style={{ height: 49 }} disabled={!roomCode}>
                                                    <i className="ti ti-corner-down-right"></i>
                                                </button>
                                            </div>
                                        </div>

                                        <span className="f-12 d-block mt-2 text-secondary">Online Room for students and tutors.</span>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Room;
