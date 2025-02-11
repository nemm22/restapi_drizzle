import {pgTable, serial, text, varchar, boolean, primaryKey, integer} from "drizzle-orm/pg-core";
import {drizzle} from "drizzle-orm/node-postgres";
import {Pool} from "pg";
import {db} from '../db/connection';
import {eq, asc} from 'drizzle-orm';
import {relations } from "drizzle-orm";
import {InferInsertModel} from "drizzle-orm";
import { users } from "./users";

export const todos = pgTable("todos",{
    id: serial("id").primaryKey(),
    title: varchar("title",{length:255}).notNull(),
    description: varchar("description",{length:255}),
    completed: boolean("completed").notNull().default(false),
    userId: integer("userId").notNull().references(() => users.id, {onDelete: "cascade"})
})

type NewTodo = typeof todos.$inferInsert;

export const todosRelations =  relations(todos,({one}) =>({

    owner: one(users,{
        fields: [todos.userId],
        references: [users.id],
    }),
}));

export const getTodosByUserId = async (id: number) => {
    return await db.select().from(todos).where(eq(todos.userId,id)).orderBy(asc(todos.id));
}

export const getTodoById = async(id:number) => {
    const res = await db.select().from(todos).where(eq(todos.id,id));
    return res[0];
}

export const createTodo = async(newTodo: InferInsertModel<typeof todos>) => {
    const res =  await db.insert(todos).values(newTodo).returning();
    return res[0];
}

export const deleteTodoById = async(id:number) => {
    return db.delete(todos).where(eq(todos.id, id));
}

export const updateTodoById = (id: number, updated: Partial<InferInsertModel<typeof todos>>) => {
    return db.update(todos).set(updated).where(eq(todos.id,id));
}


