"use client"

import {Box, Button, Drawer, Skeleton, Stack, TextField} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Note from "@/app/_models/Note";
import NoteCard, {AddNoteCard} from "@/app/[locale]/@notesList/note-card";
import React, {useState} from "react";
import {useScopedI18n} from "@/config/locales/client";
import {useNotesList} from "@/app/[locale]/@notesList/notes-context";
import {useWindowSize} from "@/app/[locale]/_util/hooks";
import {KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material";
import {breakpoints} from "@/config/theme";


// eslint-disable-next-line @next/next/no-async-client-component
export default function NotesList() {
    const notes = useNotesList(state => state.notes)
    const [searchFilter, setSearchFilter]
        = useState((() => () => true) as () => (note: Note) => boolean);

    return (
        <Container>
            <NotesSearch notes={notes ?? []} setSearchFilter={setSearchFilter}/>
            <AddNoteCard/>
            {
                notes !== null ? notes.filter(searchFilter).map(note => <NoteCard note={note} key={note.id}/>) :
                    Array.from({length: 5}, (_, i) =>
                        <Skeleton key={i} variant="rectangular" height={100} width="100%"
                                  className="rounded-3xl"/>
                    )
            }
        </Container>
    )
}

function DrawerContainer(props: { base: React.JSX.Element }) {
    const [open, setOpen] = useState(false);
    return (
        <Box className="flex items-center bg-gray-100 w-1/12 justify-start">
            <Drawer anchor="left" open={open} variant="temporary" ModalProps={{keepMounted: true}}
                    PaperProps={{
                        className: "w-full"
                    }}
                    onClose={() => setOpen(false)}>
                <Box className="flex h-full w-full">
                    {props.base}
                    <Button onClick={() => setOpen(false)}
                            className="h-full w-1/12 flex justify-center m-0 p-0 bg-neutral-400"
                            sx={{
                                m: 0,
                                p: 0,
                                minWidth: 0,
                                borderRadius: 0
                            }}>
                        <KeyboardArrowDown className="rotate-90"/>
                    </Button>
                </Box>
            </Drawer>
            <Button onClick={() => setOpen(!open)} className="h-full w-full flex justify-center m-0 p-0" sx={{
                m: 0,
                p: 0,
                minWidth: 0
            }}>
                <KeyboardArrowUp className="rotate-90"/>
            </Button>
        </Box>
    );
}

export function Container({children}: { children: React.ReactNode }) {
    const windowWidth = useWindowSize()[0];
    const wrap = windowWidth < breakpoints.values.md;

    const base = (
        <Stack className={`${wrap ? "w-full" : "w-1/4"} pr-4 
        pt-4 pl-4 h-full overflow-y-auto overflow-x-clip`} gap={1}
               id="notes-list-container">
            {children}
        </Stack>
    );

    if (wrap) {
        return (
            <DrawerContainer base={base}/>
        );
    }
    return base;
}

function NotesSearch({notes, setSearchFilter}: {
    notes: Note[],
    setSearchFilter: React.Dispatch<React.SetStateAction<(note: Note) => boolean>>
}) {
    const scopedT = useScopedI18n("notesList");
    return <Autocomplete
        id={"notes-search"}
        renderInput={
            (params) =>
                // @ts-ignore
                <TextField {...params} placeholder={scopedT("search")} fullWidth={true} variant="outlined"/>
        } options={
        notes.map(
            note => note.title)
    } autoComplete freeSolo onInputChange={
        (_, value, reason) => {
            if (reason === "clear" || !value) {
                setSearchFilter(() => () => true);
            } else {
                setSearchFilter(() => (note: Note) => note.title.toLowerCase().includes(value.toLowerCase()));
            }
        }}
    />
}