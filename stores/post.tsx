import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'
import useGetRandomUsers from '@/hooks/useGetRandomUsers'
import useGetProfileByUserId from '@/hooks/useGetProfileByUserId'
import { Post, PostWithProfile } from '@/app/types'
import useGetAllPosts from '@/hooks/useGetAllPosts'
import useGetPostByUser from '@/hooks/useGetPostByUser'
import useGetPostByPostId from '@/hooks/useGetPostByPostId'

interface PostStore {
    allPosts: PostWithProfile[];
    postByUser: Post[];
    postById: PostWithProfile | null;
    setAllPosts: ()=> void;
    setPostsByUser: (userId: string)=> void;
    setPostById: (postId: string)=> void;

}

export const usePostStore = create<PostStore>()(
    devtools(
        persist(
            (set)=>({
                allPosts: [],
                postByUser: [],
                postById: null,

                setAllPosts: async () =>{
                 const result = await useGetAllPosts()
                set({allPosts: result});
                },

                setPostsByUser: async (userId: string) =>{
                 const result = await useGetPostByUser(userId)
                set({postByUser: result});
                }, 

                setPostById: async (postId: string) =>{
                 const result = await useGetPostByPostId(postId)
                set({postById: result});
                }, 
            }),

            {
                name: 'store',
                storage: createJSONStorage(()=> localStorage)
            }
        )
    )
)