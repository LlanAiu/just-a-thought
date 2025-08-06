// builtin

// external
import { index, layout, prefix, type RouteConfig, route } from "@react-router/dev/routes";

// internal

export default [
    index("routes/home.tsx"),

    route("login", "routes/login.tsx"),

    layout("routes/layout.tsx", [

        route("dashboard", "routes/dashboard.tsx"),
        route("account", "routes/account.tsx"),

        ...prefix("thoughts", [
            index("routes/all.tsx"),

            route(":id", "routes/thought/layout.tsx", [
                index("routes/thought/view.tsx"),
                route("edit", "routes/thought/edit.tsx")
            ])
        ]),

        route("settings", "routes/settings.tsx"),
    ]),

    layout("routes/new/layout.tsx", [
        route("thoughts/new", "routes/new.tsx"),
    ]),

] satisfies RouteConfig;
