import ThreadBox from "../components/ThreadBox";
import { Title } from "@mantine/core";

function catTitle(url: string) : string {
    var name = url.split('/').pop()?.split('.')[0] || '';
    const first = name.charAt(0).toUpperCase();
    name = first + name.slice(1);
    return name;
}

export default function CategoryPage(){
    return(
        <>
        <Title mx="2em" my="2em" top="0"> Category: {catTitle(location.href)}</Title>
        <ThreadBox />
        <ThreadBox />
        <ThreadBox />
        <ThreadBox />
        </>
    );
}