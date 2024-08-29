"use client"; // 클라이언트 컴포넌트로 설정

import styled from "styled-components";

const BaseContainer = styled.div`
  width: 100%;
  max-width: 390px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  /* border: 1px solid #ccc; */
  padding-bottom: 100px;
`;

export default BaseContainer;
