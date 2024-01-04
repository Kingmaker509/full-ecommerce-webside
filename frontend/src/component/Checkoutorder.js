import React, { useEffect, useState } from 'react';

const CheckoutOrder = () => {
    const [progress, setProgress] = useState(0);


    useEffect(() => {
        const timer = setTimeout(() => {
            if (progress < 100) {
                setProgress(progress + 50);
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [progress]);

    return (
        <>
            <div className='container'>
                <div className="d-flex justify-content-between">
                    <i className="fa-solid fa-truck-fast text-success " ></i>
                    <i class="fa-solid fa-check-to-slot"></i>
                    <i class="fa-solid fa-credit-card"></i>
                </div>
                <div className="progress mt-2">
                    <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        aria-label="Progress"
                        style={{ width: `${progress}%` }}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    ></div>
                </div>
            </div>
        </>
    );
};

export default CheckoutOrder;
