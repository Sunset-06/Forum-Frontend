import { Flex, Card, Overlay } from '@mantine/core';
import classes from "./Categories.module.css"
import catvg from "../assets/cats-games.jpg"
import catfs from "../assets/cats-fashion.jpg"
import catbk from "../assets/cats-books.jpg"
import catfd from "../assets/cats-food.jpeg"
import catmv from "../assets/cats-movies.jpg"
import caton from "../assets/cats-owners.jpg"
import cattr from "../assets/cats-travel.jpeg"
import catmu from "../assets/cats-music.jpg"
import catvh from "../assets/cats-vehicles.jpeg"
import catsp from "../assets/cats-sports.jpg"
import catmt from "../assets/cats-motorsport.jpg"


const cats = [
    { title: "Video Games", image: catvg },
    { title: "Fashion", image: catfs },
    { title: "Books", image: catbk },
    { title: "Food", image: catfd },
    { title: "Movies", image: catmv },
    { title: "Owners", image: caton },
    { title: "Travel", image: cattr },
    { title: "Music", image: catmu },
    { title: "Vehicles", image: catvh },
    { title: "Sports", image: catsp },
    { title: "Motorsports", image: catmt }
];

const cards = cats.map((cat) => (
    <Card
        key={cat.title}
        component="a"
        href={`/cats/${cat.title.toLowerCase().replace(/\s+/g, '-')}`}
        className={classes.card}
        style={{backgroundImage: `url(${cat.image})`}}
        
    >
        <Overlay gradient="linear-gradient(30deg, rgba(0, 0, 0, 1) 0%, rgba(0,0,0,0.5) 100%)" opacity={0.70} zIndex={1} />
        <h2 className={classes.categorytitle}>
            {cat.title}
        </h2>
    </Card>
));

export default function Categories() {
    return (
        <div style={{ marginBottom: "3em" }}>
            <h1 className={classes.title}>Popular Categories</h1>
            <Flex gap={"xl"} justify={"center"} direction={"row"} wrap={"wrap"}>
                {cards}
            </Flex>
        </div>
    );
}
