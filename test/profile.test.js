import { render, screen } from '@testing-library/react'
import Profile from '../src/pages/profile'
import SessionProvider from 'next-auth/react';

import mockRouter from 'next-router-mock';

 jest.mock('next-auth/react');

describe('Profile', () => {
  it('renders a heading', () => {
    render(<SessionProvider><Profile /></SessionProvider>)

    const heading = screen.getByRole('heading', {
      name: /profile/i,
    })

    expect(heading).toBeInTheDocument()
  })
})