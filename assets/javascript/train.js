// Initialize Firebase
var config = {
    apiKey: "AIzaSyCTLaWsTj2HEHdg1mm1zPVYYJneOWjx9jM",
    authDomain: "myfirstproject-e7878.firebaseapp.com",
    databaseURL: "https://myfirstproject-e7878.firebaseio.com",
    projectId: "myfirstproject-e7878",
    storageBucket: "myfirstproject-e7878.appspot.com",
    messagingSenderId: "216132589025"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-Train").on("click", function () {
    
    var train = $("#name-input").val().trim();
    var dest = $("#dest-input").val().trim();
    var firstT = $("#firstT-input").val().trim();
    var freq = $("#freq-input").val().trim();

    database.ref().push({
        train: train,
        dest: dest,
        firstT: firstT,
        freq: freq,
    });

    $("#nameinput").val("");
    $("#destinput").val("");
    $("#firstTinput").val("");
    $("#freqinput").val("");

    return false;
});

database.ref().on("child_added", function (childDb) {
 
    var childObj = childDb.val();

    var firstTConverted = moment(childObj.firstT, "hh:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTConverted, "hh:mm"), "minutes");
    var tRemainder = diffTime % childObj.freq;
    var minAway = childObj.freq - tRemainder;
    var next = moment().add(minAway, "minutes").format("hh:mm")
  
    var newRow = $("<tr>");
    newRow.append($("<td>" + childObj.train + "</td>"));
    newRow.append($("<td>" + childObj.dest + "</td>"));
    newRow.append($("<td>" + childObj.freq + "</td>"));
    newRow.append($("<td>" + next + "</td>"));
    newRow.append($("<td>" + minAway + "</td>"));

    $("tbody").prepend(newRow);

}, function (error) {
    console.log(error);
});



