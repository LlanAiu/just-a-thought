// builtin

// external

// internal
import { redirect } from "react-router";
import TimedTextInput from "~/components/new/timed-text";
import { postNewThoughtForUser } from "~/lib/thought-actions";
import { getSessionUserId, isSessionData } from "~/sessions.server";
import type { Route } from "./+types/new";


export async function action({ request }: Route.ActionArgs) {
    const formData: FormData = await request.formData();
    const thought: string = formData.get("thought") as string || "";
    const userId: string = formData.get("userId") as string;

    await postNewThoughtForUser({ userId, text: thought });

    return redirect("/thoughts");
}

export async function loader({ request }: Route.LoaderArgs) {
    const data = await getSessionUserId(request);

    if (isSessionData(data)) {
        return data;
    }
}

export default function NewThought({ loaderData }: Route.ComponentProps) {

    return (
        <TimedTextInput userId={loaderData?.userId} />
    );
}
