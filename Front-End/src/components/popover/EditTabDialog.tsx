import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { useContext, useState } from "react";
import { PiPencil } from "react-icons/pi";
import LoginInput from "../LoginInput/LoginInput";
import { Tab } from "../Tabs/classTab";
import { TabContext } from "../../context/TabContext";

interface IpropComp {
  tabe: Tab
}

const EditeTabDialog = ({ tabe }: IpropComp) => {
  const { updateTab } = useContext(TabContext);
  const [name, setName] = useState(tabe.name);
  const [description, setDescription] = useState(tabe.description);
  const [isOpen, setIsOpen] = useState(false);

  const Update = (tabToAtualize: Tab) => {
    const tab: Tab = {
      name,
      description,
      id: tabToAtualize.id,
      user_id: tabToAtualize.user_id,
    };
    updateTab(tab);
    setIsOpen(false);
  };

  return (
    <Dialog.Root role="alertdialog" open={isOpen}>
      <Dialog.Trigger asChild>
        <PiPencil onClick={() => setIsOpen(true)} />
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display={"flex"} direction={'column'} justifyContent={"space-between"} p={'1.5em'}>
              <Dialog.Title>Editar tarefa</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" onClick={() => setIsOpen(false)} />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body p={'1em'}>
              <LoginInput labelInput="Nome" value={name} type="text" onChange={setName} />
              <LoginInput labelInput="Descrição" type="text" value={description} onChange={setDescription} />
            </Dialog.Body>
            <Dialog.Footer p={'1.5em'}>
              <Dialog.ActionTrigger asChild>
                <Button onClick={() => setIsOpen(false)} variant="outline">Cancelar</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={() => Update(tabe)}>Salvar</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
export default EditeTabDialog