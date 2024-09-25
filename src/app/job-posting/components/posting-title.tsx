import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Title = styled.h1`
  ${fonts.greyTextBold20}
`;

type PostingTitleProps = Pick<JobPosting, "postingTitle">;

const PostingTitle = ({ postingTitle }: PostingTitleProps) => {
  return <Title>{postingTitle}</Title>;
};

export default PostingTitle;
