import { Link } from "react-router-dom";
import config from "../../../config";
import { useEffect } from "react";

function NewsFeed() {
    useEffect(() => {
        const newsModal = sessionStorage.getItem("first_visit");

        if (!newsModal) {
            const myModal = new window.bootstrap.Modal(document.getElementById("newsModal"));
            myModal.show();
            sessionStorage.setItem("first_visit", "false");
        }
    });

    const closeModal = () => {
        const myModal = new window.bootstrap.Modal(document.getElementById("newsModal"));
        myModal.close();
    };

    return (
        <div className="modal fade modal-animate anim-3d-flip-horizontal" id="newsModal" tabIndex="-1" aria-modal="true" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">
                            <i className="fas fa-bullhorn text-danger"></i> News Feed
                        </h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body" style={{ height: "calc(100vh - 200px)", overflowY: "auto" }}>
                        <h5>
                            <span className="text-primary">#</span> Registration to Become a Tutor
                        </h5>
                        <p className="text-secondary">Join our community of tutors and help students succeed.</p>
                        <Link to={config.routes.tutor_registration} onClick={closeModal}>
                            <img src="./assets/images/pages/news-feed.png" alt="" className="w-100  object-fit-cover" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsFeed;
