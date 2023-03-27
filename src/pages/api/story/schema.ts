import { object, string, number, date, InferType } from 'yup';

let storySchema = object({
    title: string().min(3).required(),
    content: string().min(10).required(),
    tags: string().min(3).required(),
    link: string().url().required(),
    category: string().min(3).required(),
  });

export interface StoryFormData {
    title: { value: string };
    content: { value: string };
    tags: { value: string };
    link: { value: string };
    category: { value: string };
}

export type StoryModel = {
  title: string;
  content: string;
  tags: string;
  link: string;
  category: string;
}

const validateStory = async (story: any) => await storySchema.validate(story);

export { storySchema, validateStory };
  