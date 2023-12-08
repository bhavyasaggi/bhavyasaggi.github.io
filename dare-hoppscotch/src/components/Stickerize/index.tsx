export default function Stickerize({
  title,
  children,
  className,
  style,
  bg = 'secondary',
  text = 'light',
}: any) {
  return (
    <div
      title={title}
      className={`d-flex align-items-center justify-content-center rounded-circle bg-${bg} text-${text} text-center text-truncate overflow-hidden cursor-pointer ${className}`}
      style={{
        height: '24px',
        width: '24px',
        lineHeight: '24px',
        fontSize: '12px',
        fontWeight: 'bold',
        fontFamily: 'monospace',
        cursor: 'pointer',
        userSelect: 'none',
        ...style,
      }}
    >
      <div style={{ filter: 'grayscale(0.8)' }}>{children}</div>
    </div>
  )
}
