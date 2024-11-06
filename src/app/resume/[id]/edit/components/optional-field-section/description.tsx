import DropDownItem from "./base/drop-down-item";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useResumeEditStore } from "@/stores/resume-edit-store";

const Container = styled.div``;

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

const Description = () => {
  const { description, setDescription } = useResumeEditStore((state) => ({
    description: state.description,
    setDescription: state.setDescription,
  }));

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 300) {
      setDescription(value);
    }
  };

  return (
    <Container>
      <DropDownItem label={"자기소개서"}>
        <TextAreaField
          value={description || ""}
          placeholder="최대 300자의 소개 내용을 작성할 수 있습니다."
          onChange={handleChange}
        />
      </DropDownItem>
    </Container>
  );
};

export default Description;
