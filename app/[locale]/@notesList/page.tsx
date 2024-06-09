"use client"

import {Stack, TextField} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Note, {getNotes} from "@/app/_models/Note";
import NoteCard, {AddNoteCard} from "@/app/[locale]/@notesList/note-card";
import React, {useContext, useState} from "react";
import {useScopedI18n} from "@/config/locales/client";
import {NotesListContext} from "@/app/[locale]/@notesList/notes-context";

export default function NotesList() {
    let {notes} = useContext(NotesListContext) as { notes: Note[] };
    notes = notes || [];
    const [searchFilter, setSearchFilter]
        = useState((() => () => true) as () => (note: Note) => boolean);
    return (
        <Stack className="w-1/4 pr-4 pt-4 pl-4 h-full overflow-y-auto overflow-x-clip" gap={1}>
            <NotesSearch notes={notes} setSearchFilter={setSearchFilter}/>
            <AddNoteCard />
            {
                notes.filter(searchFilter).map(note => <NoteCard note={note} key={note.id}/>)
            }
        </Stack>
    )
}

function NotesSearch({notes, setSearchFilter}: { notes: Note[],
    setSearchFilter: React.Dispatch<React.SetStateAction<(note: Note) => boolean>> }) {
    const scopedT = useScopedI18n("notesList");
    return <Autocomplete renderInput={(params) =>
        // @ts-ignore
        <TextField {...params} placeholder={scopedT("search")} fullWidth={true} variant="outlined"/>
    } options={notes.map(note => note.title)} autoComplete freeSolo
    onInputChange={(ignored, value, reason) => {
        if (reason === "clear" || !value) {
            setSearchFilter(() => () => true);
        } else {
            setSearchFilter(() => (note: Note) => note.title.toLowerCase().includes(value.toLowerCase()));
        }
    }}/>
}