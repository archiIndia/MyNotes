import { PlusIcon, Search, ArchiveX, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import {
  createNewNote,
  getAllNotes,
  deleteNote,
  getSingleNote,
} from "../services/Note.Service";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Modal,
  Textarea,
  TextInput,
} from "@mantine/core";

const AllNotes = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const openModal = () => setIsModalOpened(true);
  const [notes, setNotes] = useState([]);
  const [view_note, setView_note] = useState(null);
  const closeModal = () => {
    setIsModalOpened(false);
    setView_note(null);
  };

  const loadAllNotes = async () => {
    const allNotes = await getAllNotes();
    console.log(allNotes);
    setNotes(allNotes);
  };
  useEffect(() => {
    loadAllNotes();
  }, []);
  const handleDelete = async (delId) => {
    await deleteNote(delId);
    //Store all the Notes which are not Deleted...
    const tempArray = notes.filter((doc) => {
      return doc._id !== delId.toString();
    });
    setNotes(tempArray);
  };
  const handleFetch = async (fId) => {
    const data = await getSingleNote(fId);
    setView_note(data);
    setIsModalOpened(true);
  };

  return (
    <div className={"flex flex-col"}>
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
      <div className="flex flex-col w-72 gap-y-3 mt-2">
        {notes.map((note, inx) => (
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Text size="xl" c="dimmed">
              <p>{note.title}</p>
            </Text>
            <Text size="sm" c="dimmed">
              <p>{note.note_body}</p>
            </Text>

            <div className="mt-4 flex flex-row justify-between">
              <Button
                color="blue"
                radius="md"
                onClick={() => {
                  handleFetch(note._id);
                }}
                leftSection={<Eye size={18} />}
              >
                view
              </Button>
              <Button
                color="red"
                radius="md"
                leftSection={<ArchiveX size={18} />}
                onClick={() => {
                  handleDelete(note._id);
                }}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        opened={isModalOpened}
        onClose={closeModal}
        title={"Add Note"}
        closeOnClickOutside={false}
      >
        <AddNewNote viewNote={view_note} />
      </Modal>
    </div>
  );
};

export default AllNotes;

const AddNewNote = ({ viewNote }) => {
  const [title, setTitle] = useState("");
  const [note_body, setNote_body] = useState("");
  console.log(viewNote);

  useEffect(() => {
    if (viewNote === null) {
      setTitle("");
      setNote_body("");
    } else {
      setTitle(viewNote.title);
      setNote_body(viewNote.note_body);
    }
  }, [viewNote]);

  const handleSave = async () => {
    // console.log(title);
    // console.log(note_body);
    const payloadBody = { _title: title, _note_body: note_body };
    const createdNote = await createNewNote(payloadBody);
  };
  const handleClear = () => {
    setTitle("");
    setNote_body("");
  };
  return (
    <div>
      <form className={"flex flex-col gap-y-2"}>
        <TextInput
          label="Title"
          placeholder="Enter title"
          onChange={(ev) => setTitle(ev.target.value)}
          value={title}
          required
        />
        <Textarea
          label="Content"
          placeholder="Enter content"
          autosize
          onChange={(ev) => setNote_body(ev.target.value)}
          value={note_body}
          required
          maxRows={7}
          minRows={7}
        />
        <div className="flex justify-end ">
        <Button onClick={handleClear} className="mr-2">Clear</Button>
          <Button onClick={handleSave} color="green">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
