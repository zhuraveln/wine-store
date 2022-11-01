export const calcPageFetching = (count: number, limit: number) => {
  return Math.ceil(count / limit)
}
