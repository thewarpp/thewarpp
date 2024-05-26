ALTER TABLE `thewarpp_workspace` ADD `youtube_id` text REFERENCES thewarpp_youtube(id);--> statement-breakpoint
CREATE UNIQUE INDEX `thewarpp_workspace_youtube_id_unique` ON `thewarpp_workspace` (`youtube_id`);--> statement-breakpoint
/*
 SQLite does not support "Creating foreign key on existing column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/