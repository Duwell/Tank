/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-2
 * Time: 上午11:30
 * To change this template use File | Settings | File Templates.
 */

/**
 * 刷新画布函数
 * @param tank
 */
function flashMap(tank){
    //清空画布
    cxt.clearRect(0,0,500,500);
    //命中检测
    verdictShotTarget(bullets,hero,enemys,walls);

    for(var i in walls){
        if(walls[i].isLive){
            drawWall(walls[i]);
        }else{
            walls.splice(i,1);
        }
    }
    if(tank.isLive){
        drawTank(tank);
    }else{
        var img = new Image();
        img.src = 'gameOver.png';
        img.onload = function(){
            cxt.drawImage(img,0,0,500,500);
        };
        clearInterval(mainTimeCol);
    }
    //循环绘制敌人坦克
    for(var i=0;i<enemys.length;i++){
        if(enemys[i].isLive){
            drawTank(enemys[i]);
        }else{
            enemys.splice(i,1);
        }
    }
    //循环绘制战场子弹
    mapBullet(bullets);
}
/**
 * 绘制坦克
 * @param tank
 */
function drawTank(tank){

    if(tank.direct == 'up' || tank.direct == 'down'){
        //绘制坦克主干
        cxt.fillStyle= tank.color[0];
        cxt.fillRect(tank.x,tank.y,14,50);
        cxt.fillRect(tank.x+36,tank.y,14,50);
        cxt.fillRect(tank.x+15,tank.y+12.5,20,25);
        //统一绘制坦克顶部盖子
        cxt.beginPath();
        cxt.arc(tank.x+25,tank.y+25,8,0,360,true);
        cxt.closePath();
        cxt.fillStyle = tank.color[1];
        cxt.fill();
        if(tank.direct == 'up'){
            //绘制炮筒
            cxt.beginPath();
            cxt.moveTo(tank.x+25,tank.y+25);
            cxt.lineTo(tank.x+25,tank.y);
            cxt.closePath();
            cxt.strokeStyle = tank.color[1];
            cxt.stroke();
        }else if(tank.direct == 'down'){
            //绘制炮筒
            cxt.beginPath();
            cxt.moveTo(tank.x+25,tank.y+25);
            cxt.lineTo(tank.x+25,tank.y+50);
            cxt.closePath();
            cxt.strokeStyle = tank.color[1];
            cxt.stroke();
        }
    }else if(tank.direct == 'left' || tank.direct == 'right'){
        //绘制坦克主干
        cxt.fillStyle= tank.color[0];
        cxt.fillRect(tank.x,tank.y,50,14);
        cxt.fillRect(tank.x,tank.y+36,50,14);
        cxt.fillRect(tank.x+12.5,tank.y+15,25,20);
        //统一绘制坦克顶部盖子
        cxt.beginPath();
        cxt.arc(tank.x+25,tank.y+25,8,0,360,true);
        cxt.closePath();
        cxt.fillStyle = tank.color[1];
        cxt.fill();
        if(tank.direct == 'left'){
            //绘制炮筒
            cxt.beginPath();
            cxt.moveTo(tank.x+25,tank.y+25);
            cxt.lineTo(tank.x,tank.y+25);
            cxt.closePath();
            cxt.strokeStyle = tank.color[1];
            cxt.stroke();
        }else if(tank.direct == 'right'){
            //绘制炮筒
            cxt.beginPath();
            cxt.moveTo(tank.x+25,tank.y+25);
            cxt.lineTo(tank.x+50,tank.y+25);
            cxt.closePath();
            cxt.strokeStyle = tank.color[1];
            cxt.stroke();
        }
    }
}

/**
 * 绘制子弹
 * @param bullet
 */
function drawBullet(bullet){
    if(bullet.direct == 'up'){
        cxt.fillRect(bullet.x+25,bullet.y,2,2);
    }else if(bullet.direct == 'right'){
        cxt.fillRect(bullet.x+50,bullet.y+25,2,2);
    }else if(bullet.direct == 'down'){
        cxt.fillRect(bullet.x+25,bullet.y+50,2,2);
    }else if(bullet.direct == 'left'){
        cxt.fillRect(bullet.x,bullet.y+25,2,2);
    }
}
/**
 * 循环战场子弹
 */
function mapBullet(bullets){
    for(var i=0;i<bullets.length;i++){
        var checkBu = bullets[i];
        if(!(checkBu.x>0 && checkBu.x<500 && checkBu.y>0 && checkBu.y<500)){
            checkBu.isLive = false;
        }
        if(checkBu.isLive){
            drawBullet(checkBu);
        }else{
            //bullets[i] = '';
            bullets.splice(i,1);
        }
        //console.log(bullets[i].x,bullets[i].y);
    }
}

/**
 * 碰撞检测
 */

//子弹检测
function verdictShotTarget(bullets,hero,enemys,walls){
    for(var i in bullets){
        var bulletDir = bullets[i].direct;
        var bulletX = bullets[i].x;
        var bulletY = bullets[i].y;
        //检测子弹方向
        if(bulletDir == 'up'){
            bulletX += 25;
        }else if(bulletDir == 'right'){
            bulletX += 50;
            bulletY +=25;
        }else if(bulletDir == 'down'){
            bulletX +=25;
            bulletY +=50;
        }else if(bulletDir == 'left'){
            bulletY +=25;
        }
        //命中坦克检测
        if(bullets[i].type == 'hero'){
            for(var j in enemys){
                if(bulletX>=enemys[j].x&&bulletX<=(enemys[j].x+50)&&bulletY>=enemys[j].y&&bulletY<=(enemys[j].y+50)){
                    enemys[j].isLive = false;
                    bullets[i].isLive = false;
                }
            }
        }else{
            if(bulletX>=hero.x&&bulletX<=(hero.x+50)&&bulletY>=hero.y&&bulletY<=(hero.y+50)){
                hero.isLive = false;
                bullets[i].isLive = false;
            }
        }
        //检测战场环境
        for(var k in walls){
            if(bulletX>=walls[k].x&&bulletX<=(walls[k].x+walls[k].width)&&bulletY>=walls[k].y&&bulletY<=(walls[k].y+walls[k].height)){
                if(walls[k].type == 'stone'){
                    walls[k].isLive = false;
                    bullets[i].isLive = false;
                }else if(walls[k].type == 'wall'){
                    bullets[i].isLive = false;
                }
            }
        }
    }
}
//移动碰撞
function moveCheck(tank,hero,enemys,walls){//返回布尔值   false：碰撞   true：未碰撞
    var mapElem = [hero];
    Array.prototype.push.apply(mapElem,enemys);
    Array.prototype.push.apply(mapElem,walls);
    var tankPoints = [tank.leftTop,tank.leftBottom,tank.rightBottom,tank.rightTop];
    var tankLTX = tank.x,
        tankLTY = tank.y,
        tankRTX = tank.x+50,
        tankRTY = tank.y,
        tankRBX = tank.x+50,
        tankRBY = tank.y+50,
        tankLBX = tank.x,
        tankLBY = tank.y+50;

    var result = true;
    for(var i in mapElem){
        //console.log(mapElem[i]);
        if(tank.direct == 'up'&&tankLTX>=mapElem[i].x&&tankLTX<=mapElem[i].x+50&&tankLTY-3>=mapElem[i].y&&tankLTY-3<=mapElem[i].y+50
            ||tank.direct == 'up'&&tankRTX>=mapElem[i].x&&tankRTX<=mapElem[i].x+50&&tankRTY-3>=mapElem[i].y&&tankRTY-3<=mapElem[i].y+50){
            result = false;
        }else if(tank.direct == 'right'&&tankRBX+3>=mapElem[i].x&&tankRBX+3<=mapElem[i].x+50&&tankRBY>=mapElem[i].y&&tankRBY<=mapElem[i].y+50
            ||tank.direct == 'right'&&tankRTX+3>=mapElem[i].x&&tankRTX+3<=mapElem[i].x+50&&tankRTY>=mapElem[i].y&&tankRTY<=mapElem[i].y+50){
            result = false;
        }else if(tank.direct == 'left'&&tankLBX-3>=mapElem[i].x&&tankLBX-3<=mapElem[i].x+50&&tankLBY>=mapElem[i].y&&tankLBY<=mapElem[i].y+50
            ||tank.direct == 'left'&&tankLTX-3>=mapElem[i].x&&tankLTX-3<=mapElem[i].x+50&&tankLTY>=mapElem[i].y&&tankLTY<=mapElem[i].y+50){
            result = false;
        }else if(tank.direct == 'down'&&tankRBX>=mapElem[i].x&&tankRBX<=mapElem[i].x+50&&tankRBY+3>=mapElem[i].y&&tankRBY+3<=mapElem[i].y+50
            ||tank.direct == 'down'&&tankLBX>=mapElem[i].x&&tankLBX<=mapElem[i].x+50&&tankLBY+3>=mapElem[i].y&&tankLBY+3<=mapElem[i].y+50){
            result = false;
        }
    }
    return result;
}


/**
 *  绘制刚体
 */
function drawWall(wall){
    //cxt.beginPath();
    var img = new Image();
    img.src = wall.src;
    //cxt.closePath();
    cxt.drawImage(img,wall.x,wall.y,wall.width,wall.height);
}

/**
 * 初始化函数
 */
function startMap(){
    //加载资源
    var wall01 = new Wall(0,50,50,50,'images/stone.png','stone');
    var wall02 = new Wall(50,50,50,50,'images/stone.png','stone');
    var wall03 = new Wall(175,0,50,50,'images/wall.png','wall');
    var wall04 = new Wall(175,50,50,50,'images/wall.png','wall');
    var wall05 = new Wall(350,50,50,50,'images/wall.png','wall');
    var wall06 = new Wall(300,0,50,50,'images/stone.png','stone');
    var wall07 = new Wall(300,50,50,50,'images/stone.png','stone');
    var wall08 = new Wall(50,175,50,50,'images/stone.png','stone');
    var wall09 = new Wall(100,175,50,50,'images/stone.png','stone');
    var wall10 = new Wall(150,175,50,50,'images/stone.png','stone');
    var wall11 = new Wall(200,175,50,50,'images/wall.png','wall');
    walls.push(wall01,wall02,wall03,wall04,wall05,wall06,wall07,wall08,wall09,wall10,wall11);
    //敌军
    var enemy1 = new Enemy(100,0,'down',['#80b801','#c4ff3d']);
    var enemy2 = new Enemy(250,0,'down',['#80b801','#c4ff3d']);
    enemys.push(enemy1,enemy2);
    var enemyCol = setInterval(function(){
        for(var i in enemys){
            //console.log(enemys[i]);
            enemys[i].run();
            enemys[i].fire();
        }
    },300);

    //设置刷新
    var mainTimeCol = setInterval(function(){
        flashMap(hero);
    },50);
}
