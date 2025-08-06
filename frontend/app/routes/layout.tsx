// builtin

// external
import { Outlet, redirect, useLoaderData } from "react-router";

// internal
import NavigationBar from "~/components/nav-bar";
import type { Route } from "./+types/layout";
import { getSession } from "~/sessions.server";


export async function loader({ request }: Route.LoaderArgs) {
    const session = await getSession(request.headers.get("Cookie"));

    const userId = session.get("userId");

    if (!userId) {
        return redirect("/login");
    }

    return { userId: userId };
}

export default function BaseLayout() {

    return (
        <div>
            <NavigationBar />
            <Outlet />
        </div>
    );
}