import { useState } from 'react';
import ReactPaginate from 'react-paginate';

interface paginator {
  items: number;
  itemsPerPage: number;
  handleChange: ( val: {
    start: number, end: number 
  }) => void;
}

const Paginator = ({ items, itemsPerPage, handleChange }: paginator) => {

  const [pageCount] = useState<number>(Math.ceil(items / itemsPerPage));

  const handlePageClick = (event: any) => {
    const newOffset = event.selected * itemsPerPage;
    if (event.selected === pageCount - 1) {
      handleChange({
        start: newOffset, 
        end: newOffset + items % itemsPerPage
      });
    } else {
      handleChange({
        start: newOffset, 
        end: newOffset + itemsPerPage - 1
      });
    }
  };

  return (
    <ReactPaginate
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      previousLabel="<"
      pageClassName="rounded-full border border-border text-normaltext m-1 w-8 h-8 text-center align-middle hover:bg-black hover:text-white"
      pageLinkClassName=""
      previousClassName="rounded-full border border-border text-normaltext m-1 w-8 h-8 text-center align-middle hover:bg-black hover:text-white"
      previousLinkClassName=""
      nextClassName="rounded-full border border-border text-normaltext m-1 w-8 h-8 text-center align-middle hover:bg-black hover:text-white"
      nextLinkClassName=""
      breakLabel="..."
      breakClassName="text-normaltext m-1 w-8 h-8 text-center align-middle"
      breakLinkClassName=""
      containerClassName="flex text-xl items-center"
      activeClassName="rounded-full bg-black text-white"
      renderOnZeroPageCount={null}
    />
  );
}

export default Paginator;