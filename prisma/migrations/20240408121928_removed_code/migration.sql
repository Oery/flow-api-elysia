/*
  Warnings:

  - You are about to drop the column `code` on the `Nightbot` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Nightbot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL
);
INSERT INTO "new_Nightbot" ("access_token", "id", "refresh_token") SELECT "access_token", "id", "refresh_token" FROM "Nightbot";
DROP TABLE "Nightbot";
ALTER TABLE "new_Nightbot" RENAME TO "Nightbot";
CREATE UNIQUE INDEX "Nightbot_access_token_key" ON "Nightbot"("access_token");
CREATE UNIQUE INDEX "Nightbot_refresh_token_key" ON "Nightbot"("refresh_token");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
