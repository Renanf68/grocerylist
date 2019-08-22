export function convertMathToBRL(math) {
  let newString = math.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    style: "currency",
    currency: "BRL"
  });
  return newString;
}