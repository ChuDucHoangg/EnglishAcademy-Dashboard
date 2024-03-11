import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="pc-footer">
            <div className="footer-wrapper container-fluid">
                <div className="row">
                    <div className="col my-1">
                        <p className="m-0">
                            Copyright &copy; 2024{" "}
                            <a href="#!" className="pc-footer__name">
                                English Academy
                            </a>
                            . All rights Reserved.
                        </p>
                    </div>
                    <div className="col-auto my-1">
                        <ul className="list-inline footer-link mb-0">
                            <li className="list-inline-item">
                                <Link href="/">Home</Link>
                            </li>
                            <li className="list-inline-item">
                                <a href="#!">Documentation</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#!">Support</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
