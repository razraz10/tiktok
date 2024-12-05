import { useEffect, useState } from "react";
import { Comments, Likes, PostMainLikesCompTypes } from "../types";
import { AiFillHeart } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { FaCommentDots, FaShare } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useGeneralStore } from "@/stores/general";
import { useUser } from "@/context/user";
import useGetCommentsByPostId from "@/hooks/useGetCommentsByPostId";
import useGetLikesByPostId from "@/hooks/useGetLikesByPostId";
import useIsLiked from "@/hooks/useIsLiked";
import useCreateLike from "@/hooks/useCreateLike";
import useDeleteLike from "@/hooks/useDeleteLike";

export default function PostMainLikes({ post }: PostMainLikesCompTypes) {

  let { setIsLoginOpen } = useGeneralStore()

  const contextUser = useUser()

  const router = useRouter();

  const [hasClickedLike, setHasClickedLike] = useState<boolean>(false);
  const [userLike, setUserLike] = useState<boolean>(false);
  const [likes, setLikes] = useState<Likes[]>([]);
  const [comments, setComments] = useState<Comments[]>([]);

  const getAllLikesByPost = async () => {
    let result = await useGetLikesByPostId(post?.id)
    setLikes(result)
  }


  const getAllCommentByPost = async () => {
    let result = await useGetCommentsByPostId(post?.id)
    setComments(result)
  }


  const hasUserLikedPost = () => {
    if(!contextUser) return

    if(likes?.length < 1 || !contextUser?.user?.id){
      setUserLike(false)
      return
    }

    let res = useIsLiked(contextUser?.user?.id, post?.id, likes)
    setUserLike(res ? true : false)
  }


  useEffect(()=>{
    getAllLikesByPost()
    getAllCommentByPost()
  },[post])

  useEffect(()=>{
    hasUserLikedPost()
  }, [likes, contextUser])


  const like = async () => {
    try {
      setHasClickedLike(true)
      await useCreateLike(contextUser?.user?.id || '', post?.id)
      await getAllLikesByPost()
      hasUserLikedPost()
      setHasClickedLike(false)
      
    } catch (error) {
      console.error(error);
      alert(error)
    }
  }

  const unLike = async (id: string) => {
    try {
      setHasClickedLike(true)
      await useDeleteLike(id)
      await getAllLikesByPost()
      hasUserLikedPost()
      setHasClickedLike(false)

    } catch (error) {
      console.error(error);
      alert(error)
    }
  }

  const likeOrUnLike = () => {
    if(!contextUser?.user) return setIsLoginOpen(true)

      let res = useIsLiked(contextUser.user.id, post?.id, likes)
      if (!res) {
        like()
      } else {
        likes.forEach(like => {
          if (contextUser?.user?.id && contextUser.user.id == like.user_id && like.post_id == post?.id) {
            unLike(like.id)
          }
        })
      }
  };

  return (
    <>
      <div id={`PostMain-${post.id}`} className="relative mr-[75px]">
        <div className="absolute bottom-0 pl-2">
          <div className="pb-4 text-center">
            <button
              disabled={hasClickedLike}
              onClick={() => likeOrUnLike()}
              className="rounded-full bg-gray-200 p-2 cursor-pointer"
            >
              {!hasClickedLike ? (
                <AiFillHeart
                  color={likes?.length > 0 && userLike ? "#ff2626" : ""} size={'25'}
                />
              ) : (
                <BiLoaderCircle  size={"25"} />
              )}
            </button>
            <span className="text-xs text-gray-800 font-semibold">
              {likes?.length}
            </span>
          </div>
          <button
            className="pb-4 text-center"
            onClick={() =>
              router.push(`/post/${post?.id}/${post?.profile?.user_id}`)
            }
          >
            <div className="rounded-full bg-gray-200 p-2 cursor-pointer ">
              <FaCommentDots size={"25"} />
            </div>
            <span className="text-xs text-gray-800 font-semibold">
              {comments?.length}
            </span>
          </button>

          <button className="text-center">
            <div className="rounded-full bg-gray-200 p-2 cursor-pointer ">
              <FaShare size={"25"} />
            </div>
            <span className="text-xs text-gray-800 font-semibold">
           69
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
