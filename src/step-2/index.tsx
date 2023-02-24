import { ReactNode, useState } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import {
    DispatchFunction,
    Urls,
    Plans,
    SetDataFunction,
    Data,
} from "../custom";
import { objectifyForm } from "../utils";
export function BackUpRadio({
    children,
    ...a
}: { children?: ReactNode } & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>) {
    const id = Math.floor(Math.random() * Date.now()).toString();
    return (
        <div className="radio-container">
            <input type="radio" {...a} id={id} />
            <label htmlFor={id}>{children}</label>
        </div>
    );
}

export default function Step2({
    dispatch,
    data,
    setData,
}: {
    dispatch: DispatchFunction;
    data: Data;
    setData: SetDataFunction;
}) {
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const getForm: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const obj = objectifyForm(data);
        if (obj["plan-type"] != undefined) return dispatch(obj, navigate);
        else setError(true);
    };
    const setMonthlyState = () =>
        setData({ ...data, "monthly-state": !data["monthly-state"] });
    return (
        <div className="step-2">
            <h2 className="fw-bold text-secondary mt-4">Select your plan</h2>
            <p className="fw-light">
                You have the option of monthly or yearly billing.
            </p>
            <form action="#" method="post" onSubmit={getForm}>
                {error && (
                    <span className="text-danger fs-5 d-block mb-2 text-center">
                        select an option first
                    </span>
                )}

                <div
                    className={`plan-radio-container ${
                        !data["monthly-state"] && "month"
                    }`}
                >
                    {Plans.map((plan, i) => {
                        const change = () =>
                            setData({ ...data, "plan-type": i });
                        return (
                            <BackUpRadio
                                name="plan-type"
                                value={i}
                                key={i}
                                checked={data["plan-type"] == i}
                                onClick={change}
                                onChange={change}
                            >
                                <img src={plan.img} alt="" />
                                <h5 className="text-secondary fw-medium m-0">
                                    {plan.name}
                                </h5>
                                <span className="price month">
                                    ${plan.monthly.price}/mo
                                </span>
                                <span className="offer month">
                                    ${plan.monthly.desc}
                                </span>
                                <span className="price year">
                                    ${plan.yearly.price}/mo
                                </span>
                                <span className="offer year">
                                    ${plan.yearly.desc}
                                </span>
                            </BackUpRadio>
                        );
                    })}
                </div>
                <div className="choose-type">
                    <input
                        className="check-monthly"
                        type="checkbox"
                        id="flexSwitch"
                        name="monthly-state"
                        checked={data["monthly-state"]}
                        onClick={setMonthlyState}
                        onChange={setMonthlyState}
                    />
                    <span id="month">Monthly</span>
                    <div className="plan-frequent">
                        <label htmlFor="flexSwitch"></label>
                    </div>
                    <span id="year">Yearly</span>
                </div>
                <div className="submit-section">
                    <div className="d-flex flex-grow-1 justify-content-between align-items-center">
                        <Link to={`/${Urls[0]}`}>Go Back</Link>
                        <input
                            type="submit"
                            className="btn btn-secondary p-2 ps-3 pe-3"
                            value="Next Step"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
