import Image from "next/image";
import React from "react";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

const IconWrapper = styled.div`
  width: ${pxToVw(40)};
  height: ${pxToVw(40)};
  position: relative;
`;

const ChatViewJobPostingIcon = () => (
  <IconWrapper>
    <Image
      src="/icons/chats/chat_view_job_posting.svg"
      alt="Chat view job posting"
      fill
    />
  </IconWrapper>
);

export default ChatViewJobPostingIcon;
