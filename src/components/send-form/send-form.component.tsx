import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { useTranslation } from 'next-i18next'
import FormInput from '../form-input/form-input';
import Button from '../button/button';
import { useRouter } from 'next/router'
import ModalComponent from '../modal/modal.component';
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Component > About to send: ", {...formFields}) //, submitted: userData })
    try {
      const response = await axios.post(`${process.env.API_URL}/api/story`, formFields)
      router.push(`/`)
    } catch (error) {
      setSubmitError(`${(error as AxiosError).message}`)
      console.log('Error on submit ', error);
    }
  };

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
      <form onSubmit={handleSubmit}>
        <FormInput
          label={t`title`}
          child='input'
          type='text'
          required
          onChange={handleChange}
          name='title'
          value={title}
        />

        <FormInput
          label={t`text`}
          type='text'
          required
          onChange={handleChange}
          name='content'
          value={content}
        />

        <FormInput
          label={t`link`}
          type='text'
          required
          onChange={handleChange}
          name='link'
          value={link}
        />

        <FormInput
          label={t`tags`}
          type='text'
          required
          onChange={handleChange}
          name='tags'
          value={tags}
        />

        <FormInput
          label={t`category`}
          type='text'
          required
          onChange={handleChange}
          name='category'
          value={category}
        />
        <Button type='submit'>{t`submit_story`}</Button>
      </form>
      { /*submitError() && <ModalComponent message={storyError.error} />*/ }
    </div>
  );
};

export default SendForm;