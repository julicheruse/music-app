const capitalize = (s) => {
  if (typeof s !== "string") return "as";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export function toMinsAndSecs(ms) {
  var minutes = Math.floor(ms / 60000);
  var seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export default capitalize;
