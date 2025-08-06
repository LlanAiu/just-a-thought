// builtin

// external
import { Outlet } from "react-router";
import NavigationBar from "~/components/nav-bar";

// internal

export default function BaseLayout() {
    return (
        <div>
            <NavigationBar />
            <Outlet />
        </div>
    );
}