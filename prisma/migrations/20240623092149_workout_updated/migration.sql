/*
  Warnings:

  - You are about to drop the column `content` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Workout` table. All the data in the column will be lost.
  - Added the required column `musclesTrained` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Workout" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "musclesTrained" TEXT NOT NULL,
    "userId" INTEGER NOT NULL
);
INSERT INTO "new_Workout" ("id", "title", "userId") SELECT "id", "title", "userId" FROM "Workout";
DROP TABLE "Workout";
ALTER TABLE "new_Workout" RENAME TO "Workout";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
