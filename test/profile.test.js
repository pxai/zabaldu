import { render, screen } from '@testing-library/react'
import Profile from '../src/pages/profile'
import { useSession } from "next-auth/react";
import mockRouter from 'next-router-mock';
jest.mock('next/router', () => require('next-router-mock'));

 jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));
jest.mock('next-auth/react');

describe('Profile',  () => {
  it('does not render headiig when session is empty', async () => {
    useSession.mockReturnValue({})

    render(<Profile />)

    const heading = screen.queryByRole('heading', {name: /profile/i })

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
    const heading = screen.getByRole('heading', {name: /profile/i })

    expect(heading).toBeInTheDocument()
  })
})