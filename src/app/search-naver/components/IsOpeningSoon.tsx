import IsOpeningSoonSelectIcon from "@/components/icons/is-opening-soon-select";
import IsOpeningSoonUnselectIcon from "@/components/icons/is-opening-soon-unselect";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 0 ${pxToVw(24)};
  padding-bottom: ${pxToVw(16)};
`;

const ContentContainer = styled.div<{ $isOpeningSoon: boolean }>`
  ${({ $isOpeningSoon }) =>
    $isOpeningSoon ? fonts.purplePrimaryBold14 : fonts.greyText4Bold14};

  display: flex;
  align-items: center;
  gap: ${pxToVw(4)};
`;

export default function IsOpeningSoon() {
  const { isOpeningSoon, setIsOpeningSoon } = useJobPostingEditStore(
    (state) => ({
      isOpeningSoon: state.isOpeningSoon,
      setIsOpeningSoon: state.setIsOpeningSoon,
    }),
  );

  return (
    <Container>
      <ContentContainer
        onClick={() => setIsOpeningSoon(!isOpeningSoon)}
        $isOpeningSoon={isOpeningSoon}
      >
        오픈예정 매장인가요?
        {isOpeningSoon ? (
          <IsOpeningSoonSelectIcon />
        ) : (
          <IsOpeningSoonUnselectIcon />
        )}
      </ContentContainer>
    </Container>
  );
}
