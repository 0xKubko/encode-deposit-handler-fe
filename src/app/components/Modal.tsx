import { useEffect, useRef } from "react";

interface ModalProps {
  children: React.ReactNode;
  visible: boolean;
}

export function Modal({children, visible}: ModalProps) {
    const modalRef = useRef<HTMLDialogElement>(null);
  
    useEffect(() => {
      if (!modalRef.current) {
        return;
      }
      if (visible) {
        modalRef.current.showModal();
      } else {
        modalRef.current.close();
      }
    }, [visible]);

    return (
        <dialog ref={modalRef} className="modal">
          <div className="modal-box">
            {children}
          </div>
        </dialog>
      );
    }