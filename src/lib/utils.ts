import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("hu-HU", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "HUF"
    notation?: Intl.NumberFormatOptions["notation"]
  } = {}
) {
  const { currency = "HUF", notation = "standard" } = options
  const numericPrice = typeof price === "string" ? parseFloat(price) : price

  return new Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 0,
  }).format(numericPrice)
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str
}

export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function generateId() {
  return Math.random().toString(36).substring(2, 9)
}