import { pgTable,serial,varchar, timestamp, integer} from "drizzle-orm/pg-core";
import {users} from "./users";
import {tags} from "./tags";
import {eq, asc} from 'drizzle-orm';
import {relations } from "drizzle-orm";


export const posts = pgTable("posts",{
    id: serial("id").primaryKey(),
    title: varchar("title",{length:255}).notNull(),
    text: varchar("text",{length:255}).notNull(),
    createdAt: timestamp("created").notNull(),
    updatedAt: timestamp("updated").notNull(),
    userId: integer("userId").notNull().references(() => users.id, {onDelete: "cascade"}),
    tagId: integer("tagId").notNull().references(() => tags.id)
})

export const postsRelations =  relations(posts,({one,many}) =>({

    owner: one(users,{
        fields: [posts.userId],
        references: [users.id],
    }),
    tags: many(tags)
}));

