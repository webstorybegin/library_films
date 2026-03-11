import { Image } from "components";

export const ROUTES = {
  HOME: {
    icon: <Image.IconHome />,
    text: "Home",
    path: "/home",
  },
  SEARCH: {
    text: "Search",
    path: "/search",
  },
  FAVORITES: {
    icon: <Image.IconFavorites />,
    text: "Favorites",
    path: "/favorites",
  },
  TRENDING: {
    icon: <Image.IconTrending />,
    text: "Trending",
    path: "/trending",
  },
  SOON: {
    icon: <Image.IconSoon />,
    text: "Coming Soon",
    path: "/coming",
  },
  COMMUNITY: {
    icon: <Image.IconCommunity />,
    text: "Community",
    path: "/community",
  },
  SOCIAL: {
    icon: <Image.IconSocial />,
    text: "Social",
    path: "/social",
  },
  SETTINGS: {
    icon: <Image.IconSettings />,
    text: "Settings",
    path: "/settings",
  },
  LOGOUT: {
    icon: <Image.IconLogout />,
    text: "Logout",
    path: "/logout",
  },
  LOGIN: {
    text: "Sign In",
    path: "/login",
  },
  ACCOUNT: {
    text: "Account",
    path: "/account",
  },
};
