CREATE TABLE `deployments` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`service_id` integer NOT NULL,
	`environment` text NOT NULL,
	`version_id` integer NOT NULL,
	`result` text NOT NULL,
	`completed_at` integer NOT NULL,
	CONSTRAINT `fk_deployments_service_id_environment_service_environments_service_id_environment_fk` FOREIGN KEY (`service_id`,`environment`) REFERENCES `service_environments`(`service_id`,`environment`),
	CONSTRAINT `fk_deployments_service_id_version_id_service_versions_service_id_id_fk` FOREIGN KEY (`service_id`,`version_id`) REFERENCES `service_versions`(`service_id`,`id`),
	CONSTRAINT "valid_deployment_result" CHECK("result" in ('succeeded', 'failed'))
);
--> statement-breakpoint
CREATE TABLE `service_environments` (
	`service_id` integer NOT NULL,
	`environment` text NOT NULL,
	`state` text NOT NULL,
	`current_version_id` integer,
	CONSTRAINT `service_environments_pk` PRIMARY KEY(`service_id`, `environment`),
	CONSTRAINT `fk_service_environments_service_id_services_id_fk` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`),
	CONSTRAINT `fk_service_environments_service_id_current_version_id_service_versions_service_id_id_fk` FOREIGN KEY (`service_id`,`current_version_id`) REFERENCES `service_versions`(`service_id`,`id`),
	CONSTRAINT "valid_environment" CHECK("environment" in ('production', 'staging')),
	CONSTRAINT "valid_service_state" CHECK("state" in ('healthy', 'unavailable', 'not_deployed'))
);
--> statement-breakpoint
CREATE TABLE `service_versions` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`service_id` integer NOT NULL,
	`version` text NOT NULL,
	CONSTRAINT `fk_service_versions_service_id_services_id_fk` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`),
	CONSTRAINT `service_versions_service_id_version_unique` UNIQUE(`service_id`,`version`),
	CONSTRAINT `service_versions_service_id_id_unique` UNIQUE(`service_id`,`id`)
);
--> statement-breakpoint
CREATE INDEX `deployment_history` ON `deployments` (`service_id`,`environment`,`completed_at`,`id`);