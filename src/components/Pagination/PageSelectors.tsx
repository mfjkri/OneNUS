import clsx from "clsx";

export type PageSelectorProps = {
  pageNumber: number;
  goToPage: (newPage: number) => void;
};

export const ActivePageSelector = ({ pageNumber }: PageSelectorProps) => {
  return (
    <div className="block h-8 w-8 rounded border-0 bg-blue-600 text-center leading-8 text-secondary">
      {pageNumber}
    </div>
  );
};

export const InactivePageSelector = ({
  pageNumber,
  goToPage,
}: PageSelectorProps) => {
  return (
    <button
      className="block h-8 w-8 rounded bg-secondary dark:bg-primary border-0 text-center leading-8"
      onClick={() => goToPage(pageNumber)}
    >
      {pageNumber}
    </button>
  );
};

export type ChevronSelectorProps = {
  targetPageNumber: number;
  currPageNumber: number;
  maxPageNumber: number;
  goToPage: (newPage: number) => void;
  chevronIcon: JSX.Element;
  selectorType: string;
};

export const ChevronSelector = ({
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
