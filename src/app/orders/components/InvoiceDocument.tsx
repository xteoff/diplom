'use client'
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer'

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf' },
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc9.ttf', fontWeight: 'bold' },
  ],
})

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    padding: 40,
    fontSize: 12,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  col: {
    width: '48%',
  },
  table: {
    width: '100%',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    paddingVertical: 8,
  },
  tableHeader: {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
    paddingVertical: 8,
  },
  tableCol: {
    width: '20%',
    paddingHorizontal: 5,
  },
  tableColName: {
    width: '40%',
    paddingHorizontal: 5,
  },
  signatureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  signature: {
    width: '40%',
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 10,
  },
})

export interface InvoiceItem {
  name: string
  quantity: number
  price: number
  amount: number
}

export interface Invoice {
  id: string
  invoiceNumber: string
  date: string
  totalAmount: number
  createdAt: string
  updatedAt: string
  customerName: string
  customerAddress: string
  items: {
    name: string
    quantity: number
    price: number
    amount: number
  }[]
  orderId: string
}

export function InvoiceDocument({ invoice }: { invoice: Invoice }) {
  // Ensure date is a Date object
  const invoiceDate = typeof invoice.date === 'string' ? new Date(invoice.date) : invoice.date
  
  // Format items safely
  const items = Array.isArray(invoice.items) ? invoice.items : []

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>ТОВАРНАЯ НАКЛАДНАЯ</Text>
          <Text>№ {invoice.invoiceNumber} от {invoiceDate.toLocaleDateString()}</Text>
        </View>
        
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={{ fontWeight: 'bold' }}>Поставщик:</Text>
              <Text>Ваша компания</Text>
              <Text>Юридический адрес</Text>
              <Text>ИНН 1234567890 / КПП 123456789</Text>
              <Text>р/с 40702810000000000000</Text>
              <Text>в ПАО "Сбербанк"</Text>
              <Text>БИК 044525225</Text>
            </View>
            <View style={styles.col}>
              <Text style={{ fontWeight: 'bold' }}>Покупатель:</Text>
              <Text>{invoice.customerName}</Text>
              <Text>{invoice.customerAddress}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCol}>№</Text>
            <Text style={styles.tableColName}>Наименование товара</Text>
            <Text style={styles.tableCol}>Кол-во</Text>
            <Text style={styles.tableCol}>Цена</Text>
            <Text style={styles.tableCol}>Сумма</Text>
          </View>
          
          {items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCol}>{index + 1}</Text>
              <Text style={styles.tableColName}>{item.name}</Text>
              <Text style={styles.tableCol}>{item.quantity}</Text>
              <Text style={styles.tableCol}>{item.price.toFixed(2)}</Text>
              <Text style={styles.tableCol}>{item.amount.toFixed(2)}</Text>
            </View>
          ))}
          
          <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
            <Text style={[styles.tableCol, { width: '80%', textAlign: 'right' }]}>Итого:</Text>
            <Text style={styles.tableCol}>{invoice.totalAmount.toFixed(2)}</Text>
          </View>
        </View>
        
        <View style={styles.signatureRow}>
          <View style={styles.signature}>
            <Text>Отпустил: _________________ / Подпись /</Text>
            <Text>М.П.</Text>
          </View>
          <View style={styles.signature}>
            <Text>Получил: _________________ / Подпись /</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}