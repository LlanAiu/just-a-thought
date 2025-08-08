// builtin

// external
import { createCookie, createCookieSessionStorage, redirect } from "react-router";

// internal

export interface SessionData {
    userId: string;
}

export const isSessionData = (data: unknown): data is SessionData => {
    return typeof data === "object" && data !== null && "userId" in data;
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

export const getSessionUserId = async (request: Request): Promise<Response | SessionData> => {
    const session = await getSession(request.headers.get("Cookie"));

    const userId = session.get("userId");

    if (!userId) {
        return redirect("/login");
    }

    return { userId };
};
