import "@/static/styles.css";
import React from "react";


export default function MainLayout(
    props: { children: React.ReactNode }
) {
    return (
        <html lang="en">
        <body>
        {props.children}
        </body>
        </html>
    )
}
