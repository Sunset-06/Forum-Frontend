import ThreadBox from "../components/ThreadBox";
import { Title } from "@mantine/core";

export default function SavedPage(){
    return(
        <>
        <Title m="1em" top="0">Saved Threads</Title>
        <ThreadBox />
        <ThreadBox />
        <ThreadBox />
        <ThreadBox />
        </>
    );
}