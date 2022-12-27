import { Chip } from "@material-tailwind/react";
import {
  color,
  dismissible,
} from "@material-tailwind/react/types/components/chip";

import { PostTag, PostTags, PostTagColors } from "../types";

export type PostFlairProps = {
  category: PostTag;
  isActive?: boolean;
  inActiveColor?: color;
  dismissible?: dismissible;
};

export const PostFlair = ({
  category,
  isActive,
  inActiveColor = "blue-gray",
  dismissible,
}: PostFlairProps) => {
  return (
    <Chip
      value={category}
      color={
        isActive === undefined || isActive
          ? (PostTagColors[category] as color)
          : inActiveColor
      }
      dismissible={dismissible}
    ></Chip>
  );
};

type PostFlairFilterProps = {
  category: PostTag;
  activeFilterTag: string;
  onActivate: (newFilterTag: string) => void;
};

const PostFlairFilter = ({
  category,
  activeFilterTag,
  onActivate,
}: PostFlairFilterProps) => {
  const isActive = category === activeFilterTag;

  return (
    <div
      className="hover:cursor-pointer hover:opacity-80"
      onClick={() => {
        if (!isActive) {
          onActivate(category);
        } else {
          onActivate("-");
        }
      }}
    >
      <PostFlair
        category={category}
        isActive={isActive}
        dismissible={
          isActive
            ? {
                onClose: () => {},
              }
            : undefined
        }
      />
    </div>
  );
};

export type PostFlairFiltersProps = {
  activeFilterTag: string;
  setActiveFilterTag: (newFilterTag: string) => void;
};

export const PostFlairFilters = ({
  activeFilterTag,
  setActiveFilterTag,
}: PostFlairFiltersProps) => {
  return (
    <div className="flex flex-row flex-wrap">
      {/* <p className="mr-2 mb-2 font-black">Categories:</p> */}
      <div
        className="hover:cursor-pointer hover:opacity-80"
        onClick={() => setActiveFilterTag("-")}
      >
        <PostFlair category="all" isActive={activeFilterTag === "-"} />
      </div>
      {PostTags.map(([type, _]) => (
        <div className="ml-2 mb-2" key={type}>
          <PostFlairFilter
            category={type as PostTag}
            activeFilterTag={activeFilterTag}
            onActivate={setActiveFilterTag}
          />
        </div>
      ))}
    </div>
  );
};
