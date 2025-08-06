// builtin

// external
import { NavLink } from "react-router";

// internal

export default function NavigationBar() {
    return (
        <nav>
            <NavLink to="/account" end>
                Account
            </NavLink>
            <NavLink to="/dashboard" end>
                Dashboard
            </NavLink>
            <NavLink to="/thoughts">
                Thoughts
            </NavLink>
            <NavLink to="/settings" end>
                Settings
            </NavLink>
        </nav>
    );
}