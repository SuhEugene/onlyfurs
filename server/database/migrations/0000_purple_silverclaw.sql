CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"likes" smallint DEFAULT 0 NOT NULL,
	"comments" smallint DEFAULT 0 NOT NULL,
	"reposts" smallint DEFAULT 0 NOT NULL,
	"content" text NOT NULL,
	"user_id" integer NOT NULL,
	"image_url" text,
	"image_cropped" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"price" smallint NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"username" text NOT NULL,
	"handle" text NOT NULL,
	"description" text,
	"avatar_url" text,
	"banner_url" text,
	"followers" smallint DEFAULT 0 NOT NULL,
	CONSTRAINT "users_handle_unique" UNIQUE("handle")
);
--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;