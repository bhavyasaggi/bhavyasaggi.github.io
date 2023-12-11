import { render } from '@testing-library/react'

import PageHome from '../pages/index'

describe('PageHome', () => {
  it('Snapshot', () => {
    const { container } = render(<PageHome />)
    expect(container).toMatchSnapshot()
  })
})
