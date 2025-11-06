"use client";

import Link from "next/link";
import { MenuItem } from "./MenuItem";
import { FaSearch, FaBars } from "react-icons/fa";
import Image from "next/image";
import { useRef, useState } from "react";
import { Search } from "../search/Search";
import { useClickOutside } from "@/app/hooks/useClickOutside";
import { UserMenu } from "./UserMenu";

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // đóng menu khi click ra ngoài
  useClickOutside(userMenuRef, () => setIsUserMenuOpen(false));
  useClickOutside(mobileMenuRef, () => setIsMobileMenuOpen(false));

  const menu = [
    { title: "Home", link: "/" },
    { title: "Categories", link: "/categories" },
    { title: "Blog", link: "/blog" },
    { title: "About us", link: "/about-us" },
  ];

  return (
    <>
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 sm:py-[20px] py-[16px]">
        <div className="container mx-auto px-[16px]">
          <div className="flex items-center justify-between">
            {/* === LOGO === */}
            <Link href="/">
              <img
                src="/logoEasyCooking.png"
                alt="logo"
                className="w-[100px] cursor-pointer"
              />
            </Link>

            {/* === MENU lớn (lg+) === */}
            <nav className="hidden lg:block">
              <ul className="flex gap-[60px]">
                {menu.map((item, index) => (
                  <MenuItem key={index} item={item} />
                ))}
              </ul>
            </nav>

            {/* === SEARCH + AVATAR + BURGER === */}
            <div className="flex items-center gap-[24px]">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-[18px] hover:text-gray-700 transition"
              >
                <FaSearch />
              </button>

              {/* Avatar */}
              <div className="relative" ref={userMenuRef}>
                <button onClick={() => setIsUserMenuOpen((p) => !p)}>
                  <Image
                    src="/avatarTruongHop.jpg"
                    alt="user"
                    width={40}
                    height={40}
                    className="rounded-full border border-gray-300 object-cover"
                    quality={100}
                  />
                </button>

                {isUserMenuOpen && (
                  <UserMenu onClose={() => setIsUserMenuOpen(false)} />
                )}
              </div>

              {/* === BURGER MENU cho mobile === */}
              <div className="relative block lg:hidden" ref={mobileMenuRef}>
                <button
                  onClick={() => setIsMobileMenuOpen((p) => !p)}
                  className="text-[22px] hover:text-gray-700 transition"
                >
                  <FaBars />
                </button>

                {/* Menu thả xuống */}
                {isMobileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 z-50 overflow-hidden">
                    <ul className="flex flex-col p-2">
                      {menu.map((item, index) => (
                        <li key={index}>
                          <Link
                            href={item.link}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isSearchOpen && <Search onClose={() => setIsSearchOpen(false)} />}
    </>
  );
};
