import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import initialStories from '../entries-data.json';
import initialComments from '../comments-data.json';
import initialCommentVotes from '../comment-votes-data.json';

const repopulate = (items, amount) => {
    let repopulated = items;
    Array(amount).fill(0).forEach((_,i) => {
        repopulated = repopulated.concat(items)
    })
    return repopulated.map((item, i) => ({...item, id: (i+1)}))
}
let stories = repopulate(initialStories, 10);
let comments = initialComments; 
let commentVotes = initialCommentVotes;

const mockServer = new MockAdapter(axios);

mockServer.onGet('/api/story').reply(function (config) {    
    const page = +config.url.split("/")[3] || 0;

    const [from , to ] = [ 10 * page, (10 * page) + 10]
    console.log("stories: ", page, from, to , config.url)

    return [200, {stories: stories.slice(from, to ), totalStories: stories.length}]
});

mockServer.onGet(/\/api\/story\/page\/[0-9]+\/[\w\W]*/).reply(function (config) {
    const page = +config.url.split("/")[4] || 0;    
    const searchTerm = config.url.split("/")[5] || '';
    console.log("HERE WE ARE: ", page, searchTerm)

    const [from , to ] = [ 10 * page, (10 * page) + 10]
    console.log("stories: ", page, from, to , config.url)

    const filterBySearch = story => story.title.includes(searchTerm.trim())
    const filteredStories = stories.filter(filterBySearch)

    return [200, {stories: filteredStories.slice(from, to ), totalStories: filteredStories.length}]
});

mockServer.onPost('/api/story').reply(function (config) {
    let { title, link, text, tags, category } = JSON.parse(config.data)

    if (title === "error") {
        return [500, {error: "La cagaste"}]
    }
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
    const storyId = +config.url.split("/")[3];
    const page = +config.url.split("/")[4] || 0;

    const [from , to ] = [ 10 * page, (10 * page) + 10]
    console.log("comments: ", storyId, page, from, to , config.url)
    const filteredComments = comments.filter( comment => comment.storyId === storyId).slice(from, to );
    console.log("comments after: ", filteredComments)
    return [200, filteredComments];
});

mockServer.onGet(/\/api\/comment\/[0-9]+\/[0-9]+/).reply(function (config) {
    const storyId = +config.url.split("/")[2];
    const page = +config.url.split("/")[3];

    const [from , to ] = [ 10 * page, (10 * page) + 10]
    console.log("comments: ", storyId, page, from, to , filteredComments)
    const filteredComments = comments.filter( comment => comment.storyId === storyId).slice(from, to);

    return [200, filteredComments];
});

mockServer.onPost('/api/comment').reply(function (config) {
    const { storyId, text } = JSON.parse(config.data)
    if (text === "error") {
        return [500, {error: "La cagaste"}]
    }
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
    const submitted = JSON.parse(config.data)
    if (+voteStoryId === 1) {
        return [500, {error: "La cagaste"}]
    }
    const filteredStories = stories.filter( story => story.id !== voteStoryId);
    const updatedStory = stories.filter( story => story.id === voteStoryId)[0];
    updatedStory.votes++;
    stories = [...filteredStories, updatedStory];
    const storyVote = {id: Math.round(Math.random() * 10000), ...submitted }
    console.log("STORY VOTE REGISTERED:" , voteStoryId, updatedStory)

    return [200, storyVote];
});

mockServer.onPost(/\/api\/comment\/[0-9]+\/vote/).reply(function (config) {
    const voteCommentId = +config.url.split("/").slice(-2)[0];
    const submitted = JSON.parse(config.data)
    if (+voteCommentId === 1) {
        return [500, {error: "La cagaste"}]
    }
    const filteredComments = comments.filter( comment => comment.id !== voteCommentId);
    const updatedComment = comments.filter( comment => comment.id === voteCommentId)[0];
    updatedComment.votes++;
    stories = [...filteredComments, updatedComment];

    const commentVote = {id: Math.round(Math.random() * 10000), ...submitted }
    return [200, commentVote];
});




export default mockServer;