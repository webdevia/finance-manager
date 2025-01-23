import React from "react";
import s from "./Title.scss";

type TitleProps = {
    text: string;
    transform: "capitalize" | "uppercase";
}

const Title = ({text, transform}: TitleProps) => <span className={s[transform]}>{text}</span>