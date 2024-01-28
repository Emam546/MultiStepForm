import { Ons, OnsType } from "../custom";
import "./style.scss";
import {
    Data,
    DataType,
    State,
    useAppDispatch,
    useAppSelector,
} from "../store";
import { useForm } from "react-hook-form";
export default function OnesForm() {
    const defaultValue = useAppSelector((state) => {
        return state[Data.name].ones;
    });
    const { register, handleSubmit } = useForm<DataType["ones"]>({
        defaultValues: defaultValue,
    });
    const dispatch = useAppDispatch();
    return (
        <div className="step-3">
            <h2 className="fw-bold text-secondary mt-4">Pick add-ons</h2>
            <p className="fw-light">
                Add-ons help enhance your gaming experience.
            </p>
            <form
                action="#"
                onSubmit={handleSubmit((data) => {
                    dispatch(
                        Data.actions.setData({
                            name: "ones",
                            data,
                        })
                    );
                    dispatch(State.actions.Next());
                })}
                method="POST"
                className="choose-options"
            >
                <div className="inputs-holder">
                    {Object.entries(Ons).map(([name, val]) => {
                        return (
                            <div
                                key={name}
                                className="input-holder"
                            >
                                <input
                                    type="checkbox"
                                    {...register(name as keyof OnsType)}
                                    id={name.split(" ").join("_")}
                                />
                                <label htmlFor={name.split(" ").join("_")}>
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
