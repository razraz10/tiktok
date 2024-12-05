import { database } from "@/libs/AppWrightClient"


const useUpdateProfileImage = async (id: string, image: string ) =>{
    try {
       await database.updateDocument(
        String(process.env.NEXT_PUBLIC_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE),
      id,
      {
        image: image     
       }
       )
    } catch (error) {
        console.error(error);
        
    }
}

export default useUpdateProfileImage