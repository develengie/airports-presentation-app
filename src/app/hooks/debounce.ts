import { useEffect, useState } from 'react';

const UseDebounce = <T>(value: T, delay: number = 200): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);

        return () => clearTimeout(handler);
    }, [value]);

    return debouncedValue;
};

export default UseDebounce;
