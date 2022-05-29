const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const randtoken = require('rand-token');
const nodemailer = require('nodemailer');
const flash = require('express-flash');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app= express();




//Create connection
const db = mysql.createConnection({
    host     :'localhost' ,
    user     : 'root',
    password :  '',
    database :'congelation' 
});

app.use(cors());
app.use(express.json())
app.use(flash());
app.use(bodyParser.urlencoded({extend:true}))
app.use(express.urlencoded({extend:false}))

app.use(session({ 
    secret: '123458cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

 
//connexion 
/*db.connect((err) =>{
    if(err){
        throw err;
    }
    console.log('mysql connected...');
});*/

//cree user
    app.post("/Create" , (req, res) => {
    const id = req.body.id;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const sexe = req.body.sexe;
    const Route = req.body.Route;
    const ville = req.body.ville;
    const code_postal = req.body.code_postal;
    const telephone = req.body.telephone;
    const login = req.body.login;
    const mail = req.body.mail;
    const motdepass = req.body.motdepass;
    const roles = req.body.roles;
    const sqlInsert ="INSERT INTO users(id,nom, prenom, sexe,Route,ville,code_postal,telephone,login,mail,motdepass,roles) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(sqlInsert, [id,nom, prenom, sexe,Route,ville,code_postal,telephone,login,mail,motdepass,roles],(err, result) => {
        console.log(err);

});
});
//select user by id
app.get("/getuser/:id", (req, res) => {
    let sql = 'SELECT * FROM users WHERE id= '+req.params.id;
    let query = db.query(sql, (err,results) => {
        res.send(results);
       
    });
});
    app.get('/getusers', (req, res) => {
        let sql = 'SELECT * FROM users  WHERE roles ="Empolye" ';
        let query = db.query(sql, (err,result) => {
            res.send(result);
          
        });
    });
//userprofil
    app.get('/getusersProfil/:id/:login/:motdepass', (req, res) => {
        let sql = 'SELECT * FROM users WHERE id= '+req.params.id;
        console.log(sql);
        let query = db.query(sql, (err,result) => {
            res.send(result);
          
        });
    });


    app.get('/getiduser', (req, res) => {
        let sql = 'SELECT id FROM client ';
        let query = db.query(sql, (err,result) => {
            res.send(result);
          
        });
    });


    app.put("/updateuser/:id",(req,res)=>{
     
        const nom =req.body.nom;
        const prenom =req.body.prenom;
        const sexe =req.body.sexe;
        const Route =req.body.Route;
        const ville = req.body.ville;
        const code_postal = req.body.code_postal;
        const telephone = req.body.telephone;
        const login = req.body.login;
        const mail = req.body.mail;
        const motdepass = req.body.motdepass;
       
        const sqlinsert="UPDATE users SET nom=?,prenom=?,sexe=?,Route=?,ville=?,code_postal=?,telephone=?,login=?,mail=?,motdepass=? WHERE id="+req.params.id ;
        db.query(sqlinsert,[nom,prenom,sexe,Route,ville,code_postal,telephone,login,mail,motdepass],(err,res) => {
            console.log(res);
        })
    })


app.post("/loogin",(req, res)  =>{
  
    const login = req.body.login;
    const motdepass = req.body.motdepass;
    const roles=req.body.roles
 
    if (login && motdepass) {
        db.query(
        "SELECT id,login,motdepass,roles FROM users WHERE login=? and motdepass=? and((roles='Empolye')or(roles='Admin'))",
        [login, motdepass,roles],function(err,result){if (err) throw err;
        if (result.length > 0) {
            
           console.log(result);
           res.send(result);
           
          
        } else {
            res.send('Incorrect Username and/or Password!');
        }			
        res.end();
    });
    } else {
    res.send('Please enter Username and Password!');
    res.end();
}
});

    //ajouter client
    app.post("/InsertClient" , (req, res) => {
        const id = req.body.id;
        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const date = req.body.date;
        const code_postal = req.body.code_postal;
        const ville = req.body.ville;
        const pays = req.body.pays;
        const telephone = req.body.telephone;
        const fax = req.body.fax;
        const mail = req.body.mail;
        db.query(
            " SELECT * FROM client WHERE  telephone=?  or mail=?",
            [telephone,mail],function(err,result){
                if (result.length >0){
                    res.send('existe!');
            } else {
                   
        const sqlInsert ="INSERT INTO client(id,nom,prenom,date,pays,ville,code_postal,telephone,fax,mail) VALUES(?,?,?,?,?,?,?,?,?,?)";
        db.query(sqlInsert, [id,nom,prenom,date,pays,ville,code_postal,telephone,fax,mail],(err, res) => {
            console.log(err);
           
         
           
    });
             }
    
    });
    
        });
// select orientation 
app.get('/getorientation' , (req, res) => {
    let sql = 'SELECT libelle FROM orientation ';
    let query = db.query(sql, (err,results) => {
        res.send(results);
       
    });
})

  /*  let sql =  ' SELECT * FROM client WHERE nom=? and prenom=? and date=? and pays=? and ville=? and code_postal=? and telephone=? and fax=? and mail=?';
    let query = db.query(sql,[id,nom,prenom,date,code_postal,ville,pays,telephone,fax,mail],function (err,result){
  
            //console.log('[MySQL ERROR',err);
        if(result.length !=0) {
            res.send('client already exists');
        }
        else{
           
            let sql = 'INSERT INTO client(id,nom,prenom,date,code_postal,ville,pays,telephone,fax,mail) VALUES(?,?,?,?,?,?,?,?,?,?)';
            let query = db.query(sql,[id,nom,prenom,date,code_postal,ville,pays,telephone,fax,mail],function(err,result){
                if(err) throw err;
                res.send('Registration successful');
            });
        }
    });   

});


*/




    app.put("/updateClient/:id",(req,res)=>{
     
        const nom =req.body.nom;
        const prenom =req.body.prenom;
        const code_postal = req.body.code_postal;
    const ville = req.body.ville;
    const pays = req.body.pays;
    const telephone = req.body.telephone;
    const fax = req.body.fax;
    const mail = req.body.mail;
   
       
        const sqlinsert="UPDATE client SET nom=?,prenom=?,code_postal=?,ville=?,pays=?,telephone=?,fax=?,mail=? WHERE id="+req.params.id ;
        db.query(sqlinsert,[nom,prenom,code_postal,ville,pays,telephone,fax,mail],(err,res) => {
            console.log(res);
        })
    })

   
    app.delete("/DeleteClient/:id",(req,res)=>{
        const id =req.body.id;
        const sqlinsert="DELETE FROM client";
        db.query(sqlinsert,[id],(err,res) => {
            console.log(err);
        })
    })

    //send email
function sendEmail(mail, token,req) {
 
    var mail =mail;
    var token = token;
 
    var transport = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 3000, 
        secure: true,
        auth: {
            user: 'mseddimariam41@gmail.com', // Your email id
            pass: 'mfwhvhshzpffqfei' // Your password
        }
    });
 
    var mailOptions = {
        from: mail,
        to:mail ,
        subject: 'Reset Password Link',
        html: '<p>You requested for reset password, kindly use this <a href="http://localhost:3000/ResetPassword?token=' + token + '">link</a> to reset your password</p>'
 
    };
 
    transport.sendMail(mailOptions, function(error, res) {
        if (error) {
           console.log(error)
        } else {
           console.log("success");
        }
    });
}   

/* send reset password link in email */
app.post('/forgot',function(req, res, next) {
 
    var mail = req.body.mail;
 
  
 
    db.query('SELECT mail FROM users WHERE mail ="' + mail + '"', function(err, result) {
        if (err) throw err;
         
        var type = ''
        var msg = ''
     
        if (result[0].mail.length > 0) {
 
           var token = randtoken.generate(20);
 
           var sent = sendEmail(mail, token);
         
 
             if (sent != 0) {
 
                var data = {
                    token: token
                }
               
                db.query('UPDATE users SET ? WHERE mail ="' + mail + '"', data, function(err, result) {
                    if(err) throw err
         
                })
 
                type = 'success';
                msg = 'The reset password link has been sent to your email address';
 
            } else {
                type = 'error';
                msg = 'Something goes to wrong. Please try again';
            }
 
        } else {
            console.log('2');
            type = 'error';
            msg = 'The Email is not registered with us';
 
        }

        console.log(msg)
        req.flash(type, msg);
        res.redirect('/');
       
    });
   
})
/* reset page */
app.get('/Reset-Password', function(req, res, next) {
    res.render('Reset', {
    title: 'Reset Password Page',
    token: req.query.token
    });
    });


 /* update password to database */
app.post('/update-password', function(req, res) {
    var token = req.body.token;
    var motdepass = req.body.motdepass;
    
    db.query('SELECT * FROM users WHERE token ="' + token + '"', function(err, result) {
      console.log(result); 
    if (err) throw err;
    var type
    var msg
    if (result) {
    var saltRounds = 10;
    // var hash = bcrypt.hash(password, saltRounds);
    bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(motdepass, salt, function(err, hash) {
    var data = {
        motdepass:hash,
      
    }
var mail= req.body.mail;
    db.query('UPDATE users SET ? WHERE mail =' + mail, data, function(err, result) {
      
        
    if(err) throw err
    });
    });
    });
    type = 'success';
    msg = 'Your password has been updated successfully';
    } else {
    console.log('2');
    type = 'success';
  console.log('Invalid link; please try again');
    }
  
    req.flash(type, msg);
    res.redirect('/');

    });
    })
    

    //select client by id
app.get("/getus/:id", (req, res) => {
    let sql = 'SELECT * FROM client WHERE id= '+req.params.id;
    let query = db.query(sql, (err,results) => {
        res.send(results);
       
    });
});
// select tt  clients
    app.get('/GetClient', (req, res) => {
        let sql = 'SELECT * FROM client ';
        let query = db.query(sql, (err,result) => {
            res.send(result);
          
        });
    });
  

    //project list
    app.get('/GetProjet', (req, res) => {
        let sql = 'SELECT  P.id, P.nom_projet, P.Date_de_création, P.Date_limite,P.standard,P.Epaisseur,P.Hauteur,P.code_client , C.nom, C.prenom,C.mail FROM projectlist P, client C WHERE P.code_client=C.id ';
        let query = db.query(sql, (err,result) => {
            res.send(result);
          
        });
    });

    app.get("/getprojet/:id", (req, res) => {
        let sql = 'SELECT * FROM  projectlist WHERE id= '+req.params.id;
        let query = db.query(sql, (err,results) => {
            res.send(results);
           
        });
    });
     //ajouter projet
app.post("/InsertProjet" , (req, res) => { console.log(req.body)
    //const id = req.body.id;
    const nom_projet = req.body.nom_projet;
    const Date_de_création = req.body.Date_de_création;
    const Date_limite = req.body.Date_limite;
    const code_client = req.body.code_client;
    const standard=req.body.standard;
    const Epaisseur= req.body.Epaisseur;
    const Hauteur=req.body.Hauteur;


   
    const sqlInsert ="INSERT INTO projectlist(nom_projet,Date_de_création,Date_limite,standard,Epaisseur,Hauteur,code_client) VALUES(?,?,?,?,?,?,?)";
    db.query(sqlInsert, [nom_projet,Date_de_création,Date_limite,standard,Epaisseur,Hauteur,code_client],(err, res) => {
        console.log(err);
});
});

app.put("/updateProjet/:id",(req,res)=>{
     
    const nom_projet =req.body.nom_projet;
    const Date_limite=req.body.Date_limite;
   
    const sqlinsert="UPDATE projectlist SET nom_projet=?,Date_limite=? WHERE id="+req.params.id ;
    db.query(sqlinsert,[nom_projet,Date_limite],(err,res) => {
        console.log(res);
    })
})

app.get("/getclient/:id", (req, res) => {
    let sql = 'SELECT nom,prenom,mail FROM client WHERE id= '+req.params.id;
    let query = db.query(sql, (err,results) => {
        res.send(results);
       
    });
});

  // select id client
  app.get('/getidclient', (req, res) => {
    let sql = 'SELECT id FROM client ';
    let query = db.query(sql, (err,result) => {
        res.send(result);
      
    });
});
// select Type 
app.get('/gettype' , (req, res) => {
    let sql = 'SELECT libelle_type FROM type';
    let query = db.query(sql, (err,results) => {
        res.send(results);
       
    });
});
// select ville
app.get('/getville' , (req, res) => {
    let sql = 'SELECT * FROM ville ';
    let query = db.query(sql, (err,results) => {
        res.send(results);
       
    });
});
app.post ('/InsertVille',(req, res)=>{
    const libelle_ville =req.body.libelle_ville;
    const Latitude=req.body.Latitude;
    const Tmax = req.body.Tmax;
    const Hr = req.body.Hr;
    db.query(
        " SELECT * FROM ville WHERE  libelle_ville=?  ",
        [libelle_ville],function(err,result){
            if (result.length >0){
                res.send('existe!');
        } else {
               
    const sqlInsert ="INSERT INTO ville(libelle_ville,Latitude,Tmax,Hr) VALUES(?,?,?,?)";
    db.query(sqlInsert, [libelle_ville,Latitude,Tmax,Hr],(err, res) => {
        console.log(err);
    });
}

});

});
// select construction
app.get('/getconstruction' , (req, res) => {
    let sql = 'SELECT libelle_construction FROM construction ';
    let query = db.query(sql, (err,results) => {
        res.send(results);
       
    });
});
// select construction
app.get('/getmetaux' , (req, res) => {
    let sql = 'SELECT libelle_metaux FROM metaux ';
    let query = db.query(sql, (err,results) => {
        res.send(results);
       
    });
});
//calcul surface surface
app.get('/getsurface',(req,res) => {
    var largeur=req.body.largeur;
    var longueur=req.body.longueur;
    const surface=longueur*largeur;
    let sql = 'SELECT largeur*longueur FROM  Murs ';
    let query = db.query(sql, (err,result) => {
        res.send(result);
        console.log(result);

       
       

    });
   
   
})
//get Produit
app.get('/getProduit',(req,res)=>{
    let sql = 'SELECT * FROM produit ';
    let query = db.query(sql, (err,results) => {
        res.send(results);
       
    });
});
//getTemperature

app.get('/getTempInterne',(req,res)=>{
    let sql = 'SELECT * FROM temperature_interne ';
    let query = db.query(sql, (err,results) => {
        res.send(results);
       
    });
});

app.get("/getclientD/:id", (req, res) => {
    let sql = 'SELECT nom,prenom,mail,code_postal,ville,pays,telephone FROM client WHERE id= '+req.params.id;
    let query = db.query(sql, (err,results) => {
        res.send(results);
       
    });
});

app.listen('4000',() => {
    console.log('Server started on port 4000');
});