import React, { ReactNode } from "react";
import {
  LayoutNavigationTree,
  LayoutNavigationItem,
  InputSVGIcon, InboxSVGIcon
} from "react-md";

/**
 * Note: The `parentId` **must** be defaulted to `null` for the navigation tree
 * to render correctly since this uses the @react-md/tree package behind the
 * scenes. Each item that has a `parentId` set to `null` will appear at the root
 * level of your navigation tree.
 */
function createRoute(
  pathname: string,
  children: string,
  leftAddon: ReactNode | undefined,
  parentId: string | null = null
): LayoutNavigationItem {
  return {
    itemId: pathname,
    parentId,
    href: pathname,
    children,
    leftAddon,
  };
}

const navItems: LayoutNavigationTree = {
  "/": createRoute("/", "Enter Email Address", <InputSVGIcon />),
  "/addresses": createRoute("/addresses", "Addresses", <InboxSVGIcon />),
};

export default navItems;
