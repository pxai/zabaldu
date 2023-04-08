import { render, screen } from '@testing-library/react'
import Queued from '../src/pages/queued'
import { useSession } from "next-auth/react";


describe('Queued',  () => {
  it('does not render news if queue is empty', async () => {
    useSession.mockReturnValue({})

    render(<Queued stories={[]} />)

    const votesBox = screen.queryAllByText('vote')
    expect(votesBox.length).toBe(0)
  })

  it('render news if they are queued', async () => {
    const stories = [
      {
        id: 1, title: 'Story 1', content: 'Content 1', tags: 'tag1'
      }
    ];
    useSession.mockReturnValue({})

    render(<Queued stories={stories} />)

    const votesBox = screen.queryAllByText('vote')
    const storyTitle = screen.getByText(stories[0].title)
    const storyContent = screen.getByText(stories[0].content)

    expect(votesBox.length).toBe(1)
    expect(storyTitle).toBeInTheDocument()
    expect(storyContent).toBeInTheDocument()
  })
})