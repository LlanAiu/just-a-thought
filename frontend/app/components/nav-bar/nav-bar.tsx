// builtin

// external
import { useState } from "react";
import { NavLink } from "react-router";

import { MdSpaceDashboard, MdSettings, MdLightbulbCircle, MdAccountCircle } from "react-icons/md";

// internal
import TextIcon from "./text-icon";
import ToggleIcon from "./toggle-icon";


export default function NavigationBar() {
    const [open, setOpen] = useState(true);

    function toggleOpen() {
        setOpen(o => !o);
    }

    return (
        <nav className="h-full max-w-1/4 w-max flex flex-col flex-initial py-4 px-4 bg-primary space-y-4">
            <div className="w-full pb-2">
                {open && (<img src="fake-logo.png" alt="logo" className="h-12 object-contain" />)}
                {!open && (<img src="fake-icon.png" alt="icon" className="w-8 h-8" />)}
            </div>

            <NavLink to="/account" className="block" end>
                <TextIcon open={open} label="Account" icon={MdAccountCircle} />
            </NavLink>
            <NavLink to="/dashboard" className="block" end>
                <TextIcon open={open} label="Dashboard" icon={MdSpaceDashboard} />
            </NavLink>
            <NavLink to="/thoughts" className="block">

                <TextIcon open={open} label="Thoughts" icon={MdLightbulbCircle} />
            </NavLink>
            <NavLink to="/settings" className="block" end>

                <TextIcon open={open} label="Settings" icon={MdSettings} />
            </NavLink>

            <button type="button" className="mt-auto" onClick={toggleOpen}>
                <ToggleIcon open={open} />
            </button>
        </nav>
    );
}