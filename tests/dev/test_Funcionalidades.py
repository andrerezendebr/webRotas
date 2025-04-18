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
        [2.812482, -60.670263,"Local","Parque do Rio Branco"],
        [2.840826, -60.692496,"Local","Aeroporto Internacional de Boa Vista"],
        [2.854428, -60.644444,"Local","Roraima Garden Shopping"],
        [2.831661, -60.662501,"Local","Estádio Flamarion Vasconcelos"],
        [2.827492, -60.680001,"Local","Praça Fábio Paracat"],  
        [2.791658, -60.694723,"Local","Área Militar – 7º BIS"],
        [2.850549, -60.706111,"Local","Pátio Roraima Shopping"],
        [2.807220, -60.738611,"Local","Praça e Palco Aderval da Rocha Ferreira"],
        [2.892775, -60.705277,"Local","Bairro Pedra Pintada, próximo supermercado Salmos 23"],
        [2.764720, -60.713611,"Local","Distrito Industrial de Boa Vista - Roraima"],
        [2.837220, -60.684445,"Local","Parque Anauá"],
        [2.844719, -60.754723,"Local","Bairro Cidade Satélite"],
        [2.817774, -60.728333,"Local","Rua São Sebastião com Ataide Teive"],
        [2.814996, -60.696664,"Local","Hospital do Amor - Bairro Pericumã"],    
        [2.769164, -60.731389,"Local","Bairro Nova Cidade – Escola Estadual Dr. Luiz"], 
        [2.838887, -60.718613,"Local","Fórum Criminal – Bairro Caranã"],
        [2.811386, -60.711945,"Local","Senai – RR, Bairro Asa Branca"],           
        [2.803887, -60.691666,"Local","Hospital Materno Infantil – Bairro 13 de Setembro"],  
        [2.793886, -60.715556,"Local","CRAS/Cristiana Vicente Nunes – Bairro Centenário"],                  
        [2.816383, -60.772500,"Local","Praça Cruviana – Bairro Jardin Equatorial"]
    ],
    "AlgoritmoOrdenacaoPontos": "DistanciaGeodesica",     #  "DistanciaGeodesica","DistanciaOSMR", "DistanciaOSMRMultiThread", "Nenhuma" 
    "regioes": regioesBuf
}
cl.enviar_json(payload, "http://localhost:5001/webrotas")
# quit()

# Aplicativo MapsMe - verificar


regioesBuf =  [       
        {
            "nome": "!Jacare",
            "coord": [
                [-22.918740407473486, -43.046581350886925],
                [-22.91621425399815, -43.03460034948952],
                [-22.93363046037466, -43.038786482507895],
                [-22.93030692975052, -43.04441610967053],
                [-22.926717425070326, -43.05177792980626],                
                [-22.918341544265797, -43.04383871201282]
            ]
        },
        {
            "nome": "!Parque da Cidade",
            "coord": [
                [-22.920468800811552, -43.09392796446328],
                [-22.92139946519323, -43.08829833730066],
                [-22.9233937244859, -43.08238001130917],
                [-22.929908100265653, -43.07862692653409],
                [-22.93628922581668, -43.08468960194],                
                [-22.93602335158884, -43.09768104923836]
            ]
        },
        {
            "nome": "!Outra",
            "coord": [
                [-22.87731577172224, -43.09040921338159],   
                [-22.880204254693243, -43.0450646121466],     
                [-22.908733527841232, -43.05294065586869],      
                [-22.90788830229889, -43.092856139586516]

            ]
        }        
    ]
    

#------------------------------------------------------
# exemplo drive test
# Define o payload JSON com os dados
# -22.910555413451096, -43.16360553394545     Santos Dummont
payload = {
    "User": "Andre",
    "TipoRequisicao": "Contorno",
    "PontoInicial": [-22.90236790344037, -43.17420024484698,"Anatel Rio de Janeiro"],            # Anatel Rio de Janeiro -22.90236790344037, -43.17420024484698
    "RaioDaEstacao": 200,            # distância em metros para estação/ponto do mapa ser considerada visitada - null - nunca
    "GpsProximoPonto": "ProximoDaRota",           # "ProximoDaRota", "MaisProximo" - próximo ponto da rota a ser selecionada pelo GPS
    "latitude": -22.910555413451096,        
    "longitude": -43.16360553394545,
    "raio": 10,
    "numeropontos":21,
    "AlgoritmoOrdenacaoPontos": "DistanciaOSMRMultiThread",     #  "DistanciaGeodesica","DistanciaOSMR", "DistanciaOSMRMultiThread", "Nenhuma" 
    "regioes": regioesBuf
}
cl.enviar_json(payload, "http://localhost:5001/webrotas")
# quit()

#------------------------------------------------------
# exemplo pontos visita

payload = {
    "User": "Rodrigo",
    "TipoRequisicao": "PontosVisita",
    "PontoInicial": [-22.90236790344037, -43.17420024484698,"Anatel Rio de Janeiro"],            # Anatel Rio de Janeiro -22.90236790344037, -43.17420024484698
    "RaioDaEstacao": 200,            # distância em metros para estação/ponto do mapa ser considerada visitada - null - nunca
    "GpsProximoPonto": "ProximoDaRota",           # "ProximoDaRota", "MaisProximo" - próximo ponto da rota a ser selecionada pelo GPS 
    "pontosvisita": [
        [-22.90510838815471, -43.105772903105354,"Local",""],
        [-22.917360518277434, -43.089637952126694,"Local",""],
        [-22.93823733595283, -43.04438138041789,"Local",""],
        [-22.866894934079635, -43.084679404650934,"Local",""],
        [-22.890314907121354, -43.02994867766674,"Local",""],
        [-22.82050214149252, -43.07793536049125,"Local",""]
    ],
    "AlgoritmoOrdenacaoPontos": "DistanciaGeodesica",     #  "DistanciaGeodesica","DistanciaOSMR", "DistanciaOSMRMultiThread", "Nenhuma" 
    "regioes": regioesBuf
}

# Aplicativo MapsMe - verificar

# cl.enviar_json(payload, "http://localhost:5001/webrotas")
# quit()
#------------------------------------------------------
# exemplo pontos compromisso de abrangência      
payload = {
    "User": "Fabio",
    "TipoRequisicao": "Abrangencia",
    "PontoInicial": [-22.90236790344037, -43.17420024484698,"Anatel Rio de Janeiro"],            # Anatel Rio de Janeiro -22.90236790344037, -43.17420024484698 # "PontoInicial": [-15.805462291348457, -47.882631325568745,"Anatel DF"]
    "RaioDaEstacao": 200,            # distância em metros para estação/ponto do mapa ser considerada visitada - null - nunca
    "GpsProximoPonto": "ProximoDaRota",           # "ProximoDaRota", "MaisProximo" - próximo ponto da rota a ser selecionada pelo GPS
    "Escopo":"AreasUrbanizadas",                   # Opções: "Municipio" ou "AreasUrbanizadas" 
    "cidade": "Niterói",
    "uf": "RJ",
    "AlgoritmoOrdenacaoPontos": "DistanciaGeodesica",     #  "DistanciaGeodesica","DistanciaOSMR", "DistanciaOSMRMultiThread", "Nenhuma"
    "distancia_pontos": 700,  # distancia entre pontos em metros
    "regioes": regioesBuf
}

cl.enviar_json(payload, "http://localhost:5001/webrotas")

#------------------------------------------------------
# exemplo pontos compromisso de abrangência
payload = {
    "User": "Fabio",
    "TipoRequisicao": "Abrangencia",
    "PontoInicial": [-22.90236790344037, -43.17420024484698,"Anatel Rio de Janeiro"],            # Anatel Rio de Janeiro -22.90236790344037, -43.17420024484698
    "RaioDaEstacao": 200,            # distância em metros para estação/ponto do mapa ser considerada visitada - null - nunca
    "GpsProximoPonto": "ProximoDaRota",           # "ProximoDaRota", "MaisProximo" - próximo ponto da rota a ser selecionada pelo GPS
    "Escopo":"AreasUrbanizadas",                   # Opções: "Municipio" ou "AreasUrbanizadas" 
    "cidade": "Niterói",
    "uf": "RJ",
    "AlgoritmoOrdenacaoPontos": "DistanciaOSMRMultiThread",     #  "DistanciaGeodesica","DistanciaOSMR", "DistanciaOSMRMultiThread", "Nenhuma"
    "distancia_pontos": 2000,  # distancia entre pontos em metros
    "regioes": regioesBuf
}
# cl.enviar_json(payload, "http://localhost:5001/webrotas")

payload = {
    "User": "Fabio",
    "TipoRequisicao": "Abrangencia",
    "PontoInicial": [-23.587577163638976, -46.63326070110086,"Anatel São Paulo"],            
    "RaioDaEstacao": 200,            # distância em metros para estação/ponto do mapa ser considerada visitada - null - nunca
    "GpsProximoPonto": "ProximoDaRota",           # "ProximoDaRota", "MaisProximo" - próximo ponto da rota a ser selecionada pelo GPS
    "Escopo":"AreasUrbanizadas",                   # Opções: "Municipio" ou "AreasUrbanizadas" 
    "cidade": "Teresina",
    "uf": "PI",
    "AlgoritmoOrdenacaoPontos": "DistanciaOSMRMultiThread",     #  "DistanciaGeodesica","DistanciaOSMR", "DistanciaOSMRMultiThread", "Nenhuma"
    "distancia_pontos": 4000,  # distancia entre pontos em metros
    "regioes": ""
}

# cl.enviar_json(payload, "http://localhost:5001/webrotas")

# exemplo pedido para regerar a rota para uma lista de pontos já roteados, restorna o polyline da rota
# usado a partir de um cliente html que sabe o número de porta dos OSMR server já ativo de um usuário.    
payload = {
    "TipoRequisicao": "RoteamentoOSMR",
    "PortaOSRMServer": 50001,
    "pontosvisita": [
        [-22.90510838815471, -43.105772903105354],
        [-22.917360518277434, -43.089637952126694],
        [-22.93823733595283, -43.04438138041789],
        [-22.866894934079635, -43.084679404650934],
        [-22.890314907121354, -43.02994867766674],
        [-22.82050214149252, -43.07793536049125]
    ]
}

# cl.enviar_json(payload, "http://localhost:5001/webrotas")
#------------------------------------------------------
