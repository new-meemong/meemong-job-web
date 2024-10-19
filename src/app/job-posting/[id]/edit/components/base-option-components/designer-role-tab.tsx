import { ErrorMessage } from "@/components/error-message";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Container = styled.div``;

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  height: ${pxToVw(40)};
  margin-top: ${pxToVw(8)};
  border-radius: ${pxToVw(4)};
  overflow: hidden;
  margin-bottom: ${pxToVw(8)};
`;

const Tab = styled.div<{ $active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50%;
  height: 100%;
  text-align: center;

  background-color: ${(props) =>
    props.$active ? colors.purpleBackgroundActive : colors.greyBackground};
  ${(props) =>
    props.$active ? fonts.purplePrimaryBold14 : fonts.greyText4Bold14};
`;

const DesignerRoleTab = () => {
  const { role, setRole } = useJobPostingEditStore((state) => ({
    role: state.role,
    setRole: state.setRole
  }));

  return (
    <Container>
      <TabContainer>
        <Tab $active={role === "디자이너"} onClick={() => setRole("디자이너")}>
          {"디자이너"}
        </Tab>
        <Tab $active={role === "인턴"} onClick={() => setRole("인턴")}>
          {"인턴"}
        </Tab>
      </TabContainer>
      {!role && <ErrorMessage>모집 분야를 선택해주세요.</ErrorMessage>}
    </Container>
  );
};

export default DesignerRoleTab;
