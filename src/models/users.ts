import {pgTable, serial, text, varchar} from "drizzle-orm/pg-core";
import {drizzle} from "drizzle-orm/node-postgres";
import {Pool} from "pg";
import { primaryKey } from "drizzle-orm/mysql-core";
import {db} from '../db/connection';
import {asc, eq, relations} from 'drizzle-orm';
import { InferInsertModel } from "drizzle-orm";
import { todos } from "./todos";
import {posts} from "./posts";

export const users = pgTable("users",{
    id: serial("id").primaryKey(),
    username: varchar("username", {length: 255}).notNull().unique(),
    email: varchar("email", {length:255}).notNull().unique(),
    password: text("password").notNull(),
    sessionToken: text("sessionToken"),
});


export const usersRelations = relations(users, ({many}) => ({
    todos: many(todos),
    posts: many(posts)
}));


export const getUsers = async () => {
    return (await db.select().from(users).orderBy(asc(users.id)));
};

export const getUserByEmail = async (email: string) => {
    const result = await db.select()
    .from(users).where(eq(users.email,email));

    if(result.length===0){
        return null;
    }

    return result[0];
};

export const getUserBySessionToken = async (sessionToken: string) =>{
   const result = await db.select().from(users).where(eq(users.sessionToken, sessionToken));
    return result[0];
};

export const getUserbyId = async (id: number) =>{
    const result = await db.select().from(users).where(eq(users.id,id));
    return result[0];
};

export const createUser = async (newUser: InferInsertModel<typeof users>) => {
    return await db.insert(users).values(newUser).returning();
};

export const deleteUserById = async(id: number) => {
    return await db.delete(users).where(eq(users.id,id)).returning();
};

export const updateUserById = async (id: number, updated: InferInsertModel<typeof users>) => {
    const result =  await db.update(users).set(updated).where(eq(users.id,id)).returning();
    return result[0];
};

