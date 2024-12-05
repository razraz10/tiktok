export interface UserContextTypes {
  user: User | null;
  register: (name: string, email: string, password: string,) => Promise<void>;
  login: (email: string, password: string,) => Promise<void>;
  logout: () => Promise<void>;
  checkUser: () => Promise<void>;
}

export interface User {
  id: string;
  name: string;
  bio: string;
  image: string;
}

export interface Profile {
  id: string;
  user_id: string;
  name: string;
  bio: string;
  image: string;
}

export interface RandomUsers {
  id: string;
  name: string;
  image: string;
}

export interface CropperDimensions {
  height?: number | null;
  width?: number | null;
  left?: number | null;
  top?: number | null;
}

export interface ShowErrorObject {
  type: string;
  message: string;
}

export interface Likes {
  id: string;
  user_id: string;
  post_id: string;
}

export interface Post {
  id: string;
  user_id: string;
  video_url: string;
  text: string;
  created_at: string;
}

export interface Comments {
  id: string;
  user_id: string;
  post_id: string;
  text: string;
  created_at: string;
}

export interface CommentWithProfile {
  id: string;
  user_id: string;
  post_id: string;
  text: string;
  created_at: string;
  profile: {
    user_id: string;
    name: string;
    image: string;
  };
}

export interface PostWithProfile {
  id: string;
  user_id: string;
  video_url: string;
  text: string;
  created_at: string;
  profile: {
    user_id: string;
    name: string;
    image: string;
  };
}

export interface UploadError {
  type: string;
  message: string;
}

// //////////////////////////
/////////////////////////////

//  COMPONENTS TYPES
export interface PostMainCompTypes {
  post: PostWithProfile;
}

export interface PostMainLikesCompTypes {
  post: PostWithProfile;
}

export interface ProfilePgeTypes {
  params: { id: string };
}

export interface PostUserCompTypes {
  post: Post;
}

export interface PostPageTypes {
  params: {userId: string; postId: string};
}

export interface CommentsHeaderCompType {
  params: {userId: string; postId: string};
  post: PostWithProfile;
}

export interface CommentsCompType {
  params: {userId: string; postId: string};
}

export interface SingleCommentCompType {
  params: {userId: string; postId: string};
  comment: CommentWithProfile;
}

//LAYOUT INCLUDE TYPES
export interface MenuItemTypes {
  iconString: string;
  colorString: string;
  sizeString: string;
}

export interface MenuItemFollowCompTypes {
  user: RandomUsers;
  colorString: string;
  sizeString: string;
}

export interface TextInputCompTypes {
  string: string;
  inputType: string;
  placeholder: string;
  onUpdate: (newValue: string) => void;
  error: string;
}
