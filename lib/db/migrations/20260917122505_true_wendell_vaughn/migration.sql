PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_deployments` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`service_id` integer NOT NULL,
	`environment` text NOT NULL,
	`version_id` integer NOT NULL,
	`scenario` text DEFAULT 'success' NOT NULL,
	`started_at` integer DEFAULT (unixepoch()) NOT NULL,
	`result` text,
	`completed_at` integer,
	`kind` text DEFAULT 'deploy' NOT NULL,
	`source_deployment_id` integer,
	CONSTRAINT `fk_deployments_service_id_environment_service_environments_service_id_environment_fk` FOREIGN KEY (`service_id`,`environment`) REFERENCES `service_environments`(`service_id`,`environment`),
	CONSTRAINT `fk_deployments_service_id_version_id_service_versions_service_id_id_fk` FOREIGN KEY (`service_id`,`version_id`) REFERENCES `service_versions`(`service_id`,`id`),
	CONSTRAINT "valid_deployment_result" CHECK("result" in ('succeeded', 'failed')),
	CONSTRAINT "valid_deployment_scenario" CHECK("scenario" in ('success', 'health_check_failure')),
	CONSTRAINT "valid_deployment_kind" CHECK("kind" in ('deploy', 'retry', 'rollback')),
	CONSTRAINT "valid_completion" CHECK(("result" is null and "completed_at" is null) or ("result" is not null and "completed_at" is not null and "completed_at" >= "started_at"))
);
--> statement-breakpoint
INSERT INTO `__new_deployments`(`id`, `service_id`, `environment`, `version_id`, `scenario`, `started_at`, `result`, `completed_at`) SELECT `id`, `service_id`, `environment`, `version_id`, CASE WHEN `result` = 'failed' THEN 'health_check_failure' ELSE 'success' END, `completed_at` - 20, `result`, `completed_at` FROM `deployments`;--> statement-breakpoint
DROP TABLE `deployments`;--> statement-breakpoint
ALTER TABLE `__new_deployments` RENAME TO `deployments`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `service_versions` ADD `description` text DEFAULT 'Predefined demo release.' NOT NULL;--> statement-breakpoint
ALTER TABLE `service_versions` ADD `scenario` text DEFAULT 'success' NOT NULL CONSTRAINT `valid_version_scenario` CHECK (`scenario` in ('success', 'health_check_failure'));--> statement-breakpoint
CREATE UNIQUE INDEX `one_active_deployment` ON `deployments` (`service_id`,`environment`) WHERE "deployments"."result" is null;--> statement-breakpoint
CREATE INDEX `deployment_history` ON `deployments` (`service_id`,`environment`,`completed_at`,`id`);