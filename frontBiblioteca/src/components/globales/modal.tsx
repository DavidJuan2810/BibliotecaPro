import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { ReactNode } from "react";

interface ModalGlobalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  actionText?: string;
  onAction?: () => void;
}

export default function ModalGlobal({
  isOpen,
  onOpenChange,
  title,
  children,
  actionText = "Action",
  onAction,
}: ModalGlobalProps) {
  return (
    <Modal
      backdrop="opaque"
      classNames={{
        body: "py-6 [&>form label]:text-gray-800 [&>form label]:!important",
        backdrop: "bg-gray-600/50 backdrop-opacity-40",
        base: "border-gray-800 bg-gray-700 dark:bg-gray-800 text-gray-200",
        header: "border-b-[1px] border-gray-600",
        footer: "border-t-[1px] border-gray-600",
        closeButton: "hover:bg-gray-500/20 active:bg-gray-400/30",
      }}
      isOpen={isOpen}
      radius="lg"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button className="text-sm bg-gray-300 text-gray-700" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              {onAction && (
                <Button
                  className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20 text-gray-200"
                  onPress={() => {
                    onAction();
                    onClose();
                  }}
                >
                  {actionText}
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}