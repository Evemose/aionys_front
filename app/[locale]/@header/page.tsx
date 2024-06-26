import React from "react";
import {Paper} from "@mui/material";
import UserBar from "@/app/[locale]/@header/_userBar/user-bar";
import LanguageSelector from "@/app/[locale]/@header/language-selector";

export default function Header() {
    return <Paper className="flex justify-between w-full pr-10 items-center h-[10dvh] shrink-0 pl-4 relative z-[1000]"
                  elevation={10} id="header">
        <UserBar/>
        <LanguageSelector/>
    </Paper>
}