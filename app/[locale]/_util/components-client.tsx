"use client"

import {Box, FormHelperText, Typography} from "@mui/material";
import React from "react";
import {toNormalDateFormat} from "@/app/[locale]/_util/misc";
import {useScopedI18n} from "@/config/locales/client";
import {useLoggedIn} from "@/app/[locale]/@header/_userBar/user-bar";

export function ErrorFormHelper({errors, field}: { errors: Map<string, string[]>, field: any }) {
    return <>
        {
            errors.has(field) &&
            <FormHelperText error id={`${field}-helper`}>
                {errors.get(field)!.map((error, index) =>
                    <Typography key={index} variant="caption">{error}</Typography>)}
            </FormHelperText>
        }
    </>;
}


export function Timestamp({createdAt, lastModifiedAt, id}: { createdAt: Date | string, lastModifiedAt: Date | string, id: string }) {
    const scopedT = useScopedI18n("commons")
    return (
        <Typography variant="caption" id={`timestamp-${id}`}>
            {toNormalDateFormat(new Date(createdAt)) +
                (+lastModifiedAt !== +createdAt ? ` (${scopedT("editedAt")} 
                ${toNormalDateFormat(new Date(lastModifiedAt))})` : "")}
        </Typography>
    )
}

// can be converted to server component if https is used (so cookies can be used)
export function LoggedInOnlyContainer({children}: { children: React.ReactNode }) {
    const scopedT = useScopedI18n("commons");
    const loggedIn = useLoggedIn(state => state.loggedIn);
    if (!loggedIn) {
        return (
            <Box className="flex justify-center items-center h-full text-center">
                <Typography variant="h3">{scopedT("mustBeLoggedIn")}</Typography>
            </Box>
        );
    }
    return <>{children}</>
}