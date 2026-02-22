import { useEffect, useState } from "react";

const useCountUp = (endValue, duration = 800) => {
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

            setValue(Math.floor(start));
            requestAnimationFrame(animate);
        };

        animate();
    }, [endValue]);

    return value;
};

export default useCountUp;
