export default function arrayOf<T>(el: T, count: number): T[] {
  return count ? [el, ...arrayOf(el, count - 1)] : [el];
}
