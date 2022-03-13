import { useState, useEffect } from 'react';

export default function useApiCall(apiFunc, initialState, dependencies) {
    const [data, setData] = useState(initialState);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const response = await apiFunc();
                if (mounted) {
                    setData(response);
                }
            } catch (err) {
                if (mounted) {
                    setError(err);
                }
            }
        })();

        return () => {
            mounted = false;
        };
    }, dependencies);

    return [data, error];
}