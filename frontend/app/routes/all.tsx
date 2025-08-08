// builtin

// external

// internal
import { getAllThoughtsForUser } from "~/lib/thought-actions";
import { getSessionUserId, isSessionData } from "~/sessions.server";
import type { Route } from "./+types/all";


export async function loader({ request }: Route.LoaderArgs) {
    const data = await getSessionUserId(request);
    if (isSessionData(data)) {
        const process = await getAllThoughtsForUser(data.userId);

        if (process.success) {
            return { data: process.data };
        }
        return { data: [], error: process.error };
    }
}

export default function AllThoughts({ loaderData }: Route.ComponentProps) {
    return (
        <div>
            <h1>All Thoughts</h1>
            {
                loaderData?.data.map((thought) => {
                    return <div key={thought.id}>{thought.text}</div>;
                })
            }
        </div>
    );
}
