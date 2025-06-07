// app/components/client/DownloadInvoiceWrapper.tsx
'use client'

import dynamic from 'next/dynamic'
import { type Invoice, Order } from '../../app/orders/components/InvoiceDocument'

const DownloadInvoiceButton = dynamic(
  () => import('../../app/cart/components/DownloadInvoiceButton'),
  { ssr: false }
)

interface DownloadInvoiceWrapperProps {
  invoice: Invoice
  order: Order
}

export default function DownloadInvoiceWrapper({ invoice, order }: DownloadInvoiceWrapperProps) {
  return <DownloadInvoiceButton invoice={invoice} order={order} />
}