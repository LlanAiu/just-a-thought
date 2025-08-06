// builtin

// external

// internal
import { useRouteLoaderData } from "react-router";

export default function Dashboard() {
    const parentData = useRouteLoaderData("routes/layout");
    console.log(`Data: ${JSON.stringify(parentData)}`);

    return <div>Dashboard</div>;
}
