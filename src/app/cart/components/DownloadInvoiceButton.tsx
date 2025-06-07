// components/DownloadInvoiceButton.tsx
'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { InvoiceDocument, Invoice, Order } from '../../orders/components/InvoiceDocument';

export default function DownloadInvoiceButton({
  invoice,
  order,
}: {
  invoice: Invoice;
  order: Order;
}) {
  return (
    <PDFDownloadLink 
      document={<InvoiceDocument invoice={invoice} order={order} />}
      fileName={`invoice-${invoice.invoiceNumber}.pdf`}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[rgb(135,61,61)] hover:bg-[rgb(202,94,94)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(135,61,61)]"
    >
      Скачать накладную
    </PDFDownloadLink>
  );
}
