import { useState } from "react";
import { useTranslation } from 'next-i18next'
import CommentComponent from "../comment/comment.component";
import PaginatorComponent from "../paginator/paginator.component";

const CommentsComponent = ({comments, pages = 1}) => {
    const { t } = useTranslation();
    const [page, setPage] = useState(0);

    return (
        <div id="comments">
            <h2>{t`comments`}</h2>
            <ol id="comments-list">
                {comments?.map( (comment, i) =>
                   <CommentComponent comment={comment} key={comment.id} number={(page * 10 ) + i+1} />
                )}
            </ol>
            <PaginatorComponent pages={pages} setPage={setPage} />
        </div>
    )
}

export default CommentsComponent;