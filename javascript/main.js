const bau = document.getElementById('bau');
let gridValor = [];
let addComClickOuArrastar = 0;


if(bau){
    bau.addEventListener('click', function(){

        if(this.classList.contains('openBox')){
            this.classList.remove('openBox');
            this.classList.add('openBoxReverse');
        } else {
            this.classList.remove('openBoxReverse');
            this.classList.add('openBox');
        }

        
        console.log(this)
    });
}


document.querySelectorAll('.config').forEach(e => {
    e.addEventListener("click", function(){

        if(this.classList.contains('grid')){
            const styleSheet = document.styleSheets[0];

            if(gridValor.length == 0){
    
                for (let index = 0; index < styleSheet.cssRules.length; index++) {
                    if (styleSheet.cssRules[index].selectorText === '#mapa') {
                        styleSheet.cssRules[index].style.zIndex = '1'; // Altera o z-index para 1
                        console.log(index + " : "+styleSheet.cssRules[index])
                        gridValor.push(index);
                        break; // Para após encontrar a regra
                    }
                }
            } else {
                styleSheet.cssRules[gridValor[0]].style.zIndex = '0';
                gridValor = [];
            }
        }

        if(this.classList.contains('atalhoc')){
            trocaValorDeAtalho();
            console.log('clicou')
            console.log(addComClickOuArrastar)
            if(addComClickOuArrastar == 0){
                document.querySelectorAll('.item').forEach(element => {
                    element.removeEventListener('mouseenter', criaDivNoEvento);
                    element.addEventListener('mousedown', criaDivNoEvento);
                    
                    console.log("clicou no mouseenter")
                    document.getElementById('atalhoCClick').src = "assets/click.png";
                });
            }
            if(addComClickOuArrastar == 1){
                document.querySelectorAll('.item').forEach(element => {
                    element.addEventListener('mouseenter', criaDivNoEvento);
                    console.log("clicou no mouseenter")

                    document.getElementById('atalhoCClick').src = "assets/mouse-click.png";
                });
            }
        }

        if(this.classList.contains('erased')){
           
            document.querySelectorAll('.item').forEach(element => {
                element.addEventListener('click', removeTileset)
            })
        }

        
    })
})

//excuir o tileset que esta na tela

let apagaOuNao = 0;

function removeTileset(){
        console.log(this.children)
        
        if(apagaOuNao == 0){
            if(this.children[1]){
                this.children[1].remove();
            } else {
                this.children[0].remove()
            }
        }

 



        document.querySelectorAll('.item').forEach(element => {
            element.removeEventListener('click', removeTileset)
        })

    
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'c' || event.key === 'C') {
        const element = document.getElementById('atalhoCClick');
        if (element) {
            element.click();
        }
    }
});



const tilesets = document.querySelectorAll('.tileset');

function tilesetmovimento(){
    tilesets.forEach(tile => {
        let offsetX, offsetY;
    
        tile.addEventListener('mousedown', (e) => {
            offsetX = e.clientX - tile.getBoundingClientRect().left;
            offsetY = e.clientY - tile.getBoundingClientRect().top;
    
            const moveDiv = (e) => {
                tile.style.left = `${e.clientX - offsetX}px`;
                tile.style.top = `${e.clientY - offsetY}px`;
            };
    
                document.addEventListener('mousemove', moveDiv);
                document.addEventListener('mouseup', () => {
                    document.removeEventListener('mousemove', moveDiv);
            }, { once: true });
        });
    });
}

function tilesetmovimento2(elemento){
    
        let offsetX, offsetY;
    
        elemento.addEventListener('mousedown', (e) => {
            offsetX = e.clientX - elemento.getBoundingClientRect().left;
            offsetY = e.clientY - elemento.getBoundingClientRect().top;
    
            const moveDiv = (e) => {
                elemento.style.left = `${e.clientX - offsetX}px`;
                elemento.style.top = `${e.clientY - offsetY}px`;
            };
    
            document.addEventListener('mousemove', moveDiv);
            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', moveDiv);
                // alignTiles(tile);
            }, { once: true });
        });
}



// function click para criar mais tileset


function adicionarEventoClique(elemento) {
        const novaDiv = document.createElement('div');
        novaDiv.className = `tilesetVisivel tileset0${elemento}`;
        novaDiv.id = 'mapa';
        novaDiv.textContent = this.textContent;

        novaDiv.style.position = 'fixed';
        novaDiv.style.left = `84px`;
        novaDiv.style.top = `94px`;
        novaDiv.style.zIndex = `9`;

        document.body.appendChild(novaDiv);
        // tilesetmovimento2(novaDiv)

}

function excluirTilesetNaVisualizacao(){
    document.querySelectorAll('.tilesetVisivel').forEach(e => {
        e.remove();
    })
}

function trocaValorDeAtalho(){
    if(addComClickOuArrastar == 0){
        addComClickOuArrastar = 1;
    } else if(addComClickOuArrastar == 1){
        addComClickOuArrastar = 0;
    }
}



//ideia para clicar no grid e colocar o tileset específico

var valorTileSet = 0;

function trocaDeValor(valor){
    excluirTilesetNaVisualizacao();
    adicionarEventoClique(valor);
    ouvirOQueEstaNaTela();
    return valorTileSet = valor; 
}

//remove e add eventListener

function removeEColocaEventListener(){

    if(addComClickOuArrastar == 0){
        document.querySelectorAll('.item').forEach(element => {
            element.removeEventListener('mouseenter', criaDivNoEvento);
            element.addEventListener('mousedown', criaDivNoEvento);
            
            console.log("clicou no mouseenter")
            document.getElementById('atalhoCClick').src = "assets/click.png";
        });
    }
    if(addComClickOuArrastar == 1){
        document.querySelectorAll('.item').forEach(element => {
            element.addEventListener('mouseenter', criaDivNoEvento);
            console.log("clicou no mouseenter")

            document.getElementById('atalhoCClick').src = "assets/mouse-click.png";
        });
    }
        console.log("teste")
    
}

document.querySelectorAll('.tile').forEach(e => {
    e.addEventListener('click', removeEColocaEventListener)
})



function criaDivNoEvento(e) {
    console.log("click");
    if(addComClickOuArrastar == 0){
        if (valorTileSet !== 0) {
            const novaDiv = document.createElement('div');
            novaDiv.className = `tileset tileset0${valorTileSet}`;
            novaDiv.id = 'mapa';
            
            novaDiv.style.position = 'absolute';
            novaDiv.style.left = `0px`;
            novaDiv.style.top = `0px`;

            e.currentTarget.appendChild(novaDiv);

            // Remover o evento após a ação, se necessário
            e.currentTarget.removeEventListener('mousedown', criaDivNoEvento);
        }
    }
    if(addComClickOuArrastar == 1){
        console.log('removeu');
        if (valorTileSet !== 0) {
            const novaDiv = document.createElement('div');
            novaDiv.className = `tileset tileset0${valorTileSet}`;
            novaDiv.id = 'mapa';
            
            novaDiv.style.position = 'absolute';
            novaDiv.style.left = `0px`;
            novaDiv.style.top = `0px`;

            e.currentTarget.appendChild(novaDiv);

            // Remover o evento após a ação, se necessário
            e.currentTarget.removeEventListener('mouseenter', criaDivNoEvento);
        }
    }
}

// Usar a mesma função para adicionar o listener

function ouvirOQueEstaNaTela(){

        if(addComClickOuArrastar == 0){
            document.querySelectorAll('.item').forEach(element => {
                element.addEventListener('mousedown', criaDivNoEvento);
            });
        }
        if(addComClickOuArrastar == 1){
            document.querySelectorAll('.item').forEach(element => {
                element.addEventListener('mouseenter', criaDivNoEvento);
                console.log("clicou no mouseenter")
            });
    }

}