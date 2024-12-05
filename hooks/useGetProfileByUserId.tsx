import { database, Query } from "@/libs/AppWrightClient"


const useGetProfileByUserId = async (userId: string) =>{
    try {
        const response = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE),
            [
                Query.equal('user_id', userId)
            ]
        )

        const document = response.documents

        return{
            id: document[0]?.$id,
            user_id: document[0]?.user_id,
            name: document[0]?.name,
            bio: document[0]?.bio,
            image: document[0]?.image,
        }
    } catch (error) {
        console.error(error);
        
    }
}

export default useGetProfileByUserId