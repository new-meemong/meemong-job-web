import FullButton from "@/components/buttons/full-button";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { useResumeEditStore } from "@/stores/resume-edit-store";
import { fonts } from "@/styles/fonts";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { TargetType } from "../types/target-type";
import { useResumeListStore } from "@/stores/resume-list-store";

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
  target: TargetType;
}

const BottomArea = ({ selectedRightItems, target }: BottomAreaProps) => {
  const router = useRouter();
  const { setPostingRegions } = useJobPostingEditStore();
  const { setPreferredStoreRegions } = useResumeEditStore();
  const { addResumeFilterQuery } = useResumeListStore((state) => ({
    addResumeFilterQuery: state.addResumeFilterQuery
  }));

  const handleConfirm = () => {
    if (target === "jobPostingEdit") {
      setPostingRegions(selectedRightItems);
    } else if (target === "resumeEdit") {
      setPreferredStoreRegions(selectedRightItems);
    } else if (target === "jobPostingList") {
      // addResumeFilterQuery();
    } else if (target === "resumeList") {
      const selectedKeys = selectedRightItems
        .map((item) => item.key)
        .join(", ");
      addResumeFilterQuery(`preferredStoreRegions=${selectedKeys}`);
    }
    router.back();
  };

  return (
    <Container>
      <CountContainer>
        <SelectedCount>{`선택한 지역 ${selectedRightItems.length}`}</SelectedCount>
        <Label>최대 3개</Label>
      </CountContainer>
      <FullButton title="필터 적용하기" onClick={handleConfirm} />
    </Container>
  );
};

export default BottomArea;
