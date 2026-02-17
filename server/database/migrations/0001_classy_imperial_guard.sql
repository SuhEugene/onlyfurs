ALTER TABLE "posts" ADD COLUMN "created_ago" smallint DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN "deleted_at";--> statement-breakpoint
ALTER TABLE "subscriptions" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "subscriptions" DROP COLUMN "deleted_at";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "deleted_at";