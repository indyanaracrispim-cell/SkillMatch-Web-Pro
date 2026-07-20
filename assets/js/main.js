/**
 * Arquivo Principal (Main) - Ponto de entrada da aplicação
 */

import { buscarVagasDoServidor } from './dados.js';
import { Vaga, VagaFrontEnd, analisarCandidato, contarProcessamento } from './motor.js';
import { obterDadosDoFormulario, exibirResultadosNaTela, mostrarCarregamento, mostrarErroNaTela } from './ui.js';

let bancoDeVagasInstanciadas = [];

async function inicializarAplicacao() {
  mostrarCarregamento();

  try {
    const vagasBrutas = await buscarVagasDoServidor();

    bancoDeVagasInstanciadas = vagasBrutas.map(vaga => {
      if (vaga.frameworkPrincipal) {
        return new VagaFrontEnd(
          vaga.id,
          vaga.empresa,
          vaga.cargo,
          vaga.requisitos,
          vaga.salario,
          vaga.modalidade,
          vaga.frameworkPrincipal
        );
      }
      return new Vaga(
        vaga.id,
        vaga.empresa,
        vaga.cargo,
        vaga.requisitos,
        vaga.salario,
        vaga.modalidade
      );
    });

    async function inicializarAplicacao() {
  mostrarCarregamento();

  try {
    const vagasBrutas = await buscarVagasDoServidor();

    bancoDeVagasInstanciadas = vagasBrutas.map(vaga => {
      if (vaga.frameworkPrincipal) {
        return new VagaFrontEnd(
          vaga.id,
          vaga.empresa,
          vaga.cargo,
          vaga.requisitos,
          vaga.salario,
          vaga.modalidade,
          vaga.frameworkPrincipal
        );
      }
      return new Vaga(
        vaga.id,
        vaga.empresa,
        vaga.cargo,
        vaga.requisitos,
        vaga.salario,
        vaga.modalidade
      );
    });
    
    const statusElement = document.getElementById('status');
    if (bancoDeVagasInstanciadas.length === 0) {
      if (statusElement) statusElement.textContent = "Nenhuma vaga encontrada no servidor.";
      const containerResultados = document.getElementById('resultados');
      if (containerResultados) containerResultados.innerHTML = '';
      return; // Interrompe o fluxo já que não há vagas para mapear
    }

    carregarPerfilSalvo();
    configurarCliquesDeSugestao(); 

    if (statusElement) {
      statusElement.textContent = `Banco de dados carregado com sucesso! ${bancoDeVagasInstanciadas.length} vagas mapeadas para análise.`;
    }

    const containerResultados = document.getElementById('resultados');
    if (containerResultados) containerResultados.innerHTML = '';

  } catch (erro) {
    mostrarErroNaTela(erro.message);
  }
}
    carregarPerfilSalvo();
    configurarCliquesDeSugestao(); // Ativa as tags clicáveis de sugestão rápida

    const statusElement = document.getElementById('status');
    if (statusElement) {
      statusElement.textContent = `Banco de dados carregado com sucesso! ${bancoDeVagasInstanciadas.length} vagas mapeadas para análise.`;
    }

    const containerResultados = document.getElementById('resultados');
    if (containerResultados) containerResultados.innerHTML = '';

  } catch (erro) {
    mostrarErroNaTela(erro.message);
  }
}

function gerenciarSubmissao(evento) {
  evento.preventDefault();

  const candidato = obterDadosDoFormulario();

  if (!candidato) {
    alert("Por favor, preencha todos os campos do formulário para realizar a análise.");
    return;
  }

  localStorage.setItem('skillmatch_perfil', JSON.stringify(candidato));

  const resultadoDaAnalise = analisarCandidato(candidato, bancoDeVagasInstanciadas);
  const dadosAuditoria = contarProcessamento();

  // 1. Renderiza os cards na tela
  exibirResultadosNaTela(resultadoDaAnalise, dadosAuditoria);

  // 2. Rola a tela suavemente até os resultados
  const secaoResultados = document.getElementById('resultados');
  if (secaoResultados) {
    secaoResultados.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Torna as pequenas tags explicativas abaixo do campo em botões rápidos!
 */
function configurarCliquesDeSugestao() {
  const campo = document.getElementById('habilidades');
  const tagsSugestao = document.querySelectorAll('.sugestao-tag');

  tagsSugestao.forEach(tag => {
    tag.style.cursor = "pointer";
    tag.title = "Clique para adicionar";
    
    tag.addEventListener('click', () => {
      const valorAtual = campo.value.trim();
      const termoParaAdicionar = tag.textContent.trim();

      if (valorAtual === "") {
        campo.value = termoParaAdicionar;
      } else {
        const listaAtual = valorAtual.split(',').map(s => s.trim().toLowerCase());
        if (!listaAtual.includes(termoParaAdicionar.toLowerCase())) {
          campo.value = `${valorAtual}, ${termoParaAdicionar}`;
        }
      }
      campo.focus();
    });
  });
}

function carregarPerfilSalvo() {
  const perfilSalvo = localStorage.getItem('skillmatch_perfil');
  
  if (perfilSalvo) {
    try {
      const candidato = JSON.parse(perfilSalvo);
      
      if (document.getElementById('nome')) document.getElementById('nome').value = candidato.nome;
      if (document.getElementById('area')) document.getElementById('area').value = candidato.area;
      if (document.getElementById('experiencia')) document.getElementById('experiencia').value = candidato.experienciaMeses;
      if (document.getElementById('habilidades')) document.getElementById('habilidades').value = candidato.habilidades.join(', ');
      
    } catch (e) {
      console.error("Erro ao ler dados salvos no LocalStorage:", e);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  inicializarAplicacao();

  const formulario = document.getElementById('form-perfil'); 
  if (formulario) {
    formulario.addEventListener('submit', gerenciarSubmissao); 
  }

  // ---  TRECHO DE LIMPAR: ---
  const botaoLimpar = document.getElementById('btnLimpar');
  if (botaoLimpar && formulario) {
    botaoLimpar.addEventListener('click', () => {
      // 1. Reseta todos os campos visíveis do formulário
      formulario.reset();
      
      // 2. Remove o registro salvo para não voltar ao atualizar a página
      localStorage.removeItem('skillmatch_perfil');
      
      // 3. Opcional: Limpa também a área de resultados lá embaixo se quiser começar do zero
      const containerResultados = document.getElementById('resultados');
      if (containerResultados) {
        containerResultados.innerHTML = '';
      }
      
      // 4. Atualiza o status para informar que o perfil foi limpo
      const statusElement = document.getElementById('status');
      if (statusElement) {
        statusElement.textContent = "Aguardando preenchimento do perfil.";
      }
    });
  }
});
  // --- FIM DO TRECHO DE LIMPAR ---