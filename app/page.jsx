'use client'

import { useEffect } from "react";
import { autocomplete } from "@algolia/autocomplete-js";
import "@algolia/autocomplete-theme-classic";
import data from "../data.json";

export default function Home() {

  useEffect(() => {
    autocomplete({
      container: "#autocomplete",
      placeholder: "Busca por categoría...",
      getSources() {
        return [
          {
            sourceId: "id",
            getItems({ query }) {
              return data.filter(({ nombre }) =>
                nombre.toLowerCase().includes(query.toLowerCase()),
              );
            },
            getItemUrl({ item }) {
              return item.url;
            },
            templates: {
              header({ html }) {
                return html`<h1 class="bg-linear-to-bl from-violet-700 to-fuchsia-700 bg-clip-text text-transparent font-bold ml-3 mb-5">
                Sugerencias de Klanet
              </h1>`
              },
              item({ item, html }) {
                return html`
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1/7">
                      <img  src=${item.imagen} alt="cat" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h2 className=" font-bold ">${item.nombre}</h2>
                      <p className=" text-sm">${item.slug}</p>
                    </div>
                  </div>
                `;
              },

            },
          }
        ];
      },
    });
  }, [])

  return (
    <main className="h-screen bg-linear-to-bl from-violet-700 to-fuchsia-700">
      <section className="flex  justify-center  h-full">
        <div className="flex flex-col items-center gap-10 w-full px-5 md:w-2/3 mt-24">
          <h1 className="font-bold text-7xl text-white">Klanet</h1>
          <div className="w-full" id="autocomplete"></div>
        </div>
      </section>
    </main>
  );
}
