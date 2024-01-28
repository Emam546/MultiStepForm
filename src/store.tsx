import { configureStore, createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { OnsType, Plans, sortedSteps } from "./custom";

export interface DataType {
    info: {
        name: string;
        email: string;
        phone: string;
    };
    planData: {
        "plan-type": "0" | "1" | "2";
        "monthly-state": boolean;
    };
    ones: Record<keyof OnsType, boolean>;
}
export const Data = createSlice({
    initialState: {} as DataType,
    name: "data",
    reducers: {
        setData<T extends keyof DataType>(
            state: any,
            action: {
                payload: {
                    name: T;
                    data: DataType[T];
                };
            }
        ) {
            state[action.payload.name] = action.payload.data;
        },
    },
});
export const State = createSlice({
    initialState: {
        step: 0,
    },
    name: "state",
    reducers: {
        setStep(state, action: { payload: number }) {
            state.step = action.payload;
        },
        Next(state) {
            const i = sortedSteps.findIndex((val) => val.num == state.step);
            if (i == -1) throw new Error("undefined");
            if (i + 1 == sortedSteps.length)
                throw new Error("You passed the limit");
            state.step = sortedSteps[i + 1].num;
        },
        Back(state) {
            const i = sortedSteps.findIndex((val) => val.num == state.step);
            if (i == -1) throw new Error("undefined");
            if (i - 1 == -1) throw new Error("You passed the limit");

            state.step = sortedSteps[i - 1].num;
        },
    },
});
export const store = configureStore({
    reducer: {
        [Data.name]: Data.reducer,
        [State.name]: State.reducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
