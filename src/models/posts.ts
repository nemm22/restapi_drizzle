import { pgTable,serial,varchar, timestamp, integer} from "drizzle-orm/pg-core";
import {users} from "./users";
import {tags} from "./tags";
import {eq, asc, desc, InferInsertModel} from 'drizzle-orm';
import {relations } from "drizzle-orm";
import { db } from "../db/connection";


export const posts = pgTable("posts",{
    id: serial("id").primaryKey(),
    title: varchar("title",{length:255}).notNull(),
    text: varchar("text",{length:255}).notNull(),
    createdAt: timestamp("created").notNull().defaultNow(),
    updatedAt: timestamp("updated").notNull().defaultNow(),
    userId: integer("userId").notNull().references(() => users.id, {onDelete: "cascade"})
})

export const postsRelations =  relations(posts,({one,many}) =>({

    owner: one(users,{
        fields: [posts.userId],
        references: [users.id],
    }),
    tags: many(tags)
}));


export const getPostbyId = async(id: number) => {
    const res = await db.select().from(posts).where(eq(posts.id,id));
    return res[0];
}

export const getPostsByUserId = async(userId: number) => {
    return db.select().from(posts).where(eq(posts.userId,userId)).orderBy(desc(posts.id));
}

export const createPost = async(newPost: InferInsertModel<typeof posts>) => {
    const res = await db.insert(posts).values(newPost).returning();
    return res[0];
}

export const updatePostById = async(id: number,values: InferInsertModel<typeof posts>) => {
    return db.update(posts).set(values).where(eq(posts.id,id));
}

export const deletePostById = async(id: number) => {
    return db.delete(posts).where(eq(posts.id,id));
}


