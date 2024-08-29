import styled from "styled-components";
import BackIcon from "./header-icons/back-icon";
import TextGreyTextBold18 from "../texts/text-grey-text-bold-18";
import { useRouter } from "next/navigation";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  margin-bottom: 12px;
`;

const LeftContainer = styled.div`
  width: 40px;
`;

const RightContainer = styled.div`
  width: 40px;
`;

const Title = styled(TextGreyTextBold18)``;

interface TitleProps {
  title: string;
}

const Header = ({ title }: TitleProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Container>
      <LeftContainer onClick={handleBackClick}>
        <BackIcon />
      </LeftContainer>
      <Title>{title}</Title>
      <RightContainer />
    </Container>
  );
};

export default Header;
