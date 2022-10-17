module.exports = function(app) {
    app.get("/about",function(req, res){
        res.render("about.html")
    });

    app.get("/home",function(req, res){
        res.render("home.html")
    });

    app.get("/errornofood",function(req, res){
        res.render("errornofood.html")
    });

    app.get("/addfood", function (req,res) {
        res.render("addfood.html");
       });

    app.post("/foodadded", function (req,res) {
        // saving data in database
        let sqlquery = "INSERT INTO food (name, typical_values_per, unit_measurement, calories, carbs, fat, protein, salt, sugar) VALUES (?,?,?,?,?,?,?,?,?)";
        // execute sql query
        let newrecord = [req.body.name, req.body.typical_values_per, req.body.unit_measurement, req.body.calories, req.body.carbs, req.body.fat, req.body.protein, req.body.salt, req.body.sugar];
        db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
        return console.error(err.message);
        }else
        res.send(" This food has been added to database, food name: "+ req.body.name +  "." + " Typical Values Per: "+ req.body.typical_values_per + " Unit of Typical Values: "+ req.body.unit_measurement + " Calories: " + req.body.calories + " Carbs: " + req.body.carbs + " Fat: " + req.body.fat + " Protein: "+ req.body.protein + " Salt: " + req.body.salt + " Sugar: "+ req.body.sugar);
        });
       });


    app.get("/search",function(req, res) {
        res.render("search.html");
        });
        

    app.get("/search-result-db", function (req, res) {
        //searching in the database
        let word = [req.query.keyword];
        let sqlquery = "SELECT * FROM `food` WHERE name like '%"+word+"%'";

        // execute sql query
        db.query(sqlquery,word, (err, result) => {
        if (err || result == "") {
        res.redirect("./errornofood");
        }else{  
        res.render ('list.html',{availableFood:result});
        }
        });
       }); 


    app.get("/list", function(req, res) {
    // query database to get all the food
    let sqlquery = "SELECT * FROM food";
    // execute sql query
    db.query(sqlquery, (err, result) => {
    if (err) {
    res.redirect("/");
    }
    res.render("list.html",{availableFood: result});
    });
    });

    
    app.get("/update", function (req,res) {
        res.render("update.html");
       });

    app.get("/update-result-db", function (req, res) {
        //searching in the database
        let word = [req.query.keyword];
        let sqlquery = "SELECT * FROM `food` WHERE name like ?";
        
        // execute sql query
        db.query(sqlquery,word, (err, result) => {
        if (err || result == "") {
        res.redirect("./errornofood");
        //res.redirect("./search"); this can also be used in case of an error instead of the above line
        }else{
        res.render ('updatesearch.html',{availableFood:result});
        }
        });
        });
        

    app.post("/foodupdated", function (req,res) {
        // saving data in database
        let sqlquery = "UPDATE food SET name = ?, typical_values_per = ?, unit_measurement = ?, calories = ?, carbs = ?, fat = ?, protein = ?, salt = ?, sugar =? WHERE name = ?";
        // execute sql query
        let newrecord = [req.body.name, req.body.typical_values_per, req.body.unit_measurement, req.body.calories, req.body.carbs, req.body.fat, req.body.protein, req.body.salt, req.body.sugar, req.body.name];
        db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
        return console.error(err.message);
        }else
        res.send(" This food has been updated to database, food name: "+ req.body.name + + ".");
        });
       });

    app.post("/deletefood", function (req,res) {
        // saving data in database
        let sqlquery = "DELETE FROM food WHERE name = ?";
        // execute sql query
        let newrecord = [req.body.name, req.body.typical_values_per, req.body.unit_measurement, req.body.calories, req.body.carbs, req.body.fat, req.body.protein, req.body.salt, req.body.sugar, req.body.name];
        db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
        return console.error(err.message);
        }else
        res.send(" This food has been deleted from the database, food name: "+ req.body.name + ".");
        });
       });

}