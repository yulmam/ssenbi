import React, { ReactNode } from "react";
import "./AiModal.css";
import XIcon from "@/app/assets/svg/X.svg";

interface AiModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function AiModal({
  isOpen,
  onClose,
  title = "",
  children,
  className,
}: AiModalProps) {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${className || ""}`}>
      <div className="modal-container">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <XIcon />
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
