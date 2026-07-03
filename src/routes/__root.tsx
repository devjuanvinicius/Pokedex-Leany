import { createRootRoute, Outlet } from '@tanstack/react-router'
import BottomNav from '../components/BottomNav'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="min-h-screen bg-background text-text">
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-6">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
