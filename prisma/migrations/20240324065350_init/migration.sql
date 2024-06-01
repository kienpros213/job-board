/*
  Warnings:

  - You are about to drop the column `job_id` on the `Application` table. All the data in the column will be lost.
  - Added the required column `post_id` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "job_id",
ADD COLUMN     "post_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "post_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "update_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;
