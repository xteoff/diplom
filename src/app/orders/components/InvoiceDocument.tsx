'use client'
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer'

Font.register({
  family: 'DejaVu',
  fonts: [
    { 
      src: 'https://cdn.jsdelivr.net/npm/dejavu-fonts-ttf@2.37.3/ttf/DejaVuSans.ttf',
      fontWeight: 'normal'
    },
    { 
      src: 'https://cdn.jsdelivr.net/npm/dejavu-fonts-ttf@2.37.3/ttf/DejaVuSans-Bold.ttf', 
      fontWeight: 'bold' 
    },
  ],
})

const styles = StyleSheet.create({
  page: {
    fontFamily: 'DejaVu',
    padding: 30,
    fontSize: 10,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 30,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    paddingBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 3,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  col: {
    width: '48%',
  },
  colFull: {
    width: '100%',
  },
  companyInfo: {
    padding: 10,
    borderRadius: 3,
    marginBottom: 5,
  },
  table: {
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    alignItems: 'center',
    minHeight: 25,
  },
  tableHeader: {
    backgroundColor: '#e9ecef',
    fontWeight: 'bold',
    fontSize: 9,
    textAlign: 'center',
  },
  tableCell: {
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#000',
    textAlign: 'center',
    fontSize: 9,
    justifyContent: 'center',
  },
  tableColNum: {
    width: '8%',
  },
  tableColName: {
    width: '40%',
    textAlign: 'left',
    paddingLeft: 8,
  },
  tableColQty: {
    width: '12%',
  },
  tableColPrice: {
    width: '20%',
  },
  tableColAmount: {
    width: '20%',
  },
  totalRow: {
    backgroundColor: '#f8f9fa',
    fontWeight: 'bold',
    fontSize: 11,
  },
  signatureSection: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  signatureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  signature: {
    width: '45%',
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 15,
    marginBottom: 5,
    minHeight: 20,
  },
  signatureLabel: {
    fontSize: 9,
    textAlign: 'center',
  },
  stamp: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 9,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#666',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
})

export interface InvoiceItem {
  name: string
  quantity: number
  price: number
  amount: number
}

export interface Order {
  id: string
  address: string
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
  items: InvoiceItem[]
  orderId: string
}

interface InvoiceDocumentProps {
  invoice: Invoice
  order: Order
}

export function InvoiceDocument({ invoice, order }: InvoiceDocumentProps) {
  // Safe date parsing
  const parseDate = (dateInput: string | Date | null | undefined): Date => {
    try {
      if (!dateInput) return new Date()
      return typeof dateInput === 'string' ? new Date(dateInput) : dateInput
    } catch (error) {
      console.error('Error parsing date:', error)
      return new Date()
    }
  }

  const invoiceDate = parseDate(invoice.date)
  
  // Safe items array
  const items = Array.isArray(invoice.items) ? invoice.items : []

  // Format date in Russian format
  const formatDate = (date: Date): string => {
    try {
      return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit', 
        year: 'numeric'
      })
    } catch (error) {
      console.error('Error formatting date:', error)
      return new Date().toLocaleDateString('ru-RU')
    }
  }

  // Format currency
  const formatCurrency = (amount: number | null | undefined): string => {
    try {
      const numAmount = Number(amount) || 0
      return new Intl.NumberFormat('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(numAmount) + ' руб.'
    } catch (error) {
      console.error('Error formatting currency:', error)
      return '0.00 руб.'
    }
  }

  // Format number safely
  const formatNumber = (num: number | null | undefined): string => {
    try {
      const numValue = Number(num) || 0
      return new Intl.NumberFormat('ru-RU', { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
      }).format(numValue)
    } catch (error) {
      console.error('Error formatting number:', error)
      return '0.00'
    }
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Товарная накладная</Text>
          <Text style={styles.subtitle}>
            № {invoice.invoiceNumber || 'N/A'} от {formatDate(invoiceDate)}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Участники сделки</Text>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Поставщик:</Text>
              <View style={styles.companyInfo}>
                <Text style={{ fontWeight: 'bold' }}>ИП "Flower Knows"</Text>
                <Text>125009, г. Москва, ул. Тверская, д. 1</Text>
                <Text>ИНН: 7701234567 / КПП: 770101001</Text>
                <Text>ОГРН: 1027700000000</Text>
                <Text>Р/с: 40702810400000000000</Text>
                <Text>В ПАО "Сбербанк России"</Text>
                <Text>БИК: 044525225</Text>
                <Text>К/с: 30101810400000000225</Text>
              </View>
            </View>
            <View style={styles.col}>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Покупатель:</Text>
              <View style={styles.companyInfo}>
                <Text style={{ fontWeight: 'bold' }}>
                  {invoice.customerName || 'Физическое лицо'}
                </Text>
                <Text>
                  {order.address || invoice.customerAddress || 'Адрес скрыт с целью конфиденциальности'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Товары</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, styles.tableColNum]}>№</Text>
              <Text style={[styles.tableCell, styles.tableColName]}>Наименование товара</Text>
              <Text style={[styles.tableCell, styles.tableColQty]}>Кол-во</Text>
              <Text style={[styles.tableCell, styles.tableColPrice]}>Цена за ед., руб.</Text>
              <Text style={[styles.tableCell, styles.tableColAmount, { borderRightWidth: 0 }]}>Сумма, руб.</Text>
            </View>

            {items.length > 0 ? (
              items.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.tableColNum]}>{index + 1}</Text>
                  <Text style={[styles.tableCell, styles.tableColName]}>{item.name || 'Unknown Item'}</Text>
                  <Text style={[styles.tableCell, styles.tableColQty]}>{item.quantity || 0}</Text>
                  <Text style={[styles.tableCell, styles.tableColPrice]}>
                    {formatNumber(item.price)}
                  </Text>
                  <Text style={[styles.tableCell, styles.tableColAmount, { borderRightWidth: 0 }]}>
                    {formatNumber(item.amount)}
                  </Text>
                </View>
              ))
            ) : (
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { width: '100%', borderRightWidth: 0 }]}>
                  Товары не найдены
                </Text>
              </View>
            )}

            <View style={[styles.tableRow, styles.totalRow, { borderBottomWidth: 0 }]}>
              <Text style={[styles.tableCell, { width: '80%', textAlign: 'right', borderRightWidth: 0 }]}>
                ИТОГО:
              </Text>
              <Text style={[styles.tableCell, { width: '20%', borderRightWidth: 0 }]}>
                {formatNumber(invoice.totalAmount)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Итого к оплате</Text>
          <View style={styles.companyInfo}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
              Всего наименований: {items.length}, на сумму {formatCurrency(invoice.totalAmount)}
            </Text>
            <Text style={{ marginTop: 5 }}>
              Сумма НДС: не облагается (УСН)
            </Text>
          </View>
        </View>

        <View style={styles.signatureSection}>
          <Text style={[styles.sectionTitle, { marginBottom: 20 }]}>Подписи сторон</Text>

          <View style={styles.signatureRow}>
            <View style={styles.signature}>
              <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Поставщик:</Text>
              <View style={styles.signatureLine}></View>
              <Text style={styles.signatureLabel}>
                Директор _________________ / И.О. Фамилия /
              </Text>
            </View>

            <View style={styles.signature}>
              <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Покупатель:</Text>
              <View style={styles.signatureLine}></View>
              <Text style={styles.signatureLabel}>
                _________________ / {invoice.customerName || '______________'} /
              </Text>
            </View>
          </View>

          <View style={styles.stamp}>
            <Text>М.П.</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>
            Документ создан {formatDate(new Date())} | Заказ #{invoice.orderId || 'N/A'}
          </Text>
        </View>
      </Page>
    </Document>
  )
}
