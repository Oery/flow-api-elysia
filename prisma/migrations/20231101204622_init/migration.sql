/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Twitch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Nightbot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Twitch_access_token_key" ON "Twitch"("access_token");

-- CreateIndex
CREATE UNIQUE INDEX "Twitch_refresh_token_key" ON "Twitch"("refresh_token");

-- CreateIndex
CREATE UNIQUE INDEX "Nightbot_code_key" ON "Nightbot"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Nightbot_refresh_token_key" ON "Nightbot"("refresh_token");
