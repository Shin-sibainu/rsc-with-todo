-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "isCompleted" BOOLEAN,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
