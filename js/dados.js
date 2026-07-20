/**
 * Camada de Dados - Responsável por buscar as vagas do arquivo JSON
 * Cumpre o requisito de requisições assíncronas via Fetch API
 */

export async function buscarVagasDoServidor() {
  const url = "assets/dados/vagas.json";

  try {
    const resposta = await fetch(url);
    
    // Verifica se o arquivo foi encontrado com sucesso
    if (!resposta.ok) {
      throw new Error(`Erro de rede: ${resposta.status} - Não foi possível carregar as vagas.`);
    }
    
    const dadosVagas = await resposta.json();
    return dadosVagas;
    
  } catch (erro) {
    console.error("Erro ao buscar vagas no dados.js:", erro);
    throw erro; // Repassa o erro para ser tratado na tela (UI)
  }
}