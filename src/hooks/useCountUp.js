import { useEffect, useState } from "react";

const useCountUp = (endValue, duration = 800, decimals = 0) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = endValue / (duration / 16);

        const animate = () => {
            start += increment;

            if (start >= endValue) {
                setValue(endValue);
                return;
            }

            const rounded =
                decimals > 0
                    ? Number(start.toFixed(decimals))
                    : Math.floor(start);

            setValue(rounded);

            requestAnimationFrame(animate);
        };

        animate();
    }, [endValue, duration, decimals]);

    return value;
};

export default useCountUp;
