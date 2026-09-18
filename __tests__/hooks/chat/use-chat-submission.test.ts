import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useChatSubmission } from "#/hooks/chat/use-chat-submission";

function createChatInputRef(text: string) {
  const div = document.createElement("div");
  div.setAttribute("contenteditable", "true");
  document.body.appendChild(div);
  Object.defineProperty(div, "innerText", {
    value: text,
    configurable: true,
  });
  return {
    ref: { current: div } as React.RefObject<HTMLDivElement | null>,
    div,
    cleanup: () => div.remove(),
  };
}

describe("useChatSubmission", () => {
  it("clears the input and keeps focus there after submit", () => {
    // Arrange
    const { ref, cleanup } = createChatInputRef("hello");
    try {
      const onSubmit = vi.fn();
      const { result } = renderHook(() =>
        useChatSubmission(ref, { current: null }, vi.fn(), onSubmit),
      );

      // Act
      act(() => {
        result.current.handleSubmit();
      });

      // Assert
      expect(onSubmit).toHaveBeenCalledWith("hello");
      expect(ref.current?.textContent).toBe("");
      expect(document.activeElement).toBe(ref.current);
    } finally {
      cleanup();
    }
  });

  it("ignores empty submissions", () => {
    // Arrange
    const { ref, cleanup } = createChatInputRef("   ");
    try {
      const onSubmit = vi.fn();
      const { result } = renderHook(() =>
        useChatSubmission(ref, { current: null }, vi.fn(), onSubmit),
      );

      // Act
      act(() => {
        result.current.handleSubmit();
      });

      // Assert
      expect(onSubmit).not.toHaveBeenCalled();
    } finally {
      cleanup();
    }
  });
});
