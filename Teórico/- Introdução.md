# Mongo DB  
  
## Particularidades do NoSQL  
Nos bancos de dados relacionais, como o MySQL, o conceito **ACID (Atomicity, Consistency, Isolation, Durability)** é utilizado como base, porém, nos bancos de dados NoSQL, outro conceito é utilizado: o **BASE (Base Availability, Soft State and Eventually Consistent).**  

**cluster.** Um cluster, se refere à capacidade de um conjunto de servidores ou instâncias se conectarem a um banco de dados. Uma instância é uma coleção de memória e processos que interagem com o banco de dados, que é o conjunto de arquivos físicos que realmente armazenam os dados.
O cluster oferece duas vantagens principais:  
**Tolerância a falhas (Fault Tolerance):** como há mais de um servidor ou instância para os usuários se conectarem, o cluster oferece uma alternativa no caso de falha em um servidor. Quando se lida com dezenas de milhares de máquinas em um único centro de processamento de dados.  

**Balanceamento de carga (Load Balancing):** o cluster geralmente é configurado para permitir que os usuários sejam automaticamente alocados ao servidor com o mínimo de uso paramjsjfs que, assim, se otimize o uso da estrutura disponível para o banco.  
  
## Detalhando o conceito BASE  
  
**Base Availability - BA**  
O banco de dados aparenta funcionar o tempo todo. Como existe o cluster, se um servidor falhar, o banco continuará funcionando por conta de outro servidor que suprirá essa falha;  

**Soft State - S**
Não precisa estar consistente o tempo todo. Ou seja, com um banco distribuído em várias máquinas e todas sendo usadas com igual frequência para escrita e consulta, é possível que, em dado momento, uma máquina receba uma escrita e não tenha tido tempo de "repassar" essa escrita para as demais máquinas do banco. Assim, se um usuário consultar a máquina que já foi atualizada e outro o fizer numa máquina menos atualizada, os resultados, que deveriam ser iguais, serão diferentes. I/magine a sua timeline do Facebook: nela são exibidos os posts de seus amigos, porém nem todos os posts são exibidos exatamente ao mesmo tempo. Nesse caso, o que acontece é que a informação foi enviada ao banco de dados, mas nem todos os servidores do cluster têm essa mesma informação ao mesmo tempo. Isso permite que o banco de dados possa gerenciar mais informações de escrita sem ter que se preocupar em replicá-las em uma mesma operação;  
  
**Eventually Consistent - E**  
O sistema se torna consistente em algum momento. Como não temos a informação replicada "instantaneamente", esse ponto se encarrega de deixar o banco consistente "ao seu tempo". Isso porque, dependendo das configurações do cluster, essa replicação pode acontecer mais rapidamente ou não. Mas em algum momento as informações estarão consistentes e presentes em todos os servidores do cluster.  
  
**NoSQL e suas classes**  
Os bancos de dados NoSQL estão divididos em quatro principais tipos (são chamados de classes no contexto de banco de dados):  
  

**Chave / Valor (Key / Value)**
**Família de Colunas (Column Family)**
**Documentos (Document)**
**Grafos (Graph)**
  
**Chave / Valor - Key / Value**  
Essa primeira classe é considerada a mais simples. Os dados são armazenados num esquema de registros compostos por uma chave (identificador do registro) e um valor (todo o conteúdo pertencente àquela chave). Você consegue recuperar um registro do seu banco de dados através da chave. Consultas por algum conteúdo através do valor não são permitidas.
A maioria dos bancos de dados Chave / Valor utilizam-se do recurso de armazenamento in-memory (memória RAM) e, com isso, o acesso aos dados é extremamente rápido.  
  
**Família de Colunas - Column Family**  
Subindo um pouco mais a complexidade dos dados armazenados, essa segunda classe armazena os dados como um conjunto de três "chaves": linha, coluna e timestamp. As linhas e colunas concentram os dados, e as diferentes versões desses dados são identificadas pelo timestamp.
Destaque para o conceito de masterless, ou seja, não existe um único servidor no cluster que concentra a escrita; essas operações são atendidas pelo servidor que estiver mais "próximo" de onde a operação vier.
O uso dessa classe é altamente recomendável em sistemas nos quais dados analíticos em grande escala são o ponto-chave.   
  
**Documentos - Document**  
A classe mais flexível e com ampla aderência em vários casos de uso. Os dados são armazenados em estilo JSON, podendo ter vários níveis e subníveis, o que confere aos dados armazenados possibilidade de ter maior complexidade. A estrutura de um documento é muito parecida com o que armazenamos na classe Chave / Valor. Porém, com Documentos, não temos apenas uma chave e sim um conjunto de chaves e valores.
Por mais que schemaless (sem o uso de schema) seja um ponto presente na maioria dos bancos de dados NoSQL, na classe de Documentos temos esse conceito mais presente justamente pelo uso do JSON como padronização. Isso porque a inclusão, remoção ou alteração de tipos de dados são muito mais simples e fluídos utilizando JSON.   
  
**Grafos - Graph**  
A classe que consegue armazenar dados muito complexos. Os dados são compostos por nós (vértices do grafo), relacionamentos (arestas do grafo) e as propriedades ou atributos dos nós ou relacionamentos. Note que o relacionamento é o ponto central dessa classe. Nesses bancos de dados, o relacionamento é físico, sendo persistido como qualquer outro dado dentro do banco. Dessa forma, as consultas que requerem esses relacionamentos são extremamente performáticas.
Os Grafos estão muito mais presentes em seu dia a dia do que você possa imaginar. Empresas e aplicativos de transporte ou GPS, por exemplo, utilizam os algoritmos e bancos de dados de Grafos para diversas de suas operações, como encontrar o motorista mais perto de você, calcular o menor caminho de um ponto a outro e até mesmo fazer recomendações de produtos em sites de comércio eletrônico. Sistemas de recomendação e antifraude também têm encaixe perfeito para essa classe.