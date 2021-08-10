# Draw 2.0

![GitHub repo size](https://img.shields.io/github/repo-size/phedrakeson/draw2?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/phedrakeson/draw2?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/phedrakeson/draw2?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/phedrakeson/draw2?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/phedrakeson/draw2?style=for-the-badge)

![](https://i.gyazo.com/497147a9cdf906f81774cb0d5f8dee1f.png)

> Draw 2.0 é uma refatoração de um projeto antigo que eu criei com HTML, CSS e JS ([veja aqui](https://github.com/phedrakeson/draw)). Com o Draw é possível desenhar utilizando o canvas nativo do HTML tanto Mobile como Desktop.

### Tecnologias + Conceitos aplicados

Foi utilizado como experimento alguns conceitos aprendidos no livro Clean Architecture, provendo o Sketch Service como o Componente de nivel alto que permite a configuração e emite os estados do canvas para os componentes de nível baixo (da view): Toolbar e Canvas.

Toolbar é o componente da view que controla as configurações do canvas através do Sketch como:
- Tamanho do Lápis/Borracha/Texto;
- Gerencia o estado da ferramenta sendo utilizada: lápis ou borracha;
- Gerencia as cores;
- Aciona a flag que permite o canvas ser limpo;

Canvas é o componente da view que contém todos os métodos para o funcionamento do board, o mesmo também escuta pelo Sketch por ordens do que deve fazer.

Sketch é o componente de alto nível que vai configurar e emitir os estados do canvas, fornecendo a comunicação entre Toolbar e Canvas é ele quem controla:
- Tamanho máximo e mínimo das ferramentas Lápis/Borracha/Texto;
- Cor a ser utilizada;
- O estado atual da ferramenta: Se é Lápis ou Borracha;
- Se o canvas deve ser limpo;


Tecnologias utilizadas:
- Angular 12;
- Tailwind CSS;

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [ ] Migração do core do projeto: Desenhar por mouse, mobile (multiplos toques) e configurações básicas;
- [ ] Implementar versão Desktop (Electron.js);
- [ ] Implementar desenhos colaborativos (dois jogadores);

## 📫 Contribuindo para o Draw 2.0

Para contribuir com o Draw, siga estas etapas:

1. Bifurque este repositório.
2. Crie um branch: `git checkout -b <nome_branch>`.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
4. Envie para o branch original: `git push origin <nome_do_projeto> / <local>`
5. Crie a solicitação de pull.

Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).


## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.
