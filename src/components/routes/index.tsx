import { Image } from "components";
import {
  Home,
  Favorites,
  Trending,
  Coming,
  Community,
  Social,
  Settings,
  Logout,
} from "components";

export const ROUTES = {
  HOME: {
    icon: <Image.IconHome />,
    text: "Home",
    path: "/home",
    element: <Home />,
  },
  FAVORITES: {
    icon: <Image.IconFavorites />,
    text: "Favorites",
    path: "/favorites",
    element: <Favorites />,
  },
  TRENDING: {
    icon: <Image.IconTrending />,
    text: "Trending",
    path: "/trending",
    element: <Trending />,
  },
  SOON: {
    icon: <Image.IconSoon />,
    text: "Coming Soon",
    path: "/coming",
    element: <Coming />,
  },
  COMMUNITY: {
    icon: <Image.IconCommunity />,
    text: "Community",
    path: "/community",
    element: <Community />,
  },
  SOCIAL: {
    icon: <Image.IconSocial />,
    text: "Social",
    path: "/social",
    element: <Social />,
  },
  SETTINGS: {
    icon: <Image.IconSettings />,
    text: "Settings",
    path: "/settings",
    element: <Settings />,
  },
  LOGOUT: {
    icon: <Image.IconLogout />,
    text: "Logout",
    path: "/logout",
    element: <Logout />,
  },
};
