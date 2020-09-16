import React from "react";

const MainPage = ({ content }) => {

    return (
        <div className="MainPage">
            <h3 className="MainPage__title">{content ? content : ""}</h3>
        </div>
    )
};

export default MainPage;