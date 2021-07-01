export default function timestamp(time) {
  const oldTime = (new Date(time)).getTime() / 1000;
  return oldTime;
}
