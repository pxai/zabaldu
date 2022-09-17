import { useState } from 'react';
import FormInput from '../form-input/form-input';
import Button from '../button/button';

const defaultFormFields = {
  title: '',
  link: '',
  text: '',
  tags: '',
  category: ''
}

const SendForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { title, link, text, tags, category } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className='products-container'>
      Bidali hemen
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Title'
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={title}
        />

        <FormInput
          label='Text'
          type='text'
          required
          onChange={handleChange}
          name='text'
          value={text}
        />te

        <FormInput
          label='Link'
          type='text'
          required
          onChange={handleChange}
          name='link'
          value={link}
        />

        <FormInput
          label='Tags'
          type='text'
          required
          onChange={handleChange}
          name='tags'
          value={tags}
        />

        <FormInput
          label='Category'
          type='text'
          required
          onChange={handleChange}
          name='category'
          value={category}
        />
        <Button type='submit'>Bidali</Button>
      </form>
    </div>
  );
};

export default SendForm;