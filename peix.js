//test2

class Peix{
  
  
  constructor(x,y,t){
    this.x = x;
    this.y = y;
    this.t = t;
    this.llum = 1;
  }
  
  dibuixar(){
    fill(0, 255*this.llum);
    stroke(0);
    strokeWeight(0);
    circle(((this.x*rectSize) + borderSize) + this.t, ((this.y*rectSize) + borderSize) + this.t, this.t);
    this.llum = this.llum-0.01
  }
  
  revelar(){
    this.llum = 1;
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