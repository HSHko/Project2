import HomeIcon from "@material-ui/icons/Home";
import BookIcon from "@material-ui/icons/Book";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import LockOpenIcon from "@material-ui/icons/LockOpen";

interface Props {
  name: string;
  aim: "link";
  qualification: "none" | "unAuthenticated" | "authenticted";
  link: string;
  icon?: any;
}

const initialState: Props = {
  name: "",
  aim: "link",
  link: "/",
  qualification: "none",
};

const menuItems: Props[] = [
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
    link: "/gallery",
    icon: <HowToRegIcon />,
  },
  {
    ...initialState,
    name: "Login",
    link: "/join/signin",
    qualification: "unAuthenticated",
    icon: <LockOpenIcon />,
  },
  {
    ...initialState,
    name: "SignUp",
    aim: "link",
    qualification: "unAuthenticated",
    link: "/join/signup",
    icon: <LockOpenIcon />,
  },
];

export default menuItems;
