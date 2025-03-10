import PinFillIcon from "@/components/icons/pin-fill-icon";
import PinLineIcon from "@/components/icons/pin-line-icon";
import { colors } from "@/styles/colors";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useJobPostingChatChannelStore } from "@/stores/job-posting-chat-channel-store";

const ButtonWrapper = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: ${pxToVw(60)};
  height: ${pxToVw(60)};
  background-color: ${colors.deepCyan};
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface PinToggleButtonProps {
  channelId: string;
  userId: string;
  isPinned: boolean;
  onToggle?: () => void;
}

const PinToggleButton = ({
  channelId,
  userId,
  isPinned,
  onToggle,
}: PinToggleButtonProps) => {
  const { pinChannel, unpinChannel } = useJobPostingChatChannelStore(
    (state) => ({
      pinChannel: state.pinChannel,
      unpinChannel: state.unpinChannel,
    }),
  );

  const handleTogglePin = async () => {
    if (isPinned) {
      await unpinChannel(channelId, userId);
    } else {
      await pinChannel(channelId, userId);
    }

    onToggle?.();
  };

  return (
    <ButtonWrapper onClick={handleTogglePin}>
      {isPinned ? <PinFillIcon /> : <PinLineIcon />}
    </ButtonWrapper>
  );
};

export default PinToggleButton;
