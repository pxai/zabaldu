import { useState, useEffect } from "react";
import axios, { AxiosError } from 'axios';
import { useTranslation } from 'next-i18next'
import ModalComponent from "../modal/modal.component";
import Button from '../button/button';
import { useSession } from 'next-auth/react';
import { UserProps, CommentProps } from '../../../prisma/types';
import { useFormik } from 'formik';
import { commentSchema, CommentModel } from '@/pages/api/story/schema';

type Props = {
    storyId: string;
    addComment: Function;
};

const defaultFormFields = {
    content: '',
  }

const AddCommentComponent = ({storyId, addComment}: Props) => {
    const { t } = useTranslation();
    const [text, setText] = useState('');
    const [sending, setSending] = useState<boolean>(false);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const commentError = {createdComment: null, error: null, isLoading: false, };
    const [submitError, setSubmitError] = useState<string>('');
    const { data: session, status } = useSession();
    const [currentUser, setCurrentUser] = useState<UserProps>(session?.user as UserProps);
    const [toggleComment, setToggleComment] = useState<boolean>(true);
    const userData = { user: currentUser.name, user_id: currentUser.id};


    const formik = useFormik<CommentModel>({
        initialValues: formFields,
        onSubmit: async (values) => {
          console.log("Component > About to send: ", storyId, {...values}) //, submitted: userData })
          try {
            setSending(true);
            const response = await axios.post(`/api/story/${storyId}/comment`, values)
            addComment(response.data);
            setToggleComment(true);
          } catch (error) {
            setSubmitError(`${(error as AxiosError).message}`)
            console.log('Error on submit ', error);
          }
          setSending(false);
        },
        validationSchema: commentSchema,
      });

    const openFormHandle = (event: React.MouseEvent<HTMLElement>) => {
      setToggleComment(!toggleComment);
    };

    if (toggleComment) {
      return (
        <div className="add-comment">
          <Button type='button' onClick={openFormHandle}>Bidali iruzkiña</Button>
        </div>
      )
    }
    
    return (
        <div className="add-comment">
            <div>
            <form onSubmit={formik.handleSubmit}>
            <textarea 
                className="form-input" 
                name="content"
                onChange={formik.handleChange} 
                cols={30} rows={10} 
                required
                value={formik.values.content}
                />
                {formik.touched.content && formik.errors.content && <div>{formik.errors.content}</div>}
                <Button type='submit' disabled={sending}>{sending ? 'Bidaltzen...' : 'Bidali iruzkiña'}</Button>
            </form>
            </div>

            { submitError && <ModalComponent message={submitError} /> }
        </div>
    );
};

export default AddCommentComponent;