import { database} from "@/libs/AppWrightClient";

const useDeleteLike = async (
  id: string,
) => {


  try {
    await database.deleteDocument(
      String(process.env.NEXT_PUBLIC_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_LIKE),
      id,
     
    )


  } catch (error) {
    console.error(error);
    
  }
 
  
};

export default useDeleteLike;
