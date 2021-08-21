var express = require('express');
var router = express.Router();
var db =require('../database');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const recipe_list = await getRecipeList(req);
  res.render('index');
});

function getRecipeList (req) {

  console.log(req); 
  //TO DO 替换accountID
  const sql = "SELECT recipe_list From user_account WHERE acc_id=\'" + req.body.accountId + "\' Limit 1";
  console.log(sql); 
  db.query(sql, function (err, data) { 
      if (err) throw err;
        const title = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const recipe_list = JSON.parse(data);
        for(var i in recipe_list){
          var recipe_day = JSON.parse(i);
          for(var j in  recipe_day){
            //TO DO 把菜谱信息输出到页面
            var recipe_type = j;
            var recipe_name = recipe_day[j];
          }
        } 
  });
}

function getRecipeByID (req) {

  console.log(req); 
  const sql = "SELECT * From recipes WHERE rec_id=\'" + req.body.fullName + "\' Limit 1"; 
  console.log(sql); 
  db.query(sql, function (err, data) { 
      if (err) throw err;
         console.log(data); 
  });
}


module.exports = router;
