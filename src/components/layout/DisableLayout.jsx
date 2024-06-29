import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DisableLayout = ({ children }) => {
    const location = useLocation();
    const [showLayout, setShowLayout] = useState(false);

    useEffect(() => {
        if (location.pathname === "/login" || location.pathname === "/register") {
            setShowLayout(false)
        } else {
            setShowLayout(true)
        }
    }, [location])


    return (
        <div>{showLayout && children}</div>
    )
}

export default DisableLayout