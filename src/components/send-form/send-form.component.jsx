import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/app.context';
import { useTranslation } from 'react-i18next';
import { addStoryAsync } from '../../store/story/story.actions';
import { selectStoryError } from '../../store/story/story.selector';
import FormInput from '../form-input/form-input';
import Button from '../button/button';
import ModalComponent from '../modal/modal.component';
import './send-form.styles.scss';

const defaultFormFields = {
  title: '',
  link: '',
  text: '',
  tags: '',
  category: ''
}

const SendForm = ({formValues = defaultFormFields, sendAction = addStoryAsync}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storyError = useSelector(selectStoryError);
  const [formFields, setFormFields] = useState(formValues);
  const { title, link, text, tags, category } = formFields;
  const { currentUser } = useContext(UserContext);
  const userData = { user: currentUser.displayName, user_id: currentUser.uid};

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Component > About to send: ", {...formFields, submitted: userData })
    dispatch(sendAction({...formFields, submitted: userData }))
  };

  useEffect(() => {
    console.log("Current user: ", currentUser)
    if (storyError.changedStory !== null && !storyError.error)
      navigate('/')
  }, [storyError])
  

  const submitError = () =>  !storyError.isLoading && storyError.error;

  const handleChange = (event) => {
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
          name='text'
          value={text}
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
      { submitError() && <ModalComponent message={storyError.error} /> }
    </div>
  );
};

export default SendForm;