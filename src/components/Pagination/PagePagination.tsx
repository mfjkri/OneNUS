import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";

import {
  ActivePageSelector,
  InactivePageSelector,
  ChevronSelector,
} from "./PageSelectors";

/*
Adds pagination functionality. Allows user to navigate between pages.

Attributes:
  - pageNumber: number
    The current page number.
  
  - maxPageNumber: number
    The current maximum page number.
  
  - goToPage: function [(newPage: number) => void]
    Callback function that is used to go to the newPage number.

  - totalPagesShown: number
    How many pages number to show at once. Defaults to 5.
*/

export type PagePaginatorProps = {
  pageNumber: number;
  maxPageNumber: number;
  goToPage: (newPage: number) => void;
  totalPagesShown?: number;
};

export const PagePaginator = ({
  pageNumber,
  maxPageNumber,
  goToPage,
  totalPagesShown = 5,
}: PagePaginatorProps) => {
  const initialPageRange =
    Math.floor((pageNumber - 1) / totalPagesShown) * totalPagesShown;

  const pageNumbers = Array.from(
    {
      length: Math.min(
        totalPagesShown,
        Math.max(maxPageNumber - initialPageRange, 1)
      ),
    },
    (_, i) => i + 1 + initialPageRange
  );

  const showExtremeSelectors = maxPageNumber > totalPagesShown;

  return (
    <>
      <ol className="flex justify-center gap-1 text-xs font-bold text-primary dark:text-secondary">
        {showExtremeSelectors && (
          <ChevronSelector
            targetPageNumber={1}
            currPageNumber={pageNumber}
            maxPageNumber={maxPageNumber}
            goToPage={goToPage}
            selectorType="first"
            chevronIcon={
              <ChevronDoubleLeftIcon className="h-3 w-3" aria-hidden="true" />
            }
          />
        )}
        <ChevronSelector
          targetPageNumber={pageNumber - 1}
          currPageNumber={pageNumber}
          maxPageNumber={maxPageNumber}
          goToPage={goToPage}
          selectorType="prev"
          chevronIcon={
            <ChevronLeftIcon className="h-3 w-3" aria-hidden="true" />
          }
        />

        {pageNumbers.map((currPageNumber: number) => (
          <li key={currPageNumber}>
            {currPageNumber === pageNumber ? (
              <ActivePageSelector pageNumber={pageNumber} goToPage={goToPage} />
            ) : (
              <InactivePageSelector
                pageNumber={currPageNumber}
                goToPage={goToPage}
              />
            )}
          </li>
        ))}

        <ChevronSelector
          targetPageNumber={pageNumber + 1}
          currPageNumber={pageNumber}
          maxPageNumber={maxPageNumber}
          goToPage={goToPage}
          selectorType="next"
          chevronIcon={
            <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
          }
        />
        {showExtremeSelectors && (
          <ChevronSelector
            targetPageNumber={maxPageNumber}
            currPageNumber={pageNumber}
            maxPageNumber={maxPageNumber}
            goToPage={goToPage}
            selectorType="last"
            chevronIcon={
              <ChevronDoubleRightIcon className="h-3 w-3" aria-hidden="true" />
            }
          />
        )}
      </ol>
    </>
  );
};
