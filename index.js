const { select, input, checkbox } = require("@inquirer/prompts");
const fs = require("fs").promises;

let mensagem = "Bem-vindo ao App de Metas";

let metas;

const carregarMetas = async () => {
  try {
    const dados = await fs.readFile("metas.json", "utf-8");
    metas = JSON.parse(dados);
  } catch (erro) {
    metas = [];
  }
};

const salvarMetas = async () => {
  await fs.writeFile("metas.json", JSON.stringify(metas, null, 2));
};

const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite a meta: " });
  if (meta.length == 0) {
    mensagem = "A meta não pode ser vazia.";
    return;
  }
  metas.push({ value: meta, checked: false });

  mensagem = "Meta cadastrada com sucesso!";
};

const listarMetas = async () => {
  if (metas.length == 0) {
    mensagem = "Não existem metas";
    return;
  }
  const respostas = await checkbox({
    message:
      "Utilize as setas para mudar de meta! Espaço para marcar ou desmarcar! Aperte Enter para finalizar!",
    choices: [...metas],
    instructions: false,
  });

  metas.forEach((meta) => {
    meta.checked = false;
  });

  if (respostas.length == 0) {
    mensagem = "Nenhuma meta selecionada.";
    return;
  }

  respostas.forEach((resposta) => {
    const meta = metas.find((meta) => {
      return meta.value == resposta;
    });

    meta.checked = true;
  });

  mensagem = "Metas marcadas como concluídas.";
};

const metasRealizadas = async () => {
  if (metas.length == 0) {
    mensagem = "Não existem metas";
    return;
  }
  const realizadas = metas.filter((meta) => {
    return meta.checked;
  });
  if (realizadas.length == 0) {
    mensagem = "Não existem metas realizadas :(";
    return;
  }

  await select({
    message: "Metas: " + realizadas.length,
    choices: [...realizadas],
  });
};

const metasAbertas = async () => {
  if (metas.length == 0) {
    mensagem = "Não existem metas";
    return;
  }
  const abertas = metas.filter((meta) => {
    return meta.checked != true;
  });
  if (abertas.length == 0) {
    mensagem = "Não existem metas abertas :)";
    return;
  }

  await select({
    message: "Metas: " + abertas.length,
    choices: [...abertas],
  });
};

const removerMetas = async () => {
  if (metas.length == 0) {
    mensagem = "Não existem metas";
    return;
  }
  const metasDesmarcadas = metas.map((meta) => {
    return { value: meta.value, checked: false };
  });
  const itensADeletar = await checkbox({
    message: "Selecione um item para remover:",
    choices: [...metasDesmarcadas],
    instructions: false,
  });

  if (itensADeletar.length == 0) {
    mensagem = "Nenhum item para remover!";
    return;
  }

  itensADeletar.forEach((item) => {
    metas = metas.filter((meta) => {
      return meta.value != item;
    });
  });

  mensagem = "Metas deletadas com sucesso!";
};

const mostrarMensagem = () => {
  console.clear();

  if (mensagem != "") {
    console.log(mensagem);
    console.log("");
    mensagem = "";
  }
};

const start = async () => {
  await carregarMetas();

  while (true) {
    mostrarMensagem();
    await salvarMetas();
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

    switch (opcao) {
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
        console.log("Até a próxima!");
        return;
    }
  }
};

start();
