import { Flex, Card, Overlay } from '@mantine/core';
import classes from "./Animations.module.css"

const cats = [
    { title: "Video Games", image: "../src/assets/cats-games.jpg" },
    { title: "Fashion", image: "../src/assets/cats-fashion.jpg" },
    { title: "Books", image: "../src/assets/cats-books.jpg" },
    { title: "Food", image: "../src/assets/cats-food.jpeg" },
    { title: "Movies", image: "../src/assets/cats-movies.jpg" },
    { title: "Owners", image: "../src/assets/cats-owners.jpg" },
    { title: "Travel", image: "../src/assets/cats-travel.jpeg" },
    { title: "Music", image: "../src/assets/cats-music.jpg" },
    { title: "Vehicles", image: "../src/assets/cats-vehicles.jpeg" },
    { title: "Sports", image: "../src/assets/cats-sports.jpg" },
    { title: "Motorsports", image: "../src/assets/cats-motorsport.jpg" }
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
            <h1 style={{ marginLeft: "6rem", marginTop: "6rem" }}>Popular Categories</h1>
            <Flex gap={"xl"} justify={"center"} direction={"row"} wrap={"wrap"}>
                {cards}
            </Flex>
        </div>
    );
}
