import WriteIcon from "@/components/icons/write-icon";
import { colors } from "@/styles/styles";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div``;

const WriteButton = styled.div`
  width: 60px;
  height: 60px;
  background-color: ${colors.purple_primary};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 10px 1px rgba(93, 84, 183, 0.7);
  position: fixed; /* 화면에 고정 */
  right: 15px; /* 오른쪽에서 15px */
  bottom: 15px; /* 하단에서 15px */
`;

const WriteButtonText = styled.span`
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 10px;
  text-align: center;
  color: ${colors.white};
  margin-top: 2px;
  white-space: pre-line;
`;

const AdditionalButton = styled(WriteButton)<{ offset: number }>`
  background-color: ${colors.purple_secondary};
  bottom: ${(props) => props.offset}px;
  right: 17.5px;
  width: 55px;
  height: 55px;
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
