import { sortedSteps } from "../custom";
import { State, useAppSelector } from "../store";
import { hasOwnProperty } from "../utils";
import "./style.scss";
const customSteps = sortedSteps.reduce((acc, val) => {
    if (hasOwnProperty(val, "title")) {
        return [...acc, { title: val.title, steps: [val.num] }];
    }
    acc.at(-1)?.steps.push(val.num);
    return acc;
}, [] as Array<{ title: string; steps: number[] }>);
export function SideBar() {
    const step = useAppSelector((state) => state[State.name].step);

    return (
        <nav className="sidebar">
            <ul>
                {customSteps.map(({ title, steps }, i) => {
                    return (
                        <li
                            className={`${steps.includes(step) && "active"}`}
                            key={i}
                        >
                            <div className="text-container">
                                <span className="step">Step {i + 1}</span>
                                <span className="head text-uppercase">
                                    {title}
                                </span>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <div className="bg-sidebar d-none d-md-block h-100">
                <img
                    src="./images/bg-sidebar-desktop.svg"
                    className="h-100"
                    alt=""
                />
            </div>
            <div className="d-md-none">
                <img
                    src="./images/bg-sidebar-mobile.svg"
                    className="w-100"
                    alt=""
                />
            </div>
        </nav>
    );
}
