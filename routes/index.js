var express = require('express');
var router = express.Router();
var db =require('../database');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const recipe_list = await getRecipeList(req, res);

  res.locals.isLogin = false;
  res.render('index');
});

function getRecipeList (req, res) {

  console.log(req); 
  //TO DO 替换accountID
  const sql = "SELECT recipe_list From user_account WHERE acc_id=\'" + "acc0001" + "\' Limit 1";
  console.log(sql); 

  //查询每周规划菜谱信息
  db.query(sql, function (err, data) { 
      if (err) throw err;
        const title = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const recipe_list = JSON.parse(data[0].recipe_list);
        res.locals.recipe_list = recipe_list;

        //创建数组存储菜谱名称
        var recipes_info = new Array();

        //判断数据是否为空
        if(data.length!=0){
          for(var i in recipe_list){
            var recipe_day = recipe_list[i];
            console.log(i);
            for(var j in  recipe_day){
              //TO DO 把菜谱信息输出到页面
              var recipe_type = j;
              var recipe_ID = recipe_day[j];
              //通过菜谱ID查询菜谱信息
              var recipe_info = getRecipeByID(recipe_ID);
              //没有菜谱则记入空字符串
              if(recipe_info.length!=0){
                recipes_info.push(recipe_name);
              }else{
                recipes_info.push("");
              }
            }
          }
        }else{
          console.log("No Data fectched.")
        }
        
        //返回参数加入菜谱名称
        res.locals.recipes_info = recipes_info;
  });
}

  function getRecipeByID (rec_id) {

  const sql = "SELECT * From recipes WHERE rec_id=\'" + rec_id + "\' Limit 1"; 
  console.log(sql); 
  db.query(sql, function (err, data) { 
      if (err) throw err;
        return data;
  });
}


module.exports = router;
