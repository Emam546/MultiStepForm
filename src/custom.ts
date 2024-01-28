export const Steps = {
    info: {
        num: 0,
        url: "",
        title: "Your info"
    },
    plan: {
        title: "Select plan",
        num: 1,
        url: "select-plan"
    },
    "Add-ons": {
        title: "Select plan",
        num: 2,
        url: "add-ons"
    },
    summery: {
        title: "Summary",
        num: 3,
        url: "summary",
    },
    finish: {
        num: 4,
        url: "finish"
    },
};
export const sortedSteps = Object.values(Steps).sort((a, b) => a.num - b.num);
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

export const Ons = {
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

export type OnsType = typeof Ons;
