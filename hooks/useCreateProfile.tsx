import { database, ID } from "@/libs/AppWrightClient";

const useCreateProfile = async (
  user_id: string,
  name: string,
  image: string,
  bio: string
) => {
  try {
    await database.createDocument(
      String(process.env.NEXT_PUBLIC_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE),
      ID.unique(),
      {
        user_id: user_id,
        name: name,
        image: image,
        bio: bio,
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export default useCreateProfile;
