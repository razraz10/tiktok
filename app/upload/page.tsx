"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UploadError } from "../types";
import { BiSolidCloudUpload, BiLoaderCircle } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { PiKnifeLight } from "react-icons/pi";
import UploadLayout from "../layout/includes/UploadLayout";
import { useUser } from "@/context/user";
import useCreatePost from "@/hooks/useCreatePost";

export default function page() {

  const contextUser = useUser()

  const router = useRouter();

  let [fileDisplay, setFileDisplay] = useState<string>("");
  let [caption, setCaption] = useState<string>("");
  let [file, setFile] = useState<File | null>(null);
  let [error, setError] = useState<UploadError | null>(null);
  let [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(()=> {
      if(!contextUser?.user) router.push('/')
  }, [contextUser])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file);
      setFileDisplay(fileUrl);
      setFile(file);
    }
  };

  const clearVideo = () => {
    setFileDisplay("");
    setFile(null);
  };

  const discard = () => {
    setFileDisplay("");
    setFile(null);
    setCaption('')
  };

  const validate = () => {
    setError(null)
    let isError = false

    if(!file){
      setError({type: 'File', message: 'דרוש וידאו'})
      isError = true
    } else if(!caption){
      setError({type: 'caption', message: 'דרושה כותרת'})
      isError = true
    }
    
    return isError
  }

  const createNewPost = async () =>{
    let isError = validate()
    if(isError) return
    if(!file || !contextUser?.user) return
    setIsUploading(true)

    try {
      await useCreatePost(file, contextUser?.user?.id, caption)
      router.push(`/profile/${contextUser?.user?.id}`)
      setIsUploading(false)
    } catch (error) {
      console.error(error);
      setIsUploading(false)
      alert(error)
    }

  }
  return (
    <>
      <UploadLayout>
        <div className="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4">
          <div>
            <h1 className="text-[23px] font-semibold">העלאת וידאו</h1>
            <h1 className="text-gray-400 mt-1">העלה וידאו לחשבון שלך</h1>
          </div>

          <div className="mt-8 md:flex gap-6">
            {!fileDisplay ? (
              <label
                htmlFor="fileInput"
                className="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center justify-center w-full max-w-[260px] h-[470px] text-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer "
              >
                <BiSolidCloudUpload size={"40"} color="#b3b3b1" />
                <p className="mt-4 text-[17px]  ">בחר וידאו להעלאה</p>
                <p className="mt-1.5 text-gray-500 text-[13px] ">
                  או גרור והשלך קובץ
                </p>
                <p className="mt-12 text-gray-400 text-sm">MP4</p>
                <p className="mt-1.5 text-gray-400 text-[13px]">עד 30 דקות</p>
                <p className="mt-1.5 text-gray-400 text-[13px]">
                  2 GB -פחות מ{" "}
                </p>
                <label
                  htmlFor="fileInput"
                  className="px-2 py-1.5 mt-8 text-white text-[15px] w-[80%] bg-[#F02C56] rounded-sm cursor-pointer "
                >
                  בחר קובץ
                </label>
                <input
                  type="file"
                  id="fileInput"
                  onChange={onChange}
                  hidden
                  accept=".mp4"
                />
              </label>
            ) : (
              <div className="md:mx-0 mx-auto mt-4 md:mb-12 flex items-center justify-center w-full max-w-[260px] h-[540px] p-3 rounded-2xl cursor-pointer relative ">
                {isUploading ? (
                  <div className="absolute flex justify-center items-center z-20 bg-black h-full w-full rounded-[50px] bg-opacity-50 ">
                    <div className="mx-auto flex items-center justify-center gap-1 ">
                      <BiLoaderCircle
                        className="animate-spin"
                        color="#F12B56"
                        size={"30"}
                      />
                      <div className="text-white font-bold">.....מעלה </div>
                    </div>
                  </div>
                ) : null}

                <img
                  className="absolute z-20 pointer-events-none  "
                  src="/images/mobile-case.png"
                  alt=""
                />
                <img
                  className="absolute z-20 right-4 bottom-6  "
                  width={"90"}
                  src="/images/tiktok-logo-white.png"
                  alt=""
                />
                <video
                  autoPlay
                  loop
                  muted
                  className="absolute rounded-xl object-cover z-10 p-[13px] w-full h-full  "
                  src={fileDisplay}
                />
                <div className="absolute -bottom-12 flex items-center justify-between z-50 rounded-xl border w-full p-2 border-gray-300 ">
                  <div className="flex items-center truncate">
                    <AiOutlineCheckCircle
                      size={"16"}
                      className="min-w-[16px]"
                    />
                    <p className="text-[11px] pl-1 truncate text-ellipsis ">
                      {file ? file.name : ""}
                    </p>
                  </div>
                  <button
                    className="text-[11px] ml-2 font-semibold "
                    onClick={() => clearVideo()}
                  >
                    שנה
                  </button>
                </div>
              </div>
            )}

            <div className="mt-4 mb-6">
              <div className="flex bg-[#F8F8F8] py-4 px-6 ">
                <div>
                  <PiKnifeLight className="mr-4" size={"20"} />
                </div>
                <div>
                  <div className="font-semibold text-[15px] mb-1.5">
                    חלק וערוך וידאו
                  </div>
                  <div className="font-semibold text-[13px] text-gray-400">
                    תוכלו לחלק וידאו לכמה חלקים ולהסיר חלקים מיותרים{" "}
                  </div>
                </div>
                <div className="flex justify-end max-w-[130px] w-full h-full text-center my-auto ">
                  <button className="px-8 py-1.5 text-white text-[15px] bg-[#F02C56] rounded-sm ">
                    הוסף
                  </button>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <div className="mb-1 text-[15px] ">כותרת</div>
                  <div className="text-gray-400 text-[12px] ">
                    {caption.length}/150
                  </div>
                </div>
                <input
                  type="text"
                  className="w-full border p-2.5 rounded-md focus:outline-none"
                  maxLength={150}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <button
                className="px-10 py-2.5 mt-8 border text-[16px] hover:bg-gray-100 rounded-sm "
                disabled={isUploading}
                onClick={()=> discard()}
                >השלך</button>
                <button
                className="px-10 py-2.5 mt-8 border text-[16px] text-white bg-[#F02C56] rounded-sm "
                disabled={isUploading}
                onClick={()=> createNewPost()}
                >
                    {isUploading ? <BiLoaderCircle className='animate-spin' color="#ffffff" size={25} /> : 'פרסם'}
                    </button>
              </div>

                {error ? (
                    <div className="text-red-600 mt-4">
                        {error.message}
                    </div>
                ) : null}

            </div>
          </div>
        </div>
      </UploadLayout>
    </>
  );
}
