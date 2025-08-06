// builtin

// external
import { Outlet } from "react-router";

// internal

export default function CanvasLayout() {
    return (
        <div>
            <h1>Canvas</h1>
            <Outlet />
        </div>

    );
}