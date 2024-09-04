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

const JobPostingEditTitle = () => {
  return (
    <Container>
      <Label>게시글 제목*</Label>
    </Container>
  );
};

export default JobPostingEditTitle;
