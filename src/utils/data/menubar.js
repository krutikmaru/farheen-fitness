import {
  faBolt,
  faBullseye,
  faCalendarDays,
  faCarrot,
  faHome,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const menubar = {
  forYou: [
    {
      title: "Home",
      icon: faHome,
      id: "5225da39369d45d7bc3c05fd03f61b69",
      navigate: "/",
    },
    {
      title: "Goals",
      icon: faBullseye,
      id: "24d707543a344bbda65e8157524b2f1b",
      navigate: "/goals",
    },
    {
      title: "Calendar",
      icon: faCalendarDays,
      id: "36766216e95548eb9c4ef41bd9f8534c ",
      navigate: "/calendar",
    },
    {
      title: "Workouts",
      icon: faBolt,
      id: "5fa9138bbfeb44a8a1f8287825247db0",
      navigate: "/workouts",
    },
    {
      title: "Diets",
      icon: faCarrot,
      id: "cf75b6446a444111acb071259e93cf47",
      navigate: "/diet",
    },
  ],
  account: [
    {
      title: "Account",
      icon: faUser,
      id: "3cbd85224a4c490e91ac180c4e3e0db5",
      navigate: "/account",
    },
    {
      title: "Logout",
      icon: faRightFromBracket,
      id: "8bdb442289454cf1987e932cd6a866f8",
      type: "logout",
      navigate: "/",
    },
  ],
};
