import { iconize } from './style.module.scss'

export default function Iconize({ children, className }) {
  return (
    <div className={`d-inline-block ${iconize} ${className}`}>{children}</div>
  )
}
