import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

export default function Pokemon() {
  const [pokemonData, setPokemonData] = useState({});
  const router = useRouter();
  const { pokemon } = router.query;

  const getPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((res) => res.json())
      .then((pokemonResponse) => {
        const abilities = pokemonResponse.abilities.map(
          (ability) => ability.ability.name
        );
        const game_indices = pokemonResponse.game_indices.map(
          (game_index) => game_index.version.name
        );
        const moves = pokemonResponse.moves.map((move) => move.move.name);
        const stats = pokemonResponse.stats.map((stat) => stat.stat.name);
        const types = pokemonResponse.types.map((type) => type.type.name);

        const data = {
          base_experience: pokemonResponse.base_experience,
          height: pokemonResponse.height,
          image: pokemonResponse.sprites.front_default,
          name: pokemonResponse.name,
          weight: pokemonResponse.weight,
          abilities: abilities.join(" | "),
          game_indices: game_indices.join(" | "),
          moves: moves.join(" | "),
          stats: stats.join(" | "),
          types: types.join(" | "),
        };

        setPokemonData(data);
      });
  };

  useEffect(() => {
    getPokemon();
  }, [pokemon]);

  return (
    <div className={styles["container-details"]}>
      <a href={`/`} className={styles["go-back"]}>
        Voltar
      </a>
      <div className={styles.header}>
        <Image
          src={pokemonData.image}
          className={styles["card-image"]}
          width={175}
          height={175}
          alt={pokemonData.name}
        />
        <h1 className={styles.name}>{pokemonData.name}</h1>
        <div className={styles.details}>
          <strong className={styles["details-title"]}>height: </strong>
          <span className={styles["details-info"]}>{pokemonData.height}</span>
          {" | "}
          <strong className={styles["details-title"]}>base experience: </strong>
          <span className={styles["details-info"]}>
            {pokemonData.base_experience}
          </span>
          {" | "}
          <strong className={styles["details-title"]}>weight: </strong>
          <span className={styles["details-info"]}>{pokemonData.weight}</span>
        </div>
        <div className={styles.details}>
          <strong className={styles["details-title"]}>types: </strong>
          <span className={styles["details-info"]}>{pokemonData.types}</span>
        </div>
        <div className={styles.details}>
          <strong className={styles["details-title"]}>abilities: </strong>
          <span className={styles["details-info"]}>
            {pokemonData.abilities}
          </span>
        </div>
        <div className={styles.details}>
          <strong className={styles["details-title"]}>stats: </strong>
          <span className={styles["details-info"]}>{pokemonData.stats}</span>
        </div>
        <div className={styles.details}>
          <strong className={styles["details-title"]}>game indices: </strong>
          <span className={styles["details-info"]}>
            {pokemonData.game_indices}
          </span>
        </div>
        <div className={styles.details}>
          <strong className={styles["details-title"]}>moves: </strong>
          <span className={styles["details-info"]}>{pokemonData.moves}</span>
        </div>
      </div>
    </div>
  );
}
