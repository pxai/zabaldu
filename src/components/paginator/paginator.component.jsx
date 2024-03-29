import { Pagination, PageButton } from "./paginator.styles";
import { useRouter } from 'next/router'

const PaginatorComponent = ({pages, setPage}) => {
    const router = useRouter()
    const changePage = (page) => (event) => {
        event.preventDefault();
        setPage(page)
        router.push(`/story/page/{page}`)
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

export default PaginatorComponent;