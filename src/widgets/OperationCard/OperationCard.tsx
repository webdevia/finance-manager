import React from "react";
import style from './OperationCard.module.scss';
import { AbstractOperation } from 'src/entities/operation/Operation';
import { useLocation, useNavigate } from "react-router-dom";

export interface OperationProps {
    amount: number;
    category: string;
    name: string;
    description: string;
    date: string;
}

export const OperationCard: React.FC<AbstractOperation> = ({ id, amount, category, name, description, date }) => {

    // const navigate = useNavigate();
    // const location = useLocation();

    const editHandler = () => {
        // navigate(location.pathname + "/edit/" + id, { state: { id, backgroundLocation: location } });
        // navigate("/modal" + id, { state: { id, backgroundLocation: location } });
    }

    return (
        <div className={style["card"]}>
            <div className={style["card-header"]}>
                <span className={style["category"]}>{category.name}</span>
                <span className={style["money-value"]}>{amount}</span>
            </div>
            <div className={style["card-body"]}>
                <h2 className={style["name"]}>{name}</h2>
                <p className={style["description"]}>{description}</p>
            </div>
            <div className={style["card-footer"]}>
                <span className={style["date"]}>{date}</span>
                <button className={style["edit-button"]} onClick={editHandler}>Edit</button>
            </div>
        </div>
    );
}