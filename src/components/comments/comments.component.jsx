import { useState } from "react";
import { useTranslation } from 'next-i18next'
import CommentComponent from "../comment/comment.component";
import CommentPaginatorComponent from "../paginator/comment-paginator.component";

const CommentsComponent = ({comments}) => {
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const pages = Math.ceil(comments.length / 20);

    return (
        <div id="comments">
            <h2>Iruzkiñak</h2>
            <ol id="comments-list">
                {comments?.map( (comment, i) =>
                   <CommentComponent comment={comment} key={comment.id} number={(page * 10 ) + i+1} />
                )}
            </ol>
            <CommentPaginatorComponent pages={pages} setPage={setPage} />
        </div>
    )
}

export default CommentsComponent;