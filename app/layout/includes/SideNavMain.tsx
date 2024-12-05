import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import React, { useEffect } from "react";
import MenuItem from "./MenuItem";
import ClientOnly from "@/app/components/ClientOnly";
import MenuItemFollow from "./MenuItemFollow";
import { useUser } from "@/context/user";
import { useGeneralStore } from "@/stores/general";

export default function SideNavMain() {
  let { randomUsers, setRandomUsers } = useGeneralStore();

  const contextUser = useUser();

  const pathname = usePathname();

  useEffect(() => {
    setRandomUsers();
  }, []);

  return (
    <div
      id="SideNavMain"
      className={`
    fixed z-20 bg-white pt-[70px] h-full lg:border-r-0 border-r w-[75px] overflow-auto
    ${pathname === "/" ? "lg:w-[310px]" : "lg:w-[220px]"}
    `}
    >
      <div className="lg:w-full w-[55px] mx-auto ">
        <Link href={"/"}>
          <MenuItem
            iconString="בשבילך"
            colorString={pathname == "/" ? "#F02C56" : ""}
            sizeString="25"
          />
        </Link>

        <MenuItem iconString="עוקבים" colorString="#00000" sizeString="25" />
        <MenuItem iconString="בשידור" colorString="#00000" sizeString="25" />

        <div className="border-b lg:ml-2 mt-2" />

        <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
          חשבונות מוצעים
        </h3>
        <div className="lg:hidden block pt-3 " />

        <ClientOnly>
          <div className="cursor-pointer">
            {randomUsers?.map((user, index) => (
              <MenuItemFollow
                key={index}
                user={user}
                sizeString=""
                colorString=""
              />
            ))}
          </div>
        </ClientOnly>
        <button className="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]">
          תראה הכול
        </button>

        {contextUser?.user?.id ? (
          <div>
            <div className="border-b lg:ml-2 mt-2" />

            <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
              חשבונות עוקבים
            </h3>
            <div className="lg:hidden block pt-3 " />

            <ClientOnly>
              <div className="cursor-pointer">
                {randomUsers.map((user, index) => (
                  <MenuItemFollow
                    key={index}
                    user={user}
                    sizeString=""
                    colorString=""
                  />
                ))}
              </div>
            </ClientOnly>
            <button className="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]">
              תראה עוד
            </button>
          </div>
        ) : null}

        <div className="lg:block hidden border-b lg:ml-2 mt-2" />

        <div className="lg:block hidden text-[11px] text-gray-500">
          <p className="pt-4 px-2">תוכן טיקטוק</p>
          <p className="pt-4 px-2">משהו של מפתחים</p>
          <p className="pt-4 px-2">עזרה בפרטיות</p>
          <p className="pt-4 px-2">2024 TikTok</p>
        </div>
      </div>
    </div>
  );
}
