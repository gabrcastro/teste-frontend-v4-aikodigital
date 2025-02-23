# Aplicação Florestal

Esta aplicação é projetada para gerenciar e monitorar equipamentos em áreas florestais.
O objetivo é facilitar a localização, o controle de estado e a manutenção de equipamentos em campo,
permitindo decisões rápidas e baseadas em dados.

## Índice

1. [Decisões de Desenvolvimento](#decisoes-de-desenvolvimento)
2. [Componentes Principais](#componentes-principais)
   - [Map](#map)
   - [AppBar](#appbar)
   - [Dialog Search](#dialog-search)
   - [Equipment History](#equipment-history)
   - [Status Badge](#status-badge)
3. [Como Rodar o Projeto](#como-rodar-o-projeto)
4. [Estrutura do projeto](#estrutura-do-projeto)
5. [Melhorias](#melhorias)

## Decisões de Desenvolvimento

- **Framework Frontend**: Utilizamos React com TypeScript devido à sua popularidade, tipagem estática e suporte para bibliotecas modernas.
- **Biblioteca para mapa**: Utilizado o Leaflet, pois é uma biblioteca amplamente utilizada no React devido a sua simplicidade e flexibilidade. Além disso, é fácil de usar, personalizável e um ótimo desempenho.
- **Biblioteca para rotas no mapa**: Utilizado o Leaflet Routing Machine.
- **Gerenciamento de Estado**: Zustand foi escolhido pela simplicidade.
- **Biblioteca de Testes**: Foi escolhido o Jest por sua ampla utilização e maturidade.
- **Design**: Tailwind CSS para estilização, permitindo um desenvolvimento rápido e responsivo e o Shadcn para acelerar no processo de desenvolvimento de alguns componentes.
- **Eslint + Prettier + Husky**: Utilizado para manter um padrão de código e uma verificação antes do commit. Assim mantendo o código sempre organizado e sem código desnecessário.

## Componentes Principais

### `Map`

- **Descrição**: Componente responsável por exibir o mapa juntamente com os marcadores.
- **Configurações**:
  - `center`: Posicionar a visão em um local específico quando carregar o mapa.
  - `zoom`: Zoom inicial.
  - `zoom`: Zoom inicial.
- **Configurações do marcador**:
  - `iconUrl`: Caminho da imagem.
  - `iconSize`: Tamanho do ícone.
  - `iconAnchor`: Local onde a imagem ficará alinhada com o marcador.
  - `popupAnchor`: Onde o popup será exibido em relação ao ícone.
- **Props**:
  - Não utiliza props. Está consumindo os dados diretamente dos hooks.
- **Exemplo de Uso**:
  ```jsx
  <MapComponent />
  ```

### `AppBar`

- **Descrição**: Componente responsável por exibir a barra de navegação onde existe um menu para filtrar dados ou pesquisar
- **Exemplo de Uso**:
  ```jsx
  <AppBarComponent />
  ```

### `Dialog Search`

- **Descrição**: Componente responsável por exibir o dialog quando será realizado uma pesquisa.
- **Variáveis**:
  - `filteredData`: Está recebendo os dados filtrados partir de todos os dados com base no valor de busca.
- **Configurações do Dialog**:
  - `open`: Abre o dialog se o valor do estado for true.
  - `onOpenChange`: Função que altera o estado da visualização do dialog.
- **Props**:
  - Não utiliza props. Está consumindo os dados diretamente dos hooks.
- **Exemplo de Uso**:
  ```jsx
  <DialogComponent />
  ```

### `Equipment History`

- **Descrição**: Componente responsável por exibir o histórico de estados e alguns detalhes sobre um determinado equipamento.
- **Dados**:
  - `selectedEquipment`: Vai trazer o equipamento selecionado, aquele que será exibido.
  - `data`: Todos os dados com base no ID do equipamento selecionado.
  - `loading`: Enquanto busca os dados essa variável ficará como true e após os dados serem retornados, ela ficará false.
  - `error`: Caso tenha algum erro ao buscar os dados do equipamento.
- **Props**:
  - Não utiliza props. Está consumindo os dados diretamente dos hooks.
- **Exemplo de Uso**:
  ```jsx
  <EquipmentHistoryComponent />
  ```

### `Status Badge`

- **Descrição**: Componente responsável por exibir o estado de um equipamento.
- **Props**:
  - `text`: Texto da badge. No caso da aplicação poderá ser Operando, Parado ou Manutenção.
  - `color`: Cor para a badge. No nosso caso a cor pode ser verde para indicar que o equipamento está operando, amarelo caso ele esteja parado ou vermelho se estiver em manutenção.
- **Exemplo de Uso**:
  ```jsx
  <StatusBadgeComponent />
  ```

## Como Rodar o Projeto

### Pré-requisitos

- Node.js v16+
- PNPM, NPM ou Yarn

### Passos

1. Clone o repositório:

   ```bash
   git clone https://github.com/gabrcastro/teste-frontend-v4-aikodigital.git

   ```

2. Instale as dependências:

   ```bash
   pnpm install

   ```

3. Inicie a aplicação:
   ```bash
   pnpm dev
   ```

## Estrutura do projeto

| Diretório/Arquivo              | Descrição                      |
| ------------------------------ | ------------------------------ |
| `public/`                      | Arquivos públicos              |
| `public/data/`                 | Dados em JSON                  |
| `public/icons/`                | Icones utilizados              |
| `src/adapters/`                | Adapters                       |
| `src/components/`              | Componentes globais            |
| `src/components/ui/`           | Componentes do Shadcn          |
| `src/hooks/`                   | Hooks da aplicação             |
| `src/lib/`                     | Utils do Shadcn                |
| `src/pages/`                   | Páginas da aplicação           |
| `src/pages/home/components/`   | Componentes usados na home     |
| `src/pages/home/home.page.tsx` | Página inicial Home            |
| `src/stores/`                  | Estados usando Zustand         |
| `src/types/`                   | Types ou interfaces utilizadas |
| `src/utils/`                   | Funções utilitárias            |
| `src/layout.tsx`               | Layout principal               |
| `src/main.tsx`                 | Arquivo principal              |

## Testes

### Como Rodar os Testes

Execute o comando:

```bash
pnpm test
```

### Caso de Testes Implementados

- **Todos os dados:**

  - Busca dados.
  - Erro em buscar dados.
  - Busca por id.
  - Busca por id não encontrar nenhum dado.
  - Busca por histórico de dados do equipamento.

- **Filtrar equipamentos:**

  - Falhar ao filtrar dados.
  - Trazer todos os dados se não existir filtro.
  - Filtrar por estado.
  - Filtrar por nome.
  - Filtrar por qualquer termo.

- **Adapter:**

  - Retornar última posição baseada nos dados
  - Retornar último estado basedo nos dados
  - Processar dados de equipamento

- **Cálculo de postos de manutenção:**

  - Distância correta entra dois pontos.
  - Pontos com posições iguais.
  - Posto de manunteção mais próximo.
  - Posto de manutenção não disponível.
  - Posição inválida.
 
Também foi implementado teste no componente de navegação.

## Melhorias

- **Exibir a rota pelas estradas.**
  - Encontrar uma melhor forma de fazer isso.
- **Adicionar autenticação para usuários.**
  - Autenticação por tipo de usuário é interessante, pois pode facilitar para gestores e até mesmo funcionários.
- **Criar Dashboard.**
  - Ajuda na tomada de decisções.
  - Pode ser com base no desempenho do usuário, quantidade de lucro total, média de equipamentos precisando de manutenção ou outras informações.
