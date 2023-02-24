import "./App.scss";
import { SideBar } from "./sidebar";
import { useState } from "react";

import Step1 from "./step-1";
import Step2 from "./step-2";
import {
    BrowserRouter,
    Route,
    Routes,
    Outlet,
    useLocation,
    Navigate,
} from "react-router-dom";
import { Steps, Urls, Data } from "./custom";
import Step3 from "./step-3";
import Step4 from "./step-4";
import Finish from "./finish";

function SharedLayout({ step }: { step: number }) {
    const location = useLocation();
    const name = location.pathname.slice(1);
    const curStep = Urls.findIndex((val) => {
        return name == val;
    });
    if (curStep > step)
        return <Navigate to={`/${Urls[step]}`} />;
    return (
        <div className="big-container">
            <SideBar state={curStep!=-1?curStep:Urls.length-1} stepNames={Steps} />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
const defaultData:Data={ons:[],"monthly-state":false}
export default function App() {
    const [step, setStep] = useState(0);
    const [data, setData] = useState<Data>(defaultData);
    return (
        <BrowserRouter basename="/MultiStepForm/">
            <Routes>
                <Route path="/" element={<SharedLayout step={step} />}>
                    <Route
                        path={Urls[0]}
                        element={
                            <Step1
                                dispatch={(newData, navigate) => {
                                    setData({ ...data,...newData });
                                    setStep(1);
                                    navigate(`/${Urls[1]}`);
                                }}
                            />
                        }
                    />
                    <Route
                        path={Urls[1]}
                        element={
                            <Step2
                                data={data}
                                setData={setData}
                                dispatch={(newData, navigate) => {
                                    setData({ ...data, ...newData });
                                    setStep(2);
                                    navigate(`/${Urls[2]}`);
                                }}
                            />
                        }
                    />
                    <Route
                        path={Urls[2]}
                        element={
                            <Step3
                                data={data}
                                setData={setData}
                                dispatch={(newData, navigate) => {
                                    setData({ ...data, ...newData });
                                    setStep(3);
                                    navigate(`/${Urls[3]}`);
                                }}
                            />
                        }
                    />
                    <Route
                        path={Urls[3]}
                        element={
                            <Step4
                                data={data}
                                dispatch={(newData, navigate) => {
                                    setData(defaultData);
                                    setStep(0)
                                    navigate("/finish")
                                }}
                            />
                        }
                    />
                    <Route path="/finish" element={<Finish />}/>
                    <Route path="*" element={<>
                        <Navigate to="/"/>
                    </>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
