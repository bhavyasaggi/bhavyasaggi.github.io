export default function PlgVisualizerRollupCard({ title, value, children }) {
  return (
    <div className='border border-danger px-4 py-3 text-danger text-center bg-danger-subtle'>
      <div className='lead fw-bold'>{value || 0}</div>
      <div className='small'>{title}</div>
      <details hidden>
        <summary>Details</summary>
        <div>{children}</div>
      </details>
    </div>
  )
}
