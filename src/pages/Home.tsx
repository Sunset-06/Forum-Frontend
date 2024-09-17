import { Title } from "@mantine/core";

export default function HomePage(){
    console.log(import.meta.env.API_KEY);
    return(
        <>
          <Title m="3em">Coming Soon</Title>  
        </>
    );
}