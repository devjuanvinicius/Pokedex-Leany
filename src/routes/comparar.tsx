import { createFileRoute } from '@tanstack/react-router'
import ComparePage from '../pages/ComparePage'

export const Route = createFileRoute('/comparar')({
  component: ComparePage,
})
