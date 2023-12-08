export default function Iconize({ children, className }: any) {
  return (
    <div
      className={`d-inline-block ${className}`}
      style={{
        filter: 'grayscale(1) contrast(1000)',
      }}
    >
      {children}
    </div>
  )
}
