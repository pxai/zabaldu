import { render, screen } from '@testing-library/react'
import Footer from '../src/components/footer'

describe('Footer', () => {
  it('renders a link', () => {
    render(<Footer />)

    const heading = screen.getByRole('link', {
      name: /By zabaldu/i,
    })

    expect(heading).toBeInTheDocument()
  })
})