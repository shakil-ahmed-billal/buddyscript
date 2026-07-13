-- CreateIndex
CREATE INDEX "Comment_postId_parentId_createdAt_idx" ON "Comment"("postId", "parentId", "createdAt");

-- CreateIndex
CREATE INDEX "Post_authorId_visibility_createdAt_idx" ON "Post"("authorId", "visibility", "createdAt");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");
