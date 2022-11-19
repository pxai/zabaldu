import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addStoryAsync } from '../../store/story/story.actions';
import { selectStoryError } from '../../store/story/story.selector';
import FormInput from '../form-input/form-input';
import Button from '../button/button';
import ModalComponent from '../modal/modal.component';

const defaultFormFields = {
  title: '',
  link: '',
  text: '',
  tags: '',
  category: ''
}

const SendForm = ({formValues = defaultFormFields, sendAction = addStoryAsync}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storyError = useSelector(selectStoryError);
  const [formFields, setFormFields] = useState(formValues);
  const { id, title, link, text, tags, category } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Component > About to send: ", formFields)
    dispatch(sendAction(formFields))
  };

  useEffect(() => {
    if (storyError.changedStory !== null && !storyError.error)
      navigate('/')
  }, [storyError])
  

  const submitError = () =>  !storyError.isLoading && storyError.error;

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
      { submitError() && <ModalComponent message={storyError.error} /> }
    </div>
  );
};

export default SendForm;