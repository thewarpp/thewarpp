CREATE TABLE `thewarpp_account` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer NOT NULL,
	`type` text DEFAULT 'CREATOR' NOT NULL,
	`user_id` text NOT NULL,
	`workspace_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `thewarpp_user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`workspace_id`) REFERENCES `thewarpp_workspace`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `thewarpp_oauth_state` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`state` text NOT NULL,
	`workspace_id` text NOT NULL,
	FOREIGN KEY (`workspace_id`) REFERENCES `thewarpp_workspace`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `thewarpp_user` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer NOT NULL,
	`first_name` text(50) NOT NULL,
	`last_name` text(50),
	`email` text(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `thewarpp_workspace` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `thewarpp_youtube` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer NOT NULL,
	`workspace_id` text NOT NULL,
	`refresh_token` text NOT NULL,
	`access_token` text NOT NULL,
	FOREIGN KEY (`workspace_id`) REFERENCES `thewarpp_workspace`(`id`) ON UPDATE no action ON DELETE cascade
);
