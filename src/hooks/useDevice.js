export default function useDevice() {
  const width = window.innerWidth;
  return width <= 768 ? "mobile" : "desktop";
}
