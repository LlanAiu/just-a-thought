// builtin

// external

// internal
import type { Route } from "./+types/view";


export default function ViewThought({ params }: Route.ComponentProps) {
    return <div>Viewing Thought {params.id}</div>;
}
