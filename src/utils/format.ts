export const UTCEpochToLocalDate = (utcEpoc: number) => {
  let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(utcEpoc);
  return d.toLocaleString();
};
