<h1 align="center">Gerenciador de Metas</h1>

<p>O Gerenciador de Metas é uma aplicação de gerenciamento de metas que permite aos usuários cadastrar, listar, marcar como realizadas e remover metas pessoais. O objetivo é ajudar na organização e acompanhamento de objetivos, tornando o processo de realização mais fácil e motivador.</p>

## Funcionalidades

- ✅ Cadastrar novas metas.
- ✔️ Listar todas as metas cadastradas.
- 🎯 Marcar metas como realizadas.
- 🔍 Filtrar metas abertas e realizadas.
- ❌ Remover metas que não são mais relevantes.

## Tecnologias

- Node.js
- @inquirer/prompts
- fs (File System)

## Acesse o projeto

Você pode executar o App de Metas localmente em sua máquina. Siga as instruções abaixo para instalação e uso.

## Como Rodar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/tarcisiobm/MetaManager.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd MetaManager
   ```

## Métodos principais

**cadastrarMeta** - Este método permite a adição de uma nova meta ao array `metas`. Ele solicita ao usuário que insira uma meta e, em seguida, verifica se a entrada não está vazia. Se estiver vazia, uma mensagem de erro é exibida; caso contrário, a nova meta é adicionada ao array com o status `checked` definido como `false`.

**listarMetas** - Este método itera sobre todas as metas no array `metas`, exibindo uma lista para o usuário. Ele permite que o usuário selecione as metas que deseja marcar como realizadas. As metas selecionadas são então atualizadas com o status `checked` definido como `true`.

**metasRealizadas** - Este método filtra o array `metas` para criar um novo array que contém apenas as metas que foram marcadas como concluídas (`checked: true`). Em seguida, ele exibe essas metas ao usuário.

**metasAbertas** - Semelhante ao método anterior, este método filtra o array `metas` para obter apenas as metas que ainda não foram concluídas (`checked: false`). Ele exibe essas metas pendentes ao usuário.

**removerMetas** - Este método cria um novo array de metas a partir do array `metas`, onde todas as metas estão desmarcadas (`checked: false`). Ele apresenta uma lista ao usuário, permitindo a seleção de metas para remoção. Após a seleção, o método atualiza o array `metas` para excluir as metas selecionadas.

## Armazenamento de dados

As funções carregarMetas e salvarMetas trabalham juntas para gerenciar o armazenamento de metas.

Exemplo da utilização do carregamento de metas:

```javascript
const carregarMetas = async () => {
  try {
    const dados = await fs.readFile("metas.json", "utf-8");
    metas = JSON.parse(dados);
  } catch (erro) {
    metas = [];
  }
};
```

Exemplo da utilização do salvamento de metas:

```javascript
const salvarMetas = async () => {
  await fs.writeFile("metas.json", JSON.stringify(metas, null, 2));
};
```

Exemplo do armazenamento de dados utilizando um arquivo JSON:

```json
[
  {
    "value": "Estudar JavaScript",
    "checked": true
  },
  {
    "value": "Estudar Node.js",
    "checked": false
  }
]
```

## Contato

📧 tarcisiobm.dev@gmail.com  
📞 +55 (32) 98488-5764
