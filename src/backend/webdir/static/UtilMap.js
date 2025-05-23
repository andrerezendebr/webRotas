//////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 const redMarker = L.AwesomeMarkers.icon({
 icon: 'info-sign',
 markerColor: 'red', // Cor do marcador
 prefix: 'glyphicon' // Biblioteca de icones (use 'fa' para FontAwesome)
 });
 */

var  gpsMarker = null;

var debugLevel = 0; // 0 - no debug, 1 - debug
function wLog(msg) 
{
   if(debugLevel == 1)
      console.log(msg);    
}    

gpsMarker = L.marker([0, 0], { icon: gpsIcon }).addTo(map);


document.addEventListener("DOMContentLoaded", function () {
    // Sua função aqui

    wLog("A página foi carregada (DOM completamente construído).");
});

window.addEventListener("load", function () {
    // Sua função aqui
    CreateControls();
    wLog("Todos os recursos da página foram carregados.");
});


window.addEventListener("beforeunload", function (event) {
    event.preventDefault(); 
    event.returnValue = ""; // Mensagem personalizada será ignorada
});

const clickedIcon = L.icon({
    iconUrl: 'data:image/png;base64,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gAgRAAAARIgAAAAgQgQAAAARIgAAAIgQAQAAQIQIAAAAIkQAAAAQIQIAAIAIEQAAAESIAAAAIEIEAAAAESIAAACIEAEAAECECAAAACJEAAAAECECAACACBEAAABEiAAAACBCBAAAABEiAAAAiBABAABAhAgAAAAiRAAAABAhAgAAgAgRAAAARIgAAAAgQgQAAAARIgAAAIgQAQAAQIQIAAAAIkQAAAAQIQIAAIAIEQAAAESIAAAAIEIEAAAAESIAAACIEAEAAECECAAAACJElcmvXAAABLxJREFUAAAAECECAACACBEAAABEiAAAACBCBAAAABEiAAAAiBABAABAhAgAAAAiRAAAABAhAgAAgAgRAAAARIgAAAAgQgQAAAARIgAAAIgQAQAAQIQIAAAAIkQAAAAQIQIAAIAIEQAAAESIAAAAIEIEAAAAESIAAACIEAEAAECECAAAACJEAAAAECECAACACBEAAABEiAAAACBCBAAAABEiAAAAiBABAABAhAgAAAAiRAAAABAhAgAAgAgRAAAARIgAAAAgQgQAAAARIgAAAIgQAQAAQIQIAAAAIkQAAAAQIQIAAIAIEQAAAESIAAAAIEIEAAAAESIAAACIEAEAAECECAAAACJEAAAAECECAACACBEAAABEiAAAACBCBAAAABEiAAAAiBABAABAhAgAAAAiRAAAABAhAgAAgAgRAAAARIgAAAAgQgQAAAARIgAAAIgQAQAAQIQIAAAAIkQAAAAQIQIAAIAIEQAAAESIAAAAIEIEAAAAESIAAACIEAEAAECECAAAACJEAAAAECECAACACBEAAABEiAAAACBCBAAAABEiAAAAiBABAABAhAgAAAAiRAAAABAhAgAAgAgRAAAARIgAAAAgQgQAAAARIgAAAIgQAQAAQIQIAAAAIkQAAAAQIQIAAIAIEQAAAESIAAAAIEIEAAAAESIAAACIEAEAAECECAAAACJEAAAAECECAACACBEAAABEiAAAACBCBAAAABEiAAAAiBABAABAhAgAAAAiRAAAABAhAgAAgAgRAAAARIgAAAAgQgQAAAARIgAAAIgQAQAAQIQIAAAAIkQAAAAQIQIAAIAIEQAAAESIAAAAIEIEAAAAESIAAACIEAEAAECECAAAACJEAAAAECECAACACBEAAABEiAAAACBCBAAAABEiAAAAiBABAABAhAgAAAAiRAAAABAhAgAAgAgRAAAARIgAAAAgQgQAAAARIgAAAIgQAQAAQIQIAAAAIkQAAAAQIQIAAIAIEQAAAESIAAAAIEIEAAAAESIAAACIEAEAAECECAAAACJEAAAAECECAACACBEAAABEiAAAACBCBAAAABEiAAAAiBABAABAhAgAAAAiRAAAABAhAgAAgAgRAAAARIgAAAAgQgQAAAARIgAAAIgQAQAAQIQIAAAAIkQAAAAQIQIAAIAIEQAAAESIAAAAIEIEAAAAESIAAACIEAEAAECECAAAACJEAAAAECECAACACBEAAABEiAAAACBCBAAAABEiAAAAiBABAABAhAgAAAAiRAAAABAhAgAAgAgRAAAARIgAAAAgQgQAAAARIgAAAIgQAQAAQIQIAAAAIkQAAAAQIQIAAIAIEQBAUZnGMvFnAMgkAgAorscz8mcAyCACACgq17ZM/BkAMokAAAoqcX1Bks/qz0hLm6s0B0DGEABAQX3xs3c+bNLfzPSfd9M9X/zc7z1UzU0AsoMAAAosSfQ2zex1/MdrTG+v9h4A2UEAAAX2hb+886A8uU2uQ1P+h1yH5MltX/jLOw/O4TQAgREAQMFt/sy7O0umdknfmsL//FslU/vmz7y7c653AQjLQg8AMH9e/pr3vtATf7WkH5fUdPb/PCDp3yy1u+/57Hu+HW4dgPn0/wF4jPYZF7VEIQAAAABJRU5ErkJggg==', // Icone clicado
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    className: 'clicked-marker' // Adiciona uma classe para diferenciar visualmente
});

const clickedIconHalf = L.icon({
    iconUrl: 'data:image/png;base64,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gAgRAAAARIgAAAAgQgQAAAARIgAAAIgQAQAAQIQIAAAAIkQAAAAQIQIAAIAIEQAAAESIAAAAIEIEAAAAESIAAACIEAEAAECECAAAACJEAAAAECECAACACBEAAABEiAAAACBCBAAAABEiAAAAiBABAABAhAgAAAAiRAAAABAhAgAAgAgRAAAARIgAAAAgQgQAAAARIgAAAIgQAQAAQIQIAAAAIkQAAAAQIQIAAIAIEQAAAESIAAAAIEIEAAAAESIAAACIEAEAAECECAAAACJElcmvXAAABLxJREFUAAAAECECAACACBEAAABEiAAAACBCBAAAABEiAAAAiBABAABAhAgAAAAiRAAAABAhAgAAgAgRAAAARIgAAAAgQgQAAAARIgAAAIgQAQAAQIQIAAAAIkQAAAAQIQIAAIAIEQAAAESIAAAAIEIEAAAAESIAAACIEAEAAECECAAAACJEAAAAECECAACACBEAAABEiAAAACBCBAAAABEiAAAAiBABAABAhAgAAAAiRAAAABAhAgAAgAgRAAAARIgAAAAgQgQAAAARIgAAAIgQAQAAQIQIAAAAIkQAAAAQIQIAAIAIEQAAAESIAAAAIEIEAAAAESIAAACIEAEAAECECAAAACJEAAAAECECAACACBEAAABEiAAAACBCBAAAABEiAAAAiBABAABAhAgAAAAiRAAAABAhAgAAgAgRAAAARIgAAAAgQgQAAAARIgAAAIgQAQAAQIQIAAAAIkQAAAAQIQIAAIAIEQAAAESIAAAAIEIEAAAAESIAAACIEAEAAECECAAAACJEAAAAECECAACACBEAAABEiAAAACBCBAAAABEiAAAAiBABAABAhAgAAAAiRAAAABAhAgAAgAgRAAAARIgAAAAgQgQAAAARIgAAAIgQAQAAQIQIAAAAIkQAAAAQIQIAAIAIEQAAAESIAAAAIEIEAAAAESIAAACIEAEAAECECAAAACJEAAAAECECAACACBEAAABEiAAAACBCBAAAABEiAAAAiBABAABAhAgAAAAiRAAAABAhAgAAgAgRAAAARIgAAAAgQgQAAAARIgAAAIgQAQAAQIQIAAAAIkQAAAAQIQIAAIAIEQAAAESIAAAAIEIEAAAAESIAAACIEAEAAECECAAAACJEAAAAECECAACACBEAAABEiAAAACBCBAAAABEiAAAAiBABAABAhAgAAAAiRAAAABAhAgAAgAgRAAAARIgAAAAgQgQAAAARIgAAAIgQAQAAQIQIAAAAIkQAAAAQIQIAAIAIEQAAAESIAAAAIEIEAAAAESIAAACIEAEAAECECAAAACJEAAAAECECAACACBEAAABEiAAAACBCBAAAABEiAAAAiBABAABAhAgAAAAiRAAAABAhAgAAgAgRAAAARIgAAAAgQgQAAAARIgAAAIgQAQAAQIQIAAAAIkQAAAAQIQIAAIAIEQAAAESIAAAAIEIEAAAAESIAAACIEAEAAECECAAAACJEAAAAECECAACACBEAAABEiAAAACBCBAAAABEiAAAAiBABAABAhAgAAAAiRAAAABAhAgAAgAgRAAAARIgAAAAgQgQAAAARIgAAAIgQAQAAQIQIAAAAIkQAAAAQIQIAAIAIEQBAUZnGMvFnAMgkAgAorscz8mcAyCACACgq17ZM/BkAMokAAAoqcX1Bks/qz0hLm6s0B0DGEABAQX3xs3c+bNLfzPSfd9M9X/zc7z1UzU0AsoMAAAosSfQ2zex1/MdrTG+v9h4A2UEAAAX2hb+886A8uU2uQ1P+h1yH5MltX/jLOw/O4TQAgREAQMFt/sy7O0umdknfmsL//FslU/vmz7y7c653AQjLQg8AMH9e/pr3vtATf7WkH5fUdPb/PCDp3yy1u+/57Hu+HW4dgPn0/wF4jPYZF7VEIQAAAABJRU5ErkJggg==', // Icone clicado
    iconSize: [18, 18],
    iconAnchor: [9, 18],
    className: 'clicked-marker' // Adiciona uma classe para diferenciar visualmente
});


var iMarquerVerde = createCustomSvgIcon("o",[25, 41],[12, 41],"#007b22");


//////////////////////////////////////////////////////////////////////////////////////////////////////
// Core arco iris
function ElevationColor(elevation) {
    // Usa os valores globais de elevação mínima e máxima
    const min_elevation = globalMinElevation;
    const max_elevation = globalMaxElevation;

    // Evita erro se min_elevation for igual a max_elevation
    if (max_elevation === min_elevation) {
        return hslToHex(240, 100, 50); // Retorna azul fixo se não houver variação de elevação
    }

    // Garante que a elevação esteja dentro dos limites
    elevation = Math.max(min_elevation, Math.min(max_elevation, elevation));

    // Normaliza a elevação para o intervalo 0-1 considerando min_elevation
    const normalized = (elevation - min_elevation) / (max_elevation - min_elevation);

    // Converte a normalização em cores do arco-íris (240° azul → 0° vermelho)
    const hue = (1 - normalized) * 240;
    
    return hslToHex(hue, 100, 50); // Saturação 100%, Luminosidade 50%
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function ElevationColorParula(elevation) {
    const minElevation = globalMinElevation;
    const maxElevation = globalMaxElevation;

    if (maxElevation === minElevation) {
        return rgbToHex(53, 42, 135); // Cor fixa (azul Parula)
    }

    elevation = Math.max(minElevation, Math.min(maxElevation, elevation));
    const normalized = (elevation - minElevation) / (maxElevation - minElevation);

    // Paleta de cores Parula
    const parulaColors = [
        [53, 42, 135], [45, 53, 140], [38, 63, 146], [30, 73, 151], [23, 84, 157], [16, 94, 162], 
        [11, 103, 167], [8, 110, 170], [6, 118, 173], [5, 125, 176], [5, 131, 178], [6, 138, 180], 
        [8, 144, 182], [11, 150, 183], [14, 156, 185], [18, 161, 186], [23, 165, 187], [30, 170, 186], 
        [37, 174, 186], [46, 177, 185], [54, 180, 184], [64, 183, 183], [74, 185, 181], [85, 188, 179], 
        [96, 190, 176], [106, 192, 174], [116, 194, 171], [127, 197, 167], [138, 199, 164], [149, 202, 160], 
        [159, 204, 156], [170, 204, 152], [181, 206, 147], [192, 208, 142], [202, 210, 137], [213, 212, 131], 
        [223, 214, 126], [233, 216, 120], [242, 217, 114], [250, 218, 109], [255, 219, 103], [255, 217, 96],  
        [255, 215, 90], [255, 211, 77], [255, 206, 63], [255, 204, 57], [255, 200, 51]
    ];

    // Índice interpolado
    const scaledIndex = normalized * (parulaColors.length - 1);
    const index = Math.floor(scaledIndex);
    const t = scaledIndex - index; // Posição relativa entre os dois pontos

    // Obtém as cores para interpolação
    const [r1, g1, b1] = parulaColors[index];
    const [r2, g2, b2] = parulaColors[Math.min(index + 1, parulaColors.length - 1)];

    // Interpolação linear entre os dois pontos
    const r = Math.round(r1 + t * (r2 - r1));
    const g = Math.round(g1 + t * (g2 - g1));
    const b = Math.round(b1 + t * (b2 - b1));

    return rgbToHex(r, g, b);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para converter RGB em Hex
function rgbToHex(r, g, b) {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
// Função auxiliar: converte HSL para HEX
function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;

    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    const r = Math.round(255 * f(0));
    const g = Math.round(255 * f(8));
    const b = Math.round(255 * f(4));

    return `#${r.toString(16).padStart(2, "0")}${g
        .toString(16)
        .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function createSvgIconColorAltitude(number,altitude) {
    // color = ElevationColor(altitude);
    color = ElevationColorParula(altitude);

    return createCustomSvgIcon(number,[25, 41],[12, 41],color);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function createSvgIconColorAltitudeHalf(number,altitude) {
    // color = ElevationColor(altitude);
    color = ElevationColorParula(altitude);
    return createCustomSvgIcon(number,[12, 20],[6, 20],color);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function createSvgIconVerde(number) {

    return createCustomSvgIcon(number,[25, 41],[12, 41],"#007b22");
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function createSvgIconVerdeHalf(number) {

    return createCustomSvgIcon(number,[12, 20],[6, 20],"#007b22");
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function createSvg(iconSz, iconColor, text) {
    const width = iconSz[0];
    const height = iconSz[1];

    // Tamanhos base do SVG original
    const baseWidth = 25;
    const baseHeight = 41;

    // Calcula fatores de escala
    const scaleX = width / baseWidth;
    const scaleY = height / baseHeight;

    // Recalcula o path com base no fator de escala
    const dynamicPath = `
        M${12.5 * scaleX} 0
        C${19.4 * scaleX} 0 ${25 * scaleX} ${5.6 * scaleY} ${25 * scaleX} ${12.5 * scaleY}
        C${25 * scaleX} ${19.4 * scaleY} ${12.5 * scaleX} ${41 * scaleY} ${12.5 * scaleX} ${41 * scaleY}
        C${12.5 * scaleX} ${41 * scaleY} 0 ${19.4 * scaleY} 0 ${12.5 * scaleY}
        C0 ${5.6 * scaleY} ${5.6 * scaleX} 0 ${12.5 * scaleX} 0Z
    `.trim();

    // Retorna o SVG ajustado
    return `
        <svg id="iconSvg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"
             xmlns="http://www.w3.org/2000/svg">
            <path d="${dynamicPath}" fill="${iconColor}"/>
            <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" 
                  font-size="${Math.min(width, height) * 0.55}" fill="white" 
                  font-weight="bold" stroke="black" stroke-width="0.5">${text}</text>
        </svg>`;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
function createCustomSvgIcon(text,iconSz,iconAnc,iconColor) {
    datHtml = createSvg(iconSz, iconColor, text)
    return L.divIcon({
        className: '', // Sem classe adicional
        html: datHtml,
        iconSize: iconSz, // Tamanho do ícone
        iconAnchor: iconAnc // Ponto de ancoragem (centro)
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function AtualizaPontosvisitaDadosMarquerData(currentMarker,ColunaAtualizar,NovoDado)
{
    // Estrutura pontosvisitaDados [-22.88169706392197, -43.10262976730735,"P0","Local", "Descrição","Altitude","Ativo"]
    position = currentMarker.getLatLng();
    pontosVisitaDados =  AtualizaPontosvisitaDados(pontosvisitaDados,position.lat, position.lng,ColunaAtualizar,NovoDado);
    wLog(JSON.stringify(pontosvisitaDados, null, 2));
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function onMarkerClick(e) {
    const currentMarker = e.target;
    const markerId = currentMarker._icon.getAttribute('data-id');
    const clicado = currentMarker._icon.getAttribute('clicado');
    const altitude = currentMarker._icon.getAttribute('altitude');
    wLog(`Marquer clicado - ID - ${markerId} - Clicado - ${clicado}`)
    // Verifica o ícone atual e troca para o outro
    if (HeadingNorte==0)
    {
        // wLog(`aqui`)
        if (clicado === "0")
        {
            currentMarker.setIcon(clickedIcon);
            currentMarker._icon.setAttribute('clicado', "1");
            AtualizaPontosvisitaDadosMarquerData(currentMarker,6,"Inativo");
        }
        else
        {
            currentMarker.setIcon(createSvgIconColorAltitude(String(markerId),String(altitude)));
            currentMarker._icon.setAttribute('clicado', "0");
            AtualizaPontosvisitaDadosMarquerData(currentMarker,6,"Ativo");
        }
        currentMarker._icon.setAttribute('tamanho', "full");
    }
    else
    {
        if (clicado === "0")
        {
            currentMarker.setIcon(clickedIconHalf);
            currentMarker._icon.setAttribute('clicado', "1");
            AtualizaPontosvisitaDadosMarquerData(currentMarker,6,"Inativo");
        }
        else
        {
            currentMarker.setIcon(createSvgIconColorAltitudeHalf(String(markerId),String(altitude)));
            currentMarker._icon.setAttribute('clicado', "0");
            AtualizaPontosvisitaDadosMarquerData(currentMarker,6,"Ativo");
        }
        currentMarker._icon.setAttribute('tamanho', "half");
    }
    currentMarker._icon.setAttribute('data-id', String(markerId));
    currentMarker._icon.setAttribute('altitude', String(altitude));
    AtualizaGps();
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function DisableMarker(e)
{
    wLog("DisableMarker");
    const currentMarker = e;
    const markerId = currentMarker._icon.getAttribute('data-id');
    const clicado = currentMarker._icon.getAttribute('clicado');
    const altitude = currentMarker._icon.getAttribute('altitude');
    // Verifica o ícone atual e troca para o outro
    if (HeadingNorte==0)
    {

        currentMarker.setIcon(clickedIcon);
        currentMarker._icon.setAttribute('clicado', "1");
        currentMarker._icon.setAttribute('tamanho', "full");
        AtualizaPontosvisitaDadosMarquerData(currentMarker,6,"Inativo");
    }
    else
    {
        currentMarker.setIcon(clickedIconHalf);
        currentMarker._icon.setAttribute('clicado', "1");
        currentMarker._icon.setAttribute('tamanho', "half");
        AtualizaPontosvisitaDadosMarquerData(currentMarker,6,"Inativo");
    }
    currentMarker._icon.setAttribute('data-id', String(markerId));
    currentMarker._icon.setAttribute('altitude', String(altitude));
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
// Fução que rotaciona um icone no Leaflet usada na rotação do carro na tela
(function () {
    // save these original methods before they are overwritten
    var proto_initIcon = L.Marker.prototype._initIcon;
    var proto_setPos = L.Marker.prototype._setPos;

    var oldIE = (L.DomUtil.TRANSFORM === 'msTransform');

    L.Marker.addInitHook(function () {
        var iconOptions = this.options.icon && this.options.icon.options;
        var iconAnchor = iconOptions && this.options.icon.options.iconAnchor;
        if (iconAnchor) {
            iconAnchor = (iconAnchor[0] + 'px ' + iconAnchor[1] + 'px');
        }
        this.options.rotationOrigin = this.options.rotationOrigin || iconAnchor || 'center bottom';
        this.options.rotationAngle = this.options.rotationAngle || 0;

        // Ensure marker keeps rotated during dragging
        this.on('drag', function (e) {
            e.target._applyRotation();
        });
    });

    L.Marker.include({
        _initIcon: function () {
            proto_initIcon.call(this);
        },

        _setPos: function (pos) {
            proto_setPos.call(this, pos);
            this._applyRotation();
        },

        _applyRotation: function () {
            if (this.options.rotationAngle) {
                this._icon.style[L.DomUtil.TRANSFORM + 'Origin'] = this.options.rotationOrigin;

                if (oldIE) {
                    // for IE 9, use the 2D rotation
                    this._icon.style[L.DomUtil.TRANSFORM] = 'rotate(' + this.options.rotationAngle + 'deg)';
                } else {
                    // for modern browsers, prefer the 3D accelerated version
                    this._icon.style[L.DomUtil.TRANSFORM] += ' rotateZ(' + this.options.rotationAngle + 'deg)';
                }
            }
        },

        setRotationAngle: function (angle) {
            this.options.rotationAngle = angle;
            this.update();
            return this;
        },

        setRotationOrigin: function (origin) {
            this.options.rotationOrigin = origin;
            this.update();
            return this;
        }
    });
})();
//////////////////////////////////////////////////////////////////////////////////////////////////////
function decodePolyline(encoded) {
    let index = 0;
    const coordinates = [];
    let lat = 0;
    let lng = 0;

    while (index < encoded.length) {
        let shift = 0;
        let result = 0;
        let byte;

        do {
            byte = encoded.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        const deltaLat = (result & 1) ? ~(result >> 1) : (result >> 1);
        lat += deltaLat;

        shift = 0;
        result = 0;

        do {
            byte = encoded.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        const deltaLng = (result & 1) ? ~(result >> 1) : (result >> 1);
        lng += deltaLng;

        coordinates.push([lat / 1e5, lng / 1e5]);
    }

    return coordinates;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para calcular a distância Haversine entre duas coordenadas
function haversineDistance(coord1, coord2) {
    const toRad = angle => (angle * Math.PI) / 180;
    const R = 6371000; // Raio da Terra em metros

    const dLat = toRad(coord2.lat - coord1.lat);
    const dLon = toRad(coord2.lng - coord1.lng);
    const lat1 = toRad(coord1.lat);
    const lat2 = toRad(coord2.lat);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para encontrar o marcador mais próximo
var DistMakerMaisProximo = null
var markerVet = null;
function GetNearestPoint(lat, lon) {
    const userLocation = {lat: lat, lng: lon};

    // Lista de marcadores já adicionados ao mapa
    // const markers = [marker1, marker2, marker3, marker4, marker5, marker6, marker7, marker8];

    let closestMarkerCoords = null;
    let minDistance = Infinity;
    if (markerVet==null)
        return(null);
    markerVet.forEach(marker => {
        const markerCoords = marker.getLatLng(); // Obtém as coordenadas do marcador
        const distance = haversineDistance(userLocation, markerCoords);
        if ((distance < minDistance) && ((marker.options.icon != clickedIcon) && (marker.options.icon != clickedIconHalf)))
        {
            minDistance = distance;
            closestMarkerCoords = markerCoords;

        }
    });
    DistMakerMaisProximo = minDistance.toFixed(2);
    return closestMarkerCoords; // Retorna as coordenadas do marcador mais próximo
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function DesabilitaMarquerNoGPSRaioDaEstacao(lat, lon)
{
    wLog("DesabilitaMarquerNoGPSRaioDaEstacao");
    const userLocation = {lat: lat, lng: lon};

    // Lista de marcadores já adicionados ao mapa
    // const markers = [marker1, marker2, marker3, marker4, marker5, marker6, marker7, marker8];
    if (RaioDaEstacao==null)
        return;
    if (markerVet==null)
        return;
    markerVet.forEach(marker => {
        const markerCoords = marker.getLatLng(); // Obtém as coordenadas do marcador
        const distance = haversineDistance(userLocation, markerCoords);
        // wLog("   userLocation - "+String(userLocation));
        // wLog("   markerCoords - "+String(markerCoords));
        // wLog("   distance - "+String(distance));
        if (distance < RaioDaEstacao)
        {
            DisableMarker(marker);
        }
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function calcularMediaUltimasNCoordenadas(coordinates, n) {
    // Verifica se há coordenadas suficientes
    if (coordinates.length < n) {
        wLog("Não há coordenadas suficientes para calcular a média");
        return null;
    }

    // Seleciona as últimas n coordenadas
    const primeirasNCoordenadas = coordinates.slice(0,n);

    // Calcula a média de latitude e longitude
    let somaLat = 0;
    let somaLng = 0;
    primeirasNCoordenadas.forEach(coord => {
        somaLat += coord[0];
        somaLng += coord[1];
    });

    const mediaLat = somaLat / n;
    const mediaLng = somaLng / n;

    return [mediaLat, mediaLng];  // Retorna a média como uma nova coordenada [latitude, longitude]
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
var polyRotaAux = null;
var inicioRota = null;
function DesenhaRota(coordinates)
{
    // Crie a polyline com as coordenadas e adicione ao mapa
    if (polyRotaAux) {
        polyRotaAux.remove();
        polyRotaAux = null; // Opcional: redefinir a variável para null
    }
    wLog("Plotando nova rota auxiliar")
    polyRotaAux = L.polyline(coordinates, {color: 'red', "opacity": 0.7}).addTo(map);

    // armazena o inicio da rota para a simulação de movimento buscar a rota ok
    if (coordinates.length > 0) {
        inicioRota = calcularMediaUltimasNCoordenadas(coordinates,20);
    }
    else
       inicioRota = null;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function ServerUrl()
{
    // Pega o protocolo (http ou https)
    const protocol = window.location.protocol;
    // Pega o hostname (domínio ou IP)
    const host = window.location.hostname;
    // Pega a porta (se estiver definida, por exemplo, 5000 para Flask)
    const port = window.location.port;
    // Constrói a URL base
    const serverUrl = `${protocol}//${host}${port ? `:${port}` : ''}`;
    return serverUrl
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
async function getRoute(startCoords, endCoords){
    wLog("getRoute");
    if(ServerTec == "OSMR")
    {
        return getRouteOSMR(startCoords, endCoords);
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para obter a rota do OSRM por roteamento do mesmo site externo
async function getRouteOSMR(startCoords, endCoords) {
    // URL da solicitação ao servidor OSRM
    // const baseUrl = "{{ url_for('proxy') }}"

    // serverUrl = ServerUrl()  // Falhou no ngrock a resposta em json
    // wLog("URL do servidor:", serverUrl);
    // const url = `${serverUrl}/osmr/route/v1/driving/${startCoords[1]},${startCoords[0]};${endCoords[1]},${endCoords[0]}?overview=full&geometries=polyline&steps=true`;

    const port = window.location.port || "5001"; // Use URL port or fallback to 5001

    // ngrok http 5001
    if ( window.location.hostname=="127.0.0.1")
    {
       //  sem ngrock
       serverUrl = `${window.location.protocol}//${window.location.hostname}`;
       url = `${serverUrl}:${port}/route?porta=${OSRMPort}&start=${startCoords[1]},${startCoords[0]}&end=${endCoords[1]},${endCoords[0]}`
    }
    else
    {
       //  no ngrock
       serverUrl = `${window.location.protocol}//${window.location.hostname}`;
       url = `${serverUrl}/route?porta=${OSRMPort}&start=${startCoords[1]},${startCoords[0]}&end=${endCoords[1]},${endCoords[0]}`
    }
    wLog("\n\n" + url + "\n");

    try {
        // Fazer a solicitação usando fetch
        const response = await fetch(url);
        const data = await response.json();

        // Verificar se a solicitação foi bem-sucedida
        if (response.ok && data.routes) {
            const route = data.routes[0];
            const geometry = route.geometry;

            // Decodificar a geometria usando uma biblioteca como @mapbox/polyline
            coordinates = decodePolyline(geometry); // polyline precisa estar disponível/importada
            // wLog("Coordinates:", coordinates);
            DesenhaRota(coordinates);
            return coordinates;
        } else {
            console.error("Erro ao obter a rota:", data.message || "Resposta inválida");
            return null;
        }
    } catch (error) {
        console.error("Erro de rede:", error);
        return null;
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
var headingError=0
function AtualizaMapaHeading(heading)
{
    // alert("atualizando gps - ",HeadingNorte);
    if (HeadingNorte==0)
    {
       // Mapa fixo direção sul e carro rotacionando
       RodaMapaPorCss(0);
       gpsMarker.setRotationAngle(heading-90);
    }
    else
    {
        // Mapa girando em direção ao heading
        RodaMapaPorCss(heading -(2*heading));
        headingError=heading -(2*heading)
        gpsMarker.setRotationAngle(-90-headingError);
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
let latitude = -22.91745583955038;  // Latitude inicial
let longitude = -43.08681365669065; // Longitude inicial
let heading = 0;
let velocidade = 180/3.6;  // Velocidade em km/h ---> m/s
let raio = 1000; // Raio de movimentação (em metros)
//////////////////////////////////////////////////////////////////////////////////////////////////////
function adjustHeading(heading) {
    if (heading >= 360) {
        heading -= 360;
    }
    return heading;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
// Calcula heading em direção a um ponto
function calculateHeading(lat1, lon1, lat2, lon2) {
    // Converte latitude e longitude de graus para radianos
    let radLat1 = lat1 * Math.PI / 180;
    let radLon1 = lon1 * Math.PI / 180;
    let radLat2 = lat2 * Math.PI / 180;
    let radLon2 = lon2 * Math.PI / 180;

    // Diferença entre as longitudes
    let dLon = radLon2 - radLon1;

    // Fórmula para o cálculo do heading
    let y = Math.sin(dLon) * Math.cos(radLat2);
    let x = Math.cos(radLat1) * Math.sin(radLat2) -
            Math.sin(radLat1) * Math.cos(radLat2) * Math.cos(dLon);

    // Calcula o ângulo e converte para graus
    let heading = Math.atan2(y, x) * 180 / Math.PI;

    // Ajusta o ângulo para estar entre 0 e 360 graus
    return (heading + 360) % 360;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
var incHead = 1;
function simularMovimento() {
    // Calcula a distância percorrida por atualização (300ms ou 0.3 segundos)
    const distancia = velocidade * 0.3;  // Em metros

    /*
    if (heading==80)
        incHead = -1;
    if (heading==0)
        incHead = 1;
    heading = heading+incHead;
    heading = adjustHeading(heading);
    */

    if (inicioRota!=null)
        heading = calculateHeading(latitude, longitude, inicioRota[0], inicioRota[1]);   // Aponta para o inicio da rota
    // Convertendo a direção (heading) para radianos
    const radianos = heading * (Math.PI / 180);

    // Calcula as novas coordenadas simulando movimento em linha reta
    latitude += (distancia * Math.cos(radianos)) / 111320; // Convertendo metros para graus de latitude (aproximadamente)
    longitude += (distancia * Math.sin(radianos)) / (111320 * Math.cos(latitude * (Math.PI / 180))); // Convertendo metros para graus de longitude


    // Atualiza o GPS a cada 300ms
    updateGPSPosition({ coords: { latitude, longitude, heading, speed: velocidade } });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
// Simular movimento
// setInterval(simularMovimento, 800); // Atualiza a cada 300ms (aproximadamente)
//////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para abrir uma nova janela com 70% das dimensões da janela atual
function openStreetView(lat, lng) {
    // Calcula 70% da largura e altura da janela atual
    const width = window.innerWidth * 0.7;
    const height = window.innerHeight * 0.7;

    // Calcula a posição para centralizar a nova janela
    const left = (window.innerWidth - width) / 2 + window.screenX;
    const top = (window.innerHeight - height) / 2 + window.screenY;

    // Configurações da nova janela
    const windowFeatures = `
        width=${width},
        height=${height},
        left=${left},
        top=${top},
        menubar=no,
        toolbar=no,
        location=no,
        status=no,
        resizable=yes,
        scrollbars=yes
    `;

    // URL do Google Street View
    const streetViewUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}&zoom=0`;
    // Abre a nova janela
    const newWindow = window.open(streetViewUrl, "_blank", windowFeatures);

    // Verifica se a janela foi bloqueada pelo navegador
    if (!newWindow) {
        alert("A janela pop-up foi bloqueada. Por favor, permita pop-ups para este site.");
    }
    // Tenta aplicar zoom no conteúdo da janela pop-up
    newWindow.document.body.style.zoom = '50%';

}
//////////////////////////////////////////////////////////////////////////////////////////////////////
// Adiciona o evento de clique no mapa
// Simula posição do carro em clique para debugar
function simulaVeiculoNesteLocal(lat,lon) 
{
    gpsMarker.setLatLng([lat, lon]);
    // Centraliza o mapa na nova posição do marcador
    map.setView([lat, lon]);
    latitude =lat;
    longitude = lon;

    if(clicouPipetaPontoInicial)
    {     
        // Carrega coordenadas se o diálogo de ordenação de pontos estiver aberto
        if (document.getElementById("latitude")) document.getElementById("latitude").value = latitude;
        if (document.getElementById("longitude")) document.getElementById("longitude").value = longitude;
        clicouPipetaPontoInicial = false;
        document.getElementById('latitude').dispatchEvent(new Event('input', { bubbles: true }));
        document.getElementById('longitude').dispatchEvent(new Event('input', { bubbles: true }));
        ativaElementoHtml('idPipetaLatLon', true); 
        return;
    }

    heading = 0;
    velocidade = 0;
    GetRouteCarFromHere(latitude,longitude);
    DesabilitaMarquerNoGPSRaioDaEstacao(latitude, longitude);
};
//////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para capturar as coordenadas de um clique com o botão esquerdo
function cliqueNoMapa(event)
{
    const { lat, lng } = event.latlng; // Obtém a latitude e longitude do clique
    if(clicouPipetaPontoInicial)
    {     
        latitude =lat;
        longitude = lng;    
        // Carrega coordenadas se o diálogo de ordenação de pontos estiver aberto
        if (document.getElementById("latitude")) document.getElementById("latitude").value = latitude;
        if (document.getElementById("longitude")) document.getElementById("longitude").value = longitude;
        clicouPipetaPontoInicial = false;
        document.getElementById('latitude').dispatchEvent(new Event('input', { bubbles: true }));
        document.getElementById('longitude').dispatchEvent(new Event('input', { bubbles: true }));
        ativaElementoHtml('idPipetaLatLon', true); 
        return;
    }
}
// Adiciona o evento de clique ao mapa
map.on('click', cliqueNoMapa);
//////////////////////////////////////////////////////////////////////////////////////////////////////
var LastHeading = 0;
var maxHistorySize = 5;
var positionHistory = [];
//////////////////////////////////////////////////////////////////////////////////////////////////////
var gpsAtivado = false; // Defina como false para desabilitar a geolocalização
//////////////////////////////////////////////////////////////////////////////////////////////////////
function updateGPSPosition(position) {
    wLog("updateGPSPosition");
    if(gpsAtivado==false)
        return
    if (position === undefined) {
        wLog("A posição é undefined.");
        return;
    }
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    wLog(`Latitude: ${latitude}, Longitude: ${longitude}`);
    heading = position.coords.heading;
    speed = position.coords.speed;
    if (heading !== null || !isNaN(heading))
    {
        // heading = Math.round(heading);
        LastHeading = heading;
    } else
    {
        heading = 'N/A';
        LastHeading = 0;
    }

    if (speed !== null) {
        speed = Math.round(speed * 3.6)
    } else
    {
        speed = 'N/A';
    }
    // Move o marcador para a nova posição
    gpsMarker.setLatLng([latitude, longitude]);
    // Centraliza o mapa na nova posição do marcador
    map.setView([latitude, longitude]);
    // Rotaciona o marcador com base no heading
    gpsMarker.setRotationAngle(heading);
    document.getElementById("gpsInfo").innerText = `Velocidade: ${speed} Km/h\nHeading: ${heading} graus\nDistancia: ${DistMakerMaisProximo} Km`;
    AtualizaMapaHeading(LastHeading);
    GetRouteCarFromHere(latitude,longitude);
    DesabilitaMarquerNoGPSRaioDaEstacao(latitude, latitude);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function GetNextActivePoint() {
    wLog("GetNextActivePoint");
    let ind = 0;
    for (let ponto of pontosVisitaOrdenados) {
        let [lati, loni] = ponto;
        wLog("------------");
        wLog("lati - " + String(lati));
        wLog("loni - " + String(loni));
        let stringPn = "P" + String(ind);
        let bAtivo = EncontrarDado(pontosvisitaDados, lati, loni, 6);
        wLog("bAtivo - " + bAtivo);
        if (bAtivo === "Ativo") {
            wLog("Encontrou ponto ativo");
            let pnt = {
                lat: lati,
                lng: loni
            };
            wLog("pnt.lat - " + String(pnt.lat));
            return pnt; // Retorna o primeiro ponto ativo encontrado
        }
        ind++;
    }
    return null; // Se nenhum ponto ativo for encontrado
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function GetRouteCarFromHere(latitude,longitude)
{
   wLog("Tentando pegar rota")
   startCoords = [];
   endCoords = [];
   // Colocar a opção de buscar a rota para o ponto mais próximo ou o próximo ponto ativo da lista
   if(typeof GpsProximoPonto == "undefined") // Evita erro da variável não inicializada
      return;
   if(GpsProximoPonto=="ProximoDaRota")
   {
      wLog("ProximoDaRota algoritmo");
      nearestPoint = GetNextActivePoint();
   } 
   else  // "MaisProximo"   2.856775150175865, -60.634694963294585
   { 
      wLog("MaisProximo algoritmo");
      nearestPoint = GetNearestPoint(latitude, longitude);
   }   
   // wLog("nearestPoint - "+String(nearestPoint))
   if (nearestPoint==null) // Apaga rota auxiliar
   {
       wLog("nearestPoint - null");
       if (polyRotaAux) {
           polyRotaAux.remove();
           polyRotaAux = null; // Opcional: redefinir a variável para null
       }
       return;
   }
   startCoords[0] = latitude;
   startCoords[1] = longitude;
   endCoords[0] = nearestPoint.lat;
   endCoords[1] = nearestPoint.lng;
   wLog("getRoute");
   getRoute(startCoords, endCoords);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
// Monitora a posição do usuário e chama updateGPSPosition a cada atualização
geoLocationId=null;
if (navigator.geolocation)
{
    // navigator.geolocation.getCurrentPosition(updateGPSPosition,error => console.error(error),{enableHighAccuracy: true, maximumAge: 0, timeout: 30000 });
    if(gpsAtivado)
        geoLocationId=navigator.geolocation.watchPosition(updateGPSPosition,error => console.error(error),{enableHighAccuracy: true, maximumAge: 0, timeout: 30000 });
} else
{
    alert("Geolocalização não é suportada pelo seu navegador.");
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
 function AtualizaGps() 
 {
    if(gpsAtivado==false)
        return;
    // navigator.geolocation.getCurrentPosition(updateGPSPosition,error => console.error(error),{enableHighAccuracy: true, maximumAge: 0, timeout: 30000 });
    geoLocationId=navigator.geolocation.watchPosition(updateGPSPosition,error => console.error(error),{enableHighAccuracy: true, maximumAge: 0, timeout: 30000 });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
bAtiva=false;
timerGps=null;
function AtualizaGpsTimer(bAtiva)
{
    // Definindo o intervalo de 300ms
    if(bAtiva==true)
        timerGps = setInterval(AtualizaGps, 500);
    else
    {
       clearInterval(timerGps);
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function SelIconHalf(marker,flagHeadingNorte)
{
    markerOld = marker;
    size = markerOld._icon.getAttribute('tamanho');
    clicado = markerOld._icon.getAttribute('clicado');
    markerId = markerOld._icon.getAttribute('data-id');
    altitude = markerOld._icon.getAttribute('altitude');
    if (clicado=="1")
        if (flagHeadingNorte==0)
        {
           marker.setIcon(clickedIcon);
           marker._icon.setAttribute('tamanho',"full");
        }
        else
        {
           marker.setIcon(clickedIconHalf);
           marker._icon.setAttribute('tamanho',"half");
        }
    else
       if (flagHeadingNorte==0)
       {
           marker.setIcon(createSvgIconColorAltitude(String(markerId),String(altitude)));
           marker._icon.setAttribute('tamanho',"full");
       }
       else
       {
           marker.setIcon(createSvgIconColorAltitudeHalf(String(markerId),String(altitude)));
           marker._icon.setAttribute('tamanho',"half");
       }
    CopyMarkerAttribs(markerOld,marker);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function CopyMarkerAttribs(MarkerOrigin,MarkerDest)
{
    MarkerDest._icon.setAttribute('data-id',MarkerOrigin._icon.getAttribute('data-id'));
    MarkerDest._icon.setAttribute('clicado',MarkerOrigin._icon.getAttribute('clicado'));
    // MarkerDest._icon.setAttribute('tamanho',MarkerOrigin._icon.getAttribute('tamanho'));
    MarkerDest._icon.setAttribute('altitude',MarkerOrigin._icon.getAttribute('altitude'));
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function AjustaTamanhoMarquers(div)
{
    if(markerVet==null)
        return null;
    if (div===0)
    {
        if (TipoRoute == 'DriveTest')
            markerCentral.setIcon(createSvgIconVerde("x"));
        markerVet.forEach(marker => {
               SelIconHalf(marker,div);
            });
        mrkPtInicial.setIcon(createSvgIconColorAltitude('i',10000))
    }
    else
    {
        if (TipoRoute == 'DriveTest')
            markerCentral.setIcon(createSvgIconVerdeHalf("x"));
        markerVet.forEach(marker => {
            SelIconHalf(marker,div);
        });
        mrkPtInicial.setIcon(createSvgIconColorAltitudeHalf('i',10000))
    }

}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function RodaMapaPorCss(angle) // Não funciona bem
{
   const mapElement = document.getElementById('map');
   // Aplica a rotação e define o ponto de origem
   // var markerPosition = map.latLngToContainerPoint(gpsMarker.getLatLng());

   if(HeadingNorte==0)
   {
      mapElement.style.transform = `rotate(${0}deg) scale(1.0) `; // Define o ângulo de rotação
      mapElement.style.transformOrigin = 'center';  // Define o ponto de rotação
      gpsMarker.setIcon(gpsIcon);
      AjustaTamanhoMarquers(HeadingNorte);
   }
   else
   {
      mapElement.style.transform = `rotate(${angle}deg) scale(2.5) `; // Define o ângulo de rotação
      mapElement.style.transformOrigin = 'center';  // Define o ponto de rotação
      gpsMarker.setLatLng([latitude, longitude]);
      gpsMarker.setIcon(gpsIconHalf);
      AjustaTamanhoMarquers(HeadingNorte);
   }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
// Define se o mapa é rotacionado se HeadingNorte=1
HeadingNorte=0
//////////////////////////////////////////////////////////////////////////////////////////////////////
function SetHeadingNorte_SemRodarMapa()
{
   img = document.getElementById('imgPointerNorte');
   img.src = imgPointerNorte;
   HeadingNorte=0;
   AtualizaMapaHeading(LastHeading);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function createDivScaleSvg() {
    // Verifica se o elemento já existe para evitar duplicação
    if (document.getElementById("resizableDiv")) 
    {
        document.getElementById("resizableDiv").remove();
        return;
    }    
    // Criar o div principal
    const resizableDiv = document.createElement("div");
    resizableDiv.id = "resizableDiv";
    resizableDiv.style.position = "absolute";
    resizableDiv.style.bottom = "18px";
    resizableDiv.style.right = "-13px";
    resizableDiv.style.zIndex = "1001";
    resizableDiv.style.width = "100px";
    resizableDiv.style.height = "500px";
    // resizableDiv.style.border = "0px solid black"; // Apenas para visualização
    // resizableDiv.style.backgroundColor = "white"; // Para destacar o SVG

    // Criar o container para o SVG
    const svgContainer = document.createElement("div");
    svgContainer.id = "svgContainer";
    svgContainer.style.position = "absolute"; // Garante que ocupe todo o espaço
    svgContainer.style.top = "0";
    svgContainer.style.left = "0";
    svgContainer.style.width = "100%";
    svgContainer.style.height = "100%";

    // Adicionar o svgContainer dentro do resizableDiv
    resizableDiv.appendChild(svgContainer);

    // Adicionar resizableDiv ao body
    document.body.appendChild(resizableDiv);

    // Adicionar evento de roda do mouse para alterar o zoom
    resizableDiv.addEventListener("wheel", function (e) {
        e.preventDefault(); // Impede o comportamento padrão de scroll

        // Calcular o fator de zoom
        const zoomFactor = 0.1;
        let newWidth = parseFloat(resizableDiv.style.width);
        let newHeight = parseFloat(resizableDiv.style.height);

        if (e.deltaY < 0) {
            // Roda para cima - aumenta o zoom
            newWidth += newWidth * zoomFactor;
            newHeight += newHeight * zoomFactor;
        } else {
            // Roda para baixo - diminui o zoom
            newWidth -= newWidth * zoomFactor;
            newHeight -= newHeight * zoomFactor;
        }

        // Definir os novos valores de largura e altura, com limites para evitar que fique muito pequeno
        resizableDiv.style.width = Math.max(newWidth, 50) + "px";
        resizableDiv.style.height = Math.max(newHeight, 100) + "px"; // Evita que o div desapareça
    });

    // Gerar e inserir o SVG
    updateScale();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
function generateScaleSVG(minValue, maxValue) {
    const step = (maxValue - minValue) / 15;
    
    // Criando o elemento SVG diretamente via JavaScript
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 1000");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.style.width = "100%"; // Garante que ele ocupa todo o espaço do container
    svg.style.height = "100%";

    // Criando o gradiente
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const linearGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    linearGradient.setAttribute("id", "grad");
    linearGradient.setAttribute("x1", "0");
    linearGradient.setAttribute("y1", "1");
    linearGradient.setAttribute("x2", "0");
    linearGradient.setAttribute("y2", "0");

    // Cores do gradiente
    var colors = [
        "rgb(255, 200, 51)", "rgb(255, 204, 57)", "rgb(255, 206, 63)",
        "rgb(255, 211, 77)", "rgb(255, 215, 90)", "rgb(255, 217, 96)", "rgb(255, 219, 103)",
        "rgb(250, 218, 109)", "rgb(242, 217, 114)", "rgb(233, 216, 120)", "rgb(223, 214, 126)",
        "rgb(213, 212, 131)", "rgb(202, 210, 137)", "rgb(192, 208, 142)", "rgb(181, 206, 147)",
        "rgb(170, 204, 152)", "rgb(159, 204, 156)", "rgb(149, 202, 160)", "rgb(138, 199, 164)",
        "rgb(127, 197, 167)", "rgb(116, 194, 171)", "rgb(106, 192, 174)", "rgb(96, 190, 176)",
        "rgb(85, 188, 179)", "rgb(74, 185, 181)", "rgb(64, 183, 183)", "rgb(54, 180, 184)",
        "rgb(46, 177, 185)", "rgb(37, 174, 186)", "rgb(30, 170, 186)", "rgb(23, 165, 187)",
        "rgb(18, 161, 186)", "rgb(14, 156, 185)", "rgb(11, 150, 183)", "rgb(8, 144, 182)",
        "rgb(6, 138, 180)", "rgb(5, 131, 178)", "rgb(5, 125, 176)", "rgb(6, 118, 173)",
        "rgb(8, 110, 170)", "rgb(11, 103, 167)", "rgb(16, 94, 162)", "rgb(23, 84, 157)",
        "rgb(30, 73, 151)", "rgb(38, 63, 146)", "rgb(45, 53, 140)", "rgb(53, 42, 135)"
    ];
    colors = colors.reverse();
    // Criando os "stops" no gradiente
    colors.forEach((color, index) => {
        const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop.setAttribute("offset", `${index * (100 / (colors.length - 1))}%`); // Percentual de cada cor no gradiente
        stop.setAttribute("style", `stop-color:${color}; stop-opacity:1`);
        linearGradient.appendChild(stop);
    });


    defs.appendChild(linearGradient);
    svg.appendChild(defs);

    // Criando o fundo branco
    const background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    background.setAttribute("x", "0");
    background.setAttribute("y", "0");
    background.setAttribute("width", "120");
    background.setAttribute("height", "1000");
    background.setAttribute("rx", "10");
    background.setAttribute("ry", "10");
    background.setAttribute("fill", "white");
    background.setAttribute("fill-opacity", "0.8");
    svg.appendChild(background);

    // Criando o retângulo de escala com gradiente
    const scaleRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    scaleRect.setAttribute("x", "5");
    scaleRect.setAttribute("y", "5");
    scaleRect.setAttribute("width", "45");
    scaleRect.setAttribute("height", "990");
    scaleRect.setAttribute("rx", "10");
    scaleRect.setAttribute("ry", "10");
    scaleRect.setAttribute("fill", "url(#grad)");
    svg.appendChild(scaleRect);

    // Criando as marcações e os textos da escala
    for (let i = 0; i < 16; i++) {
        const y = 985 - (i * 969) / 15;
        const value = (minValue + i * step).toFixed(1);

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", "5");
        line.setAttribute("x2", "50");
        line.setAttribute("y1", y);
        line.setAttribute("y2", y);
        line.setAttribute("stroke", "white");
        line.setAttribute("stroke-opacity", "0.3");
        line.setAttribute("stroke-width", "2");
        svg.appendChild(line);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", "114");
        text.setAttribute("y", y + 7);
        text.setAttribute("font-family", "sans-serif");
        text.setAttribute("font-size", "19");
        text.setAttribute("fill", "black");
        text.setAttribute("text-anchor", "end");
        text.textContent = `${Math.round(value)}m`;
        svg.appendChild(text);
    }

    return svg;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function updateScale() {

    // Certifica-se de que o container existe antes de inserir o SVG
    const svgContainer = document.getElementById("svgContainer");
    if (!svgContainer) return;

    // Limpa o conteúdo anterior
    svgContainer.innerHTML = "";
    
    // Insere o novo SVG
    svgContainer.appendChild(generateScaleSVG(globalMinElevation, globalMaxElevation));
}

// Chama a função para criar o elemento e atualizar a escala
// createDivScaleSvg();

//////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para destivar um elmento html
function ativaElementoHtml(id, estado) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.disabled = !estado; // Se estado for true, habilita; se for false, desabilita
        elemento.style.opacity = elemento.disabled ? "0.4" : "1"; // Define transparência
        if(estado)
        {
            elemento.style.pointerEvents = 'auto'; // Reativa a interação com o mouse
            elemento.style.cursor = 'pointer'; // Define como clicável
        }
        else
        {
            elemento.style.pointerEvents = 'none'; // Impede interação com o mouse
            elemento.style.cursor = 'default'; // Remove o cursor de clique
        }    
    } else {
        console.warn(`Elemento com ID '${id}' não encontrado.`);
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function EncontrarDado(pontosvisitaDados, lat, lon,iDado) {
    // Procura o ponto com a mesma latitude e longitude
    const ponto = pontosvisitaDados.find(p => p[0] === lat && p[1] === lon);

    // Retorna o endereço se o ponto for encontrado, ou uma mensagem padrão
    return ponto ? ponto[iDado] : "Idado não encontrado";
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function limparMarcadores(markerVet) {
    // Verifica se o array tem marcadores
    if (!markerVet || markerVet.length === 0) {
        wLog("Nenhum marcador para remover.");
        return;
    }

    // Itera sobre os marcadores e remove cada um do mapa
    markerVet.forEach(marker => {
        if (marker.remove) {
            marker.remove(); // Remove o marcador do mapa
        }
    });

    // Esvazia o array
    markerVet.length = 0;

}
//////////////////////////////////////////////////////////////////////////////////////////////////////
// Estrutura pontosvisitaDados [-22.88169706392197, -43.10262976730735,"P0","Local", "Descrição","Altitude","Ativo"],
function AtualizaPontosvisitaDados(pontosvisitaDados,lat, lon,ColunaAtualizar,NovoDado)
{
    // wLog(`lat ${lat}, lon ${lat}, iPn - ${iPn}, iPnDados -  ${iPnDados}`);
    i_posicaolatlon = pontosvisitaDados.findIndex(ponto => ponto[0] === lat && ponto[1] === lon );
    pontosvisitaDados[i_posicaolatlon][ColunaAtualizar]=NovoDado;
    return pontosvisitaDados;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function ReordenaPontosTela(rotaSel)
{
    pontosVisita = rotaSel.pontosVisitaOrdenados;
    limparMarcadores(markerVet)
    markerVet = [];
    i=0;
    pontosVisita.forEach(point => {
        lat = point[0];
        lon = point[1];
        iPn = `P${i}`;
        iPnDados=EncontrarDado(pontosvisitaDados, lat, lon,2);
        tooltip = EncontrarDado(pontosvisitaDados, lat, lon,4);
        alt = EncontrarDado(pontosvisitaDados, lat, lon,5);
        tooltip = `Altitude: ${alt}<br>${tooltip}`
        // wLog(`---->>> lat ${lat}, lon ${lat}, tooltip - ${tooltip}`);
        // wLog(`---->>> iPn - ${iPn}, iPnDados -  ${iPnDados}, alt - ${alt}`);
        markerbufTemp = L.marker([lat, lon]).addTo(map).on('click', onMarkerClick).setIcon(createSvgIconColorAltitude(i,alt));
        markerbufTemp._icon.setAttribute('data-id', `${i}`);
        markerbufTemp._icon.setAttribute('clicado', '0');
        markerbufTemp._icon.setAttribute('tamanho', 'full');
        markerbufTemp._icon.setAttribute('altitude', `${alt}`);
        markerbufTemp.bindTooltip(tooltip, {permanent: false,direction: 'top',offset: [0, -60],className:'custom-tooltip'});
        markerVet.push(markerbufTemp);
        i=i+1;
    });

}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function getFormattedTimestamp() {
    const now = new Date();
    const dia = String(now.getDate()).padStart(2, '0'); // Dia com 2 dígitos
    const mes = String(now.getMonth() + 1).padStart(2, '0'); // Mês com 2 dígitos (0-11)
    const ano = now.getFullYear();
    const horas = String(now.getHours()).padStart(2, '0'); // Horas com 2 dígitos
    const minutos = String(now.getMinutes()).padStart(2, '0'); // Minutos com 2 dígitos
    const segundos = String(now.getSeconds()).padStart(2, '0'); // Segundos com 2 dígitos
    
    return `${ano}/${mes}/${dia}_${horas}:${minutos}:${segundos}`;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function exibirMensagemComTimeout(mensagem, timeout = 3000) {
    // Remove mensagens anteriores, se existirem
    const mensagemExistente = document.getElementById('mensagemNotificacao');
    if (mensagemExistente) {
        mensagemExistente.remove();
    }

    // Criar a div principal da mensagem
    const mensagemDiv = document.createElement('div');
    mensagemDiv.id = 'mensagemNotificacao';

    // Estilizar a div principal
    Object.assign(mensagemDiv.style, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.40)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.4)',
        zIndex: '1000',
        textAlign: 'justify', // Justificar o texto
        fontFamily: 'Arial, sans-serif',
        fontSize: fontSize,
        color: '#333',
        backgroundImage: 'linear-gradient(135deg, rgba(224, 244, 228, 0.8), rgba(192, 216, 236, 0.8))',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        userSelect: 'none'
    });

    // Criar a div da ampulheta (ícone de carregamento)
    const ampulhetaDiv = document.createElement('div');
    Object.assign(ampulhetaDiv.style, {
        width: '20px',
        height: '20px',
        border: '4px solid rgba(0, 0, 0, 0.1)',
        borderTop: '4px solid #333',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    });

    // Criar o texto da mensagem
    const textoMensagem = document.createElement('label');
    textoMensagem.textContent = mensagem;

    // Criar a animação CSS para a ampulheta
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(styleSheet);

    // Adicionar os elementos à div principal
    mensagemDiv.appendChild(ampulhetaDiv);
    mensagemDiv.appendChild(textoMensagem);

    // Adicionar a div ao body
    document.body.appendChild(mensagemDiv);

    // Remover a mensagem após o tempo especificado (se timeout for maior que 0)
    if (timeout > 0) {
        setTimeout(() => {
            mensagemDiv.remove();
        }, timeout);
    }

    return mensagemDiv;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
function exibirMensagem(mensagem) {
    // Criar a div principal da mensagem
    const mensagemDiv = document.createElement('div');
    // Estilizar a div principal
    mensagemDiv.style.position = 'fixed'; // Fixo em relação à janela
    mensagemDiv.style.top = '50%';
    mensagemDiv.style.left = '50%';
    mensagemDiv.style.transform = 'translate(-50%, -50%)';
    mensagemDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.40)'; // Transparência de 40%
    mensagemDiv.style.padding = '20px';
    mensagemDiv.style.borderRadius = '10px'; // Bordas arredondadas
    mensagemDiv.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.4)'; // Sombra
    mensagemDiv.style.zIndex = '1000';
    mensagemDiv.style.textAlign = 'center';
    mensagemDiv.style.fontFamily = 'Arial, sans-serif';
    mensagemDiv.style.fontSize = fontSize;
    mensagemDiv.style.color = '#333';
    mensagemDiv.style.backgroundImage = 'linear-gradient(135deg, rgba(224, 244, 228, 0.8), rgba(192, 216, 236, 0.8))'; // Degradê
    mensagemDiv.style.display = 'flex';
    mensagemDiv.style.alignItems = 'center'; // Alinhamento vertical
    mensagemDiv.style.gap = '10px'; // Espaçamento entre elementos
    mensagemDiv.style.userSelect = 'none';           // Para navegadores modernos
    mensagemDiv.style.webkitUserSelect = 'none';     // Para navegadores baseados no WebKit
    mensagemDiv.style.mozUserSelect = 'none';        // Para Firefox
    mensagemDiv.style.msUserSelect = 'none';
    // Criar a div da ampulheta
    const ampulhetaDiv = document.createElement('div');
    ampulhetaDiv.style.width = '20px';
    ampulhetaDiv.style.height = '20px';
    ampulhetaDiv.style.border = '4px solid rgba(0, 0, 0, 0.1)';
    ampulhetaDiv.style.borderTop = '4px solid #333';
    ampulhetaDiv.style.borderRadius = '50%';
    ampulhetaDiv.style.animation = 'spin 1s linear infinite';
    // Criar o texto da mensagem
    const textoMensagem = document.createElement('label'); // 'label' ou 'span'
    textoMensagem.classList.add('mensagem-texto');
    textoMensagem.textContent = mensagem;
    // Estilos definidos em uma tag <style> ou arquivo CSS:
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .mensagem-texto {
            font-family: Arial, sans-serif;
            font-size: 16px;
            color: #333;

    }`;
    document.head.appendChild(styleElement);
    // Adicionar a ampulheta e o texto à div principal
    mensagemDiv.appendChild(ampulhetaDiv);
    mensagemDiv.appendChild(textoMensagem);

    // Adicionar a div ao body
    document.body.appendChild(mensagemDiv);

    // Criar a animação CSS para a ampulheta
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(styleSheet);

    return mensagemDiv;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
async function enviarJson(payload, url) {
    try {
        // Envia uma requisição POST com JSON
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        // Verifica se a requisição foi bem-sucedida
        if (response.ok) {
            wLog("-----------------------------------------------");
            wLog("Requisição bem-sucedida:");

            const responseData = await response.json();
            wLog(responseData);
            wLog("-----------------------------------------------");
            return(responseData);
            // const redirectUrl = responseData.Url;
            // if (redirectUrl) {
            //     window.open(redirectUrl, '_blank'); // Abre a URL em uma nova aba
            // }
        } else {
            console.error(`Erro ${response.status}: ${await response.text()}`);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function createMacOSDock() {
    // Create the main translucent container
    // https://macosicons.com/#/
    const dock = document.createElement('div');
    dock.style.position = 'absolute';
    dock.style.top = '10px'; // Move the dock to the top of the page
    dock.style.left = '50%';
    dock.style.transform = 'translateX(-50%)';
    dock.style.backgroundColor = 'rgba(255, 255, 255, 0.65)'; // 65% translucent white
    dock.style.borderRadius = '15px';
    dock.style.padding = '10px 15px';
    dock.style.display = 'flex';
    dock.style.gap = '10px';
    dock.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.4)'; // sombra em torno para destacar na interface
    dock.style.zIndex = 1000;

    // Add icon-like divs to the dock
    const icons = ['🏠', '🔍', '📂', '⚙️', '💡', 'KML']; // Example icons
    icons.forEach((icon,index) => {
        const iconDiv = document.createElement('div');
        iconDiv.style.width = '50px';
        iconDiv.style.height = '50px';
        iconDiv.style.backgroundColor = '#fff';
        iconDiv.style.borderRadius = '10px';
        iconDiv.style.display = 'flex';
        iconDiv.style.justifyContent = 'center';
        iconDiv.style.alignItems = 'center';
        iconDiv.style.cursor = 'pointer';
        iconDiv.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.15)';
        iconDiv.style.transition = 'transform 0.2s';
        iconDiv.innerText = icon;


        //---------------------------------------------------------------------------
        if (index === 0) { // Tabela de elevação dos pontos
            // Add the imgElevationTable image to the first icon
            iconDiv.innerText = '';
            const img = document.createElement('img');
            img.src = imgOpenElevTable;
            img.style.width = '50px';
            img.style.height = '50px';
            img.style.borderRadius = '10px';
            iconDiv.appendChild(img);
            img.onclick = () => {
                // createColorTable();
                // Contorna bug do Chrome de exibir a barra de rolagem nos eixos x e y
                document.body.style.overflow = "hidden"
                createDivScaleSvg();               
            };
        }
        //---------------------------------------------------------------------------
        if (index === 1) { // Dialogo de ordem pontos
            iconDiv.innerText = '';
            const img = document.createElement('img');
            img.src = imgOrdemPontos;
            img.style.width = '40px';
            img.style.height = '40px';
            img.style.borderRadius = '10px';
            iconDiv.appendChild(img);
            img.onclick = () => {
                clDivOrdenaPontos();
            };

        }
        //---------------------------------------------------------------------------
        if (index === 2) { // Botão de heading do mapa
            iconDiv.innerText = '';
            const img = document.createElement('img');
            img.id="imgPointerNorte";
            img.src = imgPointerNorte;
            img.style.width = '30px';
            img.style.height = '30px';
            img.style.borderRadius = '10px';
            iconDiv.appendChild(img);
            img.onclick = () => {
                if (HeadingNorte==0)
                {
                    img.src = imgPointer;
                    HeadingNorte=1;
                    AtualizaMapaHeading(LastHeading);
                }
                else
                {
                    img.src = imgPointerNorte;
                    HeadingNorte=0
                    AtualizaMapaHeading(LastHeading);
                }
            };

        }
        //---------------------------------------------------------------------------
        if (index === 3) { // Botão de GPS
            iconDiv.innerText = '';
            const img = document.createElement('img');
            img.id="imgGps";
            if(gpsAtivado)
                img.src = imgGpsAtivo;
            else
                img.src = imgGpsInativo;

            img.style.width = '30px';
            img.style.height = '30px';
            img.style.borderRadius = '10px';
            iconDiv.appendChild(img);
            img.onclick = () => {
                if (gpsAtivado)
                {
                    img.src = imgGpsInativo;
                    gpsAtivado=false;
                    AtualizaGpsTimer(gpsAtivado);
                }
                else
                {
                    img.src = imgGpsAtivo;
                    gpsAtivado=true;
                    AtualizaGpsTimer(gpsAtivado);
                }
            };

        }

        //---------------------------------------------------------------------------
        if (index === 4) { // Botão de gerar KML 
            iconDiv.innerText = '';
            const img = document.createElement('img');
            img.src = imgKml;
            img.style.width = '40px';
            img.style.height = '40px';
            img.style.borderRadius = '10px';
            img.style.zIndex ="999";
            iconDiv.appendChild(img);
            img.onclick = () => {
                GerarKML(polylineRotaDat, pontosVisitaOrdenados, pontosvisitaDados);
                alert("Salvo com sucesso, o arquivo KML para uso em aplicativos como MapsMe, Google Earth e outros. 📌 No MapsMe, envie o arquivo KML ao motorista via WhatsApp. Para abrir, basta clicar no arquivo e selecionar MapsMe como aplicativo.");
            };

        }
        //---------------------------------------------------------------------------
        if (index === 5) { // Botão de controle dos layers
            iconDiv.innerText = '';
            const img = document.createElement('img');
            img.src = imgMapLayers; 
            img.id="divLayers";
            img.style.width = '35px';
            img.style.height = '35px';
            img.style.borderRadius = '10px';
            img.style.zIndex ="1501";

            iconDiv.appendChild(img);
            // Adicionar funcionalidade para alternar os mapas-base ao clicar
            let baseMapsArray = Object.keys(baseLayers); // Obter lista de nomes dos mapas-base
            let currentBaseMapIndex = 0;

            img.onclick = () => {
                currentBaseMapIndex = (currentBaseMapIndex + 1) % baseMapsArray.length; // Avançar para o próximo mapa
                let selectedBaseMap = baseLayers[baseMapsArray[currentBaseMapIndex]];

                map.eachLayer(layer => {
                    if (Object.values(baseLayers).includes(layer)) {
                        map.removeLayer(layer); // Remover o mapa-base atual
                    }
                });

                map.addLayer(selectedBaseMap); // Adicionar o novo mapa-base
            };
        }        
        //---------------------------------------------------------------------------

        // Add hover effect for scaling
        iconDiv.addEventListener('mouseenter', () => {
            iconDiv.style.transform = 'scale(1.2)';
        });
        iconDiv.addEventListener('mouseleave', () => {
            iconDiv.style.transform = 'scale(1)';
        });

        // Append each icon div to the dock
        dock.appendChild(iconDiv);
    });

    // Add the dock to the body
    document.body.appendChild(dock);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function GerarKML(polylineRota, pontosVisita, pontosVisitaDados) 
{
    //exibirMensagemComTimeout("Gerando e salvando o arquivo KML para uso em aplicativos como MapsMe, Google Earth e outros. 📌 No MapsMe, envie o arquivo KML ao motorista via WhatsApp. Para abrir, basta clicar no arquivo e selecionar MapsMe como aplicativo.", 
    //          timeout = 9000);

    // Cabeçalho do KML
    let kmlInicio = `<?xml version="1.0" encoding="UTF-8"?>
    <kml xmlns="http://www.opengis.net/kml/2.2">
    <Document>
        <name>WebRotas Pontos e Rotas</name>
        <!-- Definir estilos -->
        <Style id="lineStyleBlue">
        <LineStyle>
            <color>ff00ff00</color> <!-- verde em formato ABGR -->
            <width>4</width>
        </LineStyle>
        </Style>
    `;

    // Footer do KML
    let kmlFim = `
    </Document>
    </kml>`;

    // Adicionar os pontos de visita
    let kmlPontos = "";
    ind = 0;
    pontosVisita.forEach(([latitude, longitude]) => {
            descricao = EncontrarDado(pontosVisitaDados, latitude, longitude, 4);
            altitude  = EncontrarDado(pontosVisitaDados, latitude, longitude, 5);
            kmlPontos += `
                <Placemark>
                <name>P${ind}  ${descricao}</name>
                <description>${descricao}</description>
                <Point>
                    <coordinates>${longitude},${latitude},${altitude}</coordinates>
                </Point>
                </Placemark>`;
        ind++;
    });

    let kmlPolyline = ''; 
    for (let i = 0; i < polylineRota.length; i++) 
    {
            kmlPolyline = kmlPolyline + `
            <Placemark>
            <name>Rota${i}</name>
            <styleUrl>#lineStyleBlue</styleUrl>
            <LineString>
                <coordinates>
            `;
            polylineRota[i].forEach(([latitude, longitude]) => {
                kmlPolyline += `          ${longitude},${latitude},0\n`;
            });

            kmlPolyline += `
                </coordinates>
            </LineString>
            </Placemark>`;
    }
    // Combinar todas as partes
    const kmlConteudo = kmlInicio + kmlPontos + kmlPolyline + kmlFim;

    // Salvar o arquivo KML
    const blob = new Blob([kmlConteudo], { type: "application/vnd.google-earth.kml+xml" });
    const url = URL.createObjectURL(blob);

    date = gerarDataHoraAtual();
    const a = document.createElement("a");
    a.href = url;

    a.download = `WebRotasPontosRotas${date}.kml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function gerarDataHoraAtual() {
    const agora = new Date();

    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
    const dia = String(agora.getDate()).padStart(2, '0');

    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const segundos = String(agora.getSeconds()).padStart(2, '0');

    // Montar a string no formato desejado: YYYY-MM-DD HH:mm:ss
    return `${ano}-${mes}-${dia}-${horas}:${minutos}:${segundos}`;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
// Cria a interface na tela primeira execução
function CreateControls()
{
    HeadingNorte=0;
    map.zoomControl.remove();
    createMacOSDock();
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
