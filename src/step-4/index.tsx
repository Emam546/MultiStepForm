import { Link } from "react-router-dom";
import { Plans, Ons, OnsType, Steps } from "../custom";
import "./style.scss";
import { Data, State, useAppDispatch, useAppSelector } from "../store";
export default function Summury() {
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state[Data.name]);
    const plan = Plans[parseInt(data.planData["plan-type"])];
    if (!plan) return null;

    let price =
        plan[data.planData["monthly-state"] ? "monthly" : "yearly"].price;
    console.log(data.ones);
    const selectedPlans: Array<keyof OnsType> = Object.entries(data.ones)
        .filter(([, val]) => val)
        .reduce((acc, [name]) => {
            return [...acc, name as keyof OnsType];
        }, [] as Array<keyof OnsType>);
    return (
        <div className="step-4 d-flex flex-column">
            <h2 className="fw-bold text-secondary mt-4">Select your plan</h2>
            <p className="fw-light">
                You have the option of monthly or yearly billing.
            </p>
            <div className="input-container">
                <div className="price-state">
                    <div className="plan-type d-flex justify-content-between align-items-center">
                        <p className="text-secondary fw-bold m-0 fs-6">
                            {plan.name} (
                            {data.planData["monthly-state"]
                                ? "Monthly"
                                : "Yearly"}
                            )
                            <button
                                onClick={() => {
                                    dispatch(
                                        State.actions.setStep(Steps["plan"].num)
                                    );
                                }}
                                className="d-block text-gray btn-link"
                            >
                                Change
                            </button>
                        </p>
                        <span className="text-secondary fw-bold fs-6">
                            ${price}/
                            {[data.planData["monthly-state"] ? "mo" : "yr"]}
                        </span>
                    </div>
                    {selectedPlans.map((name) => {
                        const add = Ons[name as keyof OnsType];
                        price +=
                            add.price *
                            (data.planData["monthly-state"] ? 1 : 12);

                        return (
                            <div className="ons-plan d-flex justify-content-between align-items-center mt-2 mb-2">
                                <span className="text-gray">{add.name}</span>
                                <span className="text-secondary fw-medium">
                                    +${add.price}/
                                    {[
                                        data.planData["monthly-state"]
                                            ? "mo"
                                            : "yr",
                                    ]}
                                </span>
                            </div>
                        );
                    })}
                </div>
                <div className="total-price d-flex justify-content-between align-items-center">
                    <span className="text-gray">
                        Total (per{" "}
                        {data.planData["monthly-state"] ? "month" : "year"})
                    </span>
                    <span className="text-primary fw-bold fs-5">
                        +${price}/
                        {[data.planData["monthly-state"] ? "mo" : "yr"]}
                    </span>
                </div>
            </div>
            <div className="submit-section">
                <div className="d-flex flex-grow-1 justify-content-between align-items-center">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(State.actions.Back());
                        }}
                        className="btn-link"
                    >
                        Go Back
                    </button>
                    <input
                        type="button"
                        onClick={() => {
                            dispatch(State.actions.Next());
                        }}
                        className="btn btn-primary p-2 ps-3 pe-3"
                        value="Confirm"
                    />
                </div>
            </div>
        </div>
    );
}
