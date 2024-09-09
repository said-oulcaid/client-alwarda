import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

const Show = ({ isOpen, onOpenChange }) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      size="lg"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Details d'eleve
            </ModalHeader>
            <ModalBody>
              <div className=" flex  flex-col items-start gap-1 dark:text-white">
                <div className="flex  items-start gap-1">
                  <span className="font-semibold text-gray-400 flex-shrink-0">Nom :</span>
                  <span> Eknke</span>
                </div>
                <div className="flex  items-start gap-1">
                  <span className="font-semibold text-gray-400 flex-shrink-0">Prenom :</span>
                  <span> alami</span>
                </div>
  
                <div className="flex  items-start gap-1">
                  <span className="font-semibold text-gray-400 flex-shrink-0">Télé :</span>
                  <span> +212654879658</span>
                </div>
                <div className="flex  items-start gap-1">
                  <span className="font-semibold text-gray-400 flex-shrink-0">Email :</span>
                  <span> test_test@test.com </span>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Ferme
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Show;
