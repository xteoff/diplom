import { Prisma } from '@prisma/client';

export type OrderItemWithProduct = Prisma.OrderItemGetPayload<{
  include: { product: true }
}>;

export type OrderWithRelations = Prisma.OrderGetPayload<{
  include: {
    user: true,
    orderItems: {
      include: {
        product: true
      }
    },
    invoice: true
  }
}>;

export type InvoiceWithOrder = Prisma.InvoiceGetPayload<{
  include: {
    order: {
      include: {
        user: true,
        orderItems: {
          include: {
            product: true
          }
        }
      }
    }
  }
}>;

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    amount: number;
  }>;
  customerName: string;
  customerAddress: string;
}