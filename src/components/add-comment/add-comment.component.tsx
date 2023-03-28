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
    storyId: string
};

const defaultFormFields = {
    content: '',
  }

const AddCommentComponent = ({storyId}: Props) => {
    const { t } = useTranslation();
    const [text, setText] = useState('');
    const [formFields, setFormFields] = useState(defaultFormFields);
    const commentError = {createdComment: null, error: null, isLoading: false, };
    const [submitError, setSubmitError] = useState<string>('');
    const { data: session, status } = useSession();
    const [currentUser, setCurrentUser] = useState<UserProps>(session?.user as UserProps);
    const userData = { user: currentUser.name, user_id: currentUser.id};


    const formik = useFormik<CommentModel>({
        initialValues: formFields,
        onSubmit: async (values) => {
          console.log("Component > About to send: ", storyId, {...values}) //, submitted: userData })
          try {
            const response = await axios.post(`/api/story/${storyId}/comment`, values)
          } catch (error) {
            setSubmitError(`${(error as AxiosError).message}`)
            console.log('Error on submit ', error);
          }
        },
        validationSchema: commentSchema,
      });

   useEffect(() => {
       // if (commentError?.createdComment !== null && !commentError?.error)
            //setText('')
    }, [commentError])
    
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
                <Button type='submit'>{t`submit_story`}</Button>
            </form>
            </div>

            { submitError && <ModalComponent message={submitError} /> }
        </div>
    );
};

export default AddCommentComponent;