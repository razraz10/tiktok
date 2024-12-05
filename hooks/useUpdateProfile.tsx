import { database } from "@/libs/AppWrightClient"


const useUpdateProfile = async (id: string, name: string, bio: string ) =>{
    try {
       await database.updateDocument(
        String(process.env.NEXT_PUBLIC_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE),
      id,
      {
        name: name,
        bio: bio
      }
       )
    } catch (error) {
        console.error(error);
        
    }
}

export default useUpdateProfile