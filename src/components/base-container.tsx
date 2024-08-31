"use client"; // 클라이언트 컴포넌트로 설정

import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

const BaseContainer = styled.div`
  width: 100%;
  max-width: ${pxToVw(390)};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  /* border: 1px solid #ccc; */
  padding-bottom: ${pxToVw(100)};
`;

export default BaseContainer;
