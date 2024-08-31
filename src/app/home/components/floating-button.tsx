import WriteIcon from "@/components/icons/write-icon";
import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div``;

const WriteButton = styled.div`
  width: ${pxToVw(60)};
  height: ${pxToVw(60)};
  background-color: ${colors.purplePrimary};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: ${pxToVw(0)} ${pxToVw(0)} ${pxToVw(10)} ${pxToVw(1)}
    rgba(93, 84, 183, 0.7);
  position: fixed; /* 화면에 고정 */
  right: ${pxToVw(15)}; /* 오른쪽에서 15px */
  bottom: ${pxToVw(15)}; /* 하단에서 15px */
`;

const WriteButtonText = styled.span`
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: ${pxToVw(10)};
  text-align: center;
  color: ${colors.white};
  margin-top: ${pxToVw(2)};
  white-space: pre-line;
`;

const AdditionalButton = styled(WriteButton)<{ offset: number }>`
  background-color: ${colors.purpleSecondary};
  bottom: ${(props) => props.offset}px;
  right: ${pxToVw(17.5)};
  width: ${pxToVw(55)};
  height: ${pxToVw(55)};
`;

const AdditionalButtonText = styled(WriteButtonText)`
  color: ${colors.black};
`;

const FloatingButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Container>
      {isExpanded && (
        <>
          <AdditionalButton offset={90}>
            <WriteIcon />
            <AdditionalButtonText>{`매장정보\n등록`}</AdditionalButtonText>
          </AdditionalButton>
          <AdditionalButton offset={160}>
            <WriteIcon />
            <AdditionalButtonText>{`이력서\n작성`}</AdditionalButtonText>
          </AdditionalButton>
        </>
      )}
      <WriteButton onClick={toggleExpand}>
        <WriteIcon />
        <WriteButtonText>글쓰기</WriteButtonText>
      </WriteButton>
    </Container>
  );
};

export default FloatingButton;
