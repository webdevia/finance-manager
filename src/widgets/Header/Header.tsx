import React from "react";
// import { Logo } from "../logo/Logo";
// import { ThemeSwitcher } from "../theme/ThemeSwitcher";
// import { LanguageSwitcher } from "../language/LanguageSwitcher";
// import { useThemeContext, Theme } from "../theme/ThemeProvider";
import style from './header.module.scss';
import cn from 'clsx';
import LeftRightLayout from "../../shared/ui/Layouts/LeftRightLayout/LeftRightLayout"
import { Navigation } from "../Navigation/Navigation";
import Logo from "src/shared/ui/Logo/Logo";
import logo from "../../shared/assets/logo.svg";

export const Header: React.FC = () => {

    // const themeContext = useThemeContext();

    return (
        // <header className={cn(style.header, {
        //     [style.dark]: themeContext.theme === Theme.dark,
        //     [style.light]: themeContext.theme === Theme.light
        // })}>
        <header className={style.header} >
            {/* <LeftRightLayout left={<div className={style["logo-container"]} ><div className={style.logo}><Logo url={logo} /></div><div>Finance Manager</div></div> } right={<Navigation />} /> */}
            <LeftRightLayout left={<Logo url={logo} />} right={<Navigation />} />
            {/* <Logo />
            <Navigation />
            <div>
                <LanguageSwitcher />
                <ThemeSwitcher />
            </div> */}
        </header>
    )
}