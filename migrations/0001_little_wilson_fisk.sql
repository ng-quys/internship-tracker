CREATE TABLE "applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"company" text NOT NULL,
	"position" text NOT NULL,
	"location" text,
	"job_url" text,
	"applied_date" text,
	"notes" text,
	"status" text DEFAULT 'Saved' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
