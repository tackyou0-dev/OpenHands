import React from "react";
import { useTranslation } from "react-i18next";
import { CopyToClipboardButton } from "./copy-to-clipboard-button";
import { I18nKey } from "#/i18n/declaration";
import { displayErrorToast } from "#/utils/custom-toast-handlers";

export function CopyableContentWrapper({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) {
  const { t } = useTranslation("openhands");
  const [isHovering, setIsHovering] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch {
      displayErrorToast(t(I18nKey.CHAT_INTERFACE$CHAT_MESSAGE_COPY_FAILED));
    }
  };

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isCopied) {
      timeout = setTimeout(() => setIsCopied(false), 2000);
    }
    return () => clearTimeout(timeout);
  }, [isCopied]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute top-2 right-2 z-10">
        <CopyToClipboardButton
          isHidden={!isHovering}
          isDisabled={isCopied}
          onClick={handleCopy}
          mode={isCopied ? "copied" : "copy"}
        />
      </div>
      {children}
    </div>
  );
}
