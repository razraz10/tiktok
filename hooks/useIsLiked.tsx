import { Likes } from "@/app/types"

const useIsLiked = (useId: string, postId: string, likes: Array<Likes>) =>{

    let res: Likes[] = []
    likes?.forEach(like => {
        if(like.user_id == useId && like.post_id == postId) res.push(like)
    })

    if(typeof res == undefined) return
    return res.length > 0
   
}

export default useIsLiked