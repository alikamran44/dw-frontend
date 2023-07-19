import {
  MegamenuItem,
  NavItemType,
} from "components/Navigation/NavigationItem";
import ncNanoId from "utils/ncNanoId";
import __megamenu from "./jsons/__megamenu.json";
import baseApi from '../baseApi';



baseApi.Category.fetchCategories().then(
  (data) => {
    console.log('ho,mmenpag nav',data)
  }
)
const megaMenuDemo: MegamenuItem[] = [
  
  {
    id: ncNanoId(),
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y291bnRyeXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
    title: "Country",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.Country,
    })),
  },
];

const megaMenu3ItemDemo: MegamenuItem[] = [
  {
    id: ncNanoId(),
    image:
      "http://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29ycG9yYXRlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
    title: "Corporate",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.Corporate,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
    title: "Car Model",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.CarModel,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmV0YWlsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
    title: "Department",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.Department,
    })),
  },
];

const demoChildMenus: NavItemType[] = [
 
  {
    id: ncNanoId(),
    href: "/blogs",
    name: "All",
  },
  {
    id: ncNanoId(),
    href: "/blogs-audio",
    name: "Audio",
  },
  {
    id: ncNanoId(),
    href: "/blogs-gallery",
    name: "Gallery ",
  },
  {
    id: ncNanoId(),
    href: "/blogs-video",
    name: "Videos",
    // isNew: true,
    // type: "dropdown",
    // children: [
    //   {
    //     id: ncNanoId(),
    //     href: "/",
    //     name: "Header - 1",
    //   },
    //   {
    //     id: ncNanoId(),
    //     href: "/home-header-style2",
    //     name: "Header - 2",
    //     isNew: true,
    //   },
    //   {
    //     id: ncNanoId(),
    //     href: "/home-header-style2-logedin",
    //     name: "Header - Logedin",
    //     isNew: true,
    //   },
    // ],
  },
];

export const NAVIGATION_DEMO: NavItemType[] = [
   {
    id: ncNanoId(),
    href: "/",
    name: "Home",
    type: "dropdown",
    children: demoChildMenus,
  },
  {
    id: ncNanoId(),
    href: "#",
    name: "Categories",
    type: "megaMenu",
    megaMenu: megaMenuDemo,
  },
];

export const NAVIGATION_SHORT_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home",
    type: "dropdown",
    children: demoChildMenus,
  },
  {
    id: ncNanoId(),
    href: "#",
    name: "Categories",
    type: "megaMenu",
    megaMenu: megaMenu3ItemDemo,
  },
  {
    id: ncNanoId(),
    href: "/about",
    name: "About Us",
  },
];
