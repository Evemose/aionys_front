import { defaultLocale, locales } from "@/config/locales/locales";

// middleware.ts
import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest } from "next/server";

// Not showing the default locale
const I18nMiddleware = createI18nMiddleware({
    locales: locales.map((l) => l.locale),
    defaultLocale: defaultLocale,
    urlMappingStrategy: "rewriteDefault",
});

export function middleware(request: NextRequest) {
    return I18nMiddleware(request);
}

export const config = {
    matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};