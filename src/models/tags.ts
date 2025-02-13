import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {posts} from "./posts";



export const tags = pgTable("tags",{
    id: serial("id").primaryKey(),
    name: varchar("name").notNull()
})

export const tagsRelations = relations(tags, ({many}) => ({
    posts: many(posts)
}));