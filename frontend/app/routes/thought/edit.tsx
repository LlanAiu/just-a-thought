// builtin

// external

// internal
import type { Route } from "./+types/edit";


export default function EditThought({ params }: Route.ComponentProps) {
    return <div>Editing Thought {params.id}</div>;
}
