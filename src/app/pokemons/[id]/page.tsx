import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

const fetchPokemonDetailPage = async (id: string) => {
  const apiUrl = "http://localhost:3000";
  const response = await fetch(`${apiUrl}/api/pokemons/${id}`);
  return response.json();
};
export async function generateMetadata({ params }: { params: { id: string } }) {
  const pokemonDetailData = await fetchPokemonDetailPage(params.id);
  return {
    title: `${
      pokemonDetailData.korean_name || pokemonDetailData.name
    } -상세페이지`,
  };
}

const PokemonDetail = async ({ params }: { params: { id: string } }) => {
  const pokemonDetailData = await fetchPokemonDetailPage(params.id);
  console.log(pokemonDetailData);

  return (
    <div className="w-8/12 h-auto mx-auto border-solid border-2 border-black p-5 mt-2">
      <Image
        className="mx-auto"
        src={pokemonDetailData.sprites.front_default}
        alt={pokemonDetailData.korean_name}
        width={120}
        height={120}
      />
      <div className="text-center font-bold">
        <p>이름: {pokemonDetailData.korean_name || pokemonDetailData.name}</p>
        <p>키: {pokemonDetailData.height} m </p>
        <p>무게: {pokemonDetailData.weight / 10} kg</p>

        <p>
          타입:
          {pokemonDetailData.types.map((type: any) => type.type.name).join(",")}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 ">
        {pokemonDetailData.moves.map((move: any) => (
          <div
            className="border-solid border-2 border-sky-500 p-0.5"
            key={move.move.name}
          >
            {move.move.korean_name}
          </div>
        ))}
      </div>
      <div className="text-center mt-9">
        <Link href={"/"} className="border-solid border-2 border-red-500 p-1">
          홈으로
        </Link>
      </div>
    </div>
  );
};
export default PokemonDetail;
