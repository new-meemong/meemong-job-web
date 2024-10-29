import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { fonts } from "@/styles/fonts";
import { useState } from "react";
import { Sheet } from "react-modal-sheet";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  ${fonts.purplePrimarySemi14};
  padding: ${pxToVw(8)} 0;
  width: ${pxToVw(120)};
  flex-shrink: 0;
`;

const WorkTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const WorkTimeInput = styled.div<{ $isEmpty: boolean }>`
  width: 100%;
  border: none;
  outline: none;
  background: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  padding: 0;
  margin: 0;
  box-shadow: none;
  -webkit-appearance: none; /* 모바일 브라우저 기본 스타일 제거 */
  -moz-appearance: none;
  appearance: none;

  ${(props) =>
    props.$isEmpty ? fonts.greyPlaceholderBold14 : fonts.purplePrimaryBold14};
`;

const SheetContainer = styled(Sheet.Container)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top-right-radius: ${pxToVw(30)} !important;
  border-top-left-radius: ${pxToVw(30)} !important;
`;

const SheetHeader = styled(Sheet.Header)``;

const SheetContent = styled(Sheet.Content)`
  height: 100%;
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(24)};
`;

const Scroller = styled(Sheet.Scroller)`
  max-height: 60vh; /* 모달 내 콘텐츠의 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤 활성화 */
`;

const TimeOption = styled.div`
  padding: ${pxToVw(10)} 0;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  text-align: center;
  ${fonts.blackSemi14};
`;

const InputWorkTime = () => {
  const { startWorkTime, endWorkTime, setStartWorkTime, setEndWorkTime } =
    useJobPostingEditStore();
  const [isStartTimeModalOpen, setIsStartTimeModalOpen] = useState(false);
  const [isEndTimeModalOpen, setIsEndTimeModalOpen] = useState(false);

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour <= 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 24 && minute > 0) break; // 24:30은 없으므로 break
        const formattedHour = String(hour).padStart(2, "0");
        const formattedMinute = String(minute).padStart(2, "0");
        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return times;
  };

  const handleOpenStartTimeModal = () => {
    setIsStartTimeModalOpen(true);
  };

  const handleOpenEndTimeModal = () => {
    setIsEndTimeModalOpen(true);
  };

  const handleCloseStartTimeModal = () => {
    setIsStartTimeModalOpen(false);
  };

  const handleCloseEndTimeModal = () => {
    setIsEndTimeModalOpen(false);
  };

  const handleStartTimeSelect = (time: string) => {
    setStartWorkTime(time); // 선택한 시간을 startWorkTime에 반영
    handleCloseStartTimeModal(); // 모달 닫기
  };

  const handleEndTimeSelect = (time: string) => {
    setEndWorkTime(time); // 선택한 시간을 endWorkTime에 반영
    handleCloseEndTimeModal(); // 모달 닫기
  };

  return (
    <Container>
      <Label>근무 시간</Label>
      <WorkTimeWrapper>
        <WorkTimeInput
          $isEmpty={!startWorkTime}
          onClick={handleOpenStartTimeModal}
        >
          {startWorkTime || "00:00"}
        </WorkTimeInput>
        <div> ~ </div>
        <WorkTimeInput $isEmpty={!endWorkTime} onClick={handleOpenEndTimeModal}>
          {endWorkTime || "00:00"}
        </WorkTimeInput>
      </WorkTimeWrapper>
      <Sheet
        isOpen={isStartTimeModalOpen}
        onClose={handleCloseStartTimeModal}
        snapPoints={[0.6]}
      >
        <Sheet.Backdrop
          onTap={() => {
            setStartWorkTime(null);
            handleCloseStartTimeModal();
          }}
        />
        <SheetContainer>
          <SheetHeader />
          <SheetContent disableDrag={true}>
            <Scroller>
              {generateTimeOptions().map((time) => (
                <TimeOption
                  key={time}
                  onClick={() => handleStartTimeSelect(time)}
                >
                  {time}
                </TimeOption>
              ))}
            </Scroller>
          </SheetContent>
        </SheetContainer>
      </Sheet>
      <Sheet
        isOpen={isEndTimeModalOpen}
        onClose={handleCloseEndTimeModal}
        snapPoints={[0.6]}
      >
        <Sheet.Backdrop
          onTap={() => {
            setEndWorkTime(null);
            handleCloseEndTimeModal();
          }}
        />
        <SheetContainer>
          <SheetHeader />
          <SheetContent disableDrag={true}>
            <Scroller>
              {generateTimeOptions().map((time) => (
                <TimeOption
                  key={time}
                  onClick={() => handleEndTimeSelect(time)}
                >
                  {time}
                </TimeOption>
              ))}
            </Scroller>
          </SheetContent>
        </SheetContainer>
      </Sheet>
    </Container>
  );
};

export default InputWorkTime;
