import React from "react";
import FilmCard from "./FilmCard";

export default function FilmList({ films }) {
    return (
        <div>
            {films.map((film) => (
                <FilmCard key={film.id} film={film} />
            ))}
        </div>
    );
}
