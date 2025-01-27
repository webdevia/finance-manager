import React, { useState } from "react";
import { OperationCard } from "../OperationCard/OperationCard";
import { AbstractOperation } from "src/entities/operation/Operation";

export interface OperationListProps {
    operations: AbstractOperation[];
}

export const OperationList: React.FC<OperationListProps> = ({ operations }) => {
    const [items, setItems] = useState<AbstractOperation[]>(operations);

    return (
        <div>
            {items.map((item, index) => (
                <div key={item.id}>
                    <OperationCard {...item} />
                </div>
            ))}
        </div>
    );
}