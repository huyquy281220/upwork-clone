import { BoxShadow } from "@/components/common/BoxShadow";
import { menuHeader } from "@/constants/menu";
// import { NavMenuItemProps } from "@/types";
import { ChevronDown, Divide } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const NavMenu = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleMouseEnter = (menu: string) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <div className="text-white w-full hidden md:block">
      <div className="container mx-auto px-4">
        <nav className="flex items-center h-16">
          <div className="flex space-x-6 relative">
            {/* Find Work Dropdown */}
            {menuHeader.map(({ title, menu }) => (
              <div
                key={title}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(title)}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center space-x-1 text-sm font-medium">
                  <span
                    className={` ${
                      activeDropdown === title
                        ? "text-green-500"
                        : "text-white hover:text-green-400"
                    }`}
                  >
                    {title}
                  </span>
                  {menu && <ChevronDown className="w-4 h-4" />}
                </button>

                {activeDropdown === title && menu ? (
                  <BoxShadow classNames="absolute left-0 top-7 mt-1 bg-main rounded w-64 py-2 z-50">
                    <div className="absolute left-0 -top-5 w-full h-5 bg-transparent" />
                    {menu?.map(({ label, link, type }) => (
                      <div key={label} className="flex flex-col">
                        <Link
                          href={link ?? ""}
                          className="text-white text-sm hover:bg-neutral-700 px-4 py-1 cursor-pointer"
                        >
                          {label}
                        </Link>

                        {type && (
                          <div>
                            <Divide className="w-full h-[1px] my-1 bg-[#333]" />
                            <span className="pl-2 text-sm text-[#a5a5a5]">
                              {label}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </BoxShadow>
                ) : (
                  <div />
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};
