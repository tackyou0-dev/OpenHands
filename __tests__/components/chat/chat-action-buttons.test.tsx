import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ChatSendButton } from "#/components/features/chat/chat-send-button";
import { ChatStopButton } from "#/components/features/chat/chat-stop-button";
import { ChatResumeAgentButton } from "#/components/features/chat/chat-play-button";

// Return the key so accessible names stay locale-independent.
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("ChatSendButton", () => {
  it("exposes a localized accessible name", () => {
    render(
      <ChatSendButton buttonClassName="" handleSubmit={() => {}} disabled />,
    );

    expect(screen.getByTestId("submit-button")).toHaveAccessibleName(
      "BUTTON$SEND",
    );
  });
});

describe("ChatStopButton", () => {
  it("exposes a localized accessible name", () => {
    render(<ChatStopButton handleStop={() => {}} />);

    expect(screen.getByTestId("stop-button")).toHaveAccessibleName(
      "BUTTON$STOP",
    );
  });
});

describe("ChatResumeAgentButton", () => {
  it("exposes a localized accessible name", () => {
    render(<ChatResumeAgentButton onAgentResumed={() => {}} />);

    expect(screen.getByTestId("play-button")).toHaveAccessibleName(
      "AGENT$RESUME_TASK",
    );
  });
});
