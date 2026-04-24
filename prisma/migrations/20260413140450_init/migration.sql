-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "phone" TEXT,
    "plan" TEXT NOT NULL DEFAULT 'free',
    "freeUsed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PlanInput" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "area" REAL NOT NULL,
    "tourismType" TEXT NOT NULL,
    "terrain" TEXT NOT NULL,
    "budget" REAL NOT NULL,
    "fundingSource" TEXT NOT NULL,
    "targetPayback" INTEGER NOT NULL,
    "targetRevenue" REAL NOT NULL,
    "climate" TEXT NOT NULL,
    "waterSource" TEXT NOT NULL,
    "existingCrops" TEXT,
    "infrastructure" TEXT,
    "landscape" TEXT,
    "targetGuests" TEXT NOT NULL,
    "roomCount" INTEGER NOT NULL,
    "serviceLevel" TEXT NOT NULL,
    "activities" TEXT NOT NULL,
    CONSTRAINT "PlanInput_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PlanResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PlanResult_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PlanInput_projectId_key" ON "PlanInput"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "PlanResult_projectId_key" ON "PlanResult"("projectId");
