import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.span`
  ${fonts.greyTextEditLabelBold16}
`;

const Input = styled.input`
  ${fonts.blackSemi12}
  margin-top: ${pxToVw(8)};
  padding: ${pxToVw(12)};
  width: 100%;
  height: ${pxToVw(40)};
  outline: none;
  background-color: ${colors.greyBackground};
  border: none;
  border-radius: ${pxToVw(4)};

  &::placeholder {
    ${fonts.greySemi12};
  }
`;

const JobPostingEditTitle = () => {
  const { title, setTitle } = useJobPostingEditStore();
  return (
    <Container>
      <Label>게시글 제목*</Label>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력해주세요"
      />
    </Container>
  );
};

export default JobPostingEditTitle;
