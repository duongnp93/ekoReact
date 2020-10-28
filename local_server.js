//'use strict'

// requireの設定
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');


// MySQLとのコネクションの作成
//const connection = mysql.createConnection({
const pool = mysql.createPool({
	host : '127.0.0.1',
	port : 3306,
	user : 'root',
	password : 'local',
	database : 'ecodrug_local'
});


// Starting our app.
const app = express();
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ extended: true, limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit:'50mb',extended: true }));
app.use(cors());
app.timeout = 0;

app.get('/', (req, res) => res.send('Hello'));


// ログイン認証
app.get('/GetLoginUser', function (req,res) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    console.log("connected");
    var sql = 'SELECT * FROM ecodrug_local.m_member'
            + ' WHERE m_member.login_id = ?'
            + '   AND m_member.login_password = ?'
            
    console.log(sql);
    console.log("sql created");
    
    var data = {
      loginid:req.query.loginid,
      password:req.query.password
    };
    
    console.log(data);
    console.log("data created");
    
    connection.query(
      sql,
      [
        data.loginid,
        data.password,
      ],
      function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        console.log("sql done");
        
        res.send(results);
      }
    );
    connection.release();
  })
});



// 薬品マスタ 全取得
app.get('/GetDrugAll', function (req,res) {

    pool.getConnection(function (err, connection) {

      if (err) throw err;
      console.log("connected");
      // Executing the MySQL query (select all data from the 'm_drug' table).

      var sql = 'SELECT m_drug.code_yj,m_drug.code_jan, m_drug.name,m_drug.price '
              + 'FROM ecodrug_local.m_drug '
              + 'WHERE m_drug.delete_flag = 0 '
              + 'ORDER BY m_drug.code_yj ';

      console.log("sql created");
      
      connection.query(
          sql,
          function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        console.log("sql done");
        res.send(results);
        
      });
      connection.release();
      
    });
    
});


// 薬品マスタ 取得
app.post('/GetDrug', function (req, res) {
    console.log(req.body);

    // Connecting to the database.
    pool.getConnection(function (err, connection) {
      // If some error occurs, we throw an error.
      if (err) throw err;
      console.log("connected");
      // Executing the MySQL query (select all data from the 'm_drug' table).
      console.log(req.body);

      var sql = 'SELECT m_drug.code_yj,m_drug.code_jan, m_drug.name,m_drug.price '
              + 'FROM ecodrug_local.m_drug '
              + 'WHERE m_drug.name LIKE ? '
              + 'AND m_drug.delete_flag = 0 '
              + 'ORDER BY m_drug.code_yj ';

      console.log(sql);
      console.log("sql created");
      
      var data = {
        filter_drug_name:req.body.filter_drug_name,
      };
      
      console.log(data);
      console.log("data created");
      
      connection.query(
          sql,
          [
            data.filter_drug_name,
          ],
          function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        console.log("sql done");
        res.send(results);
        
      });
      connection.release();
      
    });
    
});

// 薬品登録情報 登録
// 登録画面で使用
app.post('/EntryDrug', function (req, res) {
    //console.log(req.body);

    // Connecting to the database.
    pool.getConnection(function (err, connection) {
      // If some error occurs, we throw an error.
      if (err) throw err;
      console.log("connected");
      // Executing the MySQL query (select all data from the 'm_drug' table).
      //console.log(req.body);

      var sql = 'INSERT INTO ecodrug_local.t_entry ( '
              + 'drug_code_yj,'
              + 'member_id,'
              + 'expiration_year,'
              + 'expiration_month,'
              + 'price,'
              + 'ratio,'
              + 'quantity,'
              + 'postage,'
              + 'note,'
              + 'image_1,'
              + 'image_2,'
              + 'image_3,'
              + 'image_4,'
              + 'image_5,'
              + 'image_6,'
              + 'is_dealt,'
              + 'is_canceled,'
              + 'delete_flag,'
              + 'created_at'
              + ')values('
              + '?,'
              + '?,'
              + '?,'
              + '?,'
              + '?,'
              + '?,'
              + '?,'
              + '?,'
              + '?,'
              + '?,'
              + '?,'
              + '?,'
              + '?,'
              + '?,'
              + '?,'
              + '0,'
              + '0,'
              + '0,'
              + 'now()'
              + ');'

      console.log(sql);
      console.log("sql created");
      
      
      
      var data = {
        drug_code_yj:req.body.drug_code_yj,
        login_member_id:req.body.login_member_id,
        expiration_year:req.body.expiration_year,
        expiration_month:req.body.expiration_month,
        price:req.body.price,
        ratio:req.body.ratio,
        quantity:req.body.quantity,
        postage:req.body.postage,
        note:req.body.note,
        image_1:req.body.image_1,
        image_2:req.body.image_2,
        image_3:req.body.image_3,
        image_4:req.body.image_4,
        image_5:req.body.image_5,
        image_6:req.body.image_6,
        
      };
      
      //console.log(data);
      console.log("data created");
      
      connection.query(
          sql,
          [
            data.drug_code_yj,
            data.login_member_id,
            data.expiration_year,
            data.expiration_month,
            data.price,
            data.ratio,
            data.quantity,
            data.postage,
            data.note,
            data.image_1,
            data.image_2,
            data.image_3,
            data.image_4,
            data.image_5,
            data.image_6,
          ],
          function (error, results, fields) {
        if (error) throw error;
        //console.log(results);
        console.log("sql done");
        res.send(results);
        
      });
      
      connection.release();
      
    });
    
});

// 薬品登録情報 取得
app.post('/GetEntryList', function (req, res) {
    console.log(req.body);

    // Connecting to the database.
    pool.getConnection(function (err, connection) {
      // If some error occurs, we throw an error.
      if (err) throw err;
      console.log("connected");
      // Executing the MySQL query (select all data from the 'm_drug' table).
      console.log(req.body);

      var sql = 'SELECT t_entry.*, m_drug.name AS drug_name, m_drug.code_jan AS drug_code_jan, m_member.name AS member_name, m_member.address AS member_address, m_member.tel AS member_tel '
              + ' FROM ecodrug_local.t_entry  INNER JOIN ecodrug_local.m_drug ON t_entry.drug_code_yj = m_drug.code_yj INNER JOIN ecodrug_local.m_member ON t_entry.member_id = m_member.id '
              + 'WHERE m_drug.name LIKE ? '
              + 'AND t_entry.price BETWEEN ? AND ? '
              + 'AND t_entry.quantity BETWEEN ? AND ? '
              + 'AND concat(t_entry.expiration_year,lpad(t_entry.expiration_month,2,"0"))  BETWEEN ? AND ? '
              + 'AND t_entry.is_dealt = 0 '
              + 'AND t_entry.is_canceled = 0 '
              + 'AND t_entry.member_id != ? '
              + 'ORDER BY t_entry.expiration_year, t_entry.expiration_month ';

      console.log(sql);
      console.log("sql created");
      
      var data = {
        filter_drug_name:req.body.filter_drug_name,
        filter_price_lower:req.body.filter_price_lower,
        filter_price_upper:req.body.filter_price_upper,
        filter_quantity_lower:req.body.filter_quantity_lower,
        filter_quantity_upper:req.body.filter_quantity_upper,
        filter_expiration_lower:req.body.filter_expiration_lower,
        filter_expiration_upper:req.body.filter_expiration_upper,
        login_member_id:req.body.login_member_id,
      };
      
      console.log(data);
      console.log("data created");
      
      connection.query(
          sql,
          [
            data.filter_drug_name,
            data.filter_price_lower,
            data.filter_price_upper,
            data.filter_quantity_lower,
            data.filter_quantity_upper,
            data.filter_expiration_lower,
            data.filter_expiration_upper,
            data.login_member_id,
          ],
          function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        console.log("sql done");
        res.send(results);
        
      });
      
      connection.release();
      
    });
    
});

// 薬品登録情報 購入

app.post('/DealDrug', function (req, res) {
    console.log('DealDrug_start');
    console.log(req.body);
    
    
    // :t_entry
    pool.getConnection(function (err, connection) {
      // If some error occurs, we throw an error.
      if (err) throw err;
      console.log("connected");
      // Executing the MySQL query (select all data from the 'm_drug' table).
      console.log(req.body);

      var sql = 'UPDATE ecodrug_local.t_entry '
              + 'SET is_dealt = 1 '
              + 'WHERE id = ? '


      console.log(sql);
      console.log("sql created");
      
      var data = {
        filter_id:req.body.filter_id,
        

      };
      
      console.log(data);
      console.log("data created");
      
      connection.query(
          sql,
          [
            data.filter_id,

          ],
          function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        console.log("sql done");
        //res.send(results);
        
      });
      
      connection.release();
      
    });
    
    
    
    // :t_deal
    pool.getConnection(function (err, connection) {
      // If some error occurs, we throw an error.
      if (err) throw err;
      console.log("connected");
      // Executing the MySQL query (select all data from the 'm_drug' table).
      //console.log(req.body);

      var sql = 'INSERT INTO ecodrug_local.t_deal ( '
              + 'entry_id,'
              + 'entry_member_id,'
              + 'buyer_member_id,'
              + 'dealt_at'
              + ')values('
              + '?,'
              + '?,'
              + '?,'
              + 'now()'
              + ');'

      console.log(sql);
      console.log("sql created");
      
      
      
      var data = {
        entry_id:req.body.filter_id,
        entry_member_id:req.body.entry_member_id,
        buyer_member_id:req.body.login_member_id,
        
      };
      
      //console.log(data);
      console.log("data created");
      
      connection.query(
          sql,
          [
            data.entry_id,
            data.entry_member_id,
            data.buyer_member_id,

          ],
          function (error, results, fields) {
        if (error) throw error;
        //console.log(results);
        console.log("sql done");
        //res.send(results);
        
      });
      
      connection.release();
      
    });
    
    
});



// マイページ出品情報 取得
app.post('/GetMyEntryList', function (req, res) {
    console.log('GetMyEntryList_start');
    console.log(req.body);

    // Connecting to the database.
    pool.getConnection(function (err, connection) {
      // If some error occurs, we throw an error.
      if (err) throw err;
      console.log("connected");
      // Executing the MySQL query (select all data from the 'm_drug' table).
      console.log(req.body);

      var sql = 'SELECT t_entry.*, m_drug.name AS drug_name, m_drug.code_jan AS drug_code_jan,m_drug.price AS drug_price, '
              + 'entry_member.name AS entry_member_name, entry_member.address AS entry_member_address, entry_member.tel AS entry_member_tel, '
              + 'buyer_member.name AS buyer_member_name, buyer_member.address AS buyer_member_address, buyer_member.tel AS buyer_member_tel, '
              + 'DATE_FORMAT(t_entry.created_at,\'%Y年%m月%d日\') AS entry_at, DATE_FORMAT(t_deal.dealt_at,\'%Y年%m月%d日\') AS dealt_at '
              + ' FROM ecodrug_local.t_entry  '
              + 'INNER JOIN ecodrug_local.m_drug ON t_entry.drug_code_yj = m_drug.code_yj '
              + 'INNER JOIN ecodrug_local.m_member AS entry_member ON t_entry.member_id = entry_member.id '
              + 'LEFT JOIN ecodrug_local.t_deal ON t_entry.id = t_deal.entry_id '
              + 'LEFT JOIN ecodrug_local.m_member AS buyer_member ON t_deal.buyer_member_id = buyer_member.id '
              + 'WHERE t_entry.member_id = ? '
              + 'ORDER BY t_entry.expiration_year, t_entry.expiration_month, t_entry.is_canceled, t_entry.is_dealt ';

      console.log(sql);
      console.log("sql created");
      
      var data = {
        login_member_id:req.body.login_member_id
        
      };
      
      console.log(data);
      console.log("data created");
      
      connection.query(
          sql,
          [
            data.login_member_id
          ],
          function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        console.log("sql done");
        res.send(results);
        
      });
      
      connection.release();
      
    });
});

// マイページ購入情報 取得
app.post('/GetMyPurchasedList', function (req, res) {
    console.log('GetMyPurchasedList_start');
    console.log(req.body);

    // Connecting to the database.
    pool.getConnection(function (err, connection) {
      // If some error occurs, we throw an error.
      if (err) throw err;
      console.log("connected");
      // Executing the MySQL query (select all data from the 'm_drug' table).
      console.log(req.body);

      var sql = 'SELECT t_entry.*, m_drug.name AS drug_name, m_drug.code_jan AS drug_code_jan, m_member.name AS member_name, m_member.address AS member_address, m_member.tel AS member_tel '
              + 'FROM ecodrug_local.t_entry '
              + 'INNER JOIN ecodrug_local.m_drug ON t_entry.drug_code_yj = m_drug.code_yj '
              + 'INNER JOIN ecodrug_local.m_member ON t_entry.member_id = m_member.id '
              + 'INNER JOIN ecodrug_local.t_deal ON t_entry.id = t_deal.entry_id '
              + 'WHERE  t_entry.is_dealt = 1 '
              + 'AND t_deal.buyer_member_id = ? ' // 修正必要 demo版なので仮でこのまま
              + 'ORDER BY t_entry.expiration_year, t_entry.expiration_month ';


      console.log(sql);
      console.log("sql created");
      
      var data = {
        login_member_id:req.body.login_member_id
        
      };
      
      console.log(data);
      console.log("data created");
      
      connection.query(
          sql,
          [
            data.login_member_id
          ],
          function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        console.log("sql done");
        res.send(results);
        
      });
      
      connection.release();
      
    });
});

// マイページ購入情報 修正
app.post('/EditDrug', function (req, res) {
  console.log('EditDrug_start');
  console.log(req.body);

  // Connecting to the database.
  pool.getConnection(function (err, connection) {
    // If some error occurs, we throw an error.
    if (err) throw err;
    console.log("connected");
    // Executing the MySQL query (select all data from the 'm_drug' table).
    console.log(req.body);

    var sql = 'UPDATE ecodrug_local.t_entry '
    + 'SET '
    + 'expiration_year = ?,'
    + 'expiration_month = ?,'
    + 'price = ?,'
    + 'ratio = ?,'
    + 'quantity = ?,'
    + 'postage = ?,'
    + 'note = ?,'
    + 'image_1 = ?,'
    + 'image_2 = ?,'
    + 'image_3 = ?,'
    + 'image_4 = ?,'
    + 'image_5 = ?,'
    + 'image_6 = ?,'
    + 'updated_at = now()'
    + 'WHERE id = ? '
    + ';'

    console.log(sql);
    console.log("sql created");
    
    var data = {
      expiration_year:req.body.expiration_year,
      expiration_month:req.body.expiration_month,
      price:req.body.price,
      ratio:req.body.ratio,
      quantity:req.body.quantity,
      postage:req.body.postage,
      note:req.body.note,
      image_1:req.body.image_1,
      image_2:req.body.image_2,
      image_3:req.body.image_3,
      image_4:req.body.image_4,
      image_5:req.body.image_5,
      image_6:req.body.image_6,
      filter_id:req.body.filter_id
      
    };
    
    console.log(data);
    console.log("data created");
    
    connection.query(
        sql,
        [
          data.expiration_year,
          data.expiration_month,
          data.price,
          data.ratio,
          data.quantity,
          data.postage,
          data.note,
          data.image_1,
          data.image_2,
          data.image_3,
          data.image_4,
          data.image_5,
          data.image_6,
          data.filter_id
        ],
        function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      console.log("sql done");
      res.send(results);
      
    });
    
    connection.release();
    
  });
});

// マイページ購入情報 取消
app.post('/drugDelete', function (req, res) {
  console.log('drugDelete_start');
  console.log(req.body);

  // Connecting to the database.
  pool.getConnection(function (err, connection) {
    // If some error occurs, we throw an error.
    if (err) throw err;
    console.log("connected");
    // Executing the MySQL query (select all data from the 'm_drug' table).
    console.log(req.body);

    var sql = 'UPDATE ecodrug_local.t_entry '
            + 'SET is_canceled = 1 '
            + 'WHERE id = ? '

    console.log(sql);
    console.log("sql created");
    
    var data = {
      filter_id:req.body.filter_id
      
    };
    
    console.log(data);
    console.log("data created");
    
    connection.query(
        sql,
        [
          data.filter_id
        ],
        function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      console.log("sql done");
      res.send(results);
      
    });
    
    connection.release();
    
  });
});

// Starting our server.
app.listen(3000, () => {
 console.log('Go to http://localhost:3000/ so you can see the data.');
});

