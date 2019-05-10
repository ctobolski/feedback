import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface FeedbackProps {
  client?: {
    submit: (reaction: string, thoughts?: string) => void;
  };
}

export interface FeedbackButtonProps {
  setReaction: () => void;
  getClassName: () => string;
  testId: string;
  iconName: IconProp;
}
