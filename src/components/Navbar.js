import {
    AppBar,
    makeStyles,
    Toolbar,
    Typography,
    Button,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

const useStyles = makeStyles(() => ({
    navbar: {
        backgroundColor: "#BCC0F2",
        paddingRight: "80px",
        paddingLeft: "80px",
    },
    logo: {
        fontFamily: "tenada",
		fontSize: "25px",
        fontWeight: 600,
        color: "#FFFEFE",
        textAlign: "left",
        paddingRight: "60px",
    },
    menuButton: {
        fontFamily: "tenada",
        fontWeight: 500,
        size: "18px",
        marginLeft: "30px",
    },
    navbarContents: {
        display: "flex",
        justifyContent: "space-between",
    },
    description: {
        minWidth: "350px",
        fontSize: "15px",
    },
}));

const navData = [
    {
        label: "Home",
        href: "/home",
    },
    {
        label: "Friends",
        href: "/friends",
    },
    {
        label: "My Page",
        href: "/mypage",
    },
];

const Navbar = () => {
    const { navbar, navbarContents, logo, menuButton, description } =
        useStyles();
    const display = () => {
        return (
            //className={} OK! className="" 아님!
            <Toolbar className={navbarContents}>
                {TogetherDoDesc} {TogetherDoLogo}
                <div style={{ minWidth: "350px" }}>{getMenuButtons()}</div>
            </Toolbar>
        );
    };

    const TogetherDoDesc = (
        <label className={description}>
            Do something together with your mates
        </label>
    );

    const TogetherDoLogo = (
        <Typography variant="h6" component="h1" className={logo}>
            TogetherDo
        </Typography>
    );

    const getMenuButtons = () => {
        return navData.map(({ label, href }) => {
            return (
                <Button
                    {...{
                        key: label,
                        color: "inherit",
                        to: href,
                        component: RouterLink,
                        className: menuButton,
                    }}
                >
                    {label}
                </Button>
            );
        });
    };

    return (
        <header>
            <AppBar className={navbar}>{display()}</AppBar>
        </header>
    );
};

export default Navbar;
