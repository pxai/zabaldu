import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { useTranslation } from 'next-i18next'
import FormInput from '../form-input/form-input';
import Button from '../button/button';
import { useRouter } from 'next/router'
import ModalComponent from '../modal/modal.component';
import './send-form.module.scss';
import { ErrorMessage, FormikHelpers, useFormik } from 'formik';
import * as yup from 'yup';
import { storySchema, StoryModel } from '@/pages/api/story/schema';

const defaultFormFields = {
  title: '',
  link: '',
  content: '',
  tags: '',
  category: ''
}

const SendForm = ({formValues = defaultFormFields, sendAction }: any) => {
  const { t } = useTranslation();

  const [formFields, setFormFields] = useState(formValues);
  const [submitError, setSubmitError] = useState<string>('');
  const router = useRouter()
  const { title, link, content, tags, category } = formFields;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Component > About to send: ", {...formFields}) //, submitted: userData })
    try {
      const response = await axios.post(`/api/story`, formFields)
      router.push(`/`)
    } catch (error) {
      setSubmitError(`${(error as AxiosError).message}`)
      console.log('Error on submit ', error);
    }
  };

  const formik = useFormik<StoryModel>({
    initialValues: formFields,
    onSubmit: async (values) => {
      console.log("Component > About to send: ", {...values}) //, submitted: userData })
      try {
        const response = await axios.post(`/api/story`, values)
        router.push(`/`)
      } catch (error) {
        setSubmitError(`${(error as AxiosError).message}`)
        console.log('Error on submit ', error);
      }
    },
    validationSchema: storySchema,
  });

  useEffect(() => {
   // if (storyError.changedStory !== null && !storyError.error)
      console.log("Nagivate")
      //navigate('/')
  }, [])
  

  //const submitError = () =>  !storyError.isLoading && storyError.error;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
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
          label={t`text`}
          type='text'
          required
          onChange={formik.handleChange}
          name='content'
          value={formik.values.content}
        />

        <FormInput
          label={t`link`}
          type='text'
          required
          onChange={formik.handleChange}
          name='link'
          value={formik.values.link}
        />

        <FormInput
          label={t`tags`}
          type='text'
          required
          onChange={formik.handleChange}
          name='tags'
          value={formik.values.tags}
        />

        <FormInput
          label={t`category`}
          type='text'
          required
          onChange={formik.handleChange}
          name='category'
          value={formik.values.category}
        />
        <Button type='submit'>{t`submit_story`}</Button>
      </form>
      { /*submitError() && <ModalComponent message={storyError.error} />*/ }
    </div>
  );
};

export default SendForm;


/*

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { FormikHelpers, useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'next-i18next'
import FormInput from '../form-input/form-input';
import Button from '../button/button';
import { useRouter } from 'next/router'
import ModalComponent from '../modal/modal.component';
import { storySchema, StoryModel } from '@/pages/api/story/schema';
import './send-form.module.scss';


const defaultFormFields = {
  title: '',
  link: '',
  content: '',
  tags: '',
  category: ''
}

const SendForm = ({formValues = defaultFormFields, sendAction }: any) => {
  const { t } = useTranslation();

  const [formFields, setFormFields] = useState(formValues);
  const [submitError, setSubmitError] = useState<string>('');
  const router = useRouter()
  const { title, link, content, tags, category } = formFields;

  const handleSubmit = async (values: StoryModel, formikHelpers: FormikHelpers<StoryModel>) => {
    //event.preventDefault();
    console.log("Component > About to send: ", {...formikHelpers}) //, submitted: userData })
    try {
      const response = await axios.post(`/api/story`, formFields)
      router.push(`/`)
    } catch (error) {
      setSubmitError(`${(error as AxiosError).message}`)
      console.log('Error on submit ', error);
    }
  };

  const formik = useFormik<StoryModel>({
    initialValues: formFields,
    onSubmit: handleSubmit,
    validationSchema: storySchema,
  });


  useEffect(() => {
   // if (storyError.changedStory !== null && !storyError.error)
      console.log("Nagivate")
      //navigate('/')
  }, [])
  

  //const submitError = () =>  !storyError.isLoading && storyError.error;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="send-form">
      <h3>{t`send_story`}</h3>
      <form onSubmit={formik.handleSubmit}>
      <FormInput
          label={t`title`}
          child='input'
          type='text'
          required
          onChange={handleChange}
          name='title'
          value={title}
        />
        {formik.errors.title && (<div className="text-danger">{formik.errors.title}</div>)}

      <FormInput
          label={t`content`}
          child='input'
          type='text'
          required
          onChange={handleChange}
          name='content'
          value={content}
        />
        {formik.errors.content && (<div className="text-danger">{formik.errors.content}</div>)}
        
        <FormInput
          label={t`link`}
          child='input'
          type='text'
          required
          onChange={handleChange}
          name='link'
          value={link}
        />
        {formik.errors.link && (<div className="text-danger">{formik.errors.link}</div>)}
        
        <FormInput
          label={t`tags`}
          child='input'
          type='text'
          required
          onChange={handleChange}
          name='tags'
          value={tags}
        />
        {formik.errors.tags && (<div className="text-danger">{formik.errors.tags}</div>)}

      <FormInput
          label={t`category`}
          child='input'
          type='text'
          required
          onChange={handleChange}
          name='category'
          value={category}
        />
        {formik.errors.category && (<div className="text-danger">{formik.errors.category}</div>)}
        <Button type='submit'>{t`submit_story`}</Button>
      </form>
      { submitError !== '' && <ModalComponent message={submitError} /> }
    </div>
  );
};

export default SendForm;
*/