import React, { ReactNode } from "react";
import "./style.scss";
import { Plans } from "../custom";
import { useForm } from "react-hook-form";
import { Data, DataType, State, useAppSelector } from "../store";
import { useDispatch } from "react-redux";
export const BackUpRadio = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement>
>(({ children, ...a }, ref) => {
    const id = Math.floor(Math.random() * Date.now()).toString();
    return (
        <div className="radio-container">
            <input
                type="radio"
                {...a}
                id={id}
                ref={ref}
            />
            <label htmlFor={id}>{children}</label>
        </div>
    );
});

export default function PlanForm() {
    const dispatch = useDispatch();
    const data = useAppSelector((state) => state.data.planData);
    const { register, formState, watch, handleSubmit } = useForm<
        DataType["planData"]
    >({ defaultValues: data });
    const monthlyState = watch("monthly-state");
    return (
        <div className="step-2">
            <h2 className="fw-bold text-secondary mt-4">Select your plan</h2>
            <p className="fw-light">
                You have the option of monthly or yearly billing.
            </p>
            <form
                action="#"
                method="post"
                onSubmit={handleSubmit((data) => {
                    console.log(data);
                    dispatch(Data.actions.setData({ name: "planData", data }));
                    dispatch(State.actions.Next());
                })}
            >
                {formState.errors["plan-type"] && (
                    <span className="text-danger d-block mb-2 text-center">
                        {formState.errors["plan-type"].message}
                    </span>
                )}

                <div
                    className={`plan-radio-container ${
                        monthlyState && "month"
                    }`}
                >
                    {Plans.map((plan, i) => {
                        return (
                            <BackUpRadio
                                {...register("plan-type", {
                                    required: "select an option first",
                                })}
                                value={i.toString()}
                                key={i}
                                id={`plan-${i}`}
                            >
                                <img
                                    src={plan.img}
                                    alt={`${plan.name} img`}
                                />
                                <h5 className="text-secondary fw-medium m-0">
                                    {plan.name}
                                </h5>
                                <span className="price month">
                                    ${plan.monthly.price}/mo
                                </span>
                                <span className="offer month">
                                    {plan.monthly.desc}
                                </span>
                                <span className="price year">
                                    ${plan.yearly.price}/mo
                                </span>
                                <span className="offer year">
                                    {plan.yearly.desc}
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
                        {...register("monthly-state")}
                    />
                    <span id="month">Monthly</span>
                    <div className="plan-frequent">
                        <label htmlFor="flexSwitch"></label>
                    </div>
                    <span id="year">Yearly</span>
                </div>
                <div className="submit-section">
                    <div className="d-flex flex-grow-1 justify-content-between align-items-center">
                        <button
                            className="btn-link"
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(State.actions.Back());
                            }}
                        >
                            Go Back
                        </button>
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
