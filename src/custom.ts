import { NavigateFunction } from "react-router-dom";

export const Steps = ["Your info", "Select plan", "Add-ons", "Summary"];
export const Urls = ["", "select-plan", "add-ons", "summary"];
export type Data = {
    name?: string;
    email?: string;
    phone?: string;
    "plan-type"?: number;
    "monthly-state"?: boolean;
    ons: Array<string>;
};
export type SetDataFunction = React.Dispatch<React.SetStateAction<Data>>;
export type DispatchFunction = (
    data: Partial<Data>,
    navigate: NavigateFunction
) => void;
export type PlansType = {
    name: string;
    img: string;
    monthly: {
        price: number;
        desc?: string;
    };
    yearly: {
        price: number;
        desc?: string;
    };
}[];
export const Plans: PlansType = [
    {
        name: "Arcade",
        img: "./images/icon-arcade.svg",
        monthly: {
            price: 9,
        },
        yearly: {
            price: 90,
            desc: "2 months free",
        },
    },
    {
        name: "Advanced",
        img: "./images/icon-advanced.svg",

        monthly: {
            price: 12,
        },
        yearly: {
            price: 120,
            desc: "2 months free",
        },
    },
    {
        name: "Pro",
        img: "./images/icon-pro.svg",

        monthly: {
            price: 15,
        },
        yearly: {
            price: 150,
            desc: "2 months free",
        },
    },
];

export type OnsType = Record<
    string,
    {
        name: string;
        desc: string;
        price: number;
    }
>;
export const Ons: OnsType = {
    "onlineSrv-add": {
        name: "Online service",
        desc: "Access to multiplayer games",
        price: 1,
    },
    "storage-add": {
        name: "Larger storage",
        desc: "Extra 1TB of cloud save",
        price: 2,
    },
    "profile-add": {
        name: "Customizable Profile",
        desc: "Custom theme on your profile",
        price: 2,
    },
};
