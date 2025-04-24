class Peix{

  constructor(x,y,t,img){
    this.x = x;
    this.y = y;
    this.t = t;
    this.llum = 1.5;
    this.fishLenght = Math.floor(random(10,101));
    this.img = img[floor(random(3))];
  }
  
  dibuixar(){
    tint(255,255*this.llum);
    this.img.resize(width,0);
    image(this.img,((this.x*rectSize) + borderSize) + rectSize/2, ((this.y*rectSize) + borderSize) + rectSize/2,this.t,this.t);
    this.llum = this.llum-0.01
  }
  
  revelar(){
    this.llum = 1.5;
  }
  
  comparar(x,y){
    if(x==this.x && y==this.y){
      return true;
    }
    else{
      return false;
    }
  }  
}