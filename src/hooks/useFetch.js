import { useState } from "react";
import { useSession } from "@clerk/clerk-react";

const useFetch = (cb, options = {}) => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const { session } = useSession();

    const fn = async (...args) => {
        // args will be passed when the function is called
        // from a component with some arguments
        setLoading(true);

        try {
            const supabaseAccessToken = await session.getToken({
                template: "supabase",
            });

            // options will be passed at the useFetch line
            const response = await cb(supabaseAccessToken, options, ...args);
            setData(response);
            return response;
        } catch (error) {
            setError(error);
            return Promise.reject(error);
        } finally {
            setLoading(false);
        }
    };

    return { fn, data, loading, error };
};

export default useFetch;
