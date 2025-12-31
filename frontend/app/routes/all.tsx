// builtin

// external

// internal
import { getAllThoughtsForUser } from "~/lib/thought-actions";
import { getSessionUserId, isSessionData } from "~/sessions.server";
import type { Route } from "./+types/all";
import { useEffect, useState } from "react";
import type { Thought } from "~/lib/types";


export default function AllThoughts() {



    const userId = "To be replaced by auth logic";
    const [thoughts, setThoughts] = useState<Thought[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        getAllThoughtsForUser(userId).then((reply) => {
            if (reply.success) {
                setThoughts(reply.data);
            } else {
                setError(reply.message);
            }
        })
    }, [])

    return (
        <div>
            <h1>All Thoughts</h1>
            {
                error && (<div>{error}</div>)
            }
            {
                thoughts.map((thought) => {
                    return <div key={thought.id}>{thought.text}</div>;
                })
            }
        </div>
    );
}
