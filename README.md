## Gerenciamento de Agendamentos

Aplicação SPA para listar, criar, editar e excluir agendamentos, consumindo uma API simulada com json-server.
O foco é avaliar chamadas assíncronas, estados de loading/erro/sucesso, validação de formulários e organização dos componentes seguindo Atomic Design.

<img width="1532" height="842" alt="image" src="https://github.com/user-attachments/assets/f02017a4-ddc5-4f18-a080-a1cac9b7aa18" />

### Tecnologias

- React + TypeScript (Vite)
- Tailwind CSS
- React Hook Form + Zod (validação: campos obrigatórios e data/hora não no passado)
- @tanstack/react-query v5 (cache, loading, mutations)
- json-server (API fake)
- Vitest + Testing Library (testes unitários)

### Pré‑requisitos

- Node.js 18+ (recomendado 18, 20 ou 22)

### Instalação

```bash
npm install
```

### Executar a API fake (json-server)

```bash
npm run json-server
# A API sobe em http://localhost:3001 e usa o arquivo db.json na raiz do projeto
```

Opcional: para apontar a SPA para outra URL da API, defina a variável `VITE_API_URL` (por padrão é `http://localhost:3001`).

### Rodar a aplicação

Em outro terminal:

```bash
npm run dev
# Acesse a URL impressa pelo Vite (ex.: http://localhost:5173)
```

### Testes

Rodar todos os testes unitários:

```bash
npm test
```

Rodar testes específicos:

```bash
# Utilitário de data
npm test -- src/__tests__/date.test.ts

# Formulário principal
npm test -- src/__tests__/ScheduleFormModal.test.tsx

# Tabela (paginação, busca, ações)
npm test -- src/__tests__/ScheduleTable.test.tsx
```

### Organização (Atomic Design)

- `src/components/atoms`: elementos básicos (`Input`, `Button`, `Label`, `Logo`).
- `src/components/molecules`: composições simples (`Modal`, `SearchInput`, `Pagination`, `Toast`, `Avatar`, `DeleteConfirmDialog`).
- `src/components/organisms`: blocos maiores (`Header`, `ScheduleFormModal`, `ScheduleTable`).
- Páginas montadas em `App.tsx`. Alias de import `@` aponta para `src/`.

### Arquitetura e decisões

- Modal genérico como molécula: backdrop, ESC, aria e layout centralizados; formulários compõem o conteúdo.
- Formulários com React Hook Form + Zod: validação de campos obrigatórios e regra de “data+hora não no passado”.
- React Query v5: `placeholderData` para manter dados anteriores entre transições de página/busca.
- json-server: paginação via `_page`, `_limit`, ordenação por `date,time` e filtro `description_like`.

### Observações

- A busca filtra por descrição (`description_like`) via json-server.
- A validação do formulário impede datas/horários no passado.
