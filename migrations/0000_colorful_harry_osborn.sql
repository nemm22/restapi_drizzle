CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"sessionToken" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
