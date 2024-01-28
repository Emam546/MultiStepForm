import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { Data, State, useAppDispatch, useAppSelector } from "../store";

interface FormData {
    name: string;
    email: string;
    phone: string;
}
export default function InfoForm() {
    const data = useAppSelector((state) => state.data.info);
    const { formState, register, handleSubmit } = useForm<FormData>({
        defaultValues: data,
    });
    const dispatch = useAppDispatch();
    return (
        <div className="step-1">
            <h2 className="fw-bold text-secondary mt-4">Personal info</h2>
            <p className="fw-light">
                Please provide your name, email address, and phone number.
            </p>
            <form
                action="#"
                method="post"
                className="mt-4"
                autoComplete="off"
                onSubmit={handleSubmit((data) => {
                    dispatch(Data.actions.setData({ name: "info", data }));
                    dispatch(State.actions.Next());
                })}
            >
                <div className="input-container">
                    <div className="text-container">
                        <label
                            htmlFor="#name"
                            className="text-secondary"
                        >
                            Name
                        </label>
                        <span className="error">
                            {formState.errors.name?.message}
                        </span>
                    </div>
                    <input
                        type="text"
                        {...register("name", {
                            required: "the field is required",
                            minLength: {
                                value: 4,
                                message:
                                    "the field is must be between 4 and 20 letter",
                            },
                            maxLength: {
                                value: 20,
                                message:
                                    "the field is must be between 4 and 20 letter",
                            },
                        })}
                        className={classNames({ error: formState.errors.name })}
                        id="name"
                        placeholder="e.g. Stephen King"
                    />
                </div>
                <div className="input-container">
                    <div className="text-container">
                        <label
                            htmlFor="#email"
                            className="text-secondary"
                        >
                            Email Address
                        </label>
                        <span className="error">
                            {formState.errors.email?.message}
                        </span>
                    </div>
                    <input
                        type="text"
                        className={classNames({
                            error: formState.errors.email,
                        })}
                        {...register("email", {
                            required: "the field is required",
                        })}
                        id="email"
                        placeholder="e.g. stephenking@lorem.com"
                    />
                </div>
                <div className="input-container">
                    <div className="text-container">
                        <label
                            htmlFor="#phoneNumber"
                            className="text-secondary"
                        >
                            Phone number
                        </label>
                        <span className="error">
                            {formState.errors.phone?.message}
                        </span>
                    </div>
                    <input
                        type="tel"
                        className={classNames({
                            error: formState.errors.phone,
                        })}
                        {...register("phone", {
                            required: "the field is required",
                        })}
                        id="email"
                        placeholder="e.g. +1 124 567 890"
                    />
                </div>
                <div className="submit-section">
                    <input
                        type="submit"
                        value="Next Step"
                        className="btn btn-secondary d-flex ms-auto p-2 ps-3 pe-3"
                    />
                </div>
            </form>
        </div>
    );
}
