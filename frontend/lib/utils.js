// lib/utils.js
export function formatDate(dateString) {
  // formata data de um string YYYY-MM-DD
  // exemplo: de 2025-05-20 para 20 de maio de 2025
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}