"use client";
import { Pokemon } from "@/app/types/pokemon";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const PokemonList = () => {
  const fetchPokemons = async (): Promise<Pokemon[]> => {
    const response = await fetch("/api/pokemons");
    const data = await response.json();
    console.log(data);
    return data;
  };

  const {
    data: pokemons,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
  });
  if (isLoading) {
    return <div>도감정보를 불러오는중입니다! 잠시 기다려주세요 Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-wrap justify-between">
      {pokemons?.map((pokemon) => (
        <div
          key={pokemon.id}
          className="border-solid border-2 border-sky-500 w-1/6 h-1/5 p-4 m-2 flex flex-col items-center"
        >
          <Link href={`/pokemons/${pokemon.id}`}>
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.korean_name}
              width={96}
              height={96}
            />
            <div className="text-center font-bold">도감번호: {pokemon.id}</div>
            <div className="text-center">
              {pokemon.korean_name || pokemon.name}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
