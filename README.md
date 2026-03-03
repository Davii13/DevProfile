<div align="center">
  <h1>🚀 DevProfile – Portfólio Profissional</h1>
  
  <p>
    Um website de portfólio moderno, responsivo e acessível para apresentar trajetórias, habilidades e projetos.
  </p>

  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
  <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"></a>
</div>

---

> [!NOTE]
> **DevProfile** é um projeto desenvolvido como atividade prática de laboratório, contemplando front-end, back-end (via API Routes do Next.js) e hospedagem em nuvem. O objetivo central é entregar uma plataforma de alta performance para desenvolvedores exibirem seu trabalho de forma profissional.

<table>
  <tr>
    <td width="800px">
      <div align="justify">
        Este <b>README.md</b> documenta a arquitetura, tecnologias e instruções de execução do projeto <b>DevProfile</b>. Ele foi estruturado seguindo as boas práticas recomendadas para projetos acadêmicos e profissionais, garantindo <i>organização clara</i>, <i>reprodutibilidade</i> e <i>facilidade de colaboração</i>. Aqui você encontrará desde os links úteis e protótipos até o guia passo a passo para rodar a aplicação localmente utilizando <b>pnpm</b> e <b>Next.js</b>.
      </div>
    </td>
    <td>
      <div align="center">
        <img src="https://img.icons8.com/clouds/200/code.png" alt="Logo do Projeto" width="120px"/>
      </div>
    </td>
  </tr> 
</table>

---

## 📚 Índice

- [Links Úteis](#-links-úteis)
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Instalação e Execução](#-instalação-e-execução)
- [Deploy](#-deploy)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Demonstração](#-demonstração)
- [Autores](#-autores)
- [Agradecimentos](#-agradecimentos)

---

## 🔗 Links Úteis

* 🎨 **Protótipo no Figma:** [Acessar Design do Portfólio](https://www.figma.com/site/5uJwViQDZvkjFkw1QgB3hw/portifolio?node-id=0-1&t=inUnvzpmFWvPnJtW-1)
* 🌐 **Site Publicado (Produção):** [Acessar DevProfile](COLE_AQUI_O_LINK_DA_VERSAO_EM_PRODUCAO)

---

## 📝 Sobre o Projeto

O **DevProfile** nasceu da necessidade de centralizar a identidade profissional de desenvolvedores de software em um único lugar. Em um mercado de tecnologia competitivo, ter um portfólio rápido, acessível e visualmente agradável é fundamental para se destacar em processos seletivos e apresentar projetos acadêmicos ou freelance. 

O projeto resolve o problema da fragmentação de informações (currículos em PDF, links soltos do GitHub, etc.), oferecendo uma experiência de navegação fluida construída com renderização no lado do servidor (SSR) para garantir o melhor SEO e tempo de carregamento.

---

## ✨ Funcionalidades Principais

- 👨‍💻 **Apresentação Pessoal:** Seção dedicada a um resumo sobre o desenvolvedor, suas paixões e foco de carreira.
- 🛠️ **Exibição de Habilidades:** Grid interativo destacando as tecnologias, linguagens e frameworks dominados.
- 📂 **Catálogo de Projetos:** Cards detalhados de projetos desenvolvidos, com links diretos para repositórios (GitHub) e deploys (Live Demo).
- 📱 **Design 100% Responsivo:** Interface adaptável para qualquer tamanho de tela (Mobile, Tablet e Desktop).
- 📨 **Formulário de Contato:** Seção integrada para envio de mensagens diretas.
- 🌙 **Dark/Light Mode** *(Opcional/Se houver)*: Alternância de tema para melhor acessibilidade e conforto visual.

---

## 🛠 Tecnologias Utilizadas

Este projeto foi desenvolvido com as ferramentas mais modernas do ecossistema JavaScript/TypeScript:

* **[Next.js (App Router)](https://nextjs.org/)** - Framework React com suporte a SSR e rotas de API.
* **[TypeScript](https://www.typescriptlang.org/)** - Adiciona tipagem estática e segurança ao código.
* **[Tailwind CSS](https://tailwindcss.com/)** - Framework utilitário para estilização rápida e responsiva.
* **[PostCSS](https://postcss.org/)** - Ferramenta para transformar CSS com plugins JS.
* **[pnpm](https://pnpm.io/)** - Gerenciador de pacotes ultra-rápido e eficiente.
* **[Vercel](https://vercel.com/)** - Plataforma Serverless utilizada para deploy contínuo e infraestrutura.

---

## 🏗 Arquitetura

A aplicação segue a arquitetura moderna baseada no **App Router do Next.js**, que permite uma divisão clara entre **Server Components** (componentes renderizados no servidor para maior performance e SEO) e **Client Components** (componentes interativos renderizados no navegador). 



A escolha dessa arquitetura dispensa a necessidade de um servidor back-end isolado para funções simples (como envio de e-mails de contato), centralizando toda a lógica no mesmo repositório (*monolith moderno*).

---

## 🔧 Instalação e Execução

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:
* **Node.js:** Versão LTS (v18.x ou superior)
* **pnpm:** Gerenciador de pacotes (`npm install -g pnpm`)

### 📦 Clonando e Instalando Dependências

1. Clone o repositório:
```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd devprofile
