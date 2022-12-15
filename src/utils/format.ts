// Converts from UTCEpocTimestamp to LocalString format (human readable)
export const UTCEpochToLocalDate = (utcEpoc: number) => {
  let d = new Date(0);
  d.setUTCSeconds(utcEpoc);
  return d.toLocaleString();
};
