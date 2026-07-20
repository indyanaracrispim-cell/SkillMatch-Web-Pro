/**
 * Motor Lógico - O Cérebro do SkillMatch
 * Contém a Programação Orientada a Objetos (POO) e as funções de match.
 */

// =====================================================
// CLASSE BASE (Reaproveitada da Semana 6)
// =====================================================
export class Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {
    this.id         = id;
    this.empresa    = empresa;
    this.cargo      = cargo;
    this.requisitos = requisitos;
    this.salario    = salario;
    this.modalidade = modalidade;
  }

  exibirResumo() {
    return `${this.cargo} na empresa ${this.empresa} (${this.modalidade})`;
  }

  getSalarioFormatado() {
    return `R$ ${Number(this.salario).toLocaleString('pt-BR')}`;
  }

  // MÉTODO ADICIONADO AQUI PARA EVITAR O ERRO DE FUNÇÃO INEXISTENTE:
  exibirDetalhesEspecificos() {
    return `Modalidade: ${this.modalidade}`;
  }
}

// =====================================================
// HERANÇA (Reaproveitada da Semana 6)
// =====================================================
export class VagaFrontEnd extends Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade, frameworkPrincipal) {
    super(id, empresa, cargo, requisitos, salario, modalidade);
    this.frameworkPrincipal = frameworkPrincipal;
  }

  exibirDetalhesEspecificos() {
    return `Framework em destaque: ${this.frameworkPrincipal}`;
  }
}

// =====================================================
// CLOSURE — AUDITORIA DE PROCESSAMENTO
// =====================================================
export function criarContadorDeAnalises() {
  let totalAnalises = 0;
  const inicioProcesso = new Date();
  return function () {
    totalAnalises++;
    return {
      total:      totalAnalises,
      iniciadoEm: inicioProcesso.toLocaleTimeString('pt-BR')
    };
  };
}

export const contarProcessamento = criarContadorDeAnalises();

// =====================================================
// CLASSIFICAR COMPATIBILIDADE — IF/ELSE
// =====================================================
export function classificarCompatibilidade(porcentagem) {
  if (porcentagem >= 80) return { texto: "Alta compatibilidade",   tag: "HIGH"   };
  else if (porcentagem >= 50) return { texto: "Média compatibilidade", tag: "MEDIUM" };
  else                        return { texto: "Baixa compatibilidade",  tag: "LOW"    };
}

// =====================================================
// ALGORITMO DE ANÁLISE PRINCIPAL
// Adaptado para receber o perfil dinâmico do formulário
// =====================================================
export function analisarCandidato(candidato, vagasInstanciadas) {
  // map: gera o relatório para cada vaga cadastrada
  const relatorioVagas = vagasInstanciadas.map((vaga) => {
    contarProcessamento(); // Registra a comparação na Closure de auditoria

    // filter: identifica quais competências dão match e quais faltam
    const encontradas = vaga.requisitos.filter(req => {
      return candidato.habilidades.some(hab => hab.toLowerCase() === req.toLowerCase());
    });
    
    const faltantes = vaga.requisitos.filter(req => {
      return !candidato.habilidades.some(hab => hab.toLowerCase() === req.toLowerCase());
    });

    // every: verifica se atende 100% dos requisitos
    const atendeTudo = vaga.requisitos.every(req => {
      return candidato.habilidades.some(hab => hab.toLowerCase() === req.toLowerCase());
    });

    // Cálculo da porcentagem de compatibilidade
    const porcentagem = vaga.requisitos.length > 0
      ? Math.round((encontradas.length / vaga.requisitos.length) * 100)
      : 0;

    const classificacao = classificarCompatibilidade(porcentagem);

    return {
      instanciaVaga:  vaga,
      compatibilidade: porcentagem,
      encontradas,
      faltantes,
      atendeTudo,
      classificacao:  classificacao.texto,
      tag:            classificacao.tag
    };
  });

  // reduce: descobre automaticamente a vaga com maior compatibilidade
  const melhorVaga = relatorioVagas.reduce((maior, atual) =>
    atual.compatibilidade > maior.compatibilidade ? atual : maior, relatorioVagas[0]);

  // reduce: consolida a lista completa de habilidades que faltam (sem duplicatas)
  const todasFaltantes = relatorioVagas.reduce((acc, atual) => {
    atual.faltantes.forEach(hab => { 
      if (!acc.some(h => h.toLowerCase() === hab.toLowerCase())) {
        acc.push(hab); 
      }
    });
    return acc;
  }, []);

  return { candidato, relatorioVagas, melhorVaga, todasFaltantes };
}