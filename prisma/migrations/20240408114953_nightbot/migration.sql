/*
  Warnings:

  - Added the required column `login` to the `Twitch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `access_token` to the `Nightbot` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Twitch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "login" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL
);
INSERT INTO "new_Twitch" ("access_token", "id", "refresh_token") SELECT "access_token", "id", "refresh_token" FROM "Twitch";
DROP TABLE "Twitch";
ALTER TABLE "new_Twitch" RENAME TO "Twitch";
CREATE UNIQUE INDEX "Twitch_access_token_key" ON "Twitch"("access_token");
CREATE UNIQUE INDEX "Twitch_refresh_token_key" ON "Twitch"("refresh_token");
CREATE TABLE "new_Nightbot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL
);
INSERT INTO "new_Nightbot" ("code", "id", "refresh_token") SELECT "code", "id", "refresh_token" FROM "Nightbot";
DROP TABLE "Nightbot";
ALTER TABLE "new_Nightbot" RENAME TO "Nightbot";
CREATE UNIQUE INDEX "Nightbot_code_key" ON "Nightbot"("code");
CREATE UNIQUE INDEX "Nightbot_access_token_key" ON "Nightbot"("access_token");
CREATE UNIQUE INDEX "Nightbot_refresh_token_key" ON "Nightbot"("refresh_token");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
