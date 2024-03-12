import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <nav className="pc-sidebar">
            <div className="navbar-wrapper">
                <div className="m-header">
                    <Link to="/" className="b-brand text-primary">
                        <img src="../assets/images/logo.png" alt="" className="img-fluid" />
                        {/* <span className="badge bg-light-success rounded-pill ms-2 theme-version">v9.0</span> */}
                    </Link>
                </div>
                <div className="navbar-content">
                    <div className="card pc-user-card">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                    <img src="../assets/images/user/avatar-1.jpg" alt="" className="user-avtar wid-45 rounded-circle" />
                                </div>
                                <div className="flex-grow-1 ms-3 me-2">
                                    <h6 className="mb-0">Jonh Smith</h6>
                                    <small>Administrator</small>
                                </div>
                                <a className="btn btn-icon btn-link-secondary avtar" data-bs-toggle="collapse" href="#pc_sidebar_userlink">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-sort-outline"></use>
                                    </svg>
                                </a>
                            </div>
                            <div className="collapse pc-user-links" id="pc_sidebar_userlink">
                                <div className="pt-3">
                                    <Link to="profile">
                                        <i className="ti ti-user"></i>
                                        <span>My Account</span>
                                    </Link>
                                    <a href="#!">
                                        <i className="ti ti-settings"></i>
                                        <span>Settings</span>
                                    </a>
                                    <a href="#!">
                                        <i className="ti ti-lock"></i>
                                        <span>Lock Screen</span>
                                    </a>
                                    <a href="#!">
                                        <i className="ti ti-power"></i>
                                        <span>Logout</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ul className="pc-navbar">
                        <li className="pc-item pc-caption">
                            <label>Dashboard</label>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <Link to="/" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-status-up"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Dashboard</span>

                                {/* <span className="pc-badge">2</span> */}
                            </Link>
                            {/* <ul className="pc-submenu">
                                <li className="pc-item">
                                    <a className="pc-link" href="../dashboard/index.html">
                                        Default
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../dashboard/analytics.html">
                                        Analytics
                                    </a>
                                </li>
                            </ul> */}
                        </li>
                        {/* <li className="pc-item pc-hasmenu">
                            <a href="#!" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-document"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Layouts</span>
                                <span className="pc-arrow">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="main-grid-item-icon"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    >
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </span>
                            </a>
                            <ul className="pc-submenu">
                                <li className="pc-item">
                                    <a className="pc-link" href="../demo/layout-vertical.html">
                                        Vertical
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../demo/layout-horizontal.html">
                                        Horizontal
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../demo/layout-compact.html">
                                        Compact
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../demo/layout-tab.html">
                                        Tab
                                    </a>
                                </li>
                            </ul>
                        </li> */}

                        {/* <li className="pc-item pc-caption">
                            <label>Widget</label>
                            <svg className="pc-icon">
                                <use xlinkHref="#custom-presentation-chart"></use>
                            </svg>
                        </li>
                        <li className="pc-item">
                            <a href="../widget/w_statistics.html" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-story"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Statistics</span>
                            </a>
                        </li>
                        <li className="pc-item">
                            <a href="../widget/w_data.html" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-fatrows"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Data</span>
                            </a>
                        </li>
                        <li className="pc-item">
                            <a href="../widget/w_chart.html" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-presentation-chart"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Chart</span>
                            </a>
                        </li>

                     <li className="pc-item pc-caption">
                            <label>UI Components</label>
                            <svg className="pc-icon">
                                <use xlinkHref="#custom-box-1"></use>
                            </svg>
                        </li>
                        <li className="pc-item">
                            <a href="../elements/bc_alert.html" className="pc-link" target="_blank">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-box-1"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Components</span>
                            </a>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <a href="#!" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-mouse-circle"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Icons</span>
                                <span className="pc-arrow">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="main-grid-item-icon"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    >
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </span>
                            </a>
                            <ul className="pc-submenu">
                                <li className="pc-item">
                                    <a className="pc-link" href="../elements/icon-feather.html">
                                        Feather
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../elements/icon-fontawesome.html">
                                        Font Awesome 5
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../elements/icon-material.html">
                                        Material
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../elements/icon-tabler.html">
                                        Tabler
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../elements/icon-custom.html">
                                        Custom
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="pc-item pc-caption">
                            <label>Forms</label>
                            <svg className="pc-icon">
                                <use xlinkHref="#custom-element-plus"></use>
                            </svg>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <a href="#!" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-element-plus"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Forms Elements</span>
                                <span className="pc-arrow">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="main-grid-item-icon"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    >
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </span>
                            </a>
                            <ul className="pc-submenu">
                                <li className="pc-item">
                                    <a className="pc-link" href="../forms/form_elements.html">
                                        Form Basic
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../forms/form_floating.html">
                                        Form Floating
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../forms/form2_basic.html">
                                        Form Options
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../forms/form2_input_group.html">
                                        Input Groups
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../forms/form2_checkbox.html">
                                        Checkbox
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../forms/form2_radio.html">
                                        Radio
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../forms/form2_switch.html">
                                        Switch
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../forms/form2_megaoption.html">
                                        Mega option
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <a href="#!" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-cpu-charge"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Forms Plugins</span>
                                <span className="pc-arrow">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="main-grid-item-icon"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    >
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </span>
                            </a>
                            <ul className="pc-submenu">
                                <li className="pc-item pc-hasmenu">
                                    <a className="pc-link" href="#!">
                                        Date
                                        <span className="pc-arrow">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="24"
                                                height="24"
                                                className="main-grid-item-icon"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            >
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        </span>
                                    </a>
                                    <ul className="pc-submenu">
                                        <li className="pc-item">
                                            <a className="pc-link" href="../forms/form2_datepicker.html">
                                                Datepicker
                                            </a>
                                        </li>
                                        <li className="pc-item">
                                            <a className="pc-link" href="../forms/form2_daterangepicker.html">
                                                Date Range Picker
                                            </a>
                                        </li>
                                        <li className="pc-item">
                                            <a className="pc-link" href="../forms/form2_timepicker.html">
                                                Timepicker
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="pc-item pc-hasmenu">
                                    <a className="pc-link" href="#!">
                                        Select
                                        <span className="pc-arrow">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="24"
                                                height="24"
                                                className="main-grid-item-icon"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            >
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        </span>
                                    </a>
                                    <ul className="pc-submenu">
                                        <li className="pc-item">
                                            <a className="pc-link" href="../forms/form2_choices.html">
                                                Choices js
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../forms/form2_recaptcha.html">
                                        Google reCaptcha
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../forms/form2_inputmask.html">
                                        Input Masks
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../forms/form2_clipboard.html">
                                        Clipboard
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../forms/form2_nouislider.html">
                                        Nouislider
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../forms/form2_switchjs.html">
                                        Bootstrap Switch
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../forms/form2_typeahead.html">
                                        Typeahead
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <a href="#!" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-text-block"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Text Editors</span>
                                <span className="pc-arrow">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="main-grid-item-icon"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    >
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </span>
                            </a>
                            <ul className="pc-submenu">
                                <li className="pc-item">
                                    <a className="pc-link" href="../forms/form2_tinymce.html">
                                        Tinymce
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../forms/form2_quill.html">
                                        Quill
                                    </a>
                                </li>
                                <li className="pc-item pc-hasmenu">
                                    <a className="pc-link" href="#!">
                                        CK editor
                                        <span className="pc-arrow">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="24"
                                                height="24"
                                                className="main-grid-item-icon"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            >
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        </span>
                                    </a>
                                    <ul className="pc-submenu">
                                        <li className="pc-item">
                                            <a className="pc-link" href="../forms/editor-classic.html">
                                                classic
                                            </a>
                                        </li>
                                        <li className="pc-item">
                                            <a className="pc-link" href="../forms/editor-document.html">
                                                Document
                                            </a>
                                        </li>
                                        <li className="pc-item">
                                            <a className="pc-link" href="../forms/editor-inline.html">
                                                Inline
                                            </a>
                                        </li>
                                        <li className="pc-item">
                                            <a className="pc-link" href="../forms/editor-balloon.html">
                                                Balloon
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../forms/form2_markdown.html">
                                        Markdown
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <a href="#!" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-row-vertical"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Form Layouts</span>
                                <span className="pc-arrow">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="main-grid-item-icon"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    >
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </span>
                            </a>
                            <ul className="pc-submenu">
                                <li className="pc-item">
                                    <a className="pc-link" href="../forms/form2_lay-default.html">
                                        Layouts
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../forms/form2_lay-multicolumn.html">
                                        Multicolumn
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../forms/form2_lay-actionbars.html">
                                        Actionbars
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../forms/form2_lay-stickyactionbars.html">
                                        Sticky Action bars
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <a href="#!" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-document-upload"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">File upload</span>
                                <span className="pc-arrow">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="main-grid-item-icon"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    >
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </span>
                            </a>
                            <ul className="pc-submenu">
                                <li className="pc-item">
                                    <a className="pc-link" href="../forms/file-upload.html">
                                        Dropzone
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../forms/form2_flu-uppy.html">
                                        Uppy
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="pc-item">
                            <a href="../forms/form-validation.html" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-password-check"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Form Validation</span>
                            </a>
                        </li>
                        <li className="pc-item">
                            <a href="../forms/image_crop.html" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-crop"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Image cropper</span>
                            </a>
                        </li>
                        <li className="pc-item pc-caption">
                            <label>table</label>
                            <svg className="pc-icon">
                                <use xlinkHref="#custom-text-align-justify-center"></use>
                            </svg>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <a href="#!" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-text-align-justify-center"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Bootstrap Table</span>
                                <span className="pc-arrow">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="main-grid-item-icon"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    >
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </span>
                            </a>
                            <ul className="pc-submenu">
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/tbl_bootstrap.html">
                                        Basic table
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/tbl_sizing.html">
                                        Sizing table
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/tbl_border.html">
                                        Border table
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/tbl_styling.html">
                                        Styling table
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <a href="#!" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-keyboard"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Vanilla Table</span>
                                <span className="pc-arrow">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="main-grid-item-icon"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    >
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </span>
                            </a>
                            <ul className="pc-submenu">
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/tbl_dt-simple.html">
                                        Basic initialization
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/tbl_dt-dynamic-import.html">
                                        Dynamic Importimport Profile from '../views/Profile/index';
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/tbl_dt-render-column-cells.html">
                                        Render Column Cells
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/tbl_dt-column-manipulation.html">
                                        Column Manipulation
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/tbl_dt-datetime-sorting.html">
                                        Datetime Sorting
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/tbl_dt-methods.html">
                                        Methods
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/tbl_dt-add-rows.html">
                                        Add Rows
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/tbl_dt-fetch-api.html">
                                        Fetch API
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/tbl_dt-filters.html">
                                        Filters
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/tbl_dt-export.html">
                                        Export
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <a href="#!" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-graph"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Data table</span>
                                <span className="pc-arrow">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="main-grid-item-icon"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    >
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </span>
                            </a>
                            <ul className="pc-submenu">
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/dt_advance.html">
                                        Advance initialization
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/dt_styling.html">
                                        Styling
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/dt_api.html">
                                        API
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/dt_plugin.html">
                                        Plug-in
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/dt_sources.html">
                                        Data sources
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <a href="#!" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-add-item"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">DT extensions</span>
                                <span className="pc-arrow">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="main-grid-item-icon"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    >
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </span>
                            </a>
                            <ul className="pc-submenu">
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/dt_ext_autofill.html">
                                        Autofill
                                    </a>
                                </li>
                                <li className="pc-item pc-hasmenu">
                                    <a href="#!" className="pc-link">
                                        Button
                                        <span className="pc-arrow">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="24"
                                                height="24"
                                                className="main-grid-item-icon"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            >
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        </span>
                                    </a>
                                    <ul className="pc-submenu">
                                        <li className="pc-item">
                                            <a className="pc-link" href="../table/dt_ext_basic_buttons.html">
                                                Basic button
                                            </a>
                                        </li>
                                        <li className="pc-item">
                                            <a className="pc-link" href="../table/dt_ext_export_buttons.html">
                                                Data export
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/dt_ext_col_reorder.html">
                                        Col reorder
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/dt_ext_fixed_columns.html">
                                        Fixed columns
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/dt_ext_fixed_header.html">
                                        Fixed header
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/dt_ext_key_table.html">
                                        Key table
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/dt_ext_responsive.html">
                                        Responsive
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/dt_ext_row_reorder.html">
                                        Row reorder
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/dt_ext_scroller.html">
                                        Scroller
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../table/dt_ext_select.html">
                                        Select table
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="pc-item pc-caption">
                            <label>Charts</label>
                            <svg className="pc-icon">
                                <use xlinkHref="#custom-graph"></use>
                            </svg>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <a href="#!" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-graph"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Charts</span>
                                <span className="pc-arrow">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="main-grid-item-icon"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    >
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </span>
                            </a>
                            <ul className="pc-submenu">
                                <li className="pc-item">
                                    <a className="pc-link" href="../chart/chart-apex.html">
                                        Apex Chart
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="pc-item pc-caption">
                            <label>Application</label>
                            <svg className="pc-icon">
                                <use xlinkHref="#custom-shopping-bag"></use>
                            </svg>
                        </li>
                        <li className="pc-item">
                            <a href="../application/calendar.html" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-calendar-1"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Calendar</span>
                            </a>
                        </li>
                        <li className="pc-item">
                            <a href="../application/chat.html" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-message-2"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Chat</span>
                            </a>
                        </li>
                        <li className="pc-item">
                            <a href="../application/cust_customer_list.html" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-notification-status"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Customer</span>
                            </a>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <a href="#!" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-shopping-bag"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">E-commerce</span>
                                <span className="pc-arrow">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="main-grid-item-icon"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    >
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </span>
                            </a>
                            <ul className="pc-submenu">
                                <li className="pc-item">
                                    <a className="pc-link" href="../application/ecom_product.html">
                                        Product
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../application/ecom_product-details.html">
                                        Product details
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../application/ecom_product-list.html">
                                        Product List
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../application/ecom_product-add.html">
                                        Add New Product
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../application/ecom_checkout.html">
                                        Checkout
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="pc-item">
                            <a href="../application/file-manager.html" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-document-filter"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">File manager</span>
                            </a>
                        </li>
                        <li className="pc-item">
                            <a href="../application/mail.html" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-direct-inbox"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Mail</span>
                            </a>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <a href="#!" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-user-square"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Users</span>
                                <span className="pc-arrow">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="main-grid-item-icon"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    >
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </span>
                            </a>
                            <ul className="pc-submenu">
                                <li className="pc-item">
                                    <a className="pc-link" href="../application/account-profile.html">
                                        Account Profile
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../application/social-media.html">
                                        Social media
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li className="pc-item pc-caption">
                            <label>Pages</label>
                            <svg className="pc-icon">
                                <use xlinkHref="#custom-flag"></use>
                            </svg>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <a href="#!" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-shield"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Authentication</span>
                                <span className="pc-arrow">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="main-grid-item-icon"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    >
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </span>
                            </a>
                            <ul className="pc-submenu">
                                <li className="pc-item pc-hasmenu">
                                    <a href="#!" className="pc-link">
                                        Authentication 1
                                        <span className="pc-arrow">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="24"
                                                height="24"
                                                className="main-grid-item-icon"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            >
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        </span>
                                    </a>
                                    <ul className="pc-submenu">
                                        <li className="pc-item">
                                            <a className="pc-link" target="_blank" href="../pages/login-v1.html">
                                                Login
                                            </a>
                                        </li>
                                        <li className="pc-item">
                                            <a className="pc-link" target="_blank" href="../pages/register-v1.html">
                                                Register
                                            </a>
                                        </li>
                                        <li className="pc-item">
                                            <a className="pc-link" target="_blank" href="../pages/forgot-password-v1.html">
                                                Forgot Password
                                            </a>
                                        </li>
                                        <li className="pc-item">
                                            <a className="pc-link" target="_blank" href="../pages/check-mail-v1.html">
                                                check mail
                                            </a>
                                        </li>
                                        <li className="pc-item">
                                            <a className="pc-link" target="_blank" href="../pages/reset-password-v1.html">
                                                reset password
                                            </a>
                                        </li>
                                        <li className="pc-item">
                                            <a className="pc-link" target="_blank" href="../pages/code-verification-v1.html">
                                                code verification
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="pc-item pc-hasmenu">
                                    <a href="#!" className="pc-link">
                                        Authentication 2
                                        <span className="pc-arrow">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="24"
                                                height="24"
                                                className="main-grid-item-icon"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            >
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        </span>
                                    </a>
                                    <ul className="pc-submenu">
                                        <li className="pc-item">
                                            <a className="pc-link" target="_blank" href="../pages/login-v2.html">
                                                Login
                                            </a>
                                        </li>
                                        <li className="pc-item">
                                            <a className="pc-link" target="_blank" href="../pages/register-v2.html">
                                                Register
                                            </a>
                                        </li>
                                        <li className="pc-item">
                                            <a className="pc-link" target="_blank" href="../pages/forgot-password-v2.html">
                                                Forgot password
                                            </a>
                                        </li>
                                        <li className="pc-item">
                                            <a className="pc-link" target="_blank" href="../pages/check-mail-v2.html">
                                                check mail
                                            </a>
                                        </li>
                                        <li className="pc-item">
                                            <a className="pc-link" target="_blank" href="../pages/reset-password-v2.html">
                                                reset password
                                            </a>
                                        </li>
                                        <li className="pc-item">
                                            <a className="pc-link" target="_blank" href="../pages/code-verification-v2.html">
                                                code verification
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="pc-item">
                                    <a href="../pages/login-v3.html" target="_blank" className="pc-link">
                                        Authentication 3
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <a href="#!" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-flag"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Maintenance</span>
                                <span className="pc-arrow">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="main-grid-item-icon"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    >
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </span>
                            </a>
                            <ul className="pc-submenu">
                                <li className="pc-item">
                                    <a className="pc-link" target="_blank" href="../pages/error-404.html">
                                        Error 404
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" target="_blank" href="../pages/error-500.html">
                                        Error 500
                                    </a>
                                </li>
                                <li className="pc-item pc-hasmenu">
                                    <a href="#!" className="pc-link">
                                        Under construction
                                        <span className="pc-arrow">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="24"
                                                height="24"
                                                className="main-grid-item-icon"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            >
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        </span>
                                    </a>
                                    <ul className="pc-submenu">
                                        <li className="pc-item">
                                            <a className="pc-link" target="_blank" href="../pages/under-construction-v1.html">
                                                Under Construction 1
                                            </a>
                                        </li>
                                        <li className="pc-item">
                                            <a className="pc-link" target="_blank" href="../pages/under-construction-v2.html">
                                                Under Construction 2
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="pc-item pc-hasmenu">
                                    <a href="#!" className="pc-link">
                                        Coming soon
                                        <span className="pc-arrow">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="24"
                                                height="24"
                                                className="main-grid-item-icon"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            >
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        </span>
                                    </a>
                                    <ul className="pc-submenu">
                                        <li className="pc-item">
                                            <a className="pc-link" target="_blank" href="../pages/coming-soon-v1.html">
                                                Coming soon 1
                                            </a>
                                        </li>
                                        <li className="pc-item">
                                            <a className="pc-link" target="_blank" href="../pages/coming-soon-v2.html">
                                                Coming soon 2
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className="pc-item">
                            <a href="../pages/contact-us.html" className="pc-link" target="_blank">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-24-support"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Contact us</span>
                            </a>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <a href="#!" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-dollar-square"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Price</span>
                                <span className="pc-arrow">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="main-grid-item-icon"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    >
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </span>
                            </a>
                            <ul className="pc-submenu">
                                <li className="pc-item">
                                    <a className="pc-link" href="../pages/price-v1.html">
                                        Price 1
                                    </a>
                                </li>
                                <li className="pc-item">
                                    <a className="pc-link" href="../pages/price-v2.html">
                                        Price 2
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="pc-item">
                            <a href="../pages/landing.html" className="pc-link" target="_blank">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-airplane"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Landing</span>
                            </a>
                        </li> */}

                        <li className="pc-item pc-caption">
                            <label>Student</label>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <Link to="/student" className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-user-graduate"></i>
                                </span>
                                <span className="pc-mtext">Student</span>
                            </Link>
                        </li>

                        <li className="pc-item pc-caption">
                            <label>Staff</label>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <Link to="/staff" className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-users"></i>
                                </span>
                                <span className="pc-mtext">Staff</span>
                            </Link>
                        </li>

                        <li className="pc-item pc-caption">
                            <label>Profile</label>
                            <svg className="pc-icon">
                                <use xlinkHref="#custom-user-square"></use>
                            </svg>
                        </li>
                        <li className="pc-item">
                            <Link to="/profile" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-user-square"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Profile</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
