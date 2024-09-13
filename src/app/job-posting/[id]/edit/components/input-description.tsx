import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${pxToVw(24)};
`;

const HeaderLabel = styled.span`
  ${fonts.greyTextEditLabelBold16}
`;

const HeaderSubLabel = styled.span`
  ${fonts.greyTextEditLabelSemi12}
`;

const TextAreaField = styled.textarea`
  margin-top: ${pxToVw(12)};
  height: ${pxToVw(300)};
  max-height: ${pxToVw(300)};
  resize: none;
  overflow-y: auto; /* 내용이 넘치면 스크롤 표시 */
  border-radius: ${pxToVw(4)};
  padding: ${pxToVw(12)};
  border: ${pxToVw(1)} solid ${colors.greyBorder};

  &:focus {
    border: ${pxToVw(1)} solid ${colors.greyBorder};
    outline: none;
  }

  ${fonts.blackSemi12}

  &::placeholder {
    ${fonts.greySemi12}
  }
`;

const InputDescription = () => {
  const { description, setDescription } = useJobPostingEditStore();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <Container>
      <HeaderLabel>
        상세 설명 <HeaderSubLabel>(선택)</HeaderSubLabel>
      </HeaderLabel>
      <TextAreaField
        value={description || ""}
        placeholder="담당 업무, 직급/직책, 필수 조건, 우대 조건, 학력, 근무 일시 등을 작성해주세요."
        onChange={handleChange}
      />
    </Container>
  );
};

export default InputDescription;
