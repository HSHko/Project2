import HomeIcon from "@material-ui/icons/Home";
import BookIcon from "@material-ui/icons/Book";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import LockOpenIcon from "@material-ui/icons/LockOpen";

interface Props {
  name: string;
  event: "link" | "event";
  link: string;
  label?: string;
  icon?: any;
}

const initialState: Props = {
  name: "",
  event: "link",
  link: "/",
};

const common: Props[] = [
  {
    ...initialState,
    name: "Test",
    link: "/test",
    icon: <HomeIcon />,
  },
  {
    ...initialState,
    name: "Home",
    link: "/",
    icon: <HomeIcon />,
  },
  {
    ...initialState,
    name: "Blog",
    link: "/blog",
    icon: <BookIcon />,
  },
  {
    ...initialState,
    name: "DashBoard",
    link: "/gallery/list",
    icon: <HowToRegIcon />,
  },
];

const authenticated: Props[] = [
  {
    ...initialState,
    name: "Logout",
    event: "event",
    label: "logout",
    icon: <HomeIcon />,
  },
];

const unAuthenticated: Props[] = [
  {
    ...initialState,
    name: "Login",
    link: "/join/signin",
    icon: <LockOpenIcon />,
  },
  {
    ...initialState,
    name: "SignUp",
    event: "link",
    link: "/join/signup",
    icon: <LockOpenIcon />,
  },
];

export default {
  common,
  authenticated,
  unAuthenticated,
};
