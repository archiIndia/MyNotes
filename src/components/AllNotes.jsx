import { PlusIcon, Search, ArchiveX, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import moment from "moment";
import {
  createNewNote,
  getAllNotes,
  deleteNote,
  getSingleNote,
  updateSingleNote,
} from "../services/Note.Service";
import { Card, Text, Button, Modal, Textarea, TextInput } from "@mantine/core";

const AllNotes = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [notes, setNotes] = useState([]);
  const [view_note, setView_note] = useState(null);
  const openModal = () => setIsModalOpened(true);
  const closeModal = () => {
    setIsModalOpened(false);
    setView_note(null);
  };

  const loadAllNotes = async () => {
    const allNotes = await getAllNotes();
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
  const noteSave = (value) => {
    console.log(value);
    setNotes([value, ...notes]);
  };
  const noteUpdate = (data) => {
    const position = notes.findIndex((note) => note._id === data._id);
    notes[position] = data;
    setNotes([...notes]);
    setIsModalOpened(false);
  };
  const handleSearch = async (val) => {
    // "goggle.com?find=archi"
    // ?seach=archi
    const qString = `search=${val}`;
    const result = await getAllNotes(qString);
    setNotes([...result]);
  };
  return (
    <div className={"flex flex-col"}>
      <div className={"flex justify-end w-full gap-x-2"}>
        <TextInput
          onChange={(ev) => {
            handleSearch(ev.target.value);
          }
        } placeholder="Search"
        ></TextInput>
        <Button
          color="blue"
          variant="filled"
          leftSection={<PlusIcon size="14" />}
          onClick={openModal}
        >
          New
        </Button>
      </div>
      <div className="flex flex-wrap flex-row gap-x-3 mt-2 row-span-3">
        {notes.map((note, inx) => (
          <div className="w-60 h-72" key={inx}>
            <Card shadow="sm" padding="md" radius="md" withBorder h={250}>
              <div className="flex flex-cols items-centre justify-between">
                <Text size="xl" p={0} c="dimmed">
                  {note.title}
                </Text>
                <Text>{moment(note.date).format("DD-MM-YYYY")}</Text>
              </div>
              <Text size="sm" c="dimmed">
                {note.note_body} 
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
          </div>
        ))}
      </div>

      <Modal
        opened={isModalOpened}
        onClose={closeModal}
        title={"Add Note"}
        closeOnClickOutside={false}
      >
        <AddNewNote
          viewNote={view_note}
          note_save={noteSave}
          note_update={noteUpdate}
        />
      </Modal>
    </div>
  );
};

export default AllNotes;

const AddNewNote = ({ viewNote, note_save, note_update }) => {
  const [title, setTitle] = useState("");
  const [note_body, setNote_body] = useState("");
  const [uId, setUId] = useState(null);

  useEffect(() => {
    if (viewNote === null) {
      setTitle("");
      setNote_body("");
      setUId(null);
    } else {
      setTitle(viewNote.title);
      setNote_body(viewNote.note_body);
      setUId(viewNote._id);
    }
  }, [viewNote]);

  const handleSave = async () => {
    // console.log(title);
    // console.log(note_body);
    const payloadBody = { _title: title, _note_body: note_body };
    const createdNote = await createNewNote(payloadBody);
    note_save(createdNote);
  };
  const handleClear = () => {
    setTitle("");
    setNote_body("");
    setUId(null);
  };
  const handleUpdate = async () => {
    console.log(uId);
    const update = await updateSingleNote(uId, {
      title: title,
      note_body: note_body,
    });
    handleClear();
    note_update(update);
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
          <Button onClick={handleClear} className="mr-2" color="pink">
            Clear
          </Button>
          {uId === null && (
            <Button onClick={handleSave} color="green">
              Save
            </Button>
          )}
          {uId !== null && <Button onClick={handleUpdate}>Update</Button>}
        </div>
      </form>
    </div>
  );
};
