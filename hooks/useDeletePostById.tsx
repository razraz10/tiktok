import { database, storage} from "@/libs/AppWrightClient";
import useGetLikesByPostId from "./useGetLikesByPostId";
import useDeleteLike from "./useDeleteLike";
import useGetCommentsByPostId from "./useGetCommentsByPostId";
import useDeleteComment from "./useDeleteComment";

const useDeletePostById = async (
  postId: string,
  currentImage: string,
) => {

  try {

    const likes = await useGetLikesByPostId(postId)
    likes?.forEach(async like => {await useDeleteLike(like?.id)})

    const comments = await useGetCommentsByPostId(postId)
    comments?.forEach(async comment => {await useDeleteComment(comment?.id)})

    await database.deleteDocument(
      String(process.env.NEXT_PUBLIC_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST),
      postId,
    )

    await storage.deleteFile(
      String(process.env.NEXT_PUBLIC_BUCKET_ID),
      currentImage
    )

  } catch (error) {
    console.error(error);
    
  }
 
  
};

export default useDeletePostById;
