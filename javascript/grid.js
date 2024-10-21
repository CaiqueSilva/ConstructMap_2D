console.log("inicio")

let numeroDeVezes = 0;

function clickBottomCriar(num){

    numeroDeVezes = num + numeroDeVezes;
    
    document.querySelectorAll('.item').forEach(e => 
    {
        console.log(e.getAttribute('data-id'))
        if(e.getAttribute('data-id') == "10")
        {
            let divs = document.createElement('div');
            divs.classList.add('item');

            for (let i = 0; i < 1; i++) 
            {
                divs.textContent = `x`;
                e.parentNode.appendChild(divs);
                // console.log(i);
            }

            const styleSheet = document.styleSheets[0];
            let valorHeight = 640;
            let pixel = 64;

            for (let index = 0; index < styleSheet.cssRules.length; index++) 
            {
                if (styleSheet.cssRules[index].selectorText === '.mapaContrucao') 
                {
                    // valorHeight = styleSheet.cssRules[index].style.minHeight;
                    styleSheet.cssRules[index].style.minHeight = valorHeight + pixel * numeroDeVezes + 'px';
                    console.log(numeroDeVezes)
                    // gridValor.push(index);
                    break; // Para após encontrar a regra
                }
            }    
        }
    });
}

const alturaTotal = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
console.log('Altura total da página:', alturaTotal);