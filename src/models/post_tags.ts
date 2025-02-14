import { pgTable, integer, primaryKey} from "drizzle-orm/pg-core";
import {eq, InferInsertModel} from "drizzle-orm";
import { posts } from "./posts";
import { tags } from "./tags";
import { db } from "../db/connection";

export const postTags = pgTable("post_tags", {
    postId: integer("postId")
      .references(() => posts.id, { onDelete: "cascade" })
      .notNull(),
    tagId: integer("tagId")
      .references(() => tags.id, { onDelete: "cascade" })
      .notNull(),
},
(t) => [
    primaryKey({ columns: [t.postId, t.tagId] })
],
);


export const getPostByTagId = async(tagId: number) => {
    return db.select().from(postTags).where(eq(postTags.tagId,tagId));
}

export const getTagsByPostId = async(postId: number) => {
    return db.select().from(postTags).where(eq(postTags.postId,postId));
}

export const newPostTags = async(values:InferInsertModel<typeof postTags>) => {
    console.log("Post tags kreiran");
    return db.insert(postTags).values(values).returning();
}

export const deletePostTags = async (postId: number) => {
    return db.delete(posts).where(eq(postTags.postId,postId));
}