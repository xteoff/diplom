// components/DownloadInvoiceButton.tsx
'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { InvoiceDocument, Invoice } from '../../orders/components/InvoiceDocument';

export default function DownloadInvoiceButton({
  invoice,
}: {
  invoice: Invoice;
}) {
  return (
    <PDFDownloadLink 
      document={<InvoiceDocument invoice={invoice} />}
      fileName={`invoice-${invoice.invoiceNumber}.pdf`}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Скачать накладную
    </PDFDownloadLink>
  );
}