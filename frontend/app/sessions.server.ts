// builtin

import { createCookie, createCookieSessionStorage } from "react-router";

// external

// internal

interface SessionData {
    userId: string;
}

interface SessionFlashData {
    error: string;
}

const { getSession, commitSession, destroySession } = createCookieSessionStorage<SessionData, SessionFlashData>(
    {
        cookie: createCookie("__session", {
            httpOnly: true,
            maxAge: 3600,
            path: "/",
            sameSite: "lax",
            secrets: ["whyIsThisNecessary?"],
            secure: false,
        })
    }
);

export { getSession, commitSession, destroySession };
