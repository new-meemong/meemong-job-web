"use client"; // 클라이언트 컴포넌트로 설정

import styled from "styled-components";

const BaseContainer = styled.div`
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  display: flex;
  justify-content: center;

  min-height: 100vh;
  border: 1px solid #ccc;
`;

export default BaseContainer;
