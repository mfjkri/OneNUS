import { faker } from "@faker-js/faker";

import { Post } from "features/posts";
import { createPost } from "features/posts/api/createPost";
import { delay } from "utils/delay";

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
      commentsCount: randomIntFromInterval(0, 40),
      commentedAt: 0,
      starsCount: randomIntFromInterval(0, 100),
      updatedAt: 10,
      createdAt: 10,
    });
  }
  return currData;
};

export const DefaultFakePostsData: Post[] = CreateFakePostsData(
  randomIntFromInterval(7, 14)
);

export async function SeedDBWithFakePosts() {
  for (let i = 0; i < DefaultFakePostsData.length; i++) {
    await delay(200);
    const fakeData = DefaultFakePostsData[i];
    console.log(fakeData);

    createPost({
      title: fakeData.title,
      tag: fakeData.tag,
      text: fakeData.text,
    });
  }
}
