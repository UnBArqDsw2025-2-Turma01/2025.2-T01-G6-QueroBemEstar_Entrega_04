# 4.2. Módulo Reutilização de Software

## Introdução 

Este projeto aplica reutilização de software de forma sistemática, adotando princípios de Atomic Design, componentização, padronização de UI e organização modular. A seguir está um detalhamento de como cada camada da arquitetura contribui para a reutilização e redução de duplicação de código.

## Atomic Design 
A estrutura do projeto segue o padrão Atomic Design, dividido em:

**Átomos** (```components/atoms/```): unidades básicas e reutilizáveis da interface

Exemplos: 
- ```IconButtonRound```
- ```ChipInfo```
- ```MealBadge```

**Moléculas** (```components/molecules/```): composição de átomos para funções específicas

Exemplos: 
- ```RecipeActions (like, comentar, salvar)```
- ```SidebarItem```
- ```FeedNavButtons```

**Organismos** (```components/organisms/```): blocos maiores e independentes reutilizados em páginas

Exemplos: 
- ```Topbar```
- ```Sidebar```
- ```RecipeCard```
- ```HeroBanner```

**Templates** (```components/templates/```): estruturas que combinam organismos

Exemplo: 
- MainLayout → Sidebar + Topbar + Conteúdo

**Páginas** (```components/pages/```): apenas composição final dos templates e organismos

Esse padrão reduz código duplicado, facilita manutenção e garante consistência visual.

![atomic](../assets/atomic.jpg)

## Biblioteca de UI para reutilização (```components/ui/```)
A pasta ```components/ui/``` funciona como uma biblioteca de interface totalmente reutilizável, operando como um design system interno do projeto. Ela centraliza todos os componentes de UI de baixo nível, garantindo padronização, consistência visual e evolução escalável da aplicação.

A biblioteca foi criada para:
- Evitar repetição de estilos e layouts
- Criar uma base consistente para todos os componentes de interface
- Facilitar manutenção e evolução do design
- Unificar experiências de interação (hover, foco, animação)
- Criar padrões formais dentro da aplicação

Em vez de criar novos botões, novos cards, novos inputs, tudo é centralizado nos componentes da pasta ui/, que podem ser importados e reutilizados em qualquer página ou layout.

### React + forwardRef: Base para Reutilização Composicional
Todos os componentes usam:
```
import * as React from "react";
```
E usam forwardRef para:
- permitir composição profunda de componentes
- suportar refs sem quebrar acessibilidade
- reaproveitar elementos em combinações diversas
- permitir integração com Radix, Vaul e libs externas

Isso cria uma base sólida para componentes reutilizáveis e flexíveis.

### Tailwind + cn() - Reutilização de Estilo
A maioria dos arquivos importa:
```
import { cn } from "@/lib/utils";
```
Essa função padroniza:
- merge de classes Tailwind
- aplicação de estilos condicionais
- customização consistente via className

Isso garante que todos os componentes sigam o mesmo padrão visual, sem duplicar lógica de estilização.

### Class-Variance-Authority (CVA)
Vários componentes utilizam:
```
import { cva, type VariantProps } from "class-variance-authority";
```

Com CVA, os componentes podem ter variações configuráveis de:
- estilo
- tamanho
- comportamento

Exemplos diretos:
- buttonVariants
- badgeVariants
- labelVariants
- variantes do sidebar
- variantes de toggle

Isso permite criar muitas versões diferentes de um mesmo componente sem duplicar código.

### Lucide Icons - Ícones Reutilizáveis e Consistentes
Ícones importados incluem:
```ChevronDown```, ```ChevronRight```, ```ArrowLeft```, ```ArrowRight```, ```Check```, ```Circle```, ```MoreHorizontal```, ```X```, ```Dot```, ```PanelLeft```, ```GripVertical```...

Benefícios:
- ícones com estilo uniforme
- tamanhos consistentes
- padronização visual
- componentes de ícone reutilizáveis em buttons, menus e cards

## Importância

- Produtividade Aumentada: Ao evitar a recriação de funcionalidades, as equipes podem entregar projetos mais rapidamente, focando em requisitos novos e específicos. Isso se traduz em um menor tempo de comercialização (time-to-market).
- Melhora da Qualidade: Ativos reutilizáveis geralmente passam por múltiplos ciclos de teste e refinamento, resultando em software mais robusto, com menos defeitos e mais confiável.
- Consistência Aprimorada: A reutilização de componentes padronizados garante que funcionalidades similares se comportem da mesma forma em diferentes partes de um sistema ou em sistemas distintos, promovendo uma experiência de usuário e de desenvolvimento mais coesa.
- Redução de Custos: Embora possa haver um investimento inicial na criação de ativos reutilizáveis, a longo prazo, a economia de tempo e esforço na manutenção e no desenvolvimento de novas funcionalidades compensa, diminuindo os custos totais do projeto.
- Manutenibilidade Facilitada: Ativos bem documentados e testados são mais fáceis de entender e manter. Quando um problema é corrigido em um componente reutilizável, a correção se propaga para todas as instâncias onde ele é utilizado.
- Aprendizado e Conhecimento Compartilhado: A criação e o uso de ativos reutilizáveis incentivam o compartilhamento de conhecimento e boas práticas entre as equipes, padronizando soluções para problemas comuns.


## Em nosso projeto

### 1 - Frontend 

### Componentes reutilizáveis 
<div align="center">

![componentes](../assets/Componentes.png)

</div>

---

<div align="center">

![pastas](../assets/pastas.png)

</div>

---

- O componente NavLink (NavLink.tsx) é um exemplo de reutilização. Ele atua como um wrapper sobre o react-router-dom, centralizando comportamentos comuns de navegação e a aplicação de classes padrão. Isso reduz duplicação de código e garante consistência visual e funcional em toda a aplicação. As pastas atoms/, molecules/, organisms/ e templates/ seguem a metodologia Atomic Design, estruturando os componentes de forma hierárquica

### Hooks reutilizáveis 

---

<div align="center">

![pastas](../assets/carbon2.png)

</div>

---
- Os Hooks são funções personalizadas localizadas em frontend/src/hooks/* que encapsulam lógica de interface reutilizável em várias telas.Por exemplo,use-mobile.tsx contém a lógica para detectar se o dispositivo é móvel, permitindo que diferentes componentes acessem essa informação de forma consistente.

### Utilitários 

---

<div align="center">

![pastas](../assets/utils.png)

</div>

---
- Utilitário de estilo compartilhado por componentes.

#### 2 - backend 

### Helpers HTTP 
---

<div align="center">

![pastas](../assets/http.png)

</div>

---
- Padronizam as respostas HTTP reutilizáveis entre controllers.

### Middlewares reutilizaveis 

---

<div align="center">

![pastas](../assets/Adaptar.png)

</div>

---
- Encapsula verificação de token e busca de usuário — pode ser reutilizado por várias rotas.

### Validações reutilizáveis 
---

<div align="center">

![pastas](../assets/Validacao.png)

</div>

---
-  Permite compor validações em qualquer controller/service.

## Referências Bibliográficas
> FROST, Brad. Extending Atomic Design. Disponível em: <https://bradfrost.com/blog/post/extending-atomic-design/>
. Acesso em: 20/11/2025.

## Histórico de Versão
| Data       | Versão | Descrição                                                                                        | Autor                                                                                                                                                                                                                 | Revisores                                                                                                                                                              |
| ---------- | ------ | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 20/11/2025 | `1.0`  | Criação do documento | [Jose Vinicius](https://github.com/JoseViniciusQueiroz)                                                                                                                                                                          |  [Leonardo Sauma](https://github.com/leohssjr)         
| 21/11/2025 | `1.1`  | Adição da explicação sobre o Atomic Design | [Leonardo Sauma](https://github.com/leohssjr)                                                                                                                                                                          |                                                                                                                                                                                                                                                                     