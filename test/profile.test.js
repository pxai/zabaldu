import { render, screen } from '@testing-library/react'
import Profile from '../src/pages/profile'
import { useSession } from "next-auth/react";


describe('Profile',  () => {
  it('does not render headiig when session is empty', async () => {
    useSession.mockReturnValue({})

    render(<Profile />)

    const heading = screen.queryByRole('heading', {name: /profila/i })

    expect(heading).not.toBeInTheDocument()
  })

  it('renders a heading', async () => {
    useSession.mockReturnValue({ 
        data: {
            user:  {
              email: "foo@bar.com",
              image: "/image.png"
            }
        },
        status: "OK"
      })

    render(<Profile />)
    const heading = screen.getByRole('heading', {name: /profila/i })

    expect(heading).toBeInTheDocument()
  })
})