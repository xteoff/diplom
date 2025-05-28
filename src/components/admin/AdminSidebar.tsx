'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminSidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/admin/statistic', label: 'Статистика', icon: '📊' },
    { href: '/admin/users', label: 'Пользователи', icon: '👥' },
    { href: '/admin/posts', label: 'Товары', icon: '📝' },
  ]

  return (
    <div className="w-64 bg-red-100 text-black">
      <div className="p-4 h-full flex flex-col">
        <h1 className="text-2xl font-bold mb-8">Содержимое</h1>
        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg hover:bg-[rgb(135,61,61)] ${
                    pathname === item.href ? 'bg-[rgb(135,61,61)]' : ''
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto p-4 border-t border-gray-600">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-gray-600">admin@admin.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}