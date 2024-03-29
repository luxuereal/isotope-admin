import useParticipantStore from "@/store/use-participant";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

interface paginator {
  items: number;
  itemsPerPage: number;
  handleChange: (val: { start: number; end: number }) => void;
}

const Paginator = ({ items, itemsPerPage, handleChange }: paginator) => {
  const [pageCount, setPageCount] = useState<number>(1);
  const { selected_page, setPage } = useParticipantStore((state) => state);
  useEffect(() => {
    setPageCount(Math.ceil(items / itemsPerPage));
  }, [items, itemsPerPage]);

  const handlePageClick = (event: any) => {
    setPage(Number(event.selected))
    const newOffset = event.selected * itemsPerPage;
    if (event.selected === pageCount - 1) {
      handleChange({
        start: newOffset,
        end: newOffset + items - itemsPerPage * event.selected - 1,
      });
    } else {
      handleChange({
        start: newOffset,
        end: newOffset + itemsPerPage - 1,
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
      // initialPage={selected_page}
      disableInitialCallback={false}
      previousLabel="<"
      pageClassName="rounded-full border border-border text-normaltext m-1 sm:w-8 sm:h-8 w-5 h-5 text-center align-middle hover:bg-black hover:text-white"
      pageLinkClassName=""
      previousClassName="rounded-full border border-border text-normaltext m-1 sm:w-8 sm:h-8 w-5 h-5 text-center align-middle hover:bg-black hover:text-white"
      previousLinkClassName=""
      nextClassName="rounded-full border border-border text-normaltext m-1 sm:w-8 sm:h-8 w-5 h-5 text-center align-middle hover:bg-black hover:text-white"
      nextLinkClassName=""
      breakLabel="..."
      breakClassName="text-normaltext m-1 sm:w-8 sm:h-8 w-5 h-5 text-center align-middle"
      breakLinkClassName=""
      containerClassName="flex text-xl items-center absolute right-0 sm:text-xl text-xs"
      activeClassName="rounded-full bg-black text-white"
      renderOnZeroPageCount={null}
    />
  );
};

export default Paginator;
