const c = (el)=>document.querySelector(el); 
const cs = (el)=>document.querySelectorAll(el);
let modalQt = 0;
let key = 0;
let cart = []

//lista de produtos
modelsJson.map((item, index)=>{
    let itens
    if(item.tipo == 'anel') {
         itens = c('.aneis .aneis-item').cloneNode(true)
         itens.setAttribute('data-key', index)
         itens.querySelector('.aneis-item--img img').src = item.img
         itens.querySelector('.aneis-item--nome').innerHTML = item.nome
         itens.querySelector('.aneis-item--preco').innerHTML = `R$  ${item.preco}`
        c('.area-aneis').append(itens)

        // abrir modal
        itens.querySelector('a').addEventListener('click', (e)=>{
            e.preventDefault()
            //transformar variavel em global
            key = e.target.closest('.aneis-item').getAttribute('data-key')
            modalQt = 1
            // popular modal
            c('.img-modal img').src = modelsJson[key].img
            c('.info-modal h1').innerHTML = modelsJson[key].nome
            c('.info-modal--desc').innerHTML = modelsJson[key].desc
            c('.info-modal--qt').innerHTML = modalQt
            c('.info-modal--precoatual').innerHTML = modelsJson[key].preco
            //mostrar
            c('.area-modal').style.opacity = 0; 
            c('.area-modal').style.display = 'flex';
            setTimeout(()=> {
                c('.area-modal').style.opacity = 1; 
            }, 200);

    })
    } else {
        if(item.tipo == 'colar') {
            itens = c('.colares .colares-item').cloneNode(true)
            itens.setAttribute('data-key', index)
            itens.querySelector('.colares-item--img img').src = item.img
            itens.querySelector('.colares-item--nome').innerHTML = item.nome
            itens.querySelector('.colares-item--preco').innerHTML = `R$  ${item.preco}`
            c('.area-colares').append(itens)

            // abrir modal
            itens.querySelector('a').addEventListener('click', (e)=>{
            e.preventDefault()
            //transformar variavel em global
            key = e.target.closest('.colares-item').getAttribute('data-key')
            modalQt = 1
            // popular modal
            c('.img-modal img').src = modelsJson[key].img
            c('.info-modal h1').innerHTML = modelsJson[key].nome
            c('.info-modal--desc').innerHTML = modelsJson[key].desc
            c('.info-modal--qt').innerHTML = modalQt
            c('.info-modal--precoatual').innerHTML = modelsJson[key].preco
            //mostrar
            c('.area-modal').style.opacity = 0; 
            c('.area-modal').style.display = 'flex';
            setTimeout(()=> {
                c('.area-modal').style.opacity = 1; 
            }, 200);

    })
        } else {
            itens = c('.pulseiras .pulseiras-item').cloneNode(true)
            itens.setAttribute('data-key', index)
            itens.querySelector('.pulseiras-item--img img').src = item.img
            itens.querySelector('.pulseiras-item--nome').innerHTML = item.nome
            itens.querySelector('.pulseiras-item--preco').innerHTML = `R$  ${item.preco}`
            c('.area-pulseiras').append(itens)

            // abrir modal
            itens.querySelector('a').addEventListener('click', (e)=>{
            e.preventDefault()
            //transformar variavel em global
            key = e.target.closest('.pulseiras-item').getAttribute('data-key')
            modalQt = 1
            // popular modal
            c('.img-modal img').src = modelsJson[key].img
            c('.info-modal h1').innerHTML = modelsJson[key].nome
            c('.info-modal--desc').innerHTML = modelsJson[key].desc
            c('.info-modal--qt').innerHTML = modalQt
            c('.info-modal--precoatual').innerHTML = modelsJson[key].preco
            //mostrar
            c('.area-modal').style.opacity = 0; 
            c('.area-modal').style.display = 'flex';
            setTimeout(()=> {
                c('.area-modal').style.opacity = 1; 
            }, 200);

            })
        }
    }
    
})

function fecharModal() {
    c('.area-modal').style.opacity = 0
    setTimeout(()=> {
        c('.area-modal').style.display = 'none'
    }, 500)
}

cs('.info-modal--cancelar').forEach((item)=>{
    item.addEventListener('click', fecharModal)
})

c('.info-modal--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1) {
        modalQt--;
        c('.info-modal--qt').innerHTML = modalQt
    }
})

c('.info-modal--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.info-modal--qt').innerHTML = modalQt
})

 // abrir modal
c('.info-modal--add').addEventListener('click', (e)=>{
    //mostrar
    c('.area-carrinho').style.opacity = 0; 
    c('.area-carrinho').style.display = 'flex';
    setTimeout(()=> {
        c('.area-carrinho').style.opacity = 1; 
    }, 200);

    let identificador = modelsJson[key].id
    let locaId = cart.findIndex((item)=>item.identificador == identificador)

 
    if(locaId > -1) {
        cart[locaId].qt += modalQt
    } else {
        cart.push ({
            identificador,
            id:modelsJson[key].id,
            qt:modalQt
        })
    }
    fecharModal()
    carrinho()
})

function carrinho() {

    c('.carrinho').innerHTML = '';
    let total = 0
    cart.map((itemCarrinho, index)=>{
        let mItem = modelsJson.find((itemBD)=>itemBD.id == itemCarrinho.id)
        total += mItem.preco * itemCarrinho.qt
        let carrinhoItem = c('.body-carrinho .item-carrinho').cloneNode(true)
        carrinhoItem.style.display = 'flex'
        carrinhoItem.querySelector('img').src = mItem.img
        carrinhoItem.querySelector('.item-carrinho--nome').innerHTML = mItem.nome
        carrinhoItem.querySelector('.item-carrinho--qtd').innerHTML = `quantidade: ${itemCarrinho.qt}`
        carrinhoItem.querySelector('.item-carrinho--qt').innerHTML = itemCarrinho.qt;
        c('.vazio').style.display = 'none'
        carrinhoItem.querySelector('.item-carrinho-qtmenos').addEventListener('click', ()=>{
            if(itemCarrinho.qt > 1) {
                itemCarrinho.qt--
            } else {
                cart.splice(index, 1)
            }
            if (cart.length == 0) {
                total = 0
                c('.vazio').style.display = 'inline'
                c('.total-carrinho span').innerHTML = `R$ ${total.toFixed(2)}`
            }
            carrinho()
        })
        carrinhoItem.querySelector('.item-carrinho-qtmais').addEventListener('click', ()=>{
            itemCarrinho.qt++
            carrinho()
        }) 
        c('.total-carrinho span').innerHTML = `R$ ${total.toFixed(2)}`;
        c('.carrinho').append(carrinhoItem)
    })
}

c('.carrinho-cancelar').addEventListener('click', ()=>{
    c('.area-carrinho').style.display='none';
});