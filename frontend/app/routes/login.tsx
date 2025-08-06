// builtin

// external
import { data, Form, redirect } from "react-router";

// internal
import {
    commitSession,
    getSession,
} from "../sessions.server";
import type { Route } from "./+types/login";
import { validateCredentials } from "~/lib/auth";

export async function loader({
    request,
}: Route.LoaderArgs) {
    const session = await getSession(
        request.headers.get("Cookie"),
    );

    if (session.has("userId")) {
        return redirect("/");
    }

    return data(
        { error: session.get("error") },
        {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        },
    );
}

export async function action({
    request,
}: Route.ActionArgs) {
    const session = await getSession(
        request.headers.get("Cookie"),
    );
    const form = await request.formData();
    const username = form.get("username");
    const password = form.get("password");

    const userId = await validateCredentials(
        username as string,
        password as string,
    );

    if (userId == null) {
        session.flash("error", "Invalid username/password");

        return redirect("/login", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    }

    session.set("userId", userId);

    return redirect("/dashboard", {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
}

export default function Login({
    loaderData,
}: Route.ComponentProps) {
    const { error } = loaderData;

    return (
        <div>
            {error ? <div className="error">{error}</div> : null}
            <Form method="POST">
                <div>
                    <p>Please sign in</p>
                </div>
                <label>
                    Username: <input type="text" name="username" />
                </label>
                <label>
                    Password:{" "}
                    <input type="password" name="password" />
                </label>
                <button type="submit">Login</button>
            </Form>
        </div>
    );
}
