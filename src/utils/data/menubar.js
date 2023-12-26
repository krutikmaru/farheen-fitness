import {
  faBolt,
  faBullseye,
  faCalendarDays,
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
    },
    {
      title: "Goals",
      icon: faBullseye,
      id: "24d707543a344bbda65e8157524b2f1b",
    },
    {
      title: "Calendar",
      icon: faCalendarDays,
      id: "36766216e95548eb9c4ef41bd9f8534c ",
    },
    {
      title: "Workouts",
      icon: faBolt,
      id: "5fa9138bbfeb44a8a1f8287825247db0",
    },
  ],
  account: [
    {
      title: "Account",
      icon: faUser,
      id: "3cbd85224a4c490e91ac180c4e3e0db5",
    },
    {
      title: "Logout",
      icon: faRightFromBracket,
      id: "8bdb442289454cf1987e932cd6a866f8",
    },
  ],
};
