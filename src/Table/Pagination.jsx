import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: lightcoral;
  border: none;
  border-radius: 0.2rem;
  font-weight: 500;
  font-size: 0.9rem;
  color:black;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.3rem 1rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  &:hover:not(:disabled) {
    background-color: lightblue;
    color: black;
  }

  &:hover:disabled {
  cursor: not-allowed;
  }
`;

function Pagination({disabled}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = 1000

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <StyledPagination>

      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft /> <span>Previous</span>
        </PaginationButton>

        <PaginationButton
          onClick={nextPage}
          disabled={disabled}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
