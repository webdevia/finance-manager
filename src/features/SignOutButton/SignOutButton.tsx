import React from "react";
import { useDispatch } from "react-redux";
import { clearToken } from "../authSlice";

interface SignOutButtonProps {
    className?: string
}

export const SignOutButton: React.FC<SignOutButtonProps> = ({className}) => {
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(clearToken());
    };
    return (
        <button className={className} onClick={handleSignOut}>Sign out</button>
    );
};