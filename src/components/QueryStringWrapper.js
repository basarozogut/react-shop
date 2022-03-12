import { useSearchParams } from "react-router-dom";

export default function QueryStringWrapper({ keysToMatch, render }) {
    let [searchParams] = useSearchParams();

    const newProps = {};

    Array.from(searchParams.keys())
        .filter(k => keysToMatch.includes(k))
        .forEach((k) => {
            newProps[k] = searchParams.get(k);
        });

    return render(newProps);
}