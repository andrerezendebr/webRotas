
# ----------------------------------------------------------------------------------------------------------------------
# Functions declarations
function Test-DownloadedFile {
    param (
        [string]$outputFile  # Caminho para o arquivo baixado
    )

    # Verifica se o arquivo foi baixado com sucesso
    if (Test-Path $outputFile) {
        Write-Host "Download concluído com sucesso!" -ForegroundColor Green

        # Verifica o tamanho do arquivo
        $fileSize = (Get-Item $outputFile).Length
        if ($fileSize -gt 0) {
            Write-Host "O arquivo foi baixado com sucesso e seu tamanho é $fileSize bytes." -ForegroundColor Green
        } else {
            Write-Host "O arquivo foi baixado, mas está vazio." -ForegroundColor Red
            exit 1  # Encerra o script com código de erro
        }
    } else {
        Write-Host "Falha no download do arquivo." -ForegroundColor Red
        exit 1  # Encerra o script com código de erro
    }
}
# ----------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------------------------
# Obtém a versão do sistema operacional
# Define uma variável global para o tempo de espera
$Global:TempoEspera = 10
$osVersion = [System.Environment]::OSVersion.Version

# Exibe a versão completa
Write-Host "Detected Windows version: $osVersion"

# Extrai a versão principal (antes do ponto)
$majorVersion = $osVersion.Major

# Exibe a versão principal
Write-Host "Major version: $majorVersion"
# Verifica se a versão é maior ou igual a 10
if ($majorVersion -ge 10) {
    Write-Host "Your Windows version is 10 or greater. Proceeding with the script..."      
} else {
    Write-Host "Your Windows version is older than 10. Exiting..."
    exit
}
# ----------------------------------------------------------------------------------------------------------------------
# Verifica se o winget está instalado
$wingetExists = Get-Command winget -ErrorAction SilentlyContinue
if ($wingetExists) {
    Write-Host "Winget is installed. Proceeding with the script..."
} else {
    Write-Host "Winget is not installed. Exiting..." -ForegroundColor Red
    exit
}
# ----------------------------------------------------------------------------------------------------------------------
# Verifica se o Git está instalado
$gitExists = Get-Command git -ErrorAction SilentlyContinue

if ($gitExists) {
    Write-Host "Git is already installed. Version: $(git --version)"
} else {
    Write-Host "Git is not installed. Attempting to install it using winget..." -ForegroundColor Yellow
    winget install --id Git.Git -e --source winget
    # Verifica se a instalação foi bem-sucedida
    $gitExists = Get-Command git -ErrorAction SilentlyContinue
    if ($gitExists) {
        Write-Host "Git has been successfully installed. Version: $(git --version)" -ForegroundColor Green
    } else {
        Write-Host "Git installation failed. Please install it manually." -ForegroundColor Red
        exit 1
    }
}
# ----------------------------------------------------------------------------------------------------------------------
# Verifica se o WSL está instalado
$wslVersion = wsl.exe --version 2>$null
if ($?) {
    Write-Host "WSL is already installed. Version details:" -ForegroundColor Green
    Write-Host $wslVersion
} else {
    Write-Host "WSL is not installed. Attempting to install it..." -ForegroundColor Yellow
    
    # Executa o comando de instalação do WSL
    wsl.exe --install

    # Aguarda um momento para a instalação ser concluída
    Start-Sleep -Seconds $Global:TempoEspera 

    # Verifica novamente se o WSL foi instalado corretamente
    $wslVersion = wsl.exe --version 2>$null
    if ($?) {
        Write-Host "WSL was successfully installed! Version details:" -ForegroundColor Green
        Write-Host $wslVersion
    } else {
        Write-Host "WSL installation failed. Please try installing manually." -ForegroundColor Red
        Write-Host "     wsl.exe --install" -ForegroundColor Red
        exit 1
    }
}
# ----------------------------------------------------------------------------------------------------------------------
# Verifica se o Podman está instalado
if (Get-Command podman -ErrorAction SilentlyContinue) {
    Write-Host "Podman já está instalado. Versão:" -ForegroundColor Green
    podman --version
} else {
    Write-Host "Podman não está instalado. Instalando agora..." -ForegroundColor Yellow

    # Instala o Podman usando winget
    winget install --id RedHat.Podman -e --source winget

    # Aguarda um momento para a instalação ser concluída
    Start-Sleep -Seconds $Global:TempoEspera 

    # Verifica novamente se o Podman foi instalado corretamente
    if (Get-Command podman -ErrorAction SilentlyContinue) {
        Write-Host "Podman foi instalado com sucesso! Versão:" -ForegroundColor Green
        podman --version
    } else {
        Write-Host "A instalação do Podman falhou. Tente instalar manualmente." -ForegroundColor Red
        Write-Host "    winget install --id RedHat.Podman -e --source winget" -ForegroundColor Red
        exit 1
    }
}
# ----------------------------------------------------------------------------------------------------------------------
# Verifica se o UV já está instalado
if (Get-Command uv -ErrorAction SilentlyContinue) {
    Write-Host "UV já está instalado. Versão:" -ForegroundColor Green
    uv --version
} else {
    Write-Host "UV não está instalado. Instalando agora..." -ForegroundColor Yellow

    # Instala o UV usando winget
    winget install --id=astral-sh.uv -e

    # Aguarda o tempo definido na variável global
    Start-Sleep -Seconds $Global:TempoEspera

    # Verifica novamente se o UV foi instalado corretamente
    if (Get-Command uv -ErrorAction SilentlyContinue) {
        Write-Host "UV foi instalado com sucesso! Versão:" -ForegroundColor Green
        uv --version
    } else {
        Write-Host "A instalação do UV falhou. Tente instalar manualmente." -ForegroundColor Red
        Write-Host "    winget install --id=astral-sh.uv -e" -ForegroundColor Red
        exit 1
    }
}
# ----------------------------------------------------------------------------------------------------------------------
# Verifica se `uv init` já foi executado verificando o arquivo `pyproject.toml`
if (Test-Path "pyproject.toml") {
    Write-Host "O projeto já foi inicializado com UV (pyproject.toml encontrado)." -ForegroundColor Cyan
} else {
    Write-Host "Inicializando o projeto com UV..." -ForegroundColor Yellow
    uv init

    # Verifica se o `uv init` foi bem-sucedido
    if (Test-Path "pyproject.toml") {
        Write-Host "UV init concluído com sucesso!" -ForegroundColor Green
    } else {
        Write-Host "Falha ao inicializar UV. Verifique manualmente." -ForegroundColor Red
        exit 1
    }
}
# ----------------------------------------------------------------------------------------------------------------------
# Executa o comando uv sync e captura a saída
$process = Start-Process -FilePath "uv" -ArgumentList "sync" -NoNewWindow -PassThru -Wait
# Verifica se a execução foi bem-sucedida
if ($process.ExitCode -eq 0) {
    Write-Host "O comando 'uv sync' foi executado com sucesso!" -ForegroundColor Green
} else {
    Write-Host "Erro ao executar 'uv sync'. Código de saída: $($process.ExitCode)" -ForegroundColor Red
    exit 1  # Encerra o script com erro
}
# ----------------------------------------------------------------------------------------------------------------------
cd src\resources\BR_Municipios
Invoke-WebRequest -Uri "https://geoftp.ibge.gov.br/organizacao_do_territorio/malhas_territoriais/malhas_municipais/municipio_2023/Brasil/BR_Municipios_2023.zip" -OutFile "BR_Municipios_2023.zip"
Test-DownloadedFile -outputFile "BR_Municipios_2023.zip"
Expand-Archive -LiteralPath BR_Municipios_2023.zip -DestinationPath .\
rm BR_Municipios_2023.zip
cd ..\..\..\
# ----------------------------------------------------------------------------------------------------------------------
cd src\resources\Comunidades
Invoke-WebRequest -OutFile qg_2022_670_fcu_agreg.zip -Uri "https://geoservicos.ibge.gov.br/geoserver/CGMAT/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CGMAT:qg_2022_670_fcu_agreg&outputFormat=SHAPE-ZIP"
Test-DownloadedFile -outputFile "qg_2022_670_fcu_agreg.zip"
Expand-Archive -LiteralPath qg_2022_670_fcu_agreg.zip -DestinationPath .\
rm qg_2022_670_fcu_agreg.zip
cd ..\..\..\
# ----------------------------------------------------------------------------------------------------------------------
cd src\resources\Urbanizacao
Invoke-WebRequest -OutFile areas_urbanizadas_2019.zip -Uri "https://geoservicos.ibge.gov.br/geoserver/CGEO/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CGEO:AU_2022_AreasUrbanizadas2019_Brasil&outputFormat=SHAPE-ZIP"
Test-DownloadedFile -outputFile "areas_urbanizadas_2019.zip"
Expand-Archive -LiteralPath areas_urbanizadas_2019.zip -DestinationPath .\
rm areas_urbanizadas_2019.zip
cd ..\..\..\
# ----------------------------------------------------------------------------------------------------------------------
cd src\resources\Osmosis\brazil
Invoke-WebRequest -OutFile "brazil-latest.osm.pbf" -Uri "https://download.geofabrik.de/south-america/brazil-latest.osm.pbf"
Test-DownloadedFile -outputFile "brazil-latest.osm.pbf"
cd ..\..\..\
# ----------------------------------------------------------------------------------------------------------------------
podman pull yagajs/osmosis
podman pull osrm/osrm-backend
cd src\resources\Osmosis
podman run --name osmosis -v .:/data yagajs/osmosis osmosis
podman commit osmosis osmosis_webrota
podman save -o osmosis_webrota.tar osmosis_webrota
cd ..\..\..\
cd src\resources\OSMR\data
podman run --name osmr -v .:/data osrm/osrm-backend
podman commit osmr osmr_webrota
podman save -o osmr_webrota.tar osmr_webrota
cd ..\..\..\
# ----------------------------------------------------------------------------------------------------------------------

