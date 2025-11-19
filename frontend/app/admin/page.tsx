import type { Metadata } from 'next'
import AdminApp from '@/components/admin/AdminApp'

export const metadata: Metadata = {
  title: 'Admin • Portfolio',
  description: 'Manage posts and projects stored in the backend API.',
}

export default function AdminPage() {
  return <AdminApp />
}
