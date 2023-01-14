const socket = io();
const fecha = new Date().toLocaleString()

function renderMessage(data){
    let html
    if(data===null || data ===undefined){
        html =`<div>No hay mensajes anteriores</div>`
    }else{
        html = data.map((elem)=>{
        return (`<div style="color:brown"><strong style="color:blue">${elem.email}</strong>
                    [${elem.fecha}]:
                    <em style="color:green"> ${elem.mensaje}</em>
                </div>`)
    }).join(" ")
    }
    document.querySelector('#mensajes').innerHTML = html
}

const addMessage = (e)=>{
    const mensaje = {
        email: document.querySelector('#email').value,
        fecha: fecha,
        mensaje: document.querySelector('#mensaje').value
    }
    socket.emit('nuevo-mensaje', mensaje)
    document.querySelector('#email').value=''
    document.querySelector('#mensaje').value=''
    return false;
}

socket.on('central-mensajes', data => renderMessage(data))

socket.on('connect', ()=>{
    console.log('Servidor conectado')
})

socket.on('disconnect', ()=>{
    console.log('Servidor desconectado')
})