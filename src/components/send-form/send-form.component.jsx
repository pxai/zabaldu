import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addStoryAsync } from '../../store/story/story.actions';
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { title, link, text, tags, category } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(addStoryAsync(formFields))
    navigate('/')
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
          child='input'
          type='text'
          required
          onChange={handleChange}
          name='title'
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