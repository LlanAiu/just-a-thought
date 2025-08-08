// builtin

// external

// internal
import type { Route } from "./+types/view";


export async function clientLoader() {
    await new Promise((resolve) => setTimeout(resolve, 5000));
}

export default function ViewThought({ params }: Route.ComponentProps) {
    return <div>Viewing Thought {params.id}</div>;
}

export function HydrateFallback() {
    return <div>Loading...</div>;
}