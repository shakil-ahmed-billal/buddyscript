"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "hsl(0 0% 100%)",
          "--normal-text": "hsl(0 0% 9%)",
          "--normal-border": "hsl(0 0% 90%)",
          "--success-bg": "hsl(143 85% 96%)",
          "--success-text": "hsl(140 100% 27%)",
          "--success-border": "hsl(145 92% 91%)",
          "--error-bg": "hsl(359 100% 97%)",
          "--error-text": "hsl(360 100% 45%)",
          "--error-border": "hsl(359 100% 94%)",
          "--border-radius": "0.5rem",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast !bg-white dark:!bg-[#1e1e2e] !border !border-gray-200 dark:!border-gray-700 !text-gray-900 dark:!text-gray-100 !shadow-lg",
          error: "!bg-red-50 dark:!bg-red-950 !text-red-600 dark:!text-red-400 !border-red-200 dark:!border-red-800",
          success: "!bg-green-50 dark:!bg-green-950 !text-green-600 dark:!text-green-400 !border-green-200 dark:!border-green-800",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
