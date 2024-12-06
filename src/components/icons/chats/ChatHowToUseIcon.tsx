import Image from "next/image";
import React from "react";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

const IconWrapper = styled.div`
  width: ${pxToVw(40)};
  height: ${pxToVw(40)};
  position: relative;
`;

const ChatHowToUseIcon = () => (
  <IconWrapper>
    <Image src="/icons/chats/chat_how_to_use.svg" alt="Chat how to use" fill />
  </IconWrapper>
);

export default ChatHowToUseIcon;
