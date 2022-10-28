export const caltPageFetching = (count: number, limit: number) => {
  return Math.ceil(count / limit)
}
