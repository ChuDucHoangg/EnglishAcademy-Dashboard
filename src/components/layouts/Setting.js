function Setting() {
    return (
        <>
            <div className="pct-c-btn">
                <a href="#!" data-bs-toggle="offcanvas" data-bs-target="#offcanvas_pc_layout">
                    <svg className="pc-icon">
                        <use xlinkHref="#custom-setting-2"></use>
                    </svg>
                </a>
            </div>
            <div className="offcanvas border-0 pct-offcanvas offcanvas-end" tabIndex="-1" id="offcanvas_pc_layout">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">Settings</h5>
                    <button type="button" className="btn btn-icon btn-link-danger" data-bs-dismiss="offcanvas" aria-label="Close">
                        <i className="ti ti-x"></i>
                    </button>
                </div>
                <div className="pct-body" style={{ height: "calc(100% - 85px)" }}>
                    <div className="offcanvas-body py-0">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <div className="pc-dark">
                                    <h6 className="mb-1">Theme Mode</h6>
                                    <p className="text-muted text-sm">Choose light or dark mode or Auto</p>
                                    <div className="row theme-layout">
                                        <div className="col-4">
                                            <div className="d-grid">
                                                <button className="preset-btn btn active" data-value="true" onclick="layout_change('light');">
                                                    <svg className="pc-icon text-warning">
                                                        <use xlinkHref="#custom-sun-1"></use>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="d-grid">
                                                <button className="preset-btn btn" data-value="false" onclick="layout_change('dark');">
                                                    <svg className="pc-icon">
                                                        <use xlinkHref="#custom-moon"></use>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="d-grid">
                                                <button className="preset-btn btn" data-value="default" onclick="layout_change_default();">
                                                    <svg className="pc-icon">
                                                        <use xlinkHref="#custom-setting-2"></use>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <h6 className="mb-1">Theme Contrast</h6>
                                <p className="text-muted text-sm">Choose theme contrast</p>
                                <div className="row theme-contrast">
                                    <div className="col-6">
                                        <div className="d-grid">
                                            <button className="preset-btn btn" data-value="true" onclick="layout_sidebar_change('true');">
                                                <svg className="pc-icon">
                                                    <use xlinkHref="#custom-mask"></use>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-grid">
                                            <button className="preset-btn btn active" data-value="false" onclick="layout_sidebar_change('false');">
                                                <svg className="pc-icon">
                                                    <use xlinkHref="#custom-mask-1-outline"></use>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <h6 className="mb-1">Custom Theme</h6>
                                <p className="text-muted text-sm">Choose your Primary color</p>
                                <div className="theme-color preset-color">
                                    <a href="#!" className="active" data-value="preset-1">
                                        <i className="ti ti-check"></i>
                                    </a>
                                    <a href="#!" data-value="preset-2">
                                        <i className="ti ti-check"></i>
                                    </a>
                                    <a href="#!" data-value="preset-3">
                                        <i className="ti ti-check"></i>
                                    </a>
                                    <a href="#!" data-value="preset-4">
                                        <i className="ti ti-check"></i>
                                    </a>
                                    <a href="#!" data-value="preset-5">
                                        <i className="ti ti-check"></i>
                                    </a>
                                    <a href="#!" data-value="preset-6">
                                        <i className="ti ti-check"></i>
                                    </a>
                                    <a href="#!" data-value="preset-7">
                                        <i className="ti ti-check"></i>
                                    </a>
                                    <a href="#!" data-value="preset-8">
                                        <i className="ti ti-check"></i>
                                    </a>
                                    <a href="#!" data-value="preset-9">
                                        <i className="ti ti-check"></i>
                                    </a>
                                    <a href="#!" data-value="preset-10">
                                        <i className="ti ti-check"></i>
                                    </a>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <h6 className="mb-1">Sidebar Caption</h6>
                                <p className="text-muted text-sm">Sidebar Caption Hide/Show</p>
                                <div className="row theme-nav-caption">
                                    <div className="col-6">
                                        <div className="d-grid">
                                            <button className="preset-btn btn active" data-value="true" onclick="layout_caption_change('true');">
                                                <img src="../assets/images/customizer/img-caption-1.svg" alt="img" className="img-fluid" width="70%" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-grid">
                                            <button className="preset-btn btn" data-value="false" onclick="layout_caption_change('false');">
                                                <img src="../assets/images/customizer/img-caption-2.svg" alt="img" className="img-fluid" width="70%" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="pc-rtl">
                                    <h6 className="mb-1">Theme Layout</h6>
                                    <p className="text-muted text-sm">LTR/RTL</p>
                                    <div className="row theme-direction">
                                        <div className="col-6">
                                            <div className="d-grid">
                                                <button className="preset-btn btn active" data-value="false" onclick="layout_rtl_change('false');">
                                                    <img src="../assets/images/customizer/img-layout-1.svg" alt="img" className="img-fluid" width="70%" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="d-grid">
                                                <button className="preset-btn btn" data-value="true" onclick="layout_rtl_change('true');">
                                                    <img src="../assets/images/customizer/img-layout-2.svg" alt="img" className="img-fluid" width="70%" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="pc-container-width">
                                    <h6 className="mb-1">Layout Width</h6>
                                    <p className="text-muted text-sm">Choose Full or Container Layout</p>
                                    <div className="row theme-container">
                                        <div className="col-6">
                                            <div className="d-grid">
                                                <button className="preset-btn btn active" data-value="false" onclick="change_box_container('false')">
                                                    <img src="../assets/images/customizer/img-container-1.svg" alt="img" className="img-fluid" width="70%" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="d-grid">
                                                <button className="preset-btn btn" data-value="true" onclick="change_box_container('true')">
                                                    <img src="../assets/images/customizer/img-container-2.svg" alt="img" className="img-fluid" width="70%" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="d-grid">
                                    <button className="btn btn-light-danger" id="layoutreset">
                                        Reset Layout
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Setting;
