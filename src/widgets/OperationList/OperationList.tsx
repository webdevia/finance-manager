import React, { useState } from "react";
import { Operation } from "../operation/Operation";
import { AbstractOperation } from "../operation/OperationTypes";

export interface OperationListProps {
    operations: AbstractOperation[];
}

export const OperationList: React.FC<OperationListProps> = ({ operations }) => {
    const [items, setItems] = useState<AbstractOperation[]>(operations);

    return (
        <div>
            {items.map((item, index) => (
                <div key={item.id}>
                    <Operation {...item} />
                </div>
            ))}
        </div>
    );
}