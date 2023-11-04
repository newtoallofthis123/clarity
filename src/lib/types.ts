import { type Post, type User } from "@prisma/client";

export type FullUser = {
    likes: {
      id: string;
      post_id: string;
      user_id: string;
    }[];
    posts: {
      id: string;
      title: string;
      content: string;
      createdAt: Date;
      updatedAt: Date;
      user_id: string;
      solved: boolean;
      post_type: string;
      commentTo?: string;
      commentLength: number;
    }[];
  section: {
    code: string;
    user_id: string;
    mentor_id: string;
  };
} & User;
  
export type FullPost = {
    likes: {
      id: string;
      post_id: string;
      user_id: string;
  }[];
  user: {
    id: string;
    name?: string;
    email?: string;
    emailVerified?: Date;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
    karma: number;
    sectionId: string;
    user_type: string;
  };
} & Post;