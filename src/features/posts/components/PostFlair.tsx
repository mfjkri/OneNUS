import { Chip } from "@material-tailwind/react";
import { color } from "@material-tailwind/react/types/components/chip";

import { useAppSelector, useAppDispatch } from "hooks/typedRedux";

import { PostTag, PostTags, PostTagColors } from "../types";
import { setFilterTag, setPageNumber } from "../slices";

export type PostFlairProps = {
  category: PostTag;
};

export const PostFlair = ({ category }: PostFlairProps) => {
  return (
    <Chip value={category} color={PostTagColors[category] as color}></Chip>
  );
};

type FilterPostFlairProps = {
  category: PostTag;
  activeFilterTag: string;
  onActivate: (newFilterTag: string) => void;
};

const FilterPostFlair = ({
  category,
  activeFilterTag,
  onActivate,
}: FilterPostFlairProps) => {
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
      <Chip
        value={category}
        color={isActive ? (PostTagColors[category] as color) : "blue-gray"}
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

export const PostFlairs = () => {
  const activeFilterTag = useAppSelector((state) => state.posts.filterTag);
  const dispatch = useAppDispatch();
  const setActiveFilterTag = (newFilterTag: string) => {
    dispatch(setPageNumber(1));
    dispatch(setFilterTag(newFilterTag));
  };

  return (
    <div className="flex flex-row flex-wrap">
      {/* <p className="mr-2 mb-2 font-black">Categories:</p> */}
      <div
        className="hover:cursor-pointer hover:opacity-80"
        onClick={() => setActiveFilterTag("-")}
      >
        <Chip
          value="ALL"
          color={activeFilterTag === "-" ? "deep-purple" : "blue-gray"}
        />
      </div>
      {PostTags.map(([type, _]) => (
        <div className="ml-2 mb-2" key={type}>
          <FilterPostFlair
            category={type as PostTag}
            activeFilterTag={activeFilterTag}
            onActivate={setActiveFilterTag}
          />
        </div>
      ))}
    </div>
  );
};
