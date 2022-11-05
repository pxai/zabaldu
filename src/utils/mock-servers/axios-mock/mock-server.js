import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import initialStories from '../entries-data.json';
import initialComments from '../comments-data.json';

let stories = initialStories;
let comments = initialComments; 
const mockServer = new MockAdapter(axios);

mockServer.onGet('/api/story').reply(200, stories);

mockServer.onPost('/api/story').reply(function (config) {
    let { title, link, text, tags, category } = JSON.parse(config.data)
    const submitted = { user: "whoever"}
    const comments = [];
    tags = tags.split(',');
    const votes = 0;
    const story = {id: Math.round(Math.random() * 10000), title, link, text, tags, category, comments, votes, submitted };
    stories.push(story)

    return [200, story];
});

mockServer.onPut('/api/story').reply(function (config) {
    const updatedStory = JSON.parse(config.data)
    const filteredStories = stories.filter( story => story.id !== updatedStory.id);
    stories = [...filteredStories, updatedStory];

    return [200, updatedStory];
});

mockServer.onDelete(/\/api\/story\/[0-9]+/).reply(function (config) {
    const deletedStoryId = +config.url.split("/").slice(-1)[0];
    stories = stories.filter( story => story.id !== deletedStoryId);

    return [200, {id: deletedStoryId}];
});

mockServer.onGet(/\/api\/comment\/[0-9]+/).reply(function (config) {
    const storyId = +config.url.split("/").slice(-1)[0];
    const filteredComments = comments.filter( comment => comment.storyId === storyId);

    return [200, filteredComments];
});

mockServer.onPost('/api/comment').reply(function (config) {
    const { storyId, text } = JSON.parse(config.data)
    const submitted = { user: "whoever"}
    const comment = {id: Math.round(Math.random() * 10000), storyId, text, submitted };
    comments.push(comment)

    return [200, comment];
});

mockServer.onPut('/api/comment').reply(function (config) {
    const updatedComment = JSON.parse(config.data)
    const filteredComments = stories.filter( comment => comment.id !== updatedComment.id);
    comments = [...filteredComments, updatedComment];

    return [200, updatedComment];
});

mockServer.onDelete(/\/api\/comment\/[0-9]+/).reply(function (config) {
    const deletedCommentId = +config.url.split("/").slice(-1)[0];
    comments = comments.filter( comment => comment.id !== deletedCommentId);

    return [200, {id: deletedCommentId}];
});

mockServer.onPost(/\/api\/story\/[0-9]+\/vote/).reply(function (config) {
    const voteStoryId = +config.url.split("/").slice(-2)[0];
    const filteredStories = stories.filter( story => story.id !== voteStoryId);
    const updatedStory = stories.filter( story => story.id === voteStoryId)[0];
    updatedStory.votes++;
    stories = [...filteredStories, updatedStory];
    console.log("VOTE REGISTERED:" , voteStoryId, updatedStory)

    return [200, updatedStory];
});

mockServer.onPost(/\/api\/comment\/[0-9]+\/vote/).reply(function (config) {
    const voteCommentId = +config.url.split("/").slice(-2)[0];
    const filteredComments = comments.filter( comment => comment.id !== voteCommentId);
    const updatedComment = comments.filter( comment => comment.id === voteCommentId)[0];
    updatedComment.votes++;
    stories = [...filteredComments, updatedComment];
    console.log("COMMENT VOTE REGISTERED:" , voteCommentId, updatedComment)

    return [200, updatedComment];
});

export default mockServer;