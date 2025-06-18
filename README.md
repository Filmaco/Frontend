#  FILMAÇO: Uma plataforma web com um acervo audiovisual colaborativo para conteúdo nacional

Interface web para a plataforma **Filmaço**, desenvolvida com **Vue 3**, **Tailwind CSS** e **shadcn/vue**. A aplicação consome a API REST feita com FastAPI e oferece recursos de descoberta, publicação e interação com conteúdos audiovisuais nacionais.

---

## Tecnologias Utilizadas

-  [Vue 3](https://vuejs.org/) - Composition API + TypeScript  
-  [Vite](https://vitejs.dev/) - Build e Dev Server  
-  [Tailwind CSS](https://tailwindcss.com/) - Estilização utilitária  
-  [shadcn/vue](https://vue.shadcn.dev/) - Componentes UI modernos e acessíveis  
-  [Vue Router](https://router.vuejs.org/) - Gerenciamento de rotas  

---

##  Estrutura do Projeto

```bash
src/
├── assets/            # Imagens e ícones
├── components/        # Componentes reutilizáveis
├── lib/               # Funções auxiliares
├── routes/            # Definição de rotas
├── services/          # Comunicação com API
├── viewa/             # Páginas principais
└── App.vue            # Componente raiz
```

---

##  Instalação

```bash
# Clone o repositório
git clone https://github.com/Filmaco/Frontend.git
cd front

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

---

##  Funcionalidades Principais

-  Autenticação (Login, cadastro, edição de perfil)
-  Publicação e gerenciamento de vídeos
-  Criação e organização de playlists
-  Comentários em vídeos
-  Avaliação de vídeos (1 a 3)
-  Visualização de estatísticas (usuário e global)
-  Filtro avançado por tipo, gênero, tags, duração, data
-  Denúncia de conteúdo inadequado
-  Seguir/desseguir usuários

---

##  Comandos úteis

| Comando           | Descrição                                |
|-------------------|--------------------------------------------|
| `npm run dev`     | Inicia a aplicação em modo de desenvolvimento |
| `npm run build`   | Gera a versão de produção da aplicação     |
| `npm run lint`    | Executa o linter                          |
| `npm run preview` | Pré-visualização da build                 |

---

##  Componentes Utilizados (shadcn/vue)

Exemplos de componentes utilizados:

- `<Button />`
- `<Input />`
- `<AlertDialog />`
- `<Tabs />`
- `<Card />`
- `<DropdownMenu />`
- `<Textarea />`
- `<Badge />`

---


##  Referências

- [shadcn/vue (documentação oficial)](https://vue.shadcn.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [FastAPI (backend da aplicação)](https://github.com/Filmaco/Backend))
