
function warningMaker(monster){
    var count = 0;
    var zones = [];
    return function(number, location){
        var list = '';
        ++count;
        zones.push([location,number]);
        for(var i=0, l=zones.length; i < l; i++){
            list += zones[i][0] + '(' + zones[i][1] + ')\n'; 
        }
        // var list = zones.join('\n');
        alert('Beware! There have been ' + 
            monster + ' sightings in Seoul today!\n ' + 
            number +' have been spotted at the ' + 
            location + '!\n' +
            ' This is alert #' + count + ' today for ' + monster + ' danger.\n' +
            'Current danger zones are:\n' + 
            list
        );
    }
}

// var orkAlert                = warningMaker('Ork');
// var greenHulkAlert          = warningMaker("green hulk");
// var xManAlert               = warningMaker("x man");
// var flashBlizzardAlert      = warningMaker("flash blizzard");
// var snowYetiAlert           = warningMaker("snow yeti");


// orkAlert(2,'seoul');
// greenHulkAlert(5,'il-san');
// snowYetiAlert(1,'suwon');
// orkAlert(8,'suwon');




var happinessGenerated = function(){
    return function(testScore, attendanceRate, satisfactionLevel) {
    var ability = testScore * attendanceRate;
    var feeling = satisfactionLevel * satisfactionLevel * satisfactionLevel;
    var totalHappiness = feeling + ability;
    return totalHappiness;
    };
}

function happinessMessage(){

}

var test = 100;
var attendance = 100;
var satisfaction = 100;

var happiness = happinessGenerated();
// var happiness = happinessGenerated(test, attendance, satisfaction);

// 각 주사위의 승리 확률이 1회씩 주어져야 한다.
function nontransitiveDice(dice) {
    var dice_cnt = dice.length; //주사위의 갯수는 3개
    var len = dice[0].length;   //각 주사위의 면은 6개
    var winArray = [[0,0],[0,0],[0,0]];

    for(var i=0; i<dice_cnt-1; i++){ 
        for(var j=i+1; j<dice_cnt; j++){
            for(var k=0; k<len; k++){
                for(var h=0; h<len; h++){
                    if( dice[i][k] > dice[j][h]){
                        winArray[i+j-1][0] += 1;
                    }else{
                        winArray[i+j-1][1] += 1;
                    }
                }
            }
        }
    } 
    
    for(var i=0; i<winArray.length;i++){
        if(winArray[i][0] >= winArray[i][1]){
           winArray[i] = 1;
        }else{
            winArray[i] = 0;
        }
    }
    var winString = winArray.join('')
    if (winString != '101' && winString != '010') { return false; }
    return true;
}

var dice = [[1,1,1,10,10,10], 
 [4,4,4,4,4,100], 
 [5,5,5,5,5,5]];
console.log(nontransitiveDice(dice));
