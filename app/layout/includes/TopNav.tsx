import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BiSearch, BiUser } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { useUser } from "@/context/user";
import { useGeneralStore } from "@/stores/general";
import { RandomUsers } from "@/app/types";
import debounce from "debounce";
import useSearchProfilesByName from "@/hooks/useSearchProfilesByName";
import useCreateBucketUrl from "@/hooks/useCreateBucketUrl";

export default function TopNav() {
  const contextUser = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const [searchProfile, setSearchProfile] = useState<RandomUsers[]>([]);
  let [showMenu, setShowMenu] = useState<boolean>(false);

  let { setIsLoginOpen, setIsEditProfileOpen } = useGeneralStore();

  useEffect(() => {
    setIsEditProfileOpen(false);
  }, []);

  const handleSearchName = debounce(
    async (e: { target: { value: string } }) => {
      if (e.target.value == "") return setSearchProfile([]);

      try {
        const result = await useSearchProfilesByName(e.target.value);
        if (result) return setSearchProfile(result);
        setSearchProfile([]);
      } catch (error) {
        console.error(error);
        setSearchProfile([]);
        alert(error);
      }
    },
    500
  );

  const goTo = () => {
    if (!contextUser?.user) return setIsLoginOpen(true);
    router.push("/upload");
  };

  return (
    <div
      id="TopNav"
      className="fixed bg-white z-30 flex items-center w-full border-b h-[60px]"
    >
      <div
        className={`flex items-center justify-between gap-6 w-full px-4 mx-auto ${
          pathname === "/" ? "max-w-[1150px]" : ""
        }`}
      >
        <Link href={"/"}>
          <img
            className="min-w-[115px] w-[115px] "
            src="/images/tiktok-logo.png"
          />
        </Link>
        <div className="relative hidden md:flex items-center justify-end bg-[#F1F1F2] p-1 rounded-full max-w-[430px] w-full">
          <input
            className="w-full pl-3 my-2 bg-transparent placeholder-[#838383] text-[15px] focus:outline-none"
            type="text"
            onChange={handleSearchName}
            placeholder="חפש חשבון"
          />

          {searchProfile.length > 0 ? (
            <div className="absolute bg-white max-w-[910px] h-auto w-full z-20 left-0 top-12 border p-1">
              {searchProfile.map((profile, index) => (
                <div key={index} className="p-1">
                  <Link
                    className="flex items-center justify-between w-full cursor-pointer hover:bg-[#F12B56] p-1 px-2 hover:text-white"
                    href={`/profile/${profile.id}`}
                  >
                    <div className="flex items-center">
                      <img
                        className="rounded-md"
                        width={"40"}
                        src={useCreateBucketUrl(profile?.image)}
                        alt=""
                      />
                      <div className="truncate ml-2">{profile.name} </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : null}

          <div className="px-3 py-1 flex items-center border-l border-l-gray-300">
            <BiSearch color="#A1A2A7" size="22" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="flex items-center border rounded-sm py-[6px] hover:bg-gray-100 pl-1.5"
            onClick={() => goTo()}
          >
            <AiOutlinePlus color="#00000" size={"22"} />
            <span className="px-2 font-medium text-[15px]">העלאה</span>
          </button>

          {!contextUser?.user?.id ? (
            <div className="flex items-center">
              <button
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center bg-[#F02C56] text-white border rounded-md px-3 py-[6px]"
              >
                <span className="whitespace-nowrap mx-4 font-medium text-[15px]">
                  התחבר לחשבון
                </span>
              </button>
              <BsThreeDotsVertical color="#161724" size={"25"} />
            </div>
          ) : (
            <div className="flex items-center">
              <div className="relative">
                <button
                  onClick={() => setShowMenu((showMenu = !showMenu))}
                  className="mt-1 border border-gray-200 rounded-full"
                >
                  <img
                    className="rounded-full w-[35px] h-[35px]"
                    src={useCreateBucketUrl(contextUser?.user?.image||'')}
                    alt=""
                  />
                </button>

                {showMenu ? (
                  <div className="absolute bg-white rounded-lg py-1.5 w-[200px] shadow-xl border top-[40px] right-0">
                    <button 
                    onClick={()=>{
                      router.push(`/profile/${contextUser?.user?.id}`)
                      setShowMenu(false)
                    }}
                    className="flex items-center w-full justify-start py-3 px-2 hover:bg-gray-100 cursor-pointer">
                      <BiUser size={"20"} />
                      <span className="pl-2 font-semibold text-sm">פרופיל</span>
                    </button>
                    <button
                      onClick={async () => {
                        await contextUser?.logout();
                        setShowMenu(false);
                      }}
                      className="flex items-center w-full justify-start py-3 px-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <FiLogOut size={"20"} />
                      <span className="pl-2 font-semibold text-sm">
                        צא מהחשבון
                      </span>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
