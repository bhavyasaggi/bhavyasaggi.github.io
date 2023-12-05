import Card from 'react-bootstrap/Card'

export default function PlgVisualizerRollupCard({ title, value, children }) {
  return (
    <Card bg='danger' text='light' className='text-center'>
      <Card.Header>{title}</Card.Header>
      <Card.Body hidden>
        <details>
          <summary>Details</summary>
          <div>{children}</div>
        </details>
      </Card.Body>
      <Card.Footer className='lead'>{value || 0}</Card.Footer>
    </Card>
  )
}
