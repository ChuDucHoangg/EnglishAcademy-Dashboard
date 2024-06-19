import Layout from "../../layouts";
import Profile from "../../views/Account/index";
import ChangePassword from "../../views/Account/ChangePassword";
import Settings from "../../views/Account/Settings";

function ProfileWrap() {
    return (
        <Layout title="Profile">
            <div className="col-sm-12">
                <div className="card">
                    <div className="card-body py-0">
                        <ul className="nav nav-tabs profile-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="profile-tab-1" data-bs-toggle="tab" href="#profile-1" role="tab" aria-selected="true">
                                    <i className="ti ti-user me-2"></i>Profile
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" id="profile-tab-4" data-bs-toggle="tab" href="#profile-4" role="tab" aria-selected="true">
                                    <i className="ti ti-lock me-2"></i>Change Password
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" id="profile-tab-6" data-bs-toggle="tab" href="#profile-6" role="tab" aria-selected="true">
                                    <i className="ti ti-settings me-2"></i>Settings
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="tab-content">
                    <div className="tab-pane show active" id="profile-1" role="tabpanel" aria-labelledby="profile-tab-1">
                        <Profile />
                    </div>

                    <div className="tab-pane" id="profile-4" role="tabpanel" aria-labelledby="profile-tab-4">
                        <ChangePassword />
                    </div>
                    <div className="tab-pane" id="profile-6" role="tabpanel" aria-labelledby="profile-tab-6">
                        <Settings />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProfileWrap;
