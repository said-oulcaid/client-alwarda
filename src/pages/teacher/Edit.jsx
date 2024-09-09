
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
  } from "@nextui-org/react";

  const Edit = ({ isOpen, onOpenChange, itemToEdit, SelectEditItem }) => {
    const handelSubmit = (e) => {
      e.preventDefault();
      console.log("submit");
    };
    const openChange = () => {
      if (isOpen) {
        SelectEditItem(null);
      }
      onOpenChange();
    };
    return (
      <Modal isOpen={isOpen} onOpenChange={openChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handelSubmit} className="dark:text-white">
              <ModalHeader className="flex flex-col gap-1">
                Modifié Le enseignat
              </ModalHeader>
              <ModalBody>
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
  
               
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Ferme
                </Button>
                <Button color="success" type="submit">
                Edite
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    );
  };
  
  export default Edit;
  