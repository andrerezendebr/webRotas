import os
import sys

# Caminho relativo da pasta "tests" para "webdir"
relative_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src", "backend", "webdir"))
# Adiciona o caminho ao sys.path
sys.path.append(relative_path)

import client as cl

# Exemplo de uso
# Aeroporto de Guarulhos -23.42886118100462, -46.47216661114135
# Minha casa -22.91745583955038, -43.08681365669065
# Porto alegre -30.04335339842007, -51.19854075437197
# Brasilia -15.799106031104461, -47.89308359907858
# Manaus -3.095001128771412, -60.00810128271529
# Xique-Xique -10.82612742003356, -42.724560509335504
"""
regioesBuf =  [
        {
            "nome": "RegiaoRoteada",
            "coord": [
                [2.930152038047168, -60.84962200354022],     
                [2.906256112018158, -60.58327725177531],        
                [2.724505048498915, -60.618538022694544],       
                [2.704378642593918, -60.81939848560945],         
            ]
        }   
    ]
"""
regioesBuf = []    


payload = {
    "User": "Alessandro",
    "TipoRequisicao": "PontosVisita",
    "PontoInicial": [2.802119889276001, -60.68869135518992,"Anatel Roraima"],            # Anatel Roraima 2.802119889276001, -60.68869135518992
    "RaioDaEstacao": 200,            # distância em metros para estação/ponto do mapa ser considerada visitada - null - nunca
    "GpsProximoPonto": "ProximoDaRota",           # "ProximoDaRota", "MaisProximo" - próximo ponto da rota a ser selecionada pelo GPS
    "pontosvisita": [

        [2.817774, -60.728333,"Local","Rua São Sebastião com Ataide Teive"],
        [2.807220, -60.738611,"Local","Praça e Palco Aderval da Rocha Ferreira"],
        [2.811386, -60.711945,"Local","Senai – RR, Bairro Asa Branca"]
    
    ],
    
   
    "AlgoritmoOrdenacaoPontos": "DistanciaGeodesica",     #  "DistanciaGeodesica","DistanciaOSMR", "DistanciaOSMRMultiThread", "Nenhuma" 
    "regioes": regioesBuf
}

cl.enviar_json(payload, "http://localhost:5001/webrotas")
# quit()
