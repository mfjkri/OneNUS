import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { Button } from "components/Elements";

type PageNavigatorProps = {
  pageNumber: number;
  maxPageNumber: number;
  goToPage: Function;
};

export const PageNavigator = ({
  pageNumber,
  maxPageNumber,
  goToPage,
}: PageNavigatorProps) => {
  const goPrev = () => {
    goToPage(pageNumber - 1);
  };
  const goNext = () => {
    goToPage(pageNumber + 1);
  };

  return (
    <div>
      <div className="mt-5 flex justify-center align-middle">
        <Button onClick={goPrev} disabled={pageNumber === 1}>
          <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
        </Button>
        <p className="text-center mx-4 my-auto align-middle">
          {pageNumber} out of {maxPageNumber}
        </p>
        <Button onClick={goNext} disabled={pageNumber === maxPageNumber}>
          <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
};
