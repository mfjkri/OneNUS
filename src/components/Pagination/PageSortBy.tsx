import { ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "@material-tailwind/react";

import { IconButton } from "components/Elements";

/*
Adds sorting functionality. Allows user to apply sorting option.

Attributes:
  - sortOptions: SortOptions
    Sort options available.
    
    sortOption = new SortOptions(
      [
        ["new", "Sort by creation date"],
        ...
      ],
      "new"
    );
  
  - activeSortOption: string
    Currently active sorting option

  - activeSortOrder: string
    Currently active sorting type (descending / ascending)

  - setSortOption: function [(newSortOption: string) => void]
    Handler function to sort by the newSortOption.
  
  - toggleSortOrder: function [() => void]
    Handler function to toggle between sorting tpye (descending vs ascending)
*/

export enum SortOrderTypes {
  ascending,
  descending,
}

export const DefaultSortOrder = SortOrderTypes.descending;

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
    return (
      this.options.length > 1 &&
      this.options.map(([sortOption, sortDesc]) => (
        <Tooltip content={sortDesc} key={sortOption}>
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
      ))
    );
  }
}

export type PageSortByProps = {
  activeSortOption: string;
  activeSortOrder: SortOrderTypes;
  sortOptions: SortOptions;
  setSortOption: (newSortOption: string) => void;
  toggleSortOrder: () => void;
};

export const PageSortBy = ({
  activeSortOption,
  activeSortOrder,
  sortOptions,
  setSortOption,
  toggleSortOrder,
}: PageSortByProps) => {
  return (
    <div className="flex justify-center">
      <p className="mr-2 font-black">Sort by:</p>
      {sortOptions.showOptions(activeSortOption, setSortOption)}
      <IconButton
        tooltip={`Sorting ${SortOrderTypes[activeSortOrder]}`}
        variant={
          SortOrderTypes[activeSortOrder] === SortOrderTypes[DefaultSortOrder]
            ? "text"
            : "gradient"
        }
        className="w-6 h-6 my-auto hover:text-secondary"
        icon={<ArrowsUpDownIcon className="w-4 h-4" />}
        onClick={toggleSortOrder}
      />
    </div>
  );
};
