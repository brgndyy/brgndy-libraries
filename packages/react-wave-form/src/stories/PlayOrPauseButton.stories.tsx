import type { Meta, StoryObj, StoryContext } from "@storybook/react";
import React, { useState } from "react";
import { PlayOrPauseButton } from "../components";

interface PlayOrPauseButtonProps {
  audioFileSrc: string;
  className?: string;
  playOrPauseValues?: [string, string] | [React.ReactNode, React.ReactNode];
}

const meta: Meta<typeof PlayOrPauseButton> = {
  title: "WaveForm/PlayOrPauseButton",
  component: PlayOrPauseButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    audioFileSrc: {
      control: "text",
      description: "오디오 파일에 대한 src 경로",
    },
    className: {
      control: "text",
      description: "playOrPauseButton 컴포넌트에 대한 클래스 명",
    },
    playOrPauseValues: {
      control: "array",
      description: "재생 및 일시정지 텍스트 값",
    },
  },
  decorators: [
    (Story, context: StoryContext<PlayOrPauseButtonProps>) => {
      const [isPlaying, setIsPlaying] = useState(false);
      const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
      };

      return (
        <Story
          {...context.args}
          isPlaying={isPlaying}
          onClick={handlePlayPause}
        />
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    audioFileSrc: "/music2.mp3",
    className: "",
    playOrPauseValues: ["Play", "Pause"],
  },
};
