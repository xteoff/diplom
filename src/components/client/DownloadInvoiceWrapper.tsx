// app/components/client/DownloadInvoiceWrapper.tsx
'use client'

import dynamic from 'next/dynamic'
import { type Invoice } from '../../app/orders/components/InvoiceDocument'

const DownloadInvoiceButton = dynamic(
  () => import('../../app/cart/components/DownloadInvoiceButton'),
  { ssr: false }
)

interface DownloadInvoiceWrapperProps {
  invoice: Invoice
}

export default function DownloadInvoiceWrapper({ invoice }: DownloadInvoiceWrapperProps) {
  return <DownloadInvoiceButton invoice={invoice} />
}