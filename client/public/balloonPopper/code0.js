gdjs.Balloons_32TestCode = {};
gdjs.Balloons_32TestCode.GDballoonObjects1= [];
gdjs.Balloons_32TestCode.GDballoonObjects2= [];
gdjs.Balloons_32TestCode.GDballoonObjects3= [];
gdjs.Balloons_32TestCode.GDballoonSpawnerObjects1= [];
gdjs.Balloons_32TestCode.GDballoonSpawnerObjects2= [];
gdjs.Balloons_32TestCode.GDballoonSpawnerObjects3= [];
gdjs.Balloons_32TestCode.GDbadBalloonSpawnerObjects1= [];
gdjs.Balloons_32TestCode.GDbadBalloonSpawnerObjects2= [];
gdjs.Balloons_32TestCode.GDbadBalloonSpawnerObjects3= [];
gdjs.Balloons_32TestCode.GDgoldBalloonSpawnerObjects1= [];
gdjs.Balloons_32TestCode.GDgoldBalloonSpawnerObjects2= [];
gdjs.Balloons_32TestCode.GDgoldBalloonSpawnerObjects3= [];
gdjs.Balloons_32TestCode.GDbadBalloonObjects1= [];
gdjs.Balloons_32TestCode.GDbadBalloonObjects2= [];
gdjs.Balloons_32TestCode.GDbadBalloonObjects3= [];
gdjs.Balloons_32TestCode.GDscoreTextObjects1= [];
gdjs.Balloons_32TestCode.GDscoreTextObjects2= [];
gdjs.Balloons_32TestCode.GDscoreTextObjects3= [];
gdjs.Balloons_32TestCode.GDtimeTextObjects1= [];
gdjs.Balloons_32TestCode.GDtimeTextObjects2= [];
gdjs.Balloons_32TestCode.GDtimeTextObjects3= [];
gdjs.Balloons_32TestCode.GDendTextObjects1= [];
gdjs.Balloons_32TestCode.GDendTextObjects2= [];
gdjs.Balloons_32TestCode.GDendTextObjects3= [];
gdjs.Balloons_32TestCode.GDbeginTextObjects1= [];
gdjs.Balloons_32TestCode.GDbeginTextObjects2= [];
gdjs.Balloons_32TestCode.GDbeginTextObjects3= [];
gdjs.Balloons_32TestCode.GDbeginCounterObjects1= [];
gdjs.Balloons_32TestCode.GDbeginCounterObjects2= [];
gdjs.Balloons_32TestCode.GDbeginCounterObjects3= [];
gdjs.Balloons_32TestCode.GDgoldenBalloonObjects1= [];
gdjs.Balloons_32TestCode.GDgoldenBalloonObjects2= [];
gdjs.Balloons_32TestCode.GDgoldenBalloonObjects3= [];
gdjs.Balloons_32TestCode.GDredIconObjects1= [];
gdjs.Balloons_32TestCode.GDredIconObjects2= [];
gdjs.Balloons_32TestCode.GDredIconObjects3= [];
gdjs.Balloons_32TestCode.GDpurpleIconObjects1= [];
gdjs.Balloons_32TestCode.GDpurpleIconObjects2= [];
gdjs.Balloons_32TestCode.GDpurpleIconObjects3= [];
gdjs.Balloons_32TestCode.GDgoldIconObjects1= [];
gdjs.Balloons_32TestCode.GDgoldIconObjects2= [];
gdjs.Balloons_32TestCode.GDgoldIconObjects3= [];


gdjs.Balloons_32TestCode.eventsList0 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.getTimerElapsedTimeInSecondsOrNaN(runtimeScene, "startGame") >= 0;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("beginCounter"), gdjs.Balloons_32TestCode.GDbeginCounterObjects2);
{for(var i = 0, len = gdjs.Balloons_32TestCode.GDbeginCounterObjects2.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDbeginCounterObjects2[i].setString("5...");
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.getTimerElapsedTimeInSecondsOrNaN(runtimeScene, "startGame") >= 1;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("beginCounter"), gdjs.Balloons_32TestCode.GDbeginCounterObjects2);
{for(var i = 0, len = gdjs.Balloons_32TestCode.GDbeginCounterObjects2.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDbeginCounterObjects2[i].setString("4...");
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.getTimerElapsedTimeInSecondsOrNaN(runtimeScene, "startGame") >= 2;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("beginCounter"), gdjs.Balloons_32TestCode.GDbeginCounterObjects2);
{for(var i = 0, len = gdjs.Balloons_32TestCode.GDbeginCounterObjects2.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDbeginCounterObjects2[i].setString("3...");
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.getTimerElapsedTimeInSecondsOrNaN(runtimeScene, "startGame") >= 3;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("beginCounter"), gdjs.Balloons_32TestCode.GDbeginCounterObjects2);
{for(var i = 0, len = gdjs.Balloons_32TestCode.GDbeginCounterObjects2.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDbeginCounterObjects2[i].setString("2...");
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.getTimerElapsedTimeInSecondsOrNaN(runtimeScene, "startGame") >= 4;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("beginCounter"), gdjs.Balloons_32TestCode.GDbeginCounterObjects2);
{for(var i = 0, len = gdjs.Balloons_32TestCode.GDbeginCounterObjects2.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDbeginCounterObjects2[i].setString("1...");
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.getTimerElapsedTimeInSecondsOrNaN(runtimeScene, "startGame") >= 5;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("beginCounter"), gdjs.Balloons_32TestCode.GDbeginCounterObjects1);
{for(var i = 0, len = gdjs.Balloons_32TestCode.GDbeginCounterObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDbeginCounterObjects1[i].setString("0...");
}
}}

}


};gdjs.Balloons_32TestCode.mapOfGDgdjs_9546Balloons_959532TestCode_9546GDballoonObjects1Objects = Hashtable.newFrom({"balloon": gdjs.Balloons_32TestCode.GDballoonObjects1});
gdjs.Balloons_32TestCode.mapOfGDgdjs_9546Balloons_959532TestCode_9546GDbadBalloonObjects1Objects = Hashtable.newFrom({"badBalloon": gdjs.Balloons_32TestCode.GDbadBalloonObjects1});
gdjs.Balloons_32TestCode.mapOfGDgdjs_9546Balloons_959532TestCode_9546GDgoldenBalloonObjects1Objects = Hashtable.newFrom({"goldenBalloon": gdjs.Balloons_32TestCode.GDgoldenBalloonObjects1});
gdjs.Balloons_32TestCode.userFunc0x85b7e0 = function(runtimeScene) {
"use strict";
runtimeScene.setBackgroundColor(255,255,255);

// Dispatch a message to the parent window instead of an event
window.parent.postMessage({
    eventType: 'gameOver',
    score: runtimeScene.getVariables().get("score").getAsNumber()
}, '*');  // The '*' is a wildcard, but ideally, you should specify the origin for security.



};
gdjs.Balloons_32TestCode.eventsList1 = function(runtimeScene) {

{


gdjs.Balloons_32TestCode.userFunc0x85b7e0(runtimeScene);

}


};gdjs.Balloons_32TestCode.eventsList2 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("badBalloonSpawner"), gdjs.Balloons_32TestCode.GDbadBalloonSpawnerObjects1);
gdjs.copyArray(runtimeScene.getObjects("balloonSpawner"), gdjs.Balloons_32TestCode.GDballoonSpawnerObjects1);
gdjs.copyArray(runtimeScene.getObjects("beginCounter"), gdjs.Balloons_32TestCode.GDbeginCounterObjects1);
gdjs.copyArray(runtimeScene.getObjects("beginText"), gdjs.Balloons_32TestCode.GDbeginTextObjects1);
gdjs.copyArray(runtimeScene.getObjects("endText"), gdjs.Balloons_32TestCode.GDendTextObjects1);
gdjs.copyArray(runtimeScene.getObjects("goldBalloonSpawner"), gdjs.Balloons_32TestCode.GDgoldBalloonSpawnerObjects1);
gdjs.copyArray(runtimeScene.getObjects("goldIcon"), gdjs.Balloons_32TestCode.GDgoldIconObjects1);
gdjs.copyArray(runtimeScene.getObjects("purpleIcon"), gdjs.Balloons_32TestCode.GDpurpleIconObjects1);
gdjs.copyArray(runtimeScene.getObjects("redIcon"), gdjs.Balloons_32TestCode.GDredIconObjects1);
gdjs.copyArray(runtimeScene.getObjects("scoreText"), gdjs.Balloons_32TestCode.GDscoreTextObjects1);
gdjs.copyArray(runtimeScene.getObjects("timeText"), gdjs.Balloons_32TestCode.GDtimeTextObjects1);
{runtimeScene.getScene().getVariables().get("score").setNumber(0);
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDendTextObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDendTextObjects1[i].hide();
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDscoreTextObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDscoreTextObjects1[i].hide();
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDtimeTextObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDtimeTextObjects1[i].hide();
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDendTextObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDendTextObjects1[i].setCenterPositionInScene(gdjs.evtTools.window.getGameResolutionWidth(runtimeScene) / 2,gdjs.evtTools.window.getGameResolutionHeight(runtimeScene) / 2);
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDscoreTextObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDscoreTextObjects1[i].setCenterPositionInScene(gdjs.evtTools.window.getGameResolutionWidth(runtimeScene) / 2,gdjs.evtTools.window.getGameResolutionHeight(runtimeScene) / 8);
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDballoonSpawnerObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDballoonSpawnerObjects1[i].setCenterPositionInScene(10,gdjs.evtTools.window.getGameResolutionHeight(runtimeScene) - 100);
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDbadBalloonSpawnerObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDbadBalloonSpawnerObjects1[i].setCenterPositionInScene(10,gdjs.evtTools.window.getGameResolutionHeight(runtimeScene) - 100);
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDgoldBalloonSpawnerObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDgoldBalloonSpawnerObjects1[i].setCenterPositionInScene(10,gdjs.evtTools.window.getGameResolutionHeight(runtimeScene) - 100);
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDtimeTextObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDtimeTextObjects1[i].setCenterPositionInScene(gdjs.evtTools.window.getGameResolutionWidth(runtimeScene) - 50,50);
}
}{gdjs.evtTools.runtimeScene.setBackgroundColor(runtimeScene, "255;255;255");
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDredIconObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDredIconObjects1[i].hide(false);
}
for(var i = 0, len = gdjs.Balloons_32TestCode.GDpurpleIconObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDpurpleIconObjects1[i].hide(false);
}
for(var i = 0, len = gdjs.Balloons_32TestCode.GDbeginTextObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDbeginTextObjects1[i].hide(false);
}
for(var i = 0, len = gdjs.Balloons_32TestCode.GDgoldIconObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDgoldIconObjects1[i].hide(false);
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDbeginTextObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDbeginTextObjects1[i].setCenterPositionInScene(gdjs.evtTools.window.getGameResolutionWidth(runtimeScene) / 2,gdjs.evtTools.window.getGameResolutionHeight(runtimeScene) / 4);
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDredIconObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDredIconObjects1[i].putAroundObject((gdjs.Balloons_32TestCode.GDbeginTextObjects1.length !== 0 ? gdjs.Balloons_32TestCode.GDbeginTextObjects1[0] : null), 200, 90);
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDpurpleIconObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDpurpleIconObjects1[i].putAroundObject((gdjs.Balloons_32TestCode.GDredIconObjects1.length !== 0 ? gdjs.Balloons_32TestCode.GDredIconObjects1[0] : null), 200, 90);
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDgoldIconObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDgoldIconObjects1[i].putAroundObject((gdjs.Balloons_32TestCode.GDpurpleIconObjects1.length !== 0 ? gdjs.Balloons_32TestCode.GDpurpleIconObjects1[0] : null), 200, 90);
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDbeginCounterObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDbeginCounterObjects1[i].putAroundObject((gdjs.Balloons_32TestCode.GDgoldIconObjects1.length !== 0 ? gdjs.Balloons_32TestCode.GDgoldIconObjects1[0] : null), 200, 90);
}
}{gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, "startGame");
}{gdjs.evtsExt__CountdownTimer__SetCountdown.func(runtimeScene, "gameTime", 20, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}{gdjs.evtTools.variable.setVariableBoolean(runtimeScene.getScene().getVariables().get("gameRunning"), false);
}}

}


{


gdjs.Balloons_32TestCode.eventsList0(runtimeScene);
}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.common.logicalNegation(false);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("scoreText"), gdjs.Balloons_32TestCode.GDscoreTextObjects1);
gdjs.copyArray(runtimeScene.getObjects("timeText"), gdjs.Balloons_32TestCode.GDtimeTextObjects1);
{for(var i = 0, len = gdjs.Balloons_32TestCode.GDscoreTextObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDscoreTextObjects1[i].setString(gdjs.evtTools.common.toString(gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("score"))));
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDtimeTextObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDtimeTextObjects1[i].setString(gdjs.evtTools.common.toString(gdjs.evtsExt__CountdownTimer__RemainingTime.func(runtimeScene, "gameTime", (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))));
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.common.logicalNegation(false);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableBoolean(runtimeScene.getScene().getVariables().get("gameRunning"), true);
}
if (isConditionTrue_0) {
{gdjs.evtsExt__CountdownTimer__StartCountdown.func(runtimeScene, "gameTime", false, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.getTimerElapsedTimeInSecondsOrNaN(runtimeScene, "startGame") > 5;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(8545700);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("beginCounter"), gdjs.Balloons_32TestCode.GDbeginCounterObjects1);
gdjs.copyArray(runtimeScene.getObjects("beginText"), gdjs.Balloons_32TestCode.GDbeginTextObjects1);
gdjs.copyArray(runtimeScene.getObjects("goldIcon"), gdjs.Balloons_32TestCode.GDgoldIconObjects1);
gdjs.copyArray(runtimeScene.getObjects("purpleIcon"), gdjs.Balloons_32TestCode.GDpurpleIconObjects1);
gdjs.copyArray(runtimeScene.getObjects("redIcon"), gdjs.Balloons_32TestCode.GDredIconObjects1);
gdjs.copyArray(runtimeScene.getObjects("scoreText"), gdjs.Balloons_32TestCode.GDscoreTextObjects1);
gdjs.copyArray(runtimeScene.getObjects("timeText"), gdjs.Balloons_32TestCode.GDtimeTextObjects1);
{gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, "spawningGoldBallons");
}{gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, "spawningBallons");
}{gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, "spawningBadBallons");
}{gdjs.evtTools.runtimeScene.setBackgroundColor(runtimeScene, "112;178;255");
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDredIconObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDredIconObjects1[i].hide();
}
for(var i = 0, len = gdjs.Balloons_32TestCode.GDpurpleIconObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDpurpleIconObjects1[i].hide();
}
for(var i = 0, len = gdjs.Balloons_32TestCode.GDbeginTextObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDbeginTextObjects1[i].hide();
}
for(var i = 0, len = gdjs.Balloons_32TestCode.GDgoldIconObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDgoldIconObjects1[i].hide();
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDscoreTextObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDscoreTextObjects1[i].hide(false);
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDbeginCounterObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDbeginCounterObjects1[i].hide();
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDtimeTextObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDtimeTextObjects1[i].hide(false);
}
}{gdjs.evtTools.variable.setVariableBoolean(runtimeScene.getScene().getVariables().get("gameRunning"), true);
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.getTimerElapsedTimeInSecondsOrNaN(runtimeScene, "spawningBallons") < 18;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("balloon"), gdjs.Balloons_32TestCode.GDballoonObjects1);
gdjs.copyArray(runtimeScene.getObjects("balloonSpawner"), gdjs.Balloons_32TestCode.GDballoonSpawnerObjects1);
{for(var i = 0, len = gdjs.Balloons_32TestCode.GDballoonSpawnerObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDballoonSpawnerObjects1[i].getBehavior("ObjectSpawner").SetOffsetX(gdjs.random(gdjs.evtTools.window.getGameResolutionWidth(runtimeScene)) - 50, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDballoonSpawnerObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDballoonSpawnerObjects1[i].getBehavior("ObjectSpawner").SpawnObject(gdjs.Balloons_32TestCode.mapOfGDgdjs_9546Balloons_959532TestCode_9546GDballoonObjects1Objects, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDballoonObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDballoonObjects1[i].getBehavior("Scale").setScale(4);
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDballoonSpawnerObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDballoonSpawnerObjects1[i].getBehavior("ObjectSpawner").SetSpawnPeriod(gdjs.randomInRange(1, 3), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDballoonObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDballoonObjects1[i].getBehavior("Physics2").setGravityScale(gdjs.Balloons_32TestCode.GDballoonObjects1[i].getBehavior("Physics2").getGravityScale() * (gdjs.randomInRange(0.9, 1)));
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.getTimerElapsedTimeInSecondsOrNaN(runtimeScene, "spawningBallons") < 18;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("badBalloon"), gdjs.Balloons_32TestCode.GDbadBalloonObjects1);
gdjs.copyArray(runtimeScene.getObjects("badBalloonSpawner"), gdjs.Balloons_32TestCode.GDbadBalloonSpawnerObjects1);
{for(var i = 0, len = gdjs.Balloons_32TestCode.GDbadBalloonSpawnerObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDbadBalloonSpawnerObjects1[i].getBehavior("ObjectSpawner").SetOffsetX(gdjs.random(gdjs.evtTools.window.getGameResolutionWidth(runtimeScene)) - 50, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDbadBalloonSpawnerObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDbadBalloonSpawnerObjects1[i].getBehavior("ObjectSpawner").SpawnObject(gdjs.Balloons_32TestCode.mapOfGDgdjs_9546Balloons_959532TestCode_9546GDbadBalloonObjects1Objects, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDbadBalloonObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDbadBalloonObjects1[i].getBehavior("Scale").setScale(5);
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDbadBalloonSpawnerObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDbadBalloonSpawnerObjects1[i].getBehavior("ObjectSpawner").SetSpawnPeriod(gdjs.randomInRange(2, 5), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDbadBalloonObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDbadBalloonObjects1[i].getBehavior("Physics2").setGravityScale(gdjs.Balloons_32TestCode.GDbadBalloonObjects1[i].getBehavior("Physics2").getGravityScale() * (gdjs.randomInRange(0.9, 1)));
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.getTimerElapsedTimeInSecondsOrNaN(runtimeScene, "spawningGoldBallons") < 18;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("goldBalloonSpawner"), gdjs.Balloons_32TestCode.GDgoldBalloonSpawnerObjects1);
gdjs.copyArray(runtimeScene.getObjects("goldenBalloon"), gdjs.Balloons_32TestCode.GDgoldenBalloonObjects1);
{for(var i = 0, len = gdjs.Balloons_32TestCode.GDgoldBalloonSpawnerObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDgoldBalloonSpawnerObjects1[i].getBehavior("ObjectSpawner").SetOffsetX(gdjs.random(gdjs.evtTools.window.getGameResolutionWidth(runtimeScene)) - 50, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDgoldBalloonSpawnerObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDgoldBalloonSpawnerObjects1[i].getBehavior("ObjectSpawner").SpawnObject(gdjs.Balloons_32TestCode.mapOfGDgdjs_9546Balloons_959532TestCode_9546GDgoldenBalloonObjects1Objects, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDgoldenBalloonObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDgoldenBalloonObjects1[i].getBehavior("Scale").setScale(5);
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDgoldBalloonSpawnerObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDgoldBalloonSpawnerObjects1[i].getBehavior("ObjectSpawner").SetSpawnPeriod(5, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("balloon"), gdjs.Balloons_32TestCode.GDballoonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Balloons_32TestCode.GDballoonObjects1.length;i<l;++i) {
    if ( gdjs.Balloons_32TestCode.GDballoonObjects1[i].getBehavior("ButtonFSM").IsPressed((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.Balloons_32TestCode.GDballoonObjects1[k] = gdjs.Balloons_32TestCode.GDballoonObjects1[i];
        ++k;
    }
}
gdjs.Balloons_32TestCode.GDballoonObjects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableBoolean(runtimeScene.getScene().getVariables().get("gameRunning"), true);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Balloons_32TestCode.GDballoonObjects1.length;i<l;++i) {
    if ( gdjs.Balloons_32TestCode.GDballoonObjects1[i].getVariableBoolean(gdjs.Balloons_32TestCode.GDballoonObjects1[i].getVariables().getFromIndex(0), false) ) {
        isConditionTrue_0 = true;
        gdjs.Balloons_32TestCode.GDballoonObjects1[k] = gdjs.Balloons_32TestCode.GDballoonObjects1[i];
        ++k;
    }
}
gdjs.Balloons_32TestCode.GDballoonObjects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(10392708);
}
}
}
}
if (isConditionTrue_0) {
/* Reuse gdjs.Balloons_32TestCode.GDballoonObjects1 */
{for(var i = 0, len = gdjs.Balloons_32TestCode.GDballoonObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDballoonObjects1[i].setVariableBoolean(gdjs.Balloons_32TestCode.GDballoonObjects1[i].getVariables().getFromIndex(0), true);
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDballoonObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDballoonObjects1[i].getBehavior("Animation").setAnimationName("Explode");
}
}{runtimeScene.getScene().getVariables().get("score").add(2);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("badBalloon"), gdjs.Balloons_32TestCode.GDbadBalloonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Balloons_32TestCode.GDbadBalloonObjects1.length;i<l;++i) {
    if ( gdjs.Balloons_32TestCode.GDbadBalloonObjects1[i].getBehavior("ButtonFSM").IsPressed((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.Balloons_32TestCode.GDbadBalloonObjects1[k] = gdjs.Balloons_32TestCode.GDbadBalloonObjects1[i];
        ++k;
    }
}
gdjs.Balloons_32TestCode.GDbadBalloonObjects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableBoolean(runtimeScene.getScene().getVariables().get("gameRunning"), true);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Balloons_32TestCode.GDbadBalloonObjects1.length;i<l;++i) {
    if ( gdjs.Balloons_32TestCode.GDbadBalloonObjects1[i].getVariableBoolean(gdjs.Balloons_32TestCode.GDbadBalloonObjects1[i].getVariables().getFromIndex(0), false) ) {
        isConditionTrue_0 = true;
        gdjs.Balloons_32TestCode.GDbadBalloonObjects1[k] = gdjs.Balloons_32TestCode.GDbadBalloonObjects1[i];
        ++k;
    }
}
gdjs.Balloons_32TestCode.GDbadBalloonObjects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(9047652);
}
}
}
}
if (isConditionTrue_0) {
/* Reuse gdjs.Balloons_32TestCode.GDbadBalloonObjects1 */
{for(var i = 0, len = gdjs.Balloons_32TestCode.GDbadBalloonObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDbadBalloonObjects1[i].setVariableBoolean(gdjs.Balloons_32TestCode.GDbadBalloonObjects1[i].getVariables().getFromIndex(0), true);
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDbadBalloonObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDbadBalloonObjects1[i].getBehavior("Animation").setAnimationName("pop");
}
}{runtimeScene.getScene().getVariables().get("score").sub(1);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("goldenBalloon"), gdjs.Balloons_32TestCode.GDgoldenBalloonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Balloons_32TestCode.GDgoldenBalloonObjects1.length;i<l;++i) {
    if ( gdjs.Balloons_32TestCode.GDgoldenBalloonObjects1[i].getBehavior("ButtonFSM").IsPressed((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.Balloons_32TestCode.GDgoldenBalloonObjects1[k] = gdjs.Balloons_32TestCode.GDgoldenBalloonObjects1[i];
        ++k;
    }
}
gdjs.Balloons_32TestCode.GDgoldenBalloonObjects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableBoolean(runtimeScene.getScene().getVariables().get("gameRunning"), true);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Balloons_32TestCode.GDgoldenBalloonObjects1.length;i<l;++i) {
    if ( gdjs.Balloons_32TestCode.GDgoldenBalloonObjects1[i].getVariableBoolean(gdjs.Balloons_32TestCode.GDgoldenBalloonObjects1[i].getVariables().getFromIndex(0), false) ) {
        isConditionTrue_0 = true;
        gdjs.Balloons_32TestCode.GDgoldenBalloonObjects1[k] = gdjs.Balloons_32TestCode.GDgoldenBalloonObjects1[i];
        ++k;
    }
}
gdjs.Balloons_32TestCode.GDgoldenBalloonObjects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(8076980);
}
}
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("badBalloon"), gdjs.Balloons_32TestCode.GDbadBalloonObjects1);
/* Reuse gdjs.Balloons_32TestCode.GDgoldenBalloonObjects1 */
{for(var i = 0, len = gdjs.Balloons_32TestCode.GDbadBalloonObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDbadBalloonObjects1[i].setVariableBoolean(gdjs.Balloons_32TestCode.GDbadBalloonObjects1[i].getVariables().getFromIndex(0), true);
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDgoldenBalloonObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDgoldenBalloonObjects1[i].getBehavior("Animation").setAnimationName("pop");
}
}{runtimeScene.getScene().getVariables().get("score").add(10);
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.getTimerElapsedTimeInSecondsOrNaN(runtimeScene, "spawningBallons") >= 20;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("endText"), gdjs.Balloons_32TestCode.GDendTextObjects1);
gdjs.copyArray(runtimeScene.getObjects("scoreText"), gdjs.Balloons_32TestCode.GDscoreTextObjects1);
{for(var i = 0, len = gdjs.Balloons_32TestCode.GDendTextObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDendTextObjects1[i].hide(false);
}
}{for(var i = 0, len = gdjs.Balloons_32TestCode.GDscoreTextObjects1.length ;i < len;++i) {
    gdjs.Balloons_32TestCode.GDscoreTextObjects1[i].putAroundObject((gdjs.Balloons_32TestCode.GDendTextObjects1.length !== 0 ? gdjs.Balloons_32TestCode.GDendTextObjects1[0] : null), 300, 90);
}
}{gdjs.evtTools.variable.setVariableBoolean(runtimeScene.getScene().getVariables().get("gameRunning"), false);
}
{ //Subevents
gdjs.Balloons_32TestCode.eventsList1(runtimeScene);} //End of subevents
}

}


};

gdjs.Balloons_32TestCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Balloons_32TestCode.GDballoonObjects1.length = 0;
gdjs.Balloons_32TestCode.GDballoonObjects2.length = 0;
gdjs.Balloons_32TestCode.GDballoonObjects3.length = 0;
gdjs.Balloons_32TestCode.GDballoonSpawnerObjects1.length = 0;
gdjs.Balloons_32TestCode.GDballoonSpawnerObjects2.length = 0;
gdjs.Balloons_32TestCode.GDballoonSpawnerObjects3.length = 0;
gdjs.Balloons_32TestCode.GDbadBalloonSpawnerObjects1.length = 0;
gdjs.Balloons_32TestCode.GDbadBalloonSpawnerObjects2.length = 0;
gdjs.Balloons_32TestCode.GDbadBalloonSpawnerObjects3.length = 0;
gdjs.Balloons_32TestCode.GDgoldBalloonSpawnerObjects1.length = 0;
gdjs.Balloons_32TestCode.GDgoldBalloonSpawnerObjects2.length = 0;
gdjs.Balloons_32TestCode.GDgoldBalloonSpawnerObjects3.length = 0;
gdjs.Balloons_32TestCode.GDbadBalloonObjects1.length = 0;
gdjs.Balloons_32TestCode.GDbadBalloonObjects2.length = 0;
gdjs.Balloons_32TestCode.GDbadBalloonObjects3.length = 0;
gdjs.Balloons_32TestCode.GDscoreTextObjects1.length = 0;
gdjs.Balloons_32TestCode.GDscoreTextObjects2.length = 0;
gdjs.Balloons_32TestCode.GDscoreTextObjects3.length = 0;
gdjs.Balloons_32TestCode.GDtimeTextObjects1.length = 0;
gdjs.Balloons_32TestCode.GDtimeTextObjects2.length = 0;
gdjs.Balloons_32TestCode.GDtimeTextObjects3.length = 0;
gdjs.Balloons_32TestCode.GDendTextObjects1.length = 0;
gdjs.Balloons_32TestCode.GDendTextObjects2.length = 0;
gdjs.Balloons_32TestCode.GDendTextObjects3.length = 0;
gdjs.Balloons_32TestCode.GDbeginTextObjects1.length = 0;
gdjs.Balloons_32TestCode.GDbeginTextObjects2.length = 0;
gdjs.Balloons_32TestCode.GDbeginTextObjects3.length = 0;
gdjs.Balloons_32TestCode.GDbeginCounterObjects1.length = 0;
gdjs.Balloons_32TestCode.GDbeginCounterObjects2.length = 0;
gdjs.Balloons_32TestCode.GDbeginCounterObjects3.length = 0;
gdjs.Balloons_32TestCode.GDgoldenBalloonObjects1.length = 0;
gdjs.Balloons_32TestCode.GDgoldenBalloonObjects2.length = 0;
gdjs.Balloons_32TestCode.GDgoldenBalloonObjects3.length = 0;
gdjs.Balloons_32TestCode.GDredIconObjects1.length = 0;
gdjs.Balloons_32TestCode.GDredIconObjects2.length = 0;
gdjs.Balloons_32TestCode.GDredIconObjects3.length = 0;
gdjs.Balloons_32TestCode.GDpurpleIconObjects1.length = 0;
gdjs.Balloons_32TestCode.GDpurpleIconObjects2.length = 0;
gdjs.Balloons_32TestCode.GDpurpleIconObjects3.length = 0;
gdjs.Balloons_32TestCode.GDgoldIconObjects1.length = 0;
gdjs.Balloons_32TestCode.GDgoldIconObjects2.length = 0;
gdjs.Balloons_32TestCode.GDgoldIconObjects3.length = 0;

gdjs.Balloons_32TestCode.eventsList2(runtimeScene);

return;

}

gdjs['Balloons_32TestCode'] = gdjs.Balloons_32TestCode;
