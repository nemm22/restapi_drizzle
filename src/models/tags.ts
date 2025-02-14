import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import {relations, eq} from "drizzle-orm";
import { InferInsertModel } from "drizzle-orm";
import {posts} from "./posts";
import {db} from "../db/connection";



export const tags = pgTable("tags",{
    id: serial("id").primaryKey(),
    name: varchar("name").notNull()
})

export const tagsRelations = relations(tags, ({many}) => ({
    posts: many(posts)
}));


export const gettagById = async(id: number) => {
    const res = await db.select().from(tags).where(eq(tags.id,id));
    return res[0];
}

export const createTag = async(newTag: InferInsertModel<typeof tags>) => {
    const res = await db.insert(tags).values(newTag).returning();
    return res[0];
}

export const updateTagById = async(id: number, values: InferInsertModel<typeof tags>) => {
    return db.update(tags).set(values).where(eq(tags.id,id));
}

export const deleteTagById = async(id: number) => {
    return db.delete(tags).where(eq(tags.id,id));
}

export const getAllTags = async() => {
    return db.select().from(tags).orderBy(tags.id);
}