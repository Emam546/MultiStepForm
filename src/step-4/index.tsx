import { Link, useNavigate } from "react-router-dom";
import { Data, DispatchFunction, Plans, Urls, Ons } from "../custom";
import "./style.scss";
export default function Step4({
    dispatch,
    data,
}: {
    dispatch: DispatchFunction;
    data: Data;
}) {
    const navigate = useNavigate();
    const plan = Plans[data["plan-type"] || 0];
    let price = plan[data["monthly-state"] ? "monthly" : "yearly"].price;
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
                            {data["monthly-state"] ? "Monthly" : "Yearly"})
                            <Link
                                to={`/${Urls[1]}`}
                                className="d-block text-gray"
                            >
                                Change
                            </Link>
                        </p>
                        <span className="text-secondary fw-bold fs-6">
                            ${price}/{[data["monthly-state"] ? "mo" : "yr"]}
                        </span>
                    </div>
                    {data.ons.length!=0 && <hr className="text-gray" />}
                    {data.ons.map((i) => {
                        const add = Ons[i];
                        price += add.price * (data["monthly-state"] ? 1 : 12);
                        return (
                            <div className="ons-plan d-flex justify-content-between align-items-center mt-2 mb-2">
                                <span className="text-gray">{add.name}</span>
                                <span className="text-secondary fw-medium">
                                    +${add.price}/{[data["monthly-state"] ? "mo" : "yr"]}
                                </span>
                            </div>
                        );
                    })}
                </div>
                <div className="total-price d-flex justify-content-between align-items-center">
                    <span className="text-gray">
                        Total (per {data["monthly-state"] ? "month" : "year"})
                    </span>
                    <span className="text-primary fw-bold fs-5">
                        +${price}/{[data["monthly-state"] ? "mo" : "yr"]}
                    </span>
                </div>
            </div>
            <div className="submit-section">
                <div className="d-flex flex-grow-1 justify-content-between align-items-center">
                    <Link to={`/${Urls[2]}`}>Go Back</Link>
                    <input
                        type="button"
                        className="btn btn-primary p-2 ps-3 pe-3"
                        value="Confirm"
                        onClick={() => {
                            return dispatch(data, navigate);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
