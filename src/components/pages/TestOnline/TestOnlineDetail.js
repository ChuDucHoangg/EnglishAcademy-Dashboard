import { useParams } from "react-router-dom";
import Layout from "../../layouts";
import useAxiosGet from "../../../hooks/useAxiosGet";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";

function TestOnlineDetail() {
    const { testSlug } = useParams();

    const testDetailData = useAxiosGet({
        path: url.TEST_ONLINE.DETAIL + `/${testSlug}`,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const testDetail = testDetailData.response || {};
    console.log(testDetail);

    return (
        <Layout title="Test Detail">
            <h1>Test Detail</h1>
        </Layout>
    );
}

export default TestOnlineDetail;
