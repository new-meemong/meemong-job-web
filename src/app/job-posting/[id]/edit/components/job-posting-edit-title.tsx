import { ErrorMessage } from "@/components/error-message";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.span`
  ${fonts.greyTextEditLabelBold16}
`;

const Input = styled.input<{ $hasError: boolean }>`
  ${fonts.blackSemi12}
  margin-top: ${pxToVw(8)};
  margin-bottom: ${pxToVw(8)};
  padding: ${pxToVw(12)};
  width: 100%;
  height: ${pxToVw(40)};
  outline: none;
  background-color: ${colors.greyBackground};
  border: ${({ $hasError }) =>
    $hasError ? `${pxToVw(1)} solid ${colors.red}` : "none"};
  border-radius: ${pxToVw(4)};

  &::placeholder {
    ${fonts.greySemi12};
  }
`;

const JobPostingEditTitle = () => {
  const {
    postingTitle,
    setPostingTitle,
    hasDesignerOptionNull,
    hasInternOptionNull,
    role,
  } = useJobPostingEditStore();
  let hasError = false;

  if (role === "디자이너") {
    hasError = !postingTitle && hasDesignerOptionNull;
  }
  if (role === "인턴") {
    hasError = !postingTitle && hasInternOptionNull;
  }

  return (
    <Container>
      <Label>게시글 제목*</Label>
      <Input
        type="text"
        value={postingTitle || ""}
        onChange={(e) => setPostingTitle(e.target.value)}
        placeholder="제목을 입력해주세요"
        $hasError={hasError}
      />
      {hasError && <ErrorMessage>게시글 제목을 입력해주세요</ErrorMessage>}
    </Container>
  );
};

export default JobPostingEditTitle;
