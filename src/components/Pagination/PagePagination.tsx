import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";

type PageSelectorProps = {
  pageNumber: number;
  goToPage: (newPage: number) => void;
};

const InactivePageSelector = ({ pageNumber, goToPage }: PageSelectorProps) => {
  return (
    <button
      className="block h-8 w-8 rounded bg-secondary dark:bg-primary border-0 text-center leading-8"
      onClick={() => goToPage(pageNumber)}
    >
      {pageNumber}
    </button>
  );
};

const ActivePageSelector = ({ pageNumber }: PageSelectorProps) => {
  return (
    <div className="block h-8 w-8 rounded border-0 bg-blue-600 text-center leading-8 text-secondary">
      {pageNumber}
    </div>
  );
};

type ChevronSelectorProps = {
  targetPageNumber: number;
  currPageNumber: number;
  maxPageNumber: number;
  goToPage: (newPage: number) => void;
  chevronIcon: JSX.Element;
  selectorType: string;
};

const ChevronSelector = ({
  targetPageNumber,
  currPageNumber,
  maxPageNumber,
  goToPage,
  chevronIcon,
  selectorType,
}: ChevronSelectorProps) => {
  const isDisabled =
    targetPageNumber < 1 ||
    targetPageNumber > maxPageNumber ||
    targetPageNumber === currPageNumber;
  return (
    <li key={`chevron_${selectorType}_${targetPageNumber}`}>
      <button
        className={clsx(
          "inline-flex h-8 w-8 items-center justify-center bg-secondary2 dark:bg-primary2 rounded border-0",
          isDisabled && `hover:cursor-not-allowed`
        )}
        disabled={isDisabled}
        onClick={() => goToPage(targetPageNumber)}
      >
        {chevronIcon}
      </button>
    </li>
  );
};

export type PagePaginatorProps = {
  pageNumber: number;
  maxPageNumber: number;
  goToPage: (newPage: number) => void;
  totalPagesShown?: number;
};

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
    <div>
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
    </div>
  );
};
