import Logo from "components/Logo/Logo";
import SocialsList1 from "components/SocialsList1/SocialsList1";
import SocialsList from "components/SocialsList/SocialsList";
import { CustomLink } from "data/types";
import React from "react";
import { Link, LinkProps } from "react-router-dom";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: " ",
    menus: [
      { href: "/privacy-policy", label: "Privacy Policy" },
    ],
  },
  {
    id: "1",
    title: "",
    menus: [
      { href: "/terms-and-condition", label: "Terms and Condition" },
    ],
  },
  {
    id: "2",
    title: "",
    menus: [
      { href: "/cookies", label: "Cookies" },
    ],
  },
  {
    id: "4",
    title: "",
    menus: [
      { href: "/contact", label: "Contact Us" },
    ],
  },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <Link
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                to={item.href || '/#'}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  const currentYear = new Date().getFullYear();
  return (
    <div className="nc-Footer relative py-12 lg:py-12 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
        {/*<div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
          <div className="col-span-2 md:col-span-1">
            <Logo />
          </div>
        </div>*/}
        {widgetMenus.map(renderWidgetMenuItem)}
        <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
           <SocialsList className="mt-2" />
        </div>
      </div>
      <div className="text-center mt-12">
        <span className="text-xs text-neutral-500 dark:text-neutral-100">
          Copyright © {currentYear}. Daily World Network. All Rights Reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
