"use client";
import { CommentsHeaderCompType } from "@/app/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiLoaderCircle } from "react-icons/bi";
import { BsChatDots, BsTrash3 } from "react-icons/bs";
import { ImMusic } from "react-icons/im";
import React, { useEffect, useState } from "react";
import ClientOnly from "../ClientOnly";
import { AiFillAlert, AiFillHeart } from "react-icons/ai";
import { useLikeStore } from "@/stores/like";
import { useCommentStore } from "@/stores/comment";
import { useGeneralStore } from "@/stores/general";
import { useUser } from "@/context/user";
import useIsLiked from "@/hooks/useIsLiked";
import useCreateLike from "@/hooks/useCreateLike";
import useDeleteLike from "@/hooks/useDeleteLike";
import useDeletePostById from "@/hooks/useDeletePostById";
import useCreateBucketUrl from "@/hooks/useCreateBucketUrl";
import moment from "moment";


export default function CommentsHeader({
  post,
  params,
}: CommentsHeaderCompType) {

  let { likeByPost, setLikeByPost } = useLikeStore()
  let { commentsByPost, setCommentsByPost } = useCommentStore()
  let { setIsLoginOpen } = useGeneralStore()

  const contextUser = useUser()

  const router = useRouter();

  const [hasClickedLike, setHasClickedLike] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [userLiked, setUserLiked] = useState<boolean>(false);

  useEffect(()=>{
    setCommentsByPost(params?.postId)
    setLikeByPost(params?.postId)
  }, [post])

  const hasUserLikePost = () =>{
    if (likeByPost.length < 1 || !contextUser?.user?.id) {
      setUserLiked(false)
      return
    }

    let res = useIsLiked(contextUser.user.id, params.postId, likeByPost)
    setUserLiked(res ? true : false)
  }
  useEffect(()=>{
    hasUserLikePost()
  }, [likeByPost])

  const like = async () => {
    try {
      setHasClickedLike(true)
      await useCreateLike(contextUser?.user?.id || '', params.postId)
      setLikeByPost(params.postId)
      setHasClickedLike(false)
    } catch (error) {
      console.error(error);
      alert(error)
      setHasClickedLike(false)
    }
  }

  const unLike = async (id: string) => {
    try {
      setHasClickedLike(true)
      await useDeleteLike(id)
      setLikeByPost(params.postId)
      setHasClickedLike(false)
    } catch (error) {
      console.error(error);
      alert(error)
      setHasClickedLike(false)
    }
  }
  
  const likeOrUnLike = () => {
    if(!contextUser?.user) return setIsLoginOpen(true)

    let res = useIsLiked(contextUser.user.id, params.postId, likeByPost)
    if (!res) {
      like()
    } else {
      likeByPost.forEach(like => {
        if (contextUser?.user?.id && contextUser.user.id == like.user_id && like.post_id == params.postId) {
          unLike(like.id)
        }
      })
    }

  };

  const deletePost = async () => {
    let res = confirm(' בטוח למחוק את הפוסט')
    if(!res) return

    setIsDeleting(true)

    try {
      await useDeletePostById(params?.postId, post?.video_url)
      router.push(`/profile/${params.userId}`)
    } catch (error) {
      console.error(error);
      alert(error)
      setIsDeleting(false)
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-8">
        <div className="flex items-center">
          <Link href={`profile/${post?.user_id}`}>
            {post?.profile.image ? (
              <img
                className="rounded-full lg:mx-0 mx-auto"
                width={40}
                src={useCreateBucketUrl(post?.profile.image)}
              />
            ) : (
              <div className="w-[40px] h-[40px] bg-gray-200 rounded-full " />
            )}
          </Link>

          <div className="ml-3 pt-0.5">
            <Link
              href={`/profile/${post?.user_id}`}
              className="relative z-10 text-[17px] font-semibold hover:underline "
            >
              {post?.profile.name}
            </Link>

            <div className="relative z-0 text-[13px] -mt-5 font-light">
              {post?.profile.name}
              <span className="relative -top-[2px] text-[30px] pl-1 pr-0.5 ">
                .
              </span>
              <span className="font-medium">{moment(post?.created_at).calendar()}</span>
            </div>
          </div>
        </div>

        {contextUser?.user?.id == post?.user_id ? (
          <div>
            {isDeleting ? (
              <BiLoaderCircle className="animate-spin" size={25} />
            ) : (
              <button disabled={isDeleting} onClick={() => deletePost()}>
                <BsTrash3 className="cursor-pointer" size={25} />
              </button>
            )}
          </div>
        ) : null}
      </div>

      <p className="px-8 mt-4 text-sm">{post?.text}</p>

      <p className="flex items-center gap-2 px-8 mt-4 text-sm font-bold">
        {post?.profile.name} - שמע מקורי
        <ImMusic size={17} />
      </p>

      <div className="flex items-center px-8 mt-8">
        <ClientOnly>
          <div className="pb-4 text-center flex items-center">
            <button
              disabled={hasClickedLike}
              onClick={() => likeOrUnLike()}
              className="rounded-full bg-gray-200 p-2 cursor-pointer"
            >
              {!hasClickedLike ? (
                <AiFillHeart color={likeByPost.length > 0 && userLiked ? '#ff2626' : ''} size={25} />
              ) : (
                <BiLoaderCircle className="animate-spin" size={25} />
              )}
            </button>

            <span className="text-xs pl-2 pr-4 text-gray-800 font-semibold">
              {likeByPost.length}
            </span>
          </div>
        </ClientOnly>

        <div className="pb-4 text-center flex items-center">
          <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
            <BsChatDots  size={25}/>
          </div>
          <span className="text-xs pl-2 text-gray-800 font-semibold">{commentsByPost.length}</span>
        </div>
      </div>
    </>
  );
}
