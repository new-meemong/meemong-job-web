import { useEffect, useState } from "react";

import FullButton from "@/components/buttons/full-button";
import ResumeEditLabel from "../base/resume-edit-label";
import { Sheet } from "react-modal-sheet";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useResumeEditStore } from "@/stores/resume-edit-store";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

const InputWrapper = styled.div<{ $hasError: boolean }>`
  ${fonts.blackSemi12}
  margin-top: ${pxToVw(12)};

  padding: ${pxToVw(12)};
  width: ${pxToVw(120)};
  height: ${pxToVw(40)};
  outline: none;
  border: ${({ $hasError }) =>
    $hasError
      ? `${pxToVw(1)} solid ${colors.red}`
      : `${pxToVw(1)} solid ${colors.grey}`};
  border-radius: ${pxToVw(4)};
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  ${fonts.blackSemi12}

  /* width: ${pxToVw(70)}; 너비 설정 */
  border: none; /* 테두리 제거 */
  outline: none; /* active 상태에서의 테두리 제거 */
  background-color: transparent; /* 배경을 투명하게 설정 */
  text-align: left; /* 숫자를 오른쪽에 맞추기 (필요시) */

  &::placeholder {
    ${fonts.greySemi12};
  }
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
  background-color: ${colors.white};
`;

const DatePickerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${pxToVw(20)} 0;
`;

const ScrollColumn = styled.div`
  flex: 1;
  height: ${pxToVw(200)};
  overflow-y: scroll;
  text-align: center;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const DateOption = styled.div<{ $isSelected?: boolean }>`
  ${fonts.blackSemi14}
  padding: ${pxToVw(10)} 0;
  color: ${({ $isSelected }) => ($isSelected ? colors.black : colors.grey)};
`;

const ConfirmButton = styled.div`
  width: 100%;
  height: ${pxToVw(48)};
  background-color: ${colors.purplePrimary};
  color: ${colors.white};
`;

const BirthdayInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [safeAreaInsetBottom, setSafeAreaInsetBottom] = useState(0);
  const [selectedYear, setSelectedYear] = useState<number>(1990);
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const years = Array.from({ length: 50 }, (_, i) => 1960 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from(
    { length: new Date(selectedYear, selectedMonth, 0).getDate() },
    (_, i) => i + 1,
  );
  const {
    birthday,
    setBirthday,
    hasDesignerOptionNull,
    hasInternOptionNull,
    appliedRole,
  } = useResumeEditStore((state) => ({
    birthday: state.birthday,
    setBirthday: state.setBirthday,
    hasDesignerOptionNull: state.hasDesignerOptionNull,
    hasInternOptionNull: state.hasInternOptionNull,
    appliedRole: state.appliedRole,
  }));

  let hasError = false;

  if (appliedRole === "디자이너") {
    hasError = !birthday && hasDesignerOptionNull;
  }
  if (appliedRole === "인턴") {
    hasError = !birthday && hasInternOptionNull;
  }

  const handleDateSelect = () => {
    const formattedMonth = String(selectedMonth).padStart(2, "0");
    const formattedDay = String(selectedDay).padStart(2, "0");
    const birthdate = `${selectedYear}${formattedMonth}${formattedDay}`; // 연도 전체 사용
    setBirthday(birthdate);
    setIsOpen(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const insetBottom = getComputedStyle(document.documentElement)
        .getPropertyValue("--safe-area-inset-bottom")
        .trim();

      const result = insetBottom.slice(0, -2);

      setSafeAreaInsetBottom(Number(result));
    }
  }, []);

  return (
    <Container>
      <ResumeEditLabel label={"생년월일*"} />
      <InputWrapper $hasError={hasError}>
        <Input
          type="number"
          placeholder="생년월일 입력"
          value={birthday || ""}
          onClick={() => setIsOpen(true)}
        />
      </InputWrapper>
      <Sheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        snapPoints={[0.4]}
      >
        <Sheet.Backdrop onTap={() => setIsOpen(false)} />
        <SheetContainer>
          <SheetHeader />
          <SheetContent disableDrag={true}>
            <DatePickerContainer>
              <ScrollColumn>
                {years.map((year) => (
                  <DateOption
                    key={year}
                    $isSelected={year === selectedYear}
                    onClick={() => setSelectedYear(year)}
                  >
                    {year}년
                  </DateOption>
                ))}
              </ScrollColumn>
              <ScrollColumn>
                {months.map((month) => (
                  <DateOption
                    key={month}
                    $isSelected={month === selectedMonth}
                    onClick={() => setSelectedMonth(month)}
                  >
                    {month}월
                  </DateOption>
                ))}
              </ScrollColumn>
              <ScrollColumn>
                {days.map((day) => (
                  <DateOption
                    key={day}
                    $isSelected={day === selectedDay}
                    onClick={() => setSelectedDay(day)}
                  >
                    {day}일
                  </DateOption>
                ))}
              </ScrollColumn>
            </DatePickerContainer>
            <FullButton title={"선택완료"} onClick={handleDateSelect} />
          </SheetContent>
        </SheetContainer>
      </Sheet>
    </Container>
  );
};

export default BirthdayInput;
