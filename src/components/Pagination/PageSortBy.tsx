import { ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "@material-tailwind/react";

import { IconButton } from "components/Elements";

export enum SortOrderTypes {
  ascending,
  descending,
}

export class SortOptions {
  options: [string, string][];
  defaultOption: string;

  constructor(sortOptions: [string, string][], defaultSortOption: string) {
    this.options = sortOptions;
    this.defaultOption = defaultSortOption;
  }

  showOptions(
    activeSortOption: string,
    setSortOption: (sortOption: string) => void
  ) {
    return this.options.map(([sortOption, sortDesc]) => (
      <Tooltip content={sortDesc} className="text-secondary" key={sortOption}>
        <p
          className={`mx-2 text-blue-500 ${
            sortOption !== activeSortOption
              ? "hover:underline hover:text-secondary hover:cursor-pointer"
              : "underline font-bold hover:cursor-not-allowed"
          }`}
          onClick={() => setSortOption(sortOption)}
        >
          {sortOption}
        </p>
      </Tooltip>
    ));
  }
}

export type PageSortByProps = {
  activeSortOption: string;
  activeSortOrder: SortOrderTypes;
  sortOptions: SortOptions;
  setSortOption: (newSortOption: string) => void;
  toggleSortOrder: () => void;
};

/*
Adds sorting functionality. Allows user to apply sorting option.

Attributes:
  - sortOptions: [string, string, string][]
    Sort options available.
    [
      [sortOptionKey, displayed text, tooltip message on hover],
      ...
    ]
  
  - setSortOption: function [(newSortOption: string) => void]
    Callback function that is used to sort by the newSortOption.
  
  - activeSortOption: string
    Current sort option.
*/
export const PageSortBy = ({
  activeSortOption,
  activeSortOrder,
  sortOptions,
  setSortOption,
  toggleSortOrder,
}: PageSortByProps) => {
  return (
    <div className="flex justify-center mt-1">
      <p className="mr-2 font-black">Sort by:</p>
      {sortOptions.showOptions(activeSortOption, setSortOption)}
      <Tooltip content={`Sorting ${SortOrderTypes[activeSortOrder]}`}>
        <IconButton
          variant={
            SortOrderTypes[activeSortOrder] ===
            SortOrderTypes[SortOrderTypes.descending]
              ? "text"
              : "gradient"
          }
          className="w-6 h-6 my-auto hover:text-secondary"
          icon={<ArrowsUpDownIcon className="w-4 h-4" />}
          onClick={toggleSortOrder}
        />
      </Tooltip>
    </div>
  );
};
