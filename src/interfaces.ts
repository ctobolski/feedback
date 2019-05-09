import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface FeedbackProps {
  client: {
    submit: (reaction: string, thoughts?: string) => void;
  };
}

export interface FeedbackButtonProps {
  setReaction: (reaction: string) => void;
  testId: string;
  iconName: IconProp;
}
