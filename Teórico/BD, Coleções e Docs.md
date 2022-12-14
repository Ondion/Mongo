# Bancos de Dados, Coleções e Documentos  

A estrutura de armazenamento do MongoDB consiste em:  
  
 - ter diversos bancos de dados;  
 - dentro destes bancos temos as coleções (que seriam equivalentes às tabelas dos bancos de dados relacionais);  
 - dentro destas coleções temos os documentos (que seriam equivalentes aos registros dos bancos de dados relacionais).  
  
## Bancos de Dados  
Assim como nos sistemas gerenciadores de bancos de dados relacionais, dentro de uma mesma instância do MongoDB você pode ter um ou vários bancos de dados. Uma grande diferença é que não temos a formalidade de criar um banco de dados antes de fazer uma operação nele.
Por exemplo, quando vamos fazer um insert, o MongoDB cuida disso para você, criando o banco e a coleção (caso não existam previamente) juntos com o documento inserido. Tudo isso em uma mesma operação.
Uma vez conectado a uma instância do MongoDB através do MongoDB Shell, você só precisa especificar o contexto em que essa escrita acontecerá. Nesse caso, o contexto é o nome do banco de dados que você quer criar:

```
use <DB name>
db.nomeDaColecao.insertOne({ x: 1 })
``` 

A função insertOne() cria tanto o banco de dados, como a coleção nomeDaColecao, caso eles não existam. Se existirem, apenas mapeia o documento a ser inserido dentro deles e, por fim, executa a operação.  
  
## Coleções
Como citado anteriormente, os documentos no MongoDB são armazenados dentro das coleções. Lembrando que uma coleção é equivalente a uma tabela dos bancos de dados relacionais.  
  
**Criando uma coleção**  
Como você viu, se uma coleção não existe, o MongoDB cria essa coleção no momento do primeiro insert.  
```  
db.nomeDaColecao1.insertOne({ x: 1 })  
```  
Veja que a operação insertOne() cria uma nova coleção (caso ela não exista).  

## Criação explícita
Você também pode utilizar o método db.createCollection() para criar uma coleção e especificar uma série de parâmetros, como o tamanho máximo do documento ou as regras de validação para os documentos.
Se você não quiser especificar algum desses parâmetros, o uso do método para criação não é necessário. O exemplo abaixo cria uma coleção, especificando sua collation.  

```
db.createCollection( "nomeDaColecao", { collation: { locale: "pt" } } );
```
  
Você pode fazer modificações nos parâmetros de uma coleção através do collMod.  

## Documentos

Como dito anteriormente, os documentos são equivalentes aos registros ou linhas de uma tabela nos bancos de dados relacionais. Além disso, cada atributo (campo) é equivalente a uma coluna de uma linha da tabela. Sua diferença é que documentos podem conter estruturas mais ricas, diferentes entre documentos e armazenar muito mais informações do que você consegue em uma "linha simples" de uma tabela relacional. Abaixo, temos uma representação de um registro numa tabela relacional e também o seu correspondente em um documento:  

```  
{
    "_id": 1,
    "nome": "Jose",
    "endereco": {
        "logradouro": "Rua 1",
        "regiao": "Zona Norte",
        "cidade": "São Paulo",
        "uf": "SP"
    }
},
{
    "_id": 2,
    "nome": "Maria",
    "endereco": {
        "logradouro": "Rua 2",
        "cidade": "Belo Horizonte",
        "uf": "MG"
    }
}
```
  

Como você viu acima, um insert recebe como parâmetro um JSON. Esse parâmetro define os dados e a estrutura do documento. É importante ressaltar que, por ser schemaless, ou seja, sem esquema por padrão, a estrutura não faz parte da coleção e sim do documento. Com isso, você pode ter várias "estruturas" por coleção. No exemplo acima, podemos observar essa diferença entre os documentos: no primeiro, temos o atributo regiao, que não existe no segundo documento.
Quando você fizer uma alteração, faça-a em nível de documento. Pois caso você a faça em nível de coleção, muitos documentos com estruturas diferentes poderão ser impactados com a criação, alteração ou remoção de um atributo que não faz parte da estrutura de todos (veremos isso mais à frente).  
  
**Validação de documentos**  
Você pode aplicar uma validação para que cada operação de escrita em sua coleção respeite uma estrutura. Utilize o Schema Validation para isso.  
  
**BSON Types**
Por mais que o insert ocorra recebendo um documento JSON, internamente, o MongoDB armazena os dados em um formato chamado BSON (ou Binary JSON). Esse formato é uma extensão do JSON e permite que você tenha mais tipos de dados armazenados no MongoDB, não somente os tipos permitidos pelo JSON.