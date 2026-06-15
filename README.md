# RegulaMente

O RegulaMente é um protótipo funcional de tecnologia assistiva digital desenvolvido como Progressive Web App (PWA), com o objetivo de apoiar a autorregulação emocional de alunos com Transtorno do Espectro Autista (TEA) em contexto escolar.

A proposta surgiu a partir da necessidade de criar uma ferramenta simples, acessível e de baixo custo, capaz de auxiliar o aluno na identificação do seu estado emocional e na escolha de estratégias de regulação. O projeto também busca oferecer ao educador uma visualização básica das interações realizadas no próprio dispositivo.

## Objetivo do projeto

Desenvolver uma aplicação digital voltada ao apoio da inclusão escolar de alunos com TEA, utilizando uma interface visual, previsível e de baixa carga cognitiva.

## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript
* Progressive Web App (PWA)
* LocalStorage
* Pictogramas ARASAAC

## Fundamentação da interface

A interface do RegulaMente foi construída a partir de três bases principais:

* framework Zones of Regulation, utilizado para organizar os estados emocionais por zonas;
* Modelo GAIA, utilizado como referência para decisões de acessibilidade voltadas a usuários com TEA;
* pictogramas ARASAAC, utilizados como apoio à Comunicação Aumentativa e Alternativa.

## Funcionalidades principais

* seleção de perfil do usuário;
* tela principal com quatro zonas emocionais;
* telas de estratégias de autorregulação por zona;
* feedback visual e auditivo;
* retorno automático após a escolha de uma estratégia;
* painel demonstrativo com dados de interação;
* funcionamento offline;
* armazenamento local dos dados no próprio dispositivo.

## Organização do projeto

O projeto é composto por páginas HTML, arquivos de estilo, scripts JavaScript, imagens, áudios e arquivos necessários para funcionamento como PWA.

A lógica principal da aplicação está concentrada no arquivo `app.js`, responsável por registrar interações, armazenar dados localmente e gerar visualizações simples para acompanhamento.

## Privacidade

O RegulaMente utiliza armazenamento local por meio do LocalStorage. Dessa forma, os dados demonstrativos permanecem no próprio dispositivo e não são enviados para servidores externos.

Este repositório não contém dados reais de estudantes, informações pessoais, registros sensíveis ou qualquer dado identificável. Os dados utilizados possuem finalidade apenas demonstrativa.

## Status do projeto

Este projeto encontra-se em etapa de protótipo funcional, desenvolvido para fins acadêmicos. A aplicação foi avaliada por especialistas das áreas de psicologia e educação, e parte das sugestões recebidas foi incorporada em uma versão revisada do protótipo.

Versões futuras poderão incluir testes com usuários finais, maior personalização da interface, ampliação dos recursos de acessibilidade e melhorias no painel do educador.
