import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'
import { Likes } from '@/app/types'
import useGetLikesByPostId from '@/hooks/useGetLikesByPostId'

interface LikeStore {
    likeByPost: Likes[];
    setLikeByPost: (postId: string)=> void;
}

export const useLikeStore = create<LikeStore>()(
    devtools(
        persist(
            (set)=>({
                likeByPost: [],


                setLikeByPost: async (postId: string) =>{
                 const result = await useGetLikesByPostId(postId)
                set({likeByPost: result});
                },
            }),

            {
                name: 'store',
                storage: createJSONStorage(()=> localStorage)
            }
        )
    )
)