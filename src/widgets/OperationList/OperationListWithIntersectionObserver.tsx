import React, { useState, useRef, useEffect } from "react";
import { OperationCard } from "../OperationCard/OperationCard";
import { AbstractOperation, createRandomOperation } from "src/entities/operation/Operation";

export interface OperationListProps {
    operations: AbstractOperation[];
}

export const OperationListWithIntersectionObserver: React.FC<OperationListProps> = ({ operations }) => {
    const [items, setItems] = useState<AbstractOperation[]>(operations);
    const observer = useRef<IntersectionObserver | null>(null);
    const lastItemRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        observer.current = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                setItems((prevItems) => [
                    ...prevItems,
                    createRandomOperation(new Date().toISOString()),
                ]);
            }
        });

        if (lastItemRef.current) {
            observer.current.observe(lastItemRef.current);
        }

        return () => {
            if (observer.current && lastItemRef.current) {
                observer.current.unobserve(lastItemRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (lastItemRef.current && observer.current) {
            observer.current.observe(lastItemRef.current);
        }
    }, [items]);

    return (
        <div>
            {items.map((item, index) => (
                <div key={item.id} ref={index === items.length - 1 ? lastItemRef : null}>
                    <OperationCard {...item} />
                </div>
            ))}
        </div>
    );
}