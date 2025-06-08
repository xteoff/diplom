'use client'

import { updateOrderStatus } from './actions'
import { useState } from 'react'

interface OrderStatusButtonsProps {
  orderId: string
  status: number
}

export default function OrderStatusButtons({ orderId, status }: OrderStatusButtonsProps) {
  const [currentStatus, setCurrentStatus] = useState(status)
  const [isLoading, setIsLoading] = useState(false)

  const changeOrderStatus = async (newStatus: number) => {
    setIsLoading(true)
    try {
      await updateOrderStatus(orderId, newStatus)
      setCurrentStatus(newStatus)
    } catch (error) {
      console.error('Ошибка при изменении статуса заказа:', error)
      alert('Произошла ошибка при изменении статуса заказа')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusText = (status: number): string => {
    switch (status) {
      case 0:
        return 'Новый'
      case 1:
        return 'В доставке'
      case 2:
        return 'Доставлен'
      default:
        return 'Неизвестно'
    }
  }

  if (currentStatus !== 0) {
    return (
      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded">
        {getStatusText(currentStatus)}
      </span>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button 
        onClick={() => changeOrderStatus(1)}
        disabled={isLoading}
        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        {isLoading ? 'Загрузка...' : 'В доставке'}
      </button>
      <button 
        onClick={() => changeOrderStatus(2)}
        disabled={isLoading}
        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        {isLoading ? 'Загрузка...' : 'Доставлен'}
      </button>
    </div>
  )
}
