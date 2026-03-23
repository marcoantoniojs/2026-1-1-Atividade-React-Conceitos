"use client";

import { useEffect, useState } from "react";
import { getProdutosTodos } from "@/app/services/api"

export default function Home() {
  const [produtos, atualizarProdutos] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    getProdutosTodos().then((resultado) => {
      atualizarProdutos(resultado.data.products || []);
    });
  }, []);

  
  const produtosFiltrados = produtos.filter((produto: any) =>
    produto.title.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      <header className="sticky top-0 z-10 bg-white p-6 shadow-md">
        <div className="max-w-4xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-blue-600">Loja de Produtos</h1>
          
          <input
            type="text"
            placeholder="Pesquisar por título..."
            className="w-full sm:max-w-xs p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </div>
      </header>

      
      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-lg font-semibold mb-6">
          {pesquisa ? `Resultados para: "${pesquisa}"` : "Todos os produtos"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtosFiltrados.map((produto: any) => (
            <div 
              key={produto.id} 
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              
              <div className="h-48 overflow-hidden bg-gray-100">
                <img 
                  src={produto.images[0]} 
                  alt={produto.title}
                  className="w-full h-full object-contain p-4"
                />
              </div>

              
              <div className="p-4 flex flex-col gap-2">
                  <div className="flex flex-wrap gap-1">
                    {produto.tags?.map((tag: string) => (
                    <span key={tag} className="text-[10px] font-bold uppercase bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                    ))}
                  </div>

                <h3 className="font-bold text-lg truncate">{produto.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2 h-10">
                  {produto.description}
                </p>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-green-600">
                    ${produto.price}
                  </span>
                  <span className="text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                    ⭐ {produto.rating} stars
                  </span>
                  <span className="text-[12px] text-gray-400">
                    ({produto.reviews?.length || 0} avaliações)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {produtosFiltrados.length === 0 && (
          <p className="text-center text-gray-500 mt-10">Nenhum produto encontrado.</p>
        )}
      </main>
    </div>
  );
}
