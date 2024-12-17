import React from "react";
import FilmCard from "./FilmCard";
import mockFilms from "./mock/FilmMock";

export default function FilmList() {
    const films = mockFilms;

    return (
        <div>
            {films.map((film) => (
                <FilmCard key={film.id} film={film} />
            ))}
        </div>
    );
}
