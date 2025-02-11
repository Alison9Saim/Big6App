const express = require('express');
const {google} = require('googleapis');

const app = express();
app.set("view engine", "ejs");
const Port = process.env.PORT || 3001;
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));


app.get('/', async(req, res) => {
    
    //res.send("Hello world");
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
      });

    // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1-7WZmUbGF-cpbnAJrhznBiGFU43z5yaJ4PvMIMDQ3uM";

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });


  //Read rows from sheet
  const getRows = await googleSheets.spreadsheets.values.get({
    
    auth,
    spreadsheetId,
    range: "Prediction",
  })
  //res.send(getRows.data);
  
  //res.send(metaData.data.sheets[0]);

  res.render("index",{ data: getRows.data.values});

});





//get all predictions
app.get('/all', async(req, res) => {

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1-7WZmUbGF-cpbnAJrhznBiGFU43z5yaJ4PvMIMDQ3uM";

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
  auth,
  spreadsheetId,
  });


  //Read rows from sheet
  const getRows = await googleSheets.spreadsheets.values.get({

  auth,
  spreadsheetId,
  range: "Prediction",
  })
  //res.send(getRows.data);

  //res.send(metaData.data.sheets[0]);

  res.render("all",{ data: getRows.data.values});
});


app.listen(Port, () => {
  console.log('Express server listening on port', Port)
});