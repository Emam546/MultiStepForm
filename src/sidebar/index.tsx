import "./style.scss";
export function SideBar({
    state,
    stepNames,
}: {
    state: number;
    stepNames: string[];
}) {
    return (
        <nav className="sidebar">
            <ul>
                {stepNames.map((name, i) => {
                    return (
                        <li className={`${state == i && "active"}`} key={i}>
                            <div className="text-container">
                                <span className="step">Step {i + 1}</span>
                                <span className="head text-uppercase">
                                    {name}
                                </span>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <div className="bg-sidebar d-none d-md-block h-100">
                <img src="./images/bg-sidebar-desktop.svg" className="h-100" alt="" />
            </div>
            <div className="d-md-none">
                <img src="./images/bg-sidebar-mobile.svg" className="w-100" alt="" />
            </div>
        </nav>
    );
}
