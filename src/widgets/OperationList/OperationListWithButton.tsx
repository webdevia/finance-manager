import React, { useState } from "react";
import style from "./OperationListWithButton.module.scss";
import { Operation } from "../operation/Operation";
import { AbstractOperation, createRandomOperation } from "../operation/OperationTypes";

export interface OperationListProps {
    operations: AbstractOperation[];
}

export const OperationListWithButton: React.FC<OperationListProps> = ({ operations }) => {
    const [items, setItems] = useState<AbstractOperation[]>(operations);

    return (
        <div>
            {items.map((item) => (
                <div key={item.name}>
                    <Operation {...item} />
                </div>
            ))}
            <button className={style["add-button"]} onClick={() => setItems([...items, createRandomOperation(new Date().toISOString())])}>Add</button>
        </div>
    );
}