<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->



<!-- PROJECT SHIELDS -->

<!--
*** based on https://github.com/othneildrew/Best-README-Template
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- TABLE OF CONTENTS -->

<details>
  <summary>Table of Contents</summary> {#indexerd-md-top}
  <ol>
    <li><a href="#sobre-o-webrotas">Sobre o WebRotas</a></li>
    <li><a href="#requisitos-do-sistema">Requisitos do sistema</a></li>
    <li><a href="#instalação">Instalação</a></li>
        <ul>
            <li><a href="#1-instale-o-git">Instale o Git</a></li>
            <li><a href="#2-baixe-o-webrotas">Baixe o WebRotas</a></li>
            <li><a href="#3-instale-o-wsl">Instale o WSL</a></li>
            <li><a href="#4-instale-o-podman">Instale o Podman</a></li>
            <li><a href="#5-instale-o-uv">Instale o UV</a></li>
        </ul>
    <li><a href="#baixar-dados-de-referência">Baixar Dados de Referência</a></li>
        <ul>
            <li><a href="#1---limites-municipais-brasileiros---2023">Limites Municipais Brasileiros - 2023</a></li>
            <li><a href="#2---favelas-e-comunidades-urbanas---2022">Favelas e Comunidades Urbanas - 2022</a></li>
            <li><a href="#3---áreas-urbanizadas-do-brasil---2019">Áreas Urbanizadas do Brasil - 2019</a></li>
            <li><a href="#4---arruamento-para-cálculo-de-rotas-osm">Arruamento para cálculo de rotas OSM</a></li>
        </ul>
    <li><a href="#configuração-do-ambiente-de-trabalho">Configuração do ambiente de trabalho</a></li>
        <ul>
            <li><a href="#1--criação-do-ambiente-conda">Criação do Ambiente Conda</a></li>
            <li><a href="#2--criação-do-ambiente-podman">Criação do Ambiente Podman</a></li>
        </ul>
    <li><a href="#inicializando-o-servidor">Inicializando o Servidor</a></li>
    <li><a href="#teste-e-uso-do-webrotas">Teste e uso do WebRotas</a></li>
    <li><a href="#contribuindo">Contribuindo</a></li>
    <li><a href="#licença">Licença</a></li>
    <li><a href="#referências-adicionais">Referências adicionais</a></li>

</ol>
</details>

<!-- ABOUT -->

# Sobre Instalação do *webRotas*

Este documento descreve o processo de instalação do *webRotas* em um ambiente windows, estando dividido em duas sessões, a primeira descreve a instalação do *webRotas* para usuários finais, e a segunda descreve a instalação para desenvolvedores.

# Requisitos do sistema

- Windows 10 1709 (build 16299) ou posterior
- Conexão com a internet
- 10 GB de espaço em disco
- 16 GB de memória RAM

Vc pode verificar a versão do Windows usando o comando

```shell
winver
```

> | ⚠️*IMPORTANTE*                                                                                                                                                                                                                                                                                                                                                                       |
> | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | Em princípio o*webRotas* não é compatível com o uso em máquinas virtuais pois faz uso do recurso de virtualização do windows para uso do WLS. Mais detalhes sobre o WSL são apresentados à seguir ou podem ser obtidos na [documentação do Subsistema Linux do Windows](dhttps://learn.microsoft.com/en-us/windows/wsl/install-manual#step-3---enable-virtual-machine-feature) |

<div align="right">
    <a href="#indexerd-md-top">
        <img src="../docs/images/up-arrow.svg" style="width: 2em; height: 2em;" title="Back to the top of this page">
    </a>
</div>

# Instalação rápida pelos Releases

## 1. Obtenha as Ferramentas de Instalação

Verifique se você possui as seguintes ferramentas instaladas:

- PowerShell 5.1 ou posterior

Abra o terminal PowerShell utilizando as teclas `Win + R` ou o menu iniciar (teclas windows) e digitando `powershell`, ou utilizando o seu aplicativo de terminal preferido:

Devido a restrições de segurança em computadores corporativos da Anatel, a instalação do *webRotas* deve ser feita na pasta `C:\Users\SeuUsuario\AppData\Roaming\ANATEL`, verifique este diretório no seu computador local com o comando `echo "$env:APPDATA\ANATEL"`, continue a instalação conforme indicado nos passos à seguir. Para outros ambientes, a instalação pode ser feita em qualquer pasta de sua escolha.

Navegue até a pasta de instalação utilizando o comando `cd C:\Users\SeuUsuario\AppData\Roaming\ANATEL` ou crie a pasta com o comando `mkdir C:\Users\SeuUsuario\AppData\Roaming\ANATEL`.

### 1.1 Acesse a página de Releases do WebRotas e faça o download do ultimo release

Na linha do comando do powershell vá para o diretório onde deseja instalar o webRotas e o abaixe e descomprima com os comandos abaixo:

```shell
$URL = "https://github.com/InovaFiscaliza/webRotas/releases/latest/download/webrotas.tgz"

Invoke-WebRequest -UseBasicParsing -Uri $URL -OutFile "webrotas.tgz"

tar -xvzf webrotas.tgz
```

Vá para o diretório do webRotas já descomprimido com o seguinte comando:

```shell
cd .\webRotas\
```

### 1.2 Baixar dados de referência no repositório da Anatel

Além da aplicação, é necessário instalar os dados de referência utilizados por esta para realizar o roteamento.

Caso tenha acesso aos repositórios da Anatel, baixe os dados de referência para o *webRotas* utilizando um navegador para acessar o [Sharepoint](https://anatel365.sharepoint.com/:u:/r/sites/InovaFiscaliza/DataHub%20%20GET/webRotas/resources.zip?csf=1&web=1&e=PU4O04)

Atenção, trata-se de arquivo compactado de grande volume (2.3GB), sendo recomendado o uso de uma conexão de alta velocidade.

Faça o download do arquivo baixado na pasta `.\webRotas` .

Caso não tenha acesso ao Sharepoint corporativo da Anatel, é possível realizar o download dos dados de referência a partir de repositórios públicos, conforme descrito ao final do presente guia, na seção [Baixar de Repositórios Públicos](#baixar-de-repositórios-públicos).

### 1.3 Executar o script powershell que finalizará a instalação

Neste momento você já estará no diretório raiz do webRotas execute os comandos abaixo e termina a instalação.

```shell
cd Install
.\setup.ps1
```

Este script fara todas as configurações necessárias e informará que tudo executou de forma correta.

# Instalação para Todos os Usuários

## 1. Obtenha as Ferramentas de Instalação

Verifique se você possui as seguintes ferramentas instaladas:

- PowerShell 5.1 ou posterior
- WinGet 1.10 ou posterior

Abra o terminal PowerShell utilizando as teclas `Win + R` ou o menu iniciar (teclas windows) e digitando `powershell`, ou utilizando o seu aplicativo de terminal preferido:

### 1.1 Instale o **WinGet**

Verifique se dispõe do Winget digitando o comando em um terminal:

```shell
winget --version
```

Usualmente `Winget` não estará disponível até que você tenha feito login no Windows como usuário pela primeira vez, acionando o Microsoft Store para registrar o Windows Package Manager como parte de um processo assíncrono. Consulte [MS Use o WinGet tool para instalar e gerenciar aplicativos](https://learn.microsoft.com/en-us/windows/package-manager/winget/) para mais informações.

Alternativamente, winget pode ser obtido usando a seguinte sequência de comandos, conforme sugerido por [Vladan](https://stackoverflow.com/questions/74166150/install-winget-by-the-command-line-powershell#answers-header):

```shell
# get latest download url
$URL = "https://api.github.com/repos/microsoft/winget-cli/releases/latest"
$URL = (Invoke-WebRequest -Uri $URL).Content | ConvertFrom-Json | Select-Object -ExpandProperty "assets" | Where-Object "browser_download_url" -Match '.msixbundle' | Select-Object -ExpandProperty "browser_download_url"

# download
Invoke-WebRequest -UseBasicParsing -Uri $URL -OutFile "Setup.msix"

# install
Add-AppxPackage -Path "Setup.msix"

# delete file
Remove-Item "Setup.msix"
```

Outra alternativa é realizar o download do arquivo  `msixbundle` do repositório `https://github.com/microsoft/winget-cli/releases` utilizando um navegador e instalar o aplicativo clicando duas vezes sobre ele ou executando o comando `Add-AppxPackage` acima descrito, usando como argumento o caminho para o arquivo baixado.

### 1.2 Verifique a versão PowerShell

Verifique a versão PowerShell usando o comando

```shell
$PSVersionTable.PSVersion
```

PowerShell pode ser atualizado para a versão mais recente utilizando winget com o seguinte comando:

```shell
winget install Microsoft.PowerShell
```

 Para outros métodos, verifique o [procedimento de instalação do PowerShell](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.5)

> | ⚠️*IMPORTANTE*                                                                      |
> | :-------------------------------------------------------------------------------------- |
> | Todos os comandos indicados à seguir devem ser executados no terminal do*PowerShell* |

<div align="right">
    <a href="#indexerd-md-top">
        <img src="../docs/images/up-arrow.svg" style="width: 2em; height: 2em;" title="Back to the top of this page">
    </a>
</div>

## 2. Instale o **wsl**

WSL é um recurso padrão do windows nas versões 10 2004 (build 19041) ou posterior, mas pode estar desabilitado ou não configurado corretamente.

Verifique se WSL está instalado utilizando o comando:

```shell
wsl.exe --version
```

Caso não esteja instalado, execute:

```shell
wsl.exe --install
```

Em alguns sistemas, pode ser necessário habilitar o recurso de máquina virtual. Neste site, você encontrará mais detalhes na [documentação do Subsistema Linux do Windows](https://learn.microsoft.com/en-us/windows/wsl/install-manual#step-3---enable-virtual-machine-feature)

O procedimento pode variar dependendo do modelo da BIOS e do tipo de CPU.

Em algumas máquinas, pode ser necessário habilitar a opção manualmente. Outra alternativa é abrir o PowerShell como administrador e executar o seguinte comando:

```shell
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

Feitas essa operações, repita a instalação do wsl com o comando `wsl.exe --install`

<div align="right">
    <a href="#indexerd-md-top">
        <img src="../docs/images/up-arrow.svg" style="width: 2em; height: 2em;" title="Back to the top of this page">
    </a>
</div>

## 3. Instale o **podman**

Verifique se o podman engine está instalado utilizando o comando:

```shell
podman --version
```

É esperado que esteja disponível na versão 5.4 ou superior.

Caso necessário, instale o podman engine utilizando winget

```shell
winget install RedHat.Podman
```

O processo de instalação inciará uma janela própria, que demandará a elevação do usuário para administrador, todavia as mensagens de conclusão com sucesso devem ser apresentadas no terminal onde o comando foi executado.

Para facilitar o uso do podman, vc pode também instalar o podman desktop, que é uma interface gráfica para o podman engine.

No processo de instalação e para uso do *webRotas*, não se utilizará diretamente o PodmanDesktop.

Mais detalhes sobre a instalação e uso deste podem ser obtidos em: [https://podman-desktop.io/docs/installation/windows-install](https://podman-desktop.io/docs/installation/windows-install), incluindo opções para instalação via Winget e Chocolatey.

Após instalado, o sistema deverá ser reinicializado.

<div align="right">
    <a href="#indexerd-md-top">
        <img src="../docs/images/up-arrow.svg" style="width: 2em; height: 2em;" title="Back to the top of this page">
    </a>
</div>

## 4. Instale o **UV**

Verifique se o `uv` está instalado utilizando o comando:

```shell
uv --version
```

É esperado que o `uv` seja utilizado em sua última versão, 0.6.7 ou posterior. Caso necessário, instale o utilizando o comando:

```shell
winget install --id=astral-sh.uv  -e
```

<div align="right">
    <a href="#indexerd-md-top">
        <img src="../docs/images/up-arrow.svg" style="width: 2em; height: 2em;" title="Back to the top of this page">
    </a>
</div>

# Instalação para Usuários Finais

## Instalando o *webRotas*

Devido a restrições de segurança em computadores corporativos da Anatel, a instalação do *webRotas* deve ser feita na pasta `C:\Users\SeuUsuario\AppData\Roaming\ANATEL`, verifique este diretório no seu computador local com o comando `echo "$env:APPDATA\ANATEL"`, continue a instalação conforme indicado nos passos à seguir. Para outros ambientes, a instalação pode ser feita em qualquer pasta de sua escolha.

Navegue até a pasta de instalação utilizando o comando `cd C:\Users\SeuUsuario\AppData\Roaming\ANATEL` ou crie a pasta com o comando `mkdir C:\Users\SeuUsuario\AppData\Roaming\ANATEL`.

> Baixe e descomprima o [pacote de instalação](https://github.com/InovaFiscaliza/webRotas/releases/latest) para a pasta criada com os seguintes comandos.

```shell
$URL = "https://github.com/InovaFiscaliza/webRotas/releases/latest/download/webrotas.tgz"

Invoke-WebRequest -UseBasicParsing -Uri $URL -OutFile "webrotas.tgz"

tar -xvzf webrotas.tgz
```

Navegue para pasta raiz do projeto *webRotas* e inicialize o ambiente com os seguintes comandos:

```shell
cd .\webRotas

uv sync
```

O comando irá descarregar as bibliotecas necessárias e configurar o ambiente python para execução do *webRotas*, o que pode levar alguns minutos.

O processo pode ser acompanhado pelo terminal.

Ao concluir, o *webRotas* já pode ser executado de forma simplificada por meio do script `.\src\ucli\webRotas.bat`.

Para facilitar o acesso, copie o ícone do *webRotas* o menu iniciar, com o comando:

```shell
cp .\src\ucli\webRotas.lnk $env:USERPROFILE\AppData\Roaming\Microsoft\Windows\Start Menu\Programs
```

para a área de trabalho com o comando:

```shell
cp .\src\ucli\webRotas.lnk $env:USERPROFILE\Desktop
```

Durante a primeira execução, é possivel que mecanismos de segurança alertem para o uso da página web local ou o uso de portas de rede. Permita o acesso e a execução do *webRotas* quando solicitado, por exemplo, conforme a seguinte imagem:

![Firewall](../docs/images/windows_firewall_alert.png)

<div align="right">
    <a href="#indexerd-md-top">
        <img src="../docs/images/up-arrow.svg" style="width: 2em; height: 2em;" title="Back to the top of this page">
    </a>
</div>

## Dados de referência no repositório da Anatel

Além da aplicação, é necessário instalar os dados de referência utilizados por esta para realizar o roteamento.

Caso tenha acesso aos repositórios da Anatel, baixe os dados de referência para o *webRotas* utilizando um navegador para acessar o [Sharepoint](https://anatel365.sharepoint.com/:u:/r/sites/InovaFiscaliza/DataHub%20%20GET/webRotas/resources.zip?csf=1&web=1&e=PU4O04)

Atenção, trata-se de arquivo compactado de grande volume (2.3GB), sendo recomendado o uso de uma conexão de alta velocidade.

Descompacte o arquivo baixado na pasta `.\webRotas` com o comandos abaixos, que incluem a remoção do arquivo baixado para liberar espaço em disco:

```shell
Expand-Archive -Force -LiteralPath .\resources.zip -DestinationPath .\src\

rm .\resources.zip
```

> | ⚠️*IMPORTANTE*                                                                                                                                                                           |
> | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | É possível que ao descomprimir os arquivos de dados, o sistema operacional ou programa utilizado para descomprimir pergunte se deseja mesclar o conteúdo das pastas, responda que*sim*. |

Observe que a operação mescla o conteúdo das pastas existentes com o novo conteúdo baixado, por exemplo, a pasta `webRotas\src\resources\Osmosis`, que após a instalação realizada nos passos anteriores conterá apenas o arquivo `filter.bat` e duas subpastas vazias, após o `merge` passará a conter também o arquivo `osmosis_webrota.tar` e dentro da pasta `brazil` será copiado o arquivo `brazil-latest.osm.pbf`.

Caso não tenha acesso ao Sharepoint corporativo da Anatel, é possível realizar o download dos dados de referência a partir de repositórios públicos, conforme descrito ao final do presente guia, na seção [Baixar de Repositórios Públicos](#baixar-de-repositórios-públicos).

Para usuários finais, com este passo a instalação do *webRotas* está concluída.

Veja as explicações de uso na página inicial do repositório do [webRotas](..\README.md).

<div align="right">
    <a href="#indexerd-md-top">
        <img src="../docs/images/up-arrow.svg" style="width: 2em; height: 2em;" title="Back to the top of this page">
    </a>
</div>

# Instalação para Desenvolvedores

Os passos descritos a seguir são destinados ao uso por desenvolvedores que desejam contribuir com o projeto *webRotas*.

## 1. Instale o **Git**

Verifique se o git está instalado utilizando o seguinte comando:

```shell
git --version
```

Caso negativo, instale git usando:

```shell
winget install Git.Git
```

<div align="right">
    <a href="#indexerd-md-top">
        <img src="../docs/images/up-arrow.svg" style="width: 2em; height: 2em;" title="Back to the top of this page">
    </a>
</div>

## 2. Baixe o *WebRotas*

Defina uma pasta para guardar o projeto.

De preferência escolha uma pasta que atenda aos seguintes critérios:

- fácil acesso;
- não protegida por permissões de administrador;
- não sincronizadas com serviços de nuvem como OneDrive, Google Drive, etc.

Por exemplo, crie uma pasta chamada `C:\Users\<SeuNomeDeUsuario>\github` ou se tiver um disco de dados, utilize `D:\github`, por exemplo, deixando a pasta com um caminho mais curta e de fácil acesso.

Para criar a pasta e navegar até ela, utilize os seguintes comandos:

```shell
mkdir D:\github

cd D:\github
```

Clone o repositório com o comando:

```shell
git clone https://github.com/InovaFiscaliza/webRotas.git
```

Após esse comando ser executado, será criada uma pasta chamada `webRotas\` com todos os arquivos do projeto.

> | ⚠️*IMPORTANTE*                                                                                                                               |
> | :----------------------------------------------------------------------------------------------------------------------------------------------- |
> | A pasta raiz do projeto será referenciada nos passos seguintes apenas como `.\`, referindo-se à pasta `webRotas` criada no passo anterior. |

<div align="right">
    <a href="#indexerd-md-top">
        <img src="../docs/images/up-arrow.svg" style="width: 2em; height: 2em;" title="Back to the top of this page">
    </a>
</div>

## 2. Inicialize o ambiente

Navegue para pasta raiz do projeto *webRotas* e inicialize o ambiente com os seguintes comandos:

```shell
cd .\webRotas

uv sync
```

O comando irá descarregar as bibliotecas necessárias e configurar o ambiente python para execução do *webRotas*, o que pode levar alguns minutos.

O processo pode ser acompanhado pelo terminal.

<div align="right">
    <a href="#indexerd-md-top">
        <img src="../docs/images/up-arrow.svg" style="width: 2em; height: 2em;" title="Back to the top of this page">
    </a>
</div>

# Dados de Referência

Além da aplicação, é necessário instalar os dados de referência utilizados por esta para realizar o roteamento.

Caso tenha acesso aos repositórios da Anatel, siga os passos indicados na seção [Dados de referência no repositório da Anatel](#dados-de-referência-no-repositório-da-anatel).

Caso não tenha acesso ao Sharepoint corporativo da Anatel, é possível realizar o download dos dados de referência a partir de repositórios públicos, conforme descrito a seguir.

<div align="right">
    <a href="#indexerd-md-top">
        <img src="../docs/images/up-arrow.svg" style="width: 2em; height: 2em;" title="Back to the top of this page">
    </a>
</div>

# Baixar de Repositórios Públicos

A seguir são apresentados os passos para baixar os dados de referência a partir de repositórios públicos.

## 1 - limites municipais brasileiros - 2023

Baixe os dados de limites políticos municipais brasileiros com a seguinte sequência de comandos:

```shell
cd .\src\resources\BR_Municipios

Invoke-WebRequest -OutFile BR_Municipios_2023.zip -Uri https://geoftp.ibge.gov.br/organizacao_do_territorio/malhas_territoriais/malhas_municipais/municipio_2023/Brasil/BR_Municipios_2023.zip

Expand-Archive -LiteralPath BR_Municipios_2023.zip -DestinationPath .\

rm BR_Municipios_2023.zip

cd ..\..\..
```

<div align="right">
    <a href="#indexerd-md-top">
        <img src="../docs/images/up-arrow.svg" style="width: 2em; height: 2em;" title="Back to the top of this page">
    </a>
</div>

## 2 - Favelas e Comunidades Urbanas - 2022

Baixe os dados de [favelas](https://inde.gov.br/AreaDownload#) brasileiras com a seguinte sequência de comandos:

```shell
cd .\src\resources\Comunidades

Invoke-WebRequest -OutFile qg_2022_670_fcu_agreg.zip -Uri "https://geoservicos.ibge.gov.br/geoserver/CGMAT/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CGMAT:qg_2022_670_fcu_agreg&outputFormat=SHAPE-ZIP"

Expand-Archive -LiteralPath qg_2022_670_fcu_agreg.zip -DestinationPath .\

rm qg_2022_670_fcu_agreg.zip

cd ..\..\..
```

<div align="right">
    <a href="#indexerd-md-top">
        <img src="../docs/images/up-arrow.svg" style="width: 2em; height: 2em;" title="Back to the top of this page">
    </a>
</div>

## 3 - Áreas Urbanizadas do Brasil - 2019

Baixe os dados de [áreas urbanizadas](https://inde.gov.br/AreaDownload#) do Brasil com a seguinte sequência de comandos:

```shell
cd .\src\resources\Urbanizacao

Invoke-WebRequest -OutFile areas_urbanizadas_2019.zip -Uri "https://geoservicos.ibge.gov.br/geoserver/CGEO/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CGEO:AU_2022_AreasUrbanizadas2019_Brasil&outputFormat=SHAPE-ZIP"

Expand-Archive -LiteralPath areas_urbanizadas_2019.zip -DestinationPath .\

rm areas_urbanizadas_2019.zip

cd ..\..\..
```

<div align="right">
    <a href="#indexerd-md-top">
        <img src="../docs/images/up-arrow.svg" style="width: 2em; height: 2em;" title="Back to the top of this page">
    </a>
</div>

## 4 - Arruamento para cálculo de rotas OSM

Baixe os dados de [Arruamento](https://download.geofabrik.de/south-america/brazil.html) com a seguinte sequência de comandos:

```shell
cd .\src\resources\Osmosis\brazil

Invoke-WebRequest -OutFile brazil-latest.osm.pbf -Uri https://download.geofabrik.de/south-america/brazil-latest.osm.pbf

cd ..\..\..
```

<div align="right">
    <a href="#indexerd-md-top">
        <img src="../docs/images/up-arrow.svg" style="width: 2em; height: 2em;" title="Back to the top of this page">
    </a>
</div>

# Configuração do ambiente de trabalho

O pacote de dados do repositório corporativo já inclui imagens dos containeres utilizados, caso necessário, siga as instruções a seguir para criar as imagens dos containeres à partir de repositórios públicos.

## 1- Criação do Ambiente Podman

São utilizados containeres para pré-processamento dos mapas de arruamento e cálculo de rotas. Estes incluem  [**osmosis**](https://github.com/yagajs/docker-osmosis) e [**osrm-backend**](https://github.com/Project-OSRM/osrm-backend)..

Descarregue as imagens dos containeres com a seguinte sequência de comandos:

```shell
cd .src\resources

podman machine init

podman machine start

podman pull yagajs/osmosis

podman pull osrm/osrm-backend
```

<div align="right">
    <a href="#indexerd-md-top">
        <img src="../docs/images/up-arrow.svg" style="width: 2em; height: 2em;" title="Back to the top of this page">
    </a>
</div>

Prepare pastas e imagem do container para o Osmosis com a seguinte sequência de comandos:

```shell
cd .\src\resources\Osmosis

podman run --name osmosis -v .:/data yagajs/osmosis osmosis

podman commit osmosis osmosis_webrota

podman save -o osmosis_webrota.tar osmosis_webrota
```

Tendo sido realizadas todas as operações, deve ser possível visualizar cópia da imagem do container `osmosis_webrota.tar` no diretório `.\Servers\Osmosis`.

Preparar pastas e imagem do container para o OSRM com a seguinte sequência de comandos:

```shell
cd .\src\resources\OSMR\data

podman run --name osmr -v .:/data osrm/osrm-backend

podman commit osmr osmr_webrota

podman save -o osmr_webrota.tar osmr_webrota
```

Tendo sido realizadas todas as operações, deve ser possível visualizar cópia da imagem do container `osmr_webrota.tar` no diretório `.\Servers\OSRM`.

Preparar pastas e arquivos para o servidor com a seguinte sequência de comandos:

```shell
cd .\Servers\backend\webdir

mkdir logs

mkdir templates
```

<div align="right">
    <a href="#indexerd-md-top">
        <img src="../docs/images/up-arrow.svg" style="width: 2em; height: 2em;" title="Back to the top of this page">
    </a>
</div>

# Teste e uso em ambiente de desenvolvimento

A forma mais prática de trabalhar com o *webRotas* é utilizando o ambiente de desenvolvimento do VSCode, sendo disponibilizado no repositório arquivos para configuração do ambiente na pasta `.vscode`.

Estão disponíveis configurações no `launch.json` para execução do servidor e do cliente com diferentes argumentos, devendo ser utilizado como ambiente o .venv criado pelo `uv sync`.

A inicialização do servidor em modo debug demanda o uso do cliente para envio das requisições, o que pode ser realizado tanto pela execução do script `webrota_client.py` quanto pelo uso de testes adicionais disponíveis na pasta `.\tests\dev`.

Para iniciar o servidor diretamente na linha de comando vc pode utilizar:

```shell
uv run .\src\backend\webdir\Server.py
```

Para o aplicativo cliente utilize o comando:

```shell
uv run .\src\ucli\webrota_client.py .\tests\exemplo_visita_ro.json
```

Caso o aplicativo cliente seja chamado sem o argumento de nome do arquivo a ser enviado ao servidor, será apresentada a ajuda com as opções disponíveis e executado exemplo de demonstração.

<div align="right">
    <a href="#indexerd-md-top">
        <img src="../docs/images/up-arrow.svg" style="width: 2em; height: 2em;" title="Back to the top of this page">
    </a>
</div>
