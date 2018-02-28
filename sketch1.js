var table;
var dataArray;
var rA=0;
var x0;
var y0;

var startX;

var lowestRank;

// TO DO
// add ranking as a cascade of points down
// change colors to scarf
// add a line for the doctor and a pic as a cutout on top
// 
// cool to add a running person on top as a graph is formed
// after the plot is formed as a villain pop up for the best episode of the season
// possibly a companion? 

//add some data regarding the position of the point for the episode


function preload(){
    table=loadTable("data/episodeInfo.csv", "csv", "header");
}

function setup(){
    
    createCanvas(1200,600);
    background(0);
    startX=5;
    x0=startX;
    y0=300;
    loadData(); //now we have an array of episode objects'
    print(rA);

}

function draw(){

    var len=dataArray.length;
    if (rA==len){
        noLoop();
    }

    d=dataArray[rA];
    print(d.season);
    drawLine(d,x0,y0);
    drawCircle(d,x0,y0);

    drawDoctorLine(d,x0,y0);

    rA+=1;
    x0+=8;

}

function getDoctorColor(d){
    if (d.season==1){
        return color(235, 244, 247); //eccleston
    }
    else if (d.season>=2 && d.season<=4){
        return color(224,11,39); //tennant
    }
    else if (d.season>=5 && d.season<=7){
        return color(36, 116, 166); //tennant
    }
    else if (d.season>=8 && d.season<=10){
        return color(242, 163,15); //tennant
    }
}

function drawDoctorLine(d,x0,y0){
    push();
    stroke(getDoctorColor(d));
    strokeWeight(2);
    line(x0-5, y0-30, x0+3, y0-30);

    pop();
}

function drawLine(epis, x0,y0){
    push();
    stroke(getColor(epis));
    line(x0,y0,x0,y0+(epis.rank-lowestRank)*20);
    pop();
}

function colorOptions(){
    op=250; //opacity

    c1=color(66,88,120,op);
    c2=color(77,155,166,op);
    c3=color(244,193,39,op);
    c4=color(216,125,15,op);
    c5=color(166,51,5,op);

    colorArray=[c1];
    colorArray.push(c2);
    colorArray.push(c3);
    colorArray.push(c4);
    colorArray.push(c5);
    colorArray.push(c4);
    colorArray.push(c3);
    colorArray.push(c2);
    colorArray.push(c1);
    colorArray.push(c5);

    return colorArray;
}

function getColor(epis){
    c=colorOptions();
    if (c.length<epis.season){
        return c[c.length-1];
    }
    else{
        return c[epis.season-1];
    }
}

function drawCircle(epis, x0, y0){
    c=colorOptions();
    noStroke();
    col=getColor(epis);
    fill(col);
    ellipse(x0,y0,epis.rank);
}

function loadData(){
    dataArray=[];
    var rows=table.getRows();
    lowestRank=rows[0].getNum("rank");
    //print(rows);
    for (var r=0; r<rows.length;r++){
        seas=rows[r].getNum("season");
        epN=rows[r].getNum("episode");
        title=rows[r].getString("title");
        rank=rows[r].getNum("rank");
        nR=rows[r].getNum("numberReviews");
        date=rows[r].getNum("date");
        dur=rows[r].getNum("duration");
        curr=new Episode(seas, epN, title, rank, nR, date, dur);
        dataArray.push(curr);

        if (rank<lowestRank){
            lowestRank=rank;
        }
    }
}

function Episode(season, epNumber, title, rank, numberReviews, date, duration, color){
        this.season=season;
        this.epNumber=epNumber;
        this.title=title;
        this.rank=rank;
        this.numberReviews=numberReviews;
        this.date=date;
        this.duration=duration;
        this.color=getColor(this.season);
}