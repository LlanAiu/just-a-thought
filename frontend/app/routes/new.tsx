// builtin

import { useState, type ChangeEvent } from "react";

// external

// internal

export default function NewThought() {
    const [text, setText] = useState<string>("");

    function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const newText: string = e.target.value;
        if (allowChange(text, newText)) {
            setText(s => newText);
        }
    }

    function allowChange(oldString: string, newString: string): boolean {
        const sameStart: boolean = newString.startsWith(oldString);
        const addedChars: boolean = newString.length > oldString.length;
        return sameStart && addedChars;
    }

    return (
        <div>
            <h1>New Thought</h1>

            <textarea
                name="thought"
                value={text}
                onChange={handleTextChange}
            />

        </div>
    );
}
