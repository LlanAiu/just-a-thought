// builtin

// external
import type { IconType } from "react-icons";

// internal

interface TextIconProps {
    open: boolean;
    label: string;
    icon: IconType;
}

export default function TextIcon({ open, label, icon }: TextIconProps) {

    const elementClass = (open) ? "flex-none" : "flex-auto"
    const element = icon({ size: "1.75rem", className: elementClass });

    const margin = (open) ? "mr-4" : "";

    return (
        <div className={`space-x-4 flex items-center h-8 ${margin}`}>
            {element}
            {open &&
                <p className="flex-auto color-secondary text-xl">{label}</p>
            }
        </div>
    );

}