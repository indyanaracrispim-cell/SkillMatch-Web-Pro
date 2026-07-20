/**
 * Camada de Interface (UI) - Responsável por manipular o DOM e renderizar a tela.
 */
import { analisarCandidato } from './motor.js';

/**
 * Função Auxiliar para Capitalizar o Nome do Usuário de forma elegante
 */
function formatarNomeProprio(nome) {
  return nome
    .toLowerCase()
    .split(' ')
    .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join(' ');
}

/**
 * Captura os dados digitados pelo usuário no formulário
 */
export function obterDadosDoFormulario() {
  const inputNome = document.getElementById('nome');
  const inputHabilidades = document.getElementById('habilidades');
  
  const nomeInput = inputNome?.value.trim();
  const areaSelect = document.getElementById('area')?.value;
  const experienciaInput = document.getElementById('experiencia')?.value;
  const habilidadesInput = inputHabilidades?.value.trim();

  if (!nomeInput || !areaSelect || !experienciaInput || !habilidadesInput) {
    return null;
  }

  // Converte a string de habilidades em um Array limpo
  const listaHabilidades = habilidadesInput
    .split(',')
    .map(hab => hab.trim())
    .filter(hab => hab.length > 0);

  return {
    nome: formatarNomeProprio(nomeInput), // Nome padronizado automaticamente!
    area: areaSelect,
    experienciaMeses: parseInt(experienciaInput, 10) || 0,
    habilidades: listaHabilidades
  };
}

/**
 * Renderiza um card semântico para cada vaga analisada
 */
function gerarVagasHTML(relatorioVagas, idMelhorVaga) {
  if (!relatorioVagas || relatorioVagas.length === 0) {
    return `
      <section class="vaga-vazia" style="grid-column: 1/-1; text-align: center; padding: 2rem; background: #edf2f7; border-radius: 8px;">
        <p style="font-size: 1.1rem; color: #4a5568; font-weight: 600;">Poxa, nenhuma vaga compatível foi encontrada no momento.</p>
        <p style="font-size: 0.9rem; color: #718096;">Tente ajustar as suas habilidades ou área de atuação no formulário!</p>
      </section>
    `;
  }

  return relatorioVagas.map(item => {
    const ehAMelhor = item.instanciaVaga.id === idMelhorVaga;
    const classeDestaque = ehAMelhor ? 'vaga-item card-destaque' : 'vaga-item';
    const seloDestaque = ehAMelhor ? `<span class="selo-recomendado">⭐ RECOMENDADA</span>` : '';

    return `
      <section class="${classeDestaque}">
        <header>
          <span class="vaga-titulo">${item.instanciaVaga.empresa} — ${item.instanciaVaga.cargo} ${seloDestaque}</span>
          <span class="match-tag tag-${item.tag}">${item.compatibilidade}% — ${item.classificacao}</span>
        </header>
        <p style="font-size:0.85rem;color:#718096;margin-bottom:0.5rem">
          ${item.instanciaVaga.getSalarioFormatado()} | ${item.instanciaVaga.modalidade}
          | ${item.instanciaVaga.exibirDetalhesEspecificos()}
        </p>
        <section class="match-details">
          <section class="match-col">
            <strong class="match">✔️ Match:</strong>
            ${item.encontradas.map(h => `<span class="tag-hab-match">${h}</span>`).join(" ") || "Nenhum"}
          </section>
          <section class="match-col">
            <strong class="gap">✘ Gap:</strong>
            ${item.faltantes.map(h => `<span class="tag-hab-gap">${h}</span>`).join(" ") || "Nenhum"}
          </section>
        </section>
      </section>`;
  }).join("");
}

/**
 * Renderiza o bloco principal com os resultados da análise na tela
 */
export function exibirResultadosNaTela(dadosAnalise, auditoria) {
  const containerResultados = document.getElementById('resultados');
  const statusElement = document.getElementById('status');

  if (!containerResultados) return;

  const { candidato, relatorioVagas, melhorVaga, todasFaltantes } = dadosAnalise;

  const planoEstudoHTML = todasFaltantes.length > 0
    ? todasFaltantes.map(comp => `<li class="skill-tag">${comp}</li>`).join(' ')
    : "<li>Parabéns! Seu perfil atende perfeitamente a todos os requisitos!</li>";

  const idMelhorVaga = melhorVaga?.instanciaVaga?.id;

  containerResultados.innerHTML = `
    <article>
      <header>
        <section>
          <h2>Análise de Perfil: ${candidato.nome}</h2>
          <span class="badge" style="display:inline-block; margin-top:0.5rem; background:#edf2f7; padding:0.25rem 0.5rem; border-radius:4px; font-size:0.9rem; font-weight:600;">
            ${candidato.area} | ${candidato.experienciaMeses} meses de experiência
          </span>
          <ul class="skills">
            ${candidato.habilidades.map(s => `<li class="skill-tag">${s}</li>`).join("")}
          </ul>
        </section>
      </header>

      <h3 style="margin-top:2rem;">Alinhamento por Vaga Conectada</h3>
      <section class="vagas-grid">${gerarVagasHTML(relatorioVagas, idMelhorVaga)}</section>

      <aside class="melhor-match">
        <h3><span class="estrela-destaque">⭐</span> Melhor Match </h3>
        <p>A vaga ideal para o seu perfil atual é na empresa <strong>${melhorVaga.instanciaVaga.empresa}</strong> para o cargo de <strong>${melhorVaga.instanciaVaga.cargo}</strong>.</p>
        <p>Aderência Técnica: ${melhorVaga.compatibilidade}% — ${melhorVaga.classificacao}</p>
        <p>Condições: ${melhorVaga.instanciaVaga.getSalarioFormatado()} | ${melhorVaga.instanciaVaga.modalidade}</p>
      </aside>

      <aside class="plano-estudo">
        <strong>📚 Plano de Desenvolvimento:</strong><br>
      <p>Para impulsionar o seu perfil rumo a essa oportunidade, sugerimos focar no desenvolvimento destas seguintes competências:</p>
<ul class="skills" style="display: flex; flex-wrap: wrap; gap: 8px; list-style: none; padding: 0; margin-top: 12px;">
  ${planoEstudoHTML}</ul>
  </aside>

      <section style="text-align: center; margin-top: 2rem; margin-bottom: 3rem;">
        <button id="btnVoltarTopo" style="background: #4a5568; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; font-weight: 600;">
          🔄 Ajustar ou Refazer Análise
        </button>
      </section>
    </article>
  `;

  if (statusElement) {
    statusElement.textContent = `Análise concluída com sucesso! Processamento número: ${auditoria.total} | Sessão iniciada às ${auditoria.iniciadoEm}`;
  }

  document.getElementById('btnVoltarTopo')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

export function mostrarCarregamento() {
  const containerResultados = document.getElementById('resultados');
  const statusElement = document.getElementById('status');

  if (statusElement) statusElement.textContent = 'Acessando banco de vagas via API assíncrona...';
  if (containerResultados) {
    containerResultados.innerHTML = `
      <section class="loading">
        <p class="spinner"></p>
        <p>Cruzando competências in real-time...</p>
      </section>
    `;
  }
}

export function mostrarErroNaTela(mensagem) {
  const containerResultados = document.getElementById('resultados');
  const statusElement = document.getElementById('status');

  if (statusElement) statusElement.textContent = 'Falha no processamento.';
  if (containerResultados) {
    containerResultados.innerHTML = `
      <section style="background:#fff5f5; color:#c53030; padding:1.5rem; border-radius:8px; border-left:4px solid #e53e3e;">
        <strong>Ocorreu um erro ao carregar as vagas:</strong>
        <p>${mensagem}</p>
      </section>
    `;
  }
}