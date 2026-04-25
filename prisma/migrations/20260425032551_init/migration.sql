-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "phone" TEXT,
    "plan" TEXT NOT NULL DEFAULT 'free',
    "freeUsed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanInput" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "tourismType" TEXT NOT NULL,
    "terrain" TEXT NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "fundingSource" TEXT NOT NULL,
    "targetPayback" INTEGER NOT NULL,
    "targetRevenue" DOUBLE PRECISION NOT NULL,
    "climate" TEXT NOT NULL,
    "waterSource" TEXT NOT NULL,
    "existingCrops" TEXT,
    "infrastructure" TEXT,
    "landscape" TEXT,
    "targetGuests" TEXT NOT NULL,
    "roomCount" INTEGER NOT NULL,
    "serviceLevel" TEXT NOT NULL,
    "activities" TEXT NOT NULL,

    CONSTRAINT "PlanInput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanResult" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlanResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PlanInput_projectId_key" ON "PlanInput"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "PlanResult_projectId_key" ON "PlanResult"("projectId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanInput" ADD CONSTRAINT "PlanInput_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanResult" ADD CONSTRAINT "PlanResult_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
