import { SingleCommentCompType } from "@/app/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiLoaderCircle } from "react-icons/bi";
import { BsChatDots, BsTrash3 } from "react-icons/bs";
import { ImMusic } from "react-icons/im";
import React, { useState } from "react";
import ClientOnly from "../ClientOnly";
import { AiFillAlert, AiFillHeart } from "react-icons/ai";
import { useUser } from "@/context/user";
import { useCommentStore } from "@/stores/comment";
import useDeleteComment from "@/hooks/useDeleteComment";
import useCreateBucketUrl from "@/hooks/useCreateBucketUrl";
import moment from "moment";

export default function SingleComment({
  comment,
  params,
}: SingleCommentCompType) {

  const contextUser = useUser()
  let { setCommentsByPost } = useCommentStore()

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const deleteThisComment = async () =>{
    let ref = confirm('למחוק סופית')
    if(!ref) return

    try {
      setIsDeleting(true)
      await useDeleteComment(comment?.id)
      setCommentsByPost(params?.postId)
      setIsDeleting(false)
    } catch (error) {
      console.error(error);
      alert(error)
    }
  }

  return (
    <>
      <div
        id="SingleComment"
        className="flex items-center justify-between px-8 mt-4"
      >
        <div className="flex items-center relative w-full">
          <Link href={`/profile/${comment.profile.user_id}`}>
            <img
              className="absolute top-0 rounded-full lg:mx-0 mx-auto"
              width={40}
              src={useCreateBucketUrl(comment.profile.image)}
            />
          </Link>
          <div className="ml-14 pt-0.5 w-full">
            <div className="text-[18px] font-semibold flex items-center justify-between">
              <span className="flex items-center">
                {comment?.profile.name} - 
                <span className="text-[12px] text-gray-600 font-light ml-1">{moment(comment?.created_at).calendar()}</span>
              </span>

              {contextUser?.user?.id == comment.profile.user_id ? (
                <button 
                disabled={isDeleting}
                onClick={()=> deleteThisComment()}>
                    {isDeleting ? 
                      <BiLoaderCircle className='animate-spin' color="#E91E62" size={20}/>
                     : <BsTrash3 className='cursor-pointer' size={25}/>}
                </button>
              ) : null}
            </div>

            <p className="text-[15px] font-light">{comment.text}</p>
          </div>
        </div>
      </div>
    </>
  );
}
