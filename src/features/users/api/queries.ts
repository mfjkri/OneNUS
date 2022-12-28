export const userKeys = {
  all: ["users"] as const,
  user: (id: number) => [...userKeys.all, id] as const,
};
