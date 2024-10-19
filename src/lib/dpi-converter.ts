const pxToVw = (value: number) => `calc(${value} / 390 * min(100vw, 600px))`;

export default pxToVw;
