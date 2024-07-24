import useCheckRole from "../../../hooks/useCheckRole";
import Layout from "../../layouts/index";
import GeneralStatistics from "../../views/Dashboard/GeneralStatisticsWidget";
import NewsFeed from "../../views/Dashboard/NewsFeed";
import StatisticsUtility from "../../views/Dashboard/StatisticsUtility";
import Top10OnlineCourses from "../../views/Dashboard/Top10OnlineCourses";
import Top10Tutor from "../../views/Dashboard/Top10Tutor";

function Dashboard() {
    useCheckRole();

    return (
        <Layout title="Dashboard">
            <StatisticsUtility />

            <div className="row mb-3">
                <Top10OnlineCourses />

                <GeneralStatistics />
            </div>

            <Top10Tutor />

            <NewsFeed />
        </Layout>
    );
}

export default Dashboard;
