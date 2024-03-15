import { Button, Group, Modal, Textarea, TextInput } from "@mantine/core";
import { PlusIcon, Search } from "lucide-react";
import { useState } from "react";

const AllNotes = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const closeModal = () => setIsModalOpened(false);
  const openModal = () => setIsModalOpened(true);
  return (
    <div className={"flex"}>
      <div className={"flex justify-end w-full gap-x-2"}>
        <Button variant="default">
          <Search size="14" />
        </Button>{" "}
        <Button
          color="blue"
          variant="filled"
          leftSection={<PlusIcon size="14" />}
          onClick={openModal}
        >
          New
        </Button>
      </div>
      <Modal
        opened={isModalOpened}
        onClose={closeModal}
        title={"Add Note"}
        closeOnClickOutside={false}
      >
        <AddNewNote />
      </Modal>
    </div>
  );
};

export default AllNotes;

const AddNewNote = () => {
  return (
    <div>
      <form className={"flex flex-col gap-y-2"}>
        <TextInput label="Title" placeholder="Enter title" required />
        <Textarea
          label="Content"
          placeholder="Enter content"
          autosize
          required
          maxRows={7}
          minRows={7}
        />
      </form>
    </div>
  );
};
