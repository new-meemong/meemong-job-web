import React, { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const PageContainer = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>;
};

export default PageContainer;