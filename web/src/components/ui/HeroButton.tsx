import type { ButtonHTMLAttributes, ReactNode } from "react"
import Button from "./Button"

type HeroButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export default function HeroButton({ children, className = "", ...props }: HeroButtonProps) {
  return (
    <Button size="md" variant="primary" className={className} {...props}>
      {children}
    </Button>
  )
}
