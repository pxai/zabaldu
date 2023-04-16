import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { useTranslation } from 'next-i18next'
import FormInput from '../form-input/form-input';
import Button from '../button/button';
import { useRouter } from 'next/router'
import ModalComponent from '../modal/modal.component';
import './send-form.module.scss';
import { useFormik } from 'formik';
import { storySchema, StoryModel } from '@/pages/api/story/schema';
import { StoryProps } from 'prisma/types';
import SelectInput from '../form-input/select-input';

const defaultFormFields = {
  title: '',
  link: '',
  content: '',
  tags: '',
  categoryId: ''
}

const SendForm = ({formValues = defaultFormFields, sendAction, categories }: any) => {
  const { t } = useTranslation();

  const [formFields, setFormFields] = useState(formValues);
  const [submitError, setSubmitError] = useState<string>('');
  const [sending, setSending] = useState<boolean>(false);
  const router = useRouter()
  const { title, link, content, tags, categoryId } = formFields;

  const formik = useFormik<StoryModel>({
    initialValues: formFields,
    onSubmit: async (values) => {
      console.log("Component > About to send: ", {...values}) //, submitted: userData })
      try {
        setSending(true);
        sendAction(values)
      } catch (error) {
        setSubmitError(`${(error as AxiosError).message}`)
        console.log('Error on submit ', error);
      }
      setSending(false);
    },
    validationSchema: storySchema,
  });

  useEffect(() => {
   // if (storyError.changedStory !== null && !storyError.error)
      console.log("FormFields: ", formValues)
      //navigate('/')
  }, [])
  

  return (
    <div className="send-form">
      <h3>{t`send_story`}</h3>
      <form onSubmit={formik.handleSubmit}>
        <FormInput
          label={t`title`}
          child='input'
          type='text'
          required
          name='title'
          onChange={formik.handleChange}
          value={formik.values.title}
        />
    {formik.touched.title && formik.errors.title && <div>{formik.errors.title}</div>}
        <FormInput
          label={t`content`}
          type='text'
          required
          onChange={formik.handleChange}
          name='content'
          value={formik.values.content}
        />
    {formik.touched.content && formik.errors.content && <div>{formik.errors.content}</div>}
        <FormInput
          label={t`link`}
          type='text'
          required
          onChange={formik.handleChange}
          name='link'
          value={formik.values.link}
        />
    {formik.touched.link && formik.errors.link && <div>{formik.errors.link}</div>}
        <FormInput
          label={t`tags`}
          type='text'
          required
          onChange={formik.handleChange}
          name='tags'
          value={formik.values.tags}
        />
        {formik.touched.tags && formik.errors.tags && <div>{formik.errors.tags}</div>}
        <SelectInput
          label={t`category`}
          values={categories}
          onChange={formik.handleChange}
          name='categoryId'
          value={formik.values.categoryId}
        />
        {formik.touched.categoryId && formik.errors.categoryId && <div>{formik.errors.categoryId}</div>}
        <Button type='submit' disabled={sending}>{sending ? t`in_process` : t`submit_story`}</Button>
      </form>
      { submitError && <ModalComponent message={submitError} /> }
    </div>
  );
};

export default SendForm;