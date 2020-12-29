import HomeIcon from "@material-ui/icons/Home";
import BookIcon from "@material-ui/icons/Book";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import LockOpenIcon from "@material-ui/icons/LockOpen";

interface Props {
  name: string;
  link?: string;
  event?: string;
  linkHelper?: string;
  label?: string;
  icon?: any;
}

const initialState: Props = {
  name: "",
};

const common: Props[] = [
  {
    ...initialState,
    name: "Test",
    link: "/test",
    linkHelper: "/test",
    icon: <HomeIcon />,
  },
  {
    ...initialState,
    name: "Home",
    link: "/home",
    linkHelper: "/home",
    icon: <HomeIcon />,
  },
  {
    ...initialState,
    name: "Blog",
    link: "/blog",
    linkHelper: "/blog",
    icon: <BookIcon />,
  },
  {
    ...initialState,
    name: "DashBoard",
    link: "/gallery/list?page=1",
    linkHelper: "/gallery",
    icon: <HowToRegIcon />,
  },
];

const authenticated: Props[] = [
  {
    ...initialState,
    name: "Logout",
    event: "logout",
    icon: <HomeIcon />,
  },
];

const unAuthenticated: Props[] = [
  {
    ...initialState,
    name: "Login",
    link: "/join/signin",
    linkHelper: "/join/signin",
    icon: <LockOpenIcon />,
  },
  {
    ...initialState,
    name: "SignUp",
    link: "/join/signup",
    linkHelper: "/join/signup",
    icon: <LockOpenIcon />,
  },
];

export default {
  common,
  authenticated,
  unAuthenticated,
};
