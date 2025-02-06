CREATE TABLE "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(255),
	"completed" boolean DEFAULT false,
	"userId" integer
);
