import prisma from './src/lib/prisma';

export default async function () {
    console.log("DALE duro");
    await prisma.story.deleteMany();
    console.log("Deleted story")
    await prisma.comment.deleteMany();
    console.log("Deleted comment")
    await prisma.commentVote.deleteMany();
    console.log("Deleted comment commentVote")
    await prisma.storyVote.deleteMany();
    console.log("Deleted comment storyVote")
    await prisma.category.deleteMany();
    console.log("Deleted comment category")
    await prisma.category.create({data: {name: 'general'} });
}