const { select, input, checkbox } = require("@inquirer/prompts");
const fs = require("fs").promises; // Importa funções de sistema de arquivos

let mensagem = "Bem-vindo ao App de Metas"; // Mensagem inicial
let metas; // Variável para armazenar metas

// Função para carregar metas do arquivo JSON
const carregarMetas = async () => {
  try {
    const dados = await fs.readFile("metas.json", "utf-8");
    metas = JSON.parse(dados); // Parseia o conteúdo para objeto
  } catch (erro) {
    metas = []; // Inicializa como array vazio se falhar
  }
};

// Função para salvar metas no arquivo JSON
const salvarMetas = async () => {
  await fs.writeFile("metas.json", JSON.stringify(metas, null, 2)); // Converte para JSON e escreve no arquivo
};

// Função para cadastrar uma nova meta
const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite a meta: " });
  if (meta.length == 0) {
    mensagem = "A meta não pode ser vazia."; // Valida se a meta não é vazia
    return;
  }
  metas.push({ value: meta, checked: false }); // Adiciona a nova meta ao array
  mensagem = "Meta cadastrada com sucesso!";
};

// Função para listar e marcar metas
const listarMetas = async () => {
  if (metas.length == 0) {
    mensagem = "Não existem metas"; // Valida se não há metas
    return;
  }
  const respostas = await checkbox({
    message:
      "Utilize as setas para mudar de meta! Espaço para marcar ou desmarcar! Aperte Enter para finalizar!",
    choices: [...metas], // Exibe as metas como opções de checkbox
    instructions: false,
  });

  metas.forEach((meta) => {
    meta.checked = false; // Reseta o estado de todas as metas
  });

  if (respostas.length == 0) {
    mensagem = "Nenhuma meta selecionada."; // Valida se nenhuma meta foi selecionada
    return;
  }

  respostas.forEach((resposta) => {
    const meta = metas.find((meta) => {
      return meta.value == resposta; // Marca as metas selecionadas
    });
    meta.checked = true;
  });

  mensagem = "Metas marcadas como concluídas.";
};

// Função para mostrar as metas realizadas
const metasRealizadas = async () => {
  if (metas.length == 0) {
    mensagem = "Não existem metas";
    return;
  }
  const realizadas = metas.filter((meta) => {
    return meta.checked; // Filtra metas que foram marcadas
  });
  if (realizadas.length == 0) {
    mensagem = "Não existem metas realizadas :("; // Valida se não há metas realizadas
    return;
  }

  await select({
    message: "Metas: " + realizadas.length, // Exibe a quantidade de metas realizadas
    choices: [...realizadas], // Mostra as metas realizadas
  });
};

// Função para mostrar as metas abertas
const metasAbertas = async () => {
  if (metas.length == 0) {
    mensagem = "Não existem metas";
    return;
  }
  const abertas = metas.filter((meta) => {
    return meta.checked != true; // Filtra metas não concluídas
  });
  if (abertas.length == 0) {
    mensagem = "Não existem metas abertas :)"; // Valida se não há metas abertas
    return;
  }

  await select({
    message: "Metas: " + abertas.length, // Exibe a quantidade de metas abertas
    choices: [...abertas], // Mostra as metas abertas
  });
};

// Função para remover metas
const removerMetas = async () => {
  if (metas.length == 0) {
    mensagem = "Não existem metas";
    return;
  }
  const metasDesmarcadas = metas.map((meta) => {
    return { value: meta.value, checked: false }; // Prepara metas para remoção
  });
  const itensADeletar = await checkbox({
    message: "Selecione um item para remover:",
    choices: [...metasDesmarcadas], // Mostra as metas como opções de checkbox
    instructions: false,
  });

  if (itensADeletar.length == 0) {
    mensagem = "Nenhum item para remover!"; // Valida se não há itens para remover
    return;
  }

  itensADeletar.forEach((item) => {
    metas = metas.filter((meta) => {
      return meta.value != item; // Remove as metas selecionadas
    });
  });

  mensagem = "Metas deletadas com sucesso!";
};

// Função para mostrar mensagens
const mostrarMensagem = () => {
  console.clear(); // Limpa o console

  if (mensagem != "") {
    console.log(mensagem); // Exibe a mensagem
    console.log("");
    mensagem = ""; // Limpa a mensagem após exibição
  }
};

// Função principal para iniciar o aplicativo
const start = async () => {
  await carregarMetas(); // Carrega as metas no início

  while (true) {
    mostrarMensagem(); // Mostra a mensagem atual
    await salvarMetas(); // Salva as metas antes de exibir o menu
    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar Meta",
          value: "cadastrar",
        },
        {
          name: "Listar Metas",
          value: "listar",
        },
        {
          name: "Metas Realizadas",
          value: "realizadas",
        },
        {
          name: "Metas Abertas",
          value: "abertas",
        },
        { name: "Remover Meta", value: "remover" },
        {
          name: "Sair",
          value: "sair",
        },
      ],
    });

    switch (
      opcao // Executa a ação escolhida no menu
    ) {
      case "cadastrar":
        await cadastrarMeta();
        break;
      case "listar":
        await listarMetas();
        break;
      case "realizadas":
        await metasRealizadas();
        break;
      case "remover":
        await removerMetas();
        break;
      case "abertas":
        await metasAbertas();
        break;
      case "sair":
        console.log("Até a próxima!"); // Mensagem de saída
        return;
    }
  }
};

start(); // Inicia o aplicativo
