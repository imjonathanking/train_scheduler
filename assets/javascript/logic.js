function timer() {
    currentTime = moment().format("hh:mm:ss A");
    $("#timer").text(currentTime);
}

startTimer = setInterval(timer, 1000);


//Initializing firebase to store form input data
var config = {
    apiKey: "AIzaSyDX9Fp6GLIJFbgOq4nVQEyvAM7k5ZgFe84",
    authDomain: "train-app-32c68.firebaseapp.com",
    databaseURL: "https://train-app-32c68.firebaseio.com",
    projectId: "train-app-32c68",
    storageBucket: "train-app-32c68.appspot.com",
    messagingSenderId: "579593919720"
};

firebase.initializeApp(config);

var database = firebase.database();

database.ref().on("value", function(snapshot){
    console.log(snapshot.val());
    $("#tableBody").empty();
    snapshot.forEach(function(train){

        
        
        thisTrain = train.val();
        console.log(thisTrain);
        thisRow = $("<tr>");
        thisName = $("<td>").text(thisTrain.trainDB);
        thisDestination = $("<td>").text(thisTrain.destinationDB);
        thisFrequency = $("<td>").text(thisTrain.frequencyDB);


        thisRow.append(thisName, thisDestination, thisFrequency);
        $("#tableBody").append(thisRow);
    })
});

//This will store all of the values from the input fields when the user clicks "submit"
$("#submitButton").on("click", function(event){
    event.preventDefault();
    train = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    frequency = $("#frequency").val().trim();

    //This will push all of the input values into the database as an object
    database.ref().push({
        trainDB: train,
        destinationDB: destination,
        firstTrainDB: firstTrain,
        frequencyDB: frequency
    });

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");
});

