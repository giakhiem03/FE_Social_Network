import { useState, useEffect } from "react";

function useDebounce(value, delay) {
    const [debouncedValue, setDebounce] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebounce(value), delay);

        return () => clearTimeout(handler);
    });

    return debouncedValue;
}

export default useDebounce;
