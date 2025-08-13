// builtin

// external

// internal


interface ToggleIconProps {
    open: boolean
}

export default function ToggleIcon({ open }: ToggleIconProps) {
    const text = (open) ? "Close" : ">";

    return (
        <div className="rounded-full bg-gray-200 hover:bg-gray-300">{text}</div>
    );
}