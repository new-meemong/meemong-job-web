const numberToVw = (value: number): number => {
  if (typeof window === "undefined") {
    return value; // 서버에서 실행될 때는 변환하지 않고 원래 값을 반환
  }
  const viewportWidth = Math.min(window.innerWidth, 600);
  return (value / 390) * viewportWidth; // 390px 기준으로 vw 변환
};

export default numberToVw;
