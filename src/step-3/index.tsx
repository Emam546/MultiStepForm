import { Link, useNavigate } from "react-router-dom";
import { Data, DispatchFunction, Ons, SetDataFunction, Urls } from "../custom";
import "./style.scss";
import { objectifyForm } from "../utils";
export default function Step3({
    dispatch,
    data,
    setData,
}: {
    dispatch: DispatchFunction;
    data: Data;
    setData: SetDataFunction;
}) {
    const navigate = useNavigate();
    const getForm: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const obj = objectifyForm(data);
        return dispatch(obj, navigate);
    };
    return (
        <div className="step-3">
            <h2 className="fw-bold text-secondary mt-4">Pick add-ons</h2>
            <p className="fw-light">
                Add-ons help enhance your gaming experience.
            </p>
            <form
                action="#"
                onSubmit={getForm}
                method="POST"
                className="choose-options"
            >
                <div className="inputs-holder">
                    {Object.entries(Ons).map(([name, val]) => {
                        const onChange = () => {
                            if (data.ons.includes(name)) {
                                setData({
                                    ...data,
                                    ons: data.ons.filter((val) => val != name),
                                });
                            } else {
                                setData({ ...data, ons: [...data.ons, name] });
                            }
                        };
                        return (
                            <div className="input-holder">
                                <input
                                    type="checkbox"
                                    name={name}
                                    checked={data.ons.includes(name)}
                                    onChange={onChange}
                                    onClick={onChange}
                                    id={name.split(" ").join("_")}
                                />
                                <label htmlFor={name}>
                                    <div className="check-input"></div>
                                    <div className="header">
                                        <h6 className="text-secondary fw-bold">
                                            {val.name}
                                        </h6>
                                        <span className="desc">{val.desc}</span>
                                    </div>
                                    <span className="price">
                                        +${val.price}/mo
                                    </span>
                                </label>
                            </div>
                        );
                    })}
                </div>
                <div className="submit-section">
                    <div className="d-flex flex-grow-1 justify-content-between align-items-center">
                        <Link to={`/${Urls[1]}`}>Go Back</Link>
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
