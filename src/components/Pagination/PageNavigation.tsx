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
      <div className="flex justify-center">
        <Button onClick={goPrev} disabled={pageNumber === 1}>
          <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
        </Button>
        <Button
          className="ml-5"
          onClick={goNext}
          disabled={pageNumber === maxPageNumber}
        >
          <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
};
