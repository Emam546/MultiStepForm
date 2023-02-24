import { useState } from "react";
import "./style.scss";
import { Navigate, useNavigate } from "react-router-dom";
import { DispatchFunction } from "../custom";
function objectifyForm(formArray: FormData) {
    //serialize data function
    var returnArray: Record<string, FormDataEntryValue> = {};
    [...formArray.entries()].forEach(([name, value], i) => {
        returnArray[name] = value;
    });
    return returnArray;
}

const Rules = {
    name: "required",
    email: "required|email",
    phone: "required",
};
type ErrorType = {
    name?: string;
    email?: string;
    phone?: string;
};
export default function Step1({ dispatch }: { dispatch: DispatchFunction }) {
    const [errors, setErrors] = useState<ErrorType>({});
    const navigate=useNavigate();
    const getForm: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const obj = objectifyForm(data);
        const res: ErrorType = {};
        
        if (obj["name"] && typeof obj["name"] == "string") {
            if (obj["name"].length > 4 && obj["name"].length < 20)
                res["name"] = "the field is must be between 4 and 20 letters";
        } else res["name"] = "the field is required";
        if (!obj["email"]) res["email"] = "the field is required";
        if (!obj["phone"]) res["phone"] = "the field is required";

        setErrors(res);
        if (!Object.keys(res).length) dispatch({ ...obj },navigate);
    };
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
                    onSubmit={getForm}
                >
                    <div className="input-container">
                        <div className="text-container">
                            <label htmlFor="#name" className="text-secondary">
                                Name
                            </label>
                            <span className="error">{errors.name}</span>
                        </div>
                        <input
                            type="text"
                            name="name"
                            className={`${errors.name && "error"}`}
                            id="name"
                            placeholder="e.g. Stephen King"
                        />
                    </div>
                    <div className="input-container">
                        <div className="text-container">
                            <label htmlFor="#email" className="text-secondary">
                                Email Address
                            </label>
                            <span className="error">{errors.email}</span>
                        </div>
                        <input
                            type="text"
                            name="email"
                            className={`${errors.email && "error"}`}
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
                            <span className="error">{errors.phone}</span>
                        </div>
                        <input
                            type="tel"
                            name="phone"
                            className={`${errors.phone && "error"}`}
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
