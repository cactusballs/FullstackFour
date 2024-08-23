import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/UserSlice.jsx";
import "./LogoutButton.css";

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    const handleClick = () => {
        if (user) {
            dispatch(logoutUser());
            navigate("/");
        }
    };

    return (
        <>
        {user && (
            <button className="button-log-out" onClick={handleClick}>
                Log Out
            </button>
        )}
        </>
    );
};

export default LogoutButton;