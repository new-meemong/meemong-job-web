import FullButton from "@/components/buttons/full-button";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { fonts } from "@/styles/fonts";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${pxToVw(106)};
  padding: ${pxToVw(14)} ${pxToVw(24)};
`;

const CountContainer = styled.div`
  display: flex;
  gap: ${pxToVw(10)};
`;

const SelectedCount = styled.span`
  ${fonts.blackBold14}
`;

const Label = styled.span`
  ${fonts.greyNormal14}
`;

interface BottomAreaProps {
  selectedLeftItem: { key: string; value: string };
  selectedRightItems: { key: string; value: string }[];
}

const BottomArea = ({
  selectedLeftItem,
  selectedRightItems
}: BottomAreaProps) => {
  const { setPostingRegions } = useJobPostingEditStore();
  const router = useRouter();

  return (
    <Container>
      <CountContainer>
        <SelectedCount>{`선택한 지역 ${selectedRightItems.length}`}</SelectedCount>
        <Label>최대 3개</Label>
      </CountContainer>
      <FullButton
        title="필터 적용하기"
        onClick={() => {
          setPostingRegions(selectedRightItems);
          router.back();
        }}
      />
    </Container>
  );
};

export default BottomArea;
