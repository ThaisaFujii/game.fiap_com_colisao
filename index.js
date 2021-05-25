
// configuração canvas
var  canvas = document.getElementById('tela');
var ctx = canvas.getContext('2d');

// --------------------------------------NAVE---------------------------------------//

var x_nave = 0;
var y_nave = 150;
const INICIAL_NAV_X = 0; 
const INICIAL_NAV_Y = 150;
var nave_image = new Image();
var largura_nave = 60;
var altura_nave = 60;

// --------------------------------------NAVE---------------------------------------// 

// --------------------------------------ASTERÓIDES---------------------------------------//

var asteroide = new Image();
asteroide.src= "imagens/asteroide.png";
var largura_ast = 70;
var altura_ast = 70;

var largura_asteroid = 50;
var altura_asteroid = 50;
i = 0;
n_asteroide = 1;
max_x = 750;
min_x = 0;
max_y = 350;
min_y = 0;
var x_ast = new Array();
var y_ast = new Array();
var variacaoAst = 0;
x_ast[i] = Math.floor((Math.random() * (max_x -  min_x)) + min_x);
y_ast[i] = 0;
tInicial= Math.floor(new Date().valueOf() / 100);
requestAnimationFrame(gameloop);

// --------------------------------------ASTERÓIDES---------------------------------------// 

// ------------------------------ VARIÁVEIS DE AMBIENTE---------------------------------------//
var fase = 1
var faseHTML = document.getElementById("faseHTML")

var pontos = 0
var pontosHTML = document.getElementById("pontosHTML")

// -------------------------------VARIÁVEIS DE AMBIENTE---------------------------------------// 


// MOVIMENTAÇÃO NAVE
function pressionaTecla(e){

  ctx.clearRect(x_nave, y_nave, 70, 70);

  if(e.keyCode == 39) {
      if(x_nave < 700)  
      x_nave += 10 * fase
      nave_image.src = "imagens/direita.png";
  }
  if(e.keyCode == 37) {
      if(x_nave > 0)
      x_nave -= 10 * fase
      nave_image.src = "imagens/esquerda.png";
  }
  if(e.keyCode == 38){
      if(y_nave > 0)
      y_nave -= 10 * fase
      nave_image.src = "imagens/cima.png";
  }
  if(e.keyCode == 40){
      if(y_nave < 300)
      y_nave += 10 * fase

      nave_image.src = "imagens/baixo.png";
  }
}

function desenharNave(x, y){
  //desenha a nave na nova posição
  ctx.drawImage(nave_image, x, y);
}

function handleNave() {
    
  window.onkeydown = pressionaTecla;

  desenharNave(x_nave, y_nave)
    
}
//muda de fase
setInterval(() => {
  if (fase < 5) {
    fase++
  }
}, 5000);
//acrescenta os pontos
setInterval(() => {
  pontos += 10
}, 1000)

function showDetails() {
  pontosHTML.innerHTML = `Pontos ${pontos}`
  
  faseHTML.innerHTML = `Fase ${fase}`   
}

function desenharAst(I, X ,Y){
	ctx.clearRect(0, 0, 800, 400);
    //desenha na tela
    for(h = 0; h <=i; h++ ) {
 	   ctx.drawImage(asteroide, x_ast[h], y_ast[h]);
	   
      y_ast[h]++;
    }
    //console.log( "I:" + I + "XY" + X + Y);
}

function showAst(){
		desenharAst(i ,x_ast[i], y_ast[i]);
        if(variacaoAst % 300 == 0) {
        //limitar quantidade dos asteroides
		  	if(i == 5)  i = 0;

			x_ast[i] = Math.floor((Math.random() * (max_x -  min_x)) + min_x);
			y_ast[i] = 0;
				tAtual =  Math.floor(new Date().valueOf() / 1000);
		}
		//muito importante colocar a variação fora do if
		variacaoAst++;
}


//detecta apenas 1 asteroid
 function detectarColisaoAst(x_ast , y_ast)
{
	 if(( x_nave + y_nave == INICIAL_NAV_X + INICIAL_NAV_Y )){
    console.log("xnave:" + x_nave + "larg_nave:" + largura_nave +"x_ast: " + x_ast + "larg_ast: " + largura_ast + "y_nave: "+ y_nave + "alt_nave: " + altura_nave + "y_ast: " + y_ast  + "alt_ast: " + altura_ast); 
    requestAnimationFrame(gameloop);
   }

	 else if( ( (x_nave + largura_nave) >  x_ast  && x_nave < (x_ast  + 
    largura_ast ) ) && ( (y_nave + altura_nave) > y_ast  && y_nave < (y_ast  + altura_ast ) 
) )
     {
         //interrompe o game loop parando a movimentação dos asteroides e da nave
         alert('GAME OVER');
		 
     }   
      else{
              //chama novamente o ciclo da animação
              
			  console.log("xnave:" + x_nave + "larg_nave:" + largura_nave +"x_ast: " + x_ast + "larg_ast: " + largura_ast + "y_nave: "+ y_nave + "alt_nave: " + altura_nave + "y_ast: " + y_ast  + "alt_ast: " + altura_ast); 
			  requestAnimationFrame(gameloop);
          }   
          

}
//detectar asteroides de todo canvas
function detectarColisoes(ax , ay)
{
  for(j = 0; j < x_ast.length; j++){
    detectarColisaoAst(ax[j], ay[j])
  }

}

//chama todas as funcoes pro jogo funcionar
function gameloop() {
  showDetails()
  showAst()
  handleNave()
  detectarColisoes(x_ast, y_ast)
 
}