export type StoryProps =  {
    id: string;
    title: string;
    content: string;
    permalink: string;
    link: string;
    status: string;
    tags: string;
    category?: string;
    createdAt: Date;
    updatedAt: Date;
    finishedAt: Date;
    user?: UserProps;
    comments?: CommentProps[]
    storyVotes?: StoryVoteProps[]
}

export type StoryVoteProps =  {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    story: StoryProps
    user?: UserProps;
}

export type CommentProps =  {
    id: string;
    title: string;
    content: string;
    permalink: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    finishedAt: Date;
    user?: UserProps;
    commentVotes?: CommentVoteProps[];
}

export type CommentVoteProps =  {
    id: string;
    value: number;
    createdAt: Date;
    updatedAt: Date;
    comment: CommentProps
    user?: UserProps;
}

export type UserProps =  {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    image?: string;
    exercises?: StoryProps[];
    comments?: CommentProps[];
    storyVotes?: StoryVoteProps[];
    commentVotes?: CommentVoteProps[];
    session?: SessionProps;
}

export type SessionProps = {
    id: string;
    sessionToken: string;
    expires: Date;
    user: UserProps;
}
