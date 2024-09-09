import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
  } from "@nextui-org/react";
  
  const Create = ({ isOpen, onOpenChange }) => {
    const handelSubmit = (e) => {
      e.preventDefault();
      console.log("submit");
    };
    return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handelSubmit} className="dark:text-white font-bold">
              <ModalHeader className="flex flex-col gap-1">
                Crée une Nouvelle Enseignat
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-1 overflow-y-auto h-[210px]">
                  <Input
                    size="sm"
                    autoFocus
                    label="Nom"
                    placeholder="Entrer Le Nom D'enseignat"
                    variant="bordered"
                  />
                  <Input
                    size="sm"
                    label="Prenom"
                    placeholder="Entrer Le Prenom D'enseignat"
                    variant="bordered"
                  />
                  <Input
                    size="sm"
                    label="Email"
                    placeholder="Entrer Le Mail D'enseignant"
                    variant="bordered"
                  />
                  <Input
                    size="sm"
                    label="Télé"
                    placeholder="Entrer Le Télé D'enseignat"
                    variant="bordered"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Ferme
                </Button>
                <Button color="success" type="submit">
                  Crée
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    );
  };
  
  export default Create;
  