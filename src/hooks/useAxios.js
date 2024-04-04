import { useEffect, useState } from "react";
import api from "../services/api";

function useAxios({ method, path, body = null, headers = null }) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                let responseData;

                if (method === "GET") {
                    responseData = await api.get(path, { headers });
                } else if (method === "POST") {
                    responseData = await api.post(path, body, { headers });
                } else if (method === "PUT") {
                    responseData = await api.put(path, body, { headers });
                } else if (method === "PATCH") {
                    responseData = await api.patch(path, body, { headers });
                } else if (method === "DELETE") {
                    responseData = await api.delete(path, { data: body, headers });
                }

                setResponse(responseData.data.data);
                setError(false);
                setStatus(responseData.status);
            } catch (error) {
                setError(true);
                setStatus(error.response.status);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [method, path, body, headers]);

    return { response, error, loading, status };
}

export default useAxios;
