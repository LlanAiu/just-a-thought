// builtin

import { Form, redirect } from "react-router";
import type { Route } from "./+types/account";
import { destroySession, getSession } from "~/sessions.server";

// external

// internal

export async function action({ request }: Route.ActionArgs) {
    const session = await getSession(request.headers.get("Cookie"));

    return redirect("/", {
        headers: {
            "Set-Cookie": await destroySession(session),
        },
    });
}

export default function Account() {
    return (
        <div>
            <h1>Account</h1>
            <Form method="POST">
                <button type="submit">Logout</button>
            </Form>
        </div>
    );
}
