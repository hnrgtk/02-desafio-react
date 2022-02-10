import { useEffect, useState } from "react";

import { api } from "./services/api";

import { Content } from "./components/Content";
import { SideBar } from "./components/SideBar";

import "./styles/global.scss";
import "./styles/sidebar.scss";
import "./styles/content.scss";
export interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );
	
  useEffect(() => {
    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar {...{ handleClickButton, selectedGenreId }} />
      <Content {...{ selectedGenre, selectedGenreId }} />
    </div>
  );
}
