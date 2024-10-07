import { useEffect, useState } from 'react';

const useMount = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    return isMounted;
};

export default useMount;
