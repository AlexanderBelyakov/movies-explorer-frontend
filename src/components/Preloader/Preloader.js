import React from 'react'
import './Preloader.css'

const Preloader = ({isOn}) => {
    return (<>{isOn &&
        <div className="preloader">
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
}</>)
};

export default Preloader
