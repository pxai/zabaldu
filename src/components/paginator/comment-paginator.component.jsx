import { Pagination, PageButton } from "./paginator.styles";

const CommentPaginatorComponent = ({pages, setPage}) => {
    const changePage = (page) => (event) => {
        event.preventDefault();
        setPage(page)
    };
    if (pages <= 1) return null;
    return (
        <Pagination>
            {
                Array(pages).fill(0).map((_, i) =>
                    <PageButton onClick={changePage(i)} key={`page${i}`}> {i} </PageButton>
                )
            }
        </Pagination>
    )
}

export default CommentPaginatorComponent;