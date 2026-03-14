let album
let musicaAtual = 0

const player = document.getElementById("player")
const tituloAlbum = document.getElementById("titulo-album")
const descricaoAlbum = document.getElementById("descricao-album")
const musicaAtualTexto = document.getElementById("musica-atual")
const descricaoMusica = document.getElementById("descricao-musica")

function carregarAlbum(caminho){

fetch(caminho)
.then(res => res.json())
.then(data =>{

album = data

tituloAlbum.innerText = data.album
descricaoAlbum.innerText = data.descricao

carregarMusica()

})

}

function carregarMusica(){

player.src = album.musicas[musicaAtual].arquivo

musicaAtualTexto.innerText =
"Tocando: " + album.musicas[musicaAtual].titulo

descricaoMusica.innerText =
album.musicas[musicaAtual].descricao

player.play()

}

function proxima(){

musicaAtual++

if(musicaAtual >= album.musicas.length){
musicaAtual = 0
}

carregarMusica()

}

function anterior(){

musicaAtual--

if(musicaAtual < 0){
musicaAtual = album.musicas.length - 1
}

carregarMusica()

}

function playPause(){

if(player.paused){
player.play()
}else{
player.pause()
}

}

function irPara(index){

musicaAtual = index
carregarMusica()

}

player.addEventListener("ended", proxima)

function voltar(){
history.back()
}