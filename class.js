/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-2
 * Time: 上午11:00
 * To change this template use File | Settings | File Templates.
 */


function Tank(x,y,direct,color){
    this.x = x;
    this.y = y;
    this.direct = direct;
    this.color = color;
    this.speed = 3;
    this.isLive = true;
}
Tank.prototype = {
    moveUp: function(){
        this.direct = 'up';
        if(moveCheck(this,hero,enemys,walls)){
            this.y -= this.speed;
        }else{
            console.log('碰撞!!!');
        }
    },
    moveRight: function(){
        this.direct = 'right';
        if(moveCheck(this,hero,enemys,walls)){
            this.x += this.speed;
        }else{
            console.log('碰撞!!!');
        }
    },
    moveDown: function(){
        this.direct = 'down';
        if(moveCheck(this,hero,enemys,walls)){
            this.y += this.speed;
        }else{
            console.log('碰撞!!!');
        }
    },
    moveLeft: function(){
        this.direct = 'left';
        if(moveCheck(this,hero,enemys,walls)){
            this.x -= this.speed;
        }else{
            console.log('碰撞!!!');
        }
    }
};


function Hero(x,y,direct,color){
    Tank.call(this,x,y,direct,color);
}
Hero.prototype = new Tank();
Hero.prototype.fire = function(){
    var bullet = new Bullet(this.x,this.y,this.direct,'hero',6);
    bullet.timeCol = setInterval(function(){
        bullet.run();
    },50);
    bullets.push(bullet);
};


function Enemy(x,y,direct,color){
    Tank.call(this,x,y,direct,color);
    //this.bulletCol = null;
}
Enemy.prototype = new Tank();
Enemy.prototype.run = function(){
    var num = Math.round(Math.random()*3);
    if(num == 0){
        this.moveUp();
    }else if(num == 1){
        this.moveRight();
    }else if(num == 2){
        this.moveDown();
    }else if(num == 3){
        this.moveLeft();
    }
};
Enemy.prototype.fire = function(){
    var bullet = new Bullet(this.x,this.y,this.direct,'enemy',6);
    bullet.timeCol = setInterval(function(){
        bullet.run();
    },60);
    bullets.push(bullet);
};


function Bullet(x,y,direct,type,speed){
    this.x = x;
    this.y = y;
    this.direct = direct;
    this.speed = speed;
    this.isLive = true;
    this.type = type;
    this.timeCol = null;
}
Bullet.prototype = {
    run: function(){
        if(this.direct == 'up'){
            this.y -= this.speed;
        }else if(this.direct == 'right'){
            this.x += this.speed;
        }else if(this.direct == 'down'){
            this.y += this.speed;
        }else if(this.direct == 'left'){
            this.x -=this.speed;
        }
    }
};

function Wall(x,y,width,height,src,type){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.src = src;
    this.type = type;
    this.isLive = true;
}














