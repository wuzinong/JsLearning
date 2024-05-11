import { useState } from 'react';

function usePagination(totalItems, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  const items = Math.ceil(totalItems / itemsPerPage);
  const maxPage = items > 0 ? items : 1;

  const changePage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= maxPage) {
      setCurrentPage(pageNumber);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < maxPage) {
      changePage(currentPage + 1);
    }
  };

  return { currentPage, changePage, prevPage, nextPage };
}
function App() {
  const [currentPage, changePage] = useState(1);
  const {
    currentPage: paginatedCurrentPage,
    changePage: paginatedChangePage,
    prevPage,
    nextPage,
  } = usePagination(100, 10);

  return (
    <div>
      <p>Current Page: {paginatedCurrentPage}</p>
      <button onClick={() => prevPage()}>Previous</button>
      <button onClick={() => nextPage()}>Next</button>
      <input
        type='number'
        min='1'
        value={currentPage}
        onChange={(e) => changePage(Number(e.target.value))}
      />
      <button onClick={() => paginatedChangePage(currentPage)}>
        Go to Page
      </button>
    </div>
  );
}

export default App;
