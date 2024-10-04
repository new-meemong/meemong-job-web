import ArrowRightGreyIcon from "@/components/icons/arrow-right-grey-icon";
import ArrowRightGreyOutlineIcon from "@/components/icons/arrow-right-grey-outline";
import pxToVw from "@/lib/dpi-converter";
import { fonts } from "@/styles/fonts";
import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const UserImage = styled(Image)`
  width: ${pxToVw(32)};
  height: ${pxToVw(32)};
  border-radius: 50%;
  margin-right: ${pxToVw(12)};
`;

const UserName = styled.div`
  ${fonts.greyTextNormal16}
  flex: 1;
`;

const ArrowRight = styled(ArrowRightGreyOutlineIcon)`
  margin-left: auto;
`;

interface UserProfileProps {
  userImage: string;
  userName: string;
  userId: string;
}

const UserProfile = ({ userImage, userName, userId }: UserProfileProps) => {
  return (
    <Container>
      <UserImage src={userImage} alt={userName} width={32} height={32} />
      <UserName>{userName}</UserName>
      <ArrowRight />
    </Container>
  );
};

export default UserProfile;
