// builtin


// external
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Form, useSubmit } from "react-router";

// internal


// both in ms
const INTERVAL = 20;
const DURATION = 5000;

interface TimedTextProps {
    userId: string | undefined;
}

export default function TimedTextInput({ userId }: TimedTextProps) {
    const submit = useSubmit();
    const formRef = useRef(null);
    const [text, setText] = useState<string>("");

    const [elapsed, setElapsed] = useState(0);

    function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const newText: string = e.target.value;
        if (allowChange(text, newText)) {
            setText(_s => newText);
        }
    }

    useEffect(() => {
        if (elapsed < DURATION) {
            const change = setInterval(() => setElapsed(e => e + INTERVAL), INTERVAL);
            return () => clearInterval(change);
        }
    }, [elapsed]);

    // biome-ignore lint/correctness/useExhaustiveDependencies: Run on text change
    useEffect(() => {
        setElapsed(0);
        const timeout = setTimeout(() => {
            submit(formRef.current)
        }, DURATION);

        return () => clearTimeout(timeout);
    }, [text, submit]);

    return (
        <div style={{ backgroundColor: getBackgroundColor(elapsed) }}>
            <h1>New Thought</h1>
            <Form ref={formRef} method="POST">
                <textarea
                    id="thought"
                    name="thought"
                    value={text}
                    onChange={handleTextChange}
                />
                <input
                    id="userId"
                    name="userId"
                    type="hidden"
                    value={userId}
                />
            </Form>
        </div>
    );
}

function allowChange(oldString: string, newString: string): boolean {
    const sameStart: boolean = newString.startsWith(oldString);
    const addedChars: boolean = newString.length > oldString.length;
    return sameStart && addedChars;
}

function getBackgroundColor(elapsed: number): string {
    const percent = elapsed / DURATION;
    const bgColor = `rgba(255, ${255 * (1 - percent)}, ${255 * (1 - percent)}, 1)`;
    return bgColor;
}