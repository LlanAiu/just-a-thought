// builtin

// external
import { Outlet } from "react-router";

// internal
import NavigationBar from "~/components/nav-bar/nav-bar";
import type { Route } from "./+types/layout";
import { getSessionUserId } from "~/sessions.server";


export async function loader({ request }: Route.LoaderArgs) {
    return await getSessionUserId(request);
}

export default function BaseLayout() {

    return (
        <div className="flex space-x-3 h-screen">
            <NavigationBar />
            <div className="flex-auto max-w-3/4 h-full mt-2">
                <Outlet />
            </div>
        </div>
    );
}