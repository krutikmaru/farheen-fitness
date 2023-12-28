export const userTrackData = [
  {
    icon: "💧",
    title: "Water",
    color: "#6fc3ff",
    navigateUrl: "/goals/water",
    values: {
      isSet: true,
      targetLabel: "Goal",
      valueLabel: "Consumed",
      unit: "Liters",
      Daily: {
        target: 3,
        value: 1.36,
        progress: 40,
      },
      Monthly: {
        target: 90,
        value: 47,
        progress: 40,
      },
      Yearly: {
        target: 1080,
        value: 568,
        progress: 40,
      },
    },
  },
  {
    icon: "🔥",
    title: "Calories",
    color: "#ffb02e",
    navigateUrl: "/goals/calories",
    values: {
      isSet: true,
      targetLabel: "Goal",
      valueLabel: "Burnt",
      unit: "Cals",
      Daily: {
        target: 500,
        value: 376,
        progress: 75,
      },
      Monthly: {
        target: 15000,
        value: 11280,
        progress: 75,
      },
      Yearly: {
        target: 180000,
        value: 134000,
        progress: 75,
      },
    },
  },
  {
    icon: "💤",
    title: "Sleep",
    color: "#922eff",
    navigateUrl: "/goals/sleep",
    values: {
      isSet: true,
      targetLabel: "Goal",
      valueLabel: "Slept",
      unit: "Hours",
      Daily: {
        target: 7,
        value: 6.5,
        progress: 92,
      },
      Monthly: {
        target: 210,
        value: 195,
        progress: 75,
      },
      Yearly: {
        target: 2520,
        value: 2280,
        progress: 75,
      },
    },
  },
  {
    icon: "👣",
    title: "Steps",
    color: "#6fff81",
    navigateUrl: "/goals/steps",
    values: {
      isSet: false,
      targetLabel: "Goal",
      valueLabel: "Done",
      unit: "Steps",
      Daily: {
        target: 0,
        value: 0,
        progress: 0,
      },
      Monthly: {
        target: 0,
        value: 0,
        progress: 0,
      },
      Yearly: {
        target: 0,
        value: 0,
        progress: 0,
      },
    },
  },
];
