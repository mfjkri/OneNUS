import { faker } from "@faker-js/faker";

import { Post } from "features/posts";

function randomIntFromInterval(min: number, max: number) {
  // [min, max]: int
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const ValidTags: Array<string> = ["general", "cs", "life", "misc"];

export const CreateFakePostsData = (n: number): Post[] => {
  const currData: Post[] = [];
  for (let i = 0; i < n; i = i + 1) {
    currData.push({
      id: String(i),
      title: faker.lorem.sentence(randomIntFromInterval(4, 10)),
      tag: ValidTags[randomIntFromInterval(0, ValidTags.length - 1)],
      text: faker.lorem.sentences(randomIntFromInterval(4, 10)),
      author: faker.name.firstName(),
      repliesCount: randomIntFromInterval(0, 40),
      updatedAt: 10,
      createdAt: 10,
    });
  }
  return currData;
};

export const DefaultFakePostsData: Post[] = CreateFakePostsData(10);

export const OldFakePostsData: Post[] = [
  {
    id: "1",
    title: "Lorem ipsum dolor sit",
    tag: "misc",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, harum? Magnam assumenda atque maxime unde animi reprehenderit nobis minus architecto, delectus deserunt aliquam quibusdam vitae iste excepturi nostrum earum asperiores, et velit nulla! Earum fuga enim, eveniet culpa nemo odit ut cum minima! Ab ducimus possimus voluptates quibusdam molestiae, pariatur tempore. Qui minus at numquam unde exercitationem suscipit, hic amet expedita assumenda. Porro fugit, est voluptates illum quis dolorem magni cupiditate quas aliquam aliquid nam facere beatae vitae exercitationem dicta tenetur sunt voluptatibus doloremque corporis. Veniam, quasi doloremque eveniet, tenetur recusandae quibusdam sequi dicta corrupti iure sint debitis, praesentium quo?",
    author: "nobody",
    repliesCount: 2,
    updatedAt: 10,
    createdAt: 10,
  },
  {
    id: "2",
    title: "Another reason why",
    tag: "misc",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, harum? Magnam assumenda atque maxime unde animi reprehenderit nobis minus architecto, delectus deserunt aliquam quibusdam vitae iste excepturi nostrum earum asperiores, et velit nulla! Earum fuga enim, eveniet culpa nemo odit ut cum minima! Ab ducimus possimus voluptates quibusdam molestiae, pariatur tempore. Qui minus at numquam unde exercitationem suscipit, hic amet expedita assumenda. Porro fugit, est voluptates illum quis dolorem magni cupiditate quas aliquam aliquid nam facere beatae vitae exercitationem dicta tenetur sunt voluptatibus doloremque corporis. Veniam, quasi doloremque eveniet, tenetur recusandae quibusdam sequi dicta corrupti iure sint debitis, praesentium quo?",
    author: "sombody",
    repliesCount: 5,
    updatedAt: 100,
    createdAt: 100,
  },
];
