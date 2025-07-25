-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "paymentMethodId" TEXT;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE SET NULL ON UPDATE CASCADE;
