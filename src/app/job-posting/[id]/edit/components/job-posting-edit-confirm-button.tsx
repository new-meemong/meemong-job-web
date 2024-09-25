import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  height: ${pxToVw(70)};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
`;

const Button = styled.div`
  ${fonts.whiteBold16}
  height: ${pxToVw(48)};
  width: ${pxToVw(336)};
  background-color: ${colors.purplePrimary};
  border-radius: ${pxToVw(4)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const JobPostingEditConfirmButton = () => {
  const { submitDesignerJobPosting, submitInternJobPosting, role } =
    useJobPostingEditStore();
  const router = useRouter();

  const handleConfirm = async () => {
    if (role === "디자이너") {
      const submit = await submitDesignerJobPosting();
      if (submit) {
        router.back();
      }
    } else if (role === "인턴") {
      const submit = await submitInternJobPosting();
      if (submit) {
        router.back();
      }
    }
  };

  return (
    <Container>
      <Button onClick={handleConfirm}>공고 수정하기</Button>
    </Container>
  );
};

export default JobPostingEditConfirmButton;
