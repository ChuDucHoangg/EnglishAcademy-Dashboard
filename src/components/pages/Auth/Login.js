import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="auth-main">
            <div className="auth-wrapper v1">
                <div className="auth-form">
                    <div className="card my-5">
                        <div className="card-body">
                            <div className="text-center">
                                <a href="#!">
                                    <img src="../assets/images/logo-dark.svg" alt="img" />
                                </a>
                            </div>

                            <h4 className="text-center f-w-500 m-3">Login with your email</h4>
                            <div className="form-group mb-3">
                                <input type="email" className="form-control" id="floatingInput" placeholder="Email Address" />
                            </div>
                            <div className="form-group mb-3">
                                <input type="password" className="form-control" id="floatingInput1" placeholder="Password" />
                            </div>
                            <div className="d-flex mt-1 justify-content-between align-items-center">
                                <div className="form-check">
                                    <input className="form-check-input input-primary" type="checkbox" id="customCheckc1" />
                                    <label className="form-check-label text-muted" for="customCheckc1">
                                        Remember me?
                                    </label>
                                </div>
                                <Link to="/forgot-password" className="text-secondary f-w-400 mb-0">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="d-grid mt-4">
                                <button type="button" className="btn btn-primary">
                                    Login
                                </button>
                            </div>
                            <div className="saprator my-3">
                                <span>OR</span>
                            </div>
                            <div className="d-grid my-3">
                                <button type="button" className="btn mt-2 btn-light-primary bg-light text-muted">
                                    <img src="../assets/images/authentication/facebook.svg" alt="img" /> <span> Sign In with Facebook</span>
                                </button>
                                <button type="button" className="btn mt-2 btn-light-primary bg-light text-muted">
                                    <img src="../assets/images/authentication/twitter.svg" alt="img" /> <span> Sign In with Twitter</span>
                                </button>
                                <button type="button" className="btn mt-2 btn-light-primary bg-light text-muted">
                                    <img src="../assets/images/authentication/google.svg" alt="img" /> <span> Sign In with Google</span>
                                </button>
                            </div>
                            {/* <div className="d-flex justify-content-between align-items-end mt-4">
                                <h6 className="f-w-500 mb-0">Don't have an Account?</h6>
                                <a href="#!" className="link-primary">
                                    Create Account
                                </a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
