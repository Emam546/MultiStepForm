import "./App.scss";
import { SideBar } from "./sidebar";
import { useEffect, useLayoutEffect } from "react";
import {
    BrowserRouter,
    Route,
    Outlet,
    Navigate,
    Routes,
    useNavigate,
} from "react-router-dom";
import { Steps, sortedSteps } from "./custom";
export const base = "/MultiStepForm/";

import { State, store, useAppSelector } from "./store";
import { Provider } from "react-redux";
import InfoForm from "./step-1";
import Summury from "./step-4";
import OnesForm from "./step-3";
import PlanForm from "./step-2";
import Finish from "./finish";

function SharedLayout() {
    const step = useAppSelector((state) => state[State.name].step);
    const navigate = useNavigate();
    useEffect(() => {
        const url = sortedSteps.find((val) => val.num == step)?.url;
        if (url == undefined) throw new Error("unrecognized step");
        navigate(`/${url}`);
    }, [step]);
    
    return (
        <div className="big-container">
            <SideBar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter basename={base}>
                <Routes>
                    <Route
                        path="/"
                        element={<SharedLayout />}
                    >
                        <Route
                            path={`/${Steps["info"].url}`}
                            element={<InfoForm />}
                        />
                        <Route
                            path={`/${Steps["plan"].url}`}
                            element={<PlanForm />}
                        />
                        <Route
                            path={`/${Steps["summery"].url}`}
                            element={<Summury />}
                        />
                        <Route
                            path={`/${Steps["Add-ons"].url}`}
                            element={<OnesForm />}
                        />
                        <Route
                            path={`/${Steps["finish"].url}`}
                            element={<Finish />}
                        />

                        <Route
                            path="*"
                            element={
                                <>
                                    <Navigate to="/" />
                                </>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}
