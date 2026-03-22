let album = null
let musicaAtual = 0

let player
let tituloAlbum
let descricaoAlbum
let musicaAtualTexto
let descricaoMusica

/* ========================= */
/* INICIALIZAÇÃO SEGURA */
/* ========================= */
document.addEventListener("DOMContentLoaded", () => {

player = document.getElementById("player")
tituloAlbum = document.getElementById("titulo-album")
descricaoAlbum = document.getElementById("descricao-album")
musicaAtualTexto = document.getElementById("musica-atual")
descricaoMusica = document.getElementById("descricao-musica")

if(!player){
console.error("Elemento #player não encontrado")
return
}

/* AUTO PRÓXIMA */
player.addEventListener("ended", proxima)

})

/* ========================= */
/* CARREGAR ÁLBUM */
/* ========================= */
function carregarAlbum(caminho){

fetch(caminho)
.then(res => {
if(!res.ok){
throw new Error("Erro ao carregar JSON")
}
return res.json()
})
.then(data =>{

album = data

tituloAlbum.innerText = data.album
descricaoAlbum.innerText = data.descricao

musicaAtual = 0
carregarMusica()

})
.catch(err => {
console.error("Erro:", err)
alert("Erro ao carregar o álbum. Verifique o caminho do JSON.")
})

}

/* ========================= */
/* CARREGAR MÚSICA */
/* ========================= */
function carregarMusica(){

if(!album || !album.musicas){
console.warn("Álbum não carregado")
return
}

const musica = album.musicas[musicaAtual]

if(!musica){
console.warn("Música inválida")
return
}

player.src = musica.arquivo

musicaAtualTexto.innerText = "Tocando: " + musica.titulo
descricaoMusica.innerText = musica.descricao

player.load()

player.play().catch(() => {
console.log("Autoplay bloqueado — clique em Play")
})

}

/* ========================= */
/* PRÓXIMA */
/* ========================= */
function proxima(){

if(!album) return

musicaAtual = (musicaAtual + 1) % album.musicas.length
carregarMusica()

}

/* ========================= */
/* ANTERIOR */
/* ========================= */
function anterior(){

if(!album) return

musicaAtual = (musicaAtual - 1 + album.musicas.length) % album.musicas.length
carregarMusica()

}

/* ========================= */
/* PLAY / PAUSE */
/* ========================= */
function playPause(){

if(!player || player.src === ""){
console.warn("Nenhuma música carregada")
return
}

if(player.paused){
player.play().catch(() => {
console.log("Clique novamente para tocar")
})
}else{
player.pause()
}

}

/* ========================= */
/* IR PARA FAIXA */
/* ========================= */
function irPara(index){

if(!album) return

if(index < 0 || index >= album.musicas.length){
console.warn("Índice inválido")
return
}

musicaAtual = index
carregarMusica()

}

/* ========================= */
/* VOLTAR */
/* ========================= */
function voltar(){
history.back()
}

/* ========================= */
/* FECHAR POPUP */
/* ========================= */
function fecharPopup() {
const popup = document.getElementById("popup")
if(popup){
popup.style.display = "none"
}
}