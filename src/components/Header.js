import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Header = ({ isLogged, toggleLogin }) => {

    return (
        <div className="Header">
            <div className="Header__nav">
                <div className="Header__nav_home nav-item">
                    <Link to="/">
                        Главная
                    </Link>
                </div>
                <div className="Header__nav_news nav-item">
                    <Link to="/news">
                        Новости
                    </Link>
                </div>
            </div>
            <div className="Header__auth">
                <Button variant="outline-primary" onClick={toggleLogin}>
                    {isLogged ? "Выход" : "Вход"}
                </Button>
            </div>
        </div>
    )
};

export default Header;