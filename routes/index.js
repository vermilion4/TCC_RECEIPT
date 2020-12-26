let express = require('express');
let router = express.Router();
let conn = require('../database');

let student_id = '';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('studentReg', { title: 'TCC | Student Registration' });
});

router.get('/studentReg', function(req, res, next) {
  res.render('studentReg', { title: 'TCC | Student Registration' });
});

router.post('/studentReg', function(req, res, next) {
  // store all the user input data
  const studentDetails=req.body;

  // insert user data into users table
  let sql = 'INSERT INTO student SET ?';
  conn.query(sql, studentDetails,function (err, data) {
    if (err) throw err;
    console.log("Student data is inserted successfully ");
  });
  res.redirect('/studentReg');
});

router.get('/courseReg', function(req, res, next) {

  conn.query('SELECT * FROM course', (err, rows, fields) => {
    if (!err)
      res.render('courseReg', { title: 'TCC | Course Registration', rows:rows });
    else
      console.log(err);
  })
});

router.post('/courseReg', function(req, res, next) {

  let id = req.body.student_id

  conn.query(`SELECT * FROM student WHERE student_id = ?`,[id], (err, studrows, fields) => {

    if(!err) {
      conn.query('SELECT * FROM course', (err, course, fields) =>
      {
        if (!err) {
          student_id = id;
          res.render('courseReg', {title: 'TCC | Course Registration', result: studrows, rows: course});
        }
        else{
          console.log('shhhh')
        }
      })
    }
    else
      console.log(err + 'Student does not exist');
  })
});

router.get('/setup', function(req, res, next) {
  res.render('setup', { title: 'TCC | Course Setup' });
});

router.post('/setup', function(req, res, next) {
  // store all the user input data
  const courseDetails=req.body;

  // insert user data into users table
  let sql = 'INSERT INTO course SET ?';
  conn.query(sql, courseDetails,function (err, data) {
    if (err) throw err;
    console.log("Course data is inserted successfully ");
  });
  res.redirect('/setup');
});


router.post('/courseReg2', function (req,res,next) {
  const Details = req.body;
  //deleteStudentCourseRegistration(student_id)
  Details.check.forEach(function (detail) {
    SavecourseDetails(detail);

    //
    //
    // var array = courseDetails(detail);
    // console.log('this is from array');
    // console.log(array);
    // return
    //
    //
    // var harshResult = {};
    //
    // for (var key in array){
    //   // console.log(array[key].course_id);
    //   // console.log(array[key].course_name);
    //   // console.log(array[key].course_price);
    //
    //   // make the insert here for each selected course
    //
    //   if (insertStudentCourseRegistration(student_id, array[key].course_id, array[key].course_name, array[key].course_price)) {
    //     console.log('success ' + courseDetails.course_id)
    //   } else {
    //     console.log('Failure ' + courseDetails.course_id)
    //   }
    //
    // }

  });
});



let SavecourseDetails = function (courseid) {
  let sql = 'SELECT * FROM course WHERE course_id = '+courseid;
  conn.query(sql,function (err,data, fields) {
    if(err) console.log(err)
    else{
      //done(null,data)
      // return data;

      var array = data;
      var harshResult = {};

      for (var key in array){
        // console.log(array[key].course_id);
        // console.log(array[key].course_name);
        // console.log(array[key].course_price);

        if (insertStudentCourseRegistration(student_id, array[key].course_id, array[key].course_name, array[key].course_price)) {
          console.log('success ' + courseDetails.course_id)
        } else {
          console.log('Failure ' + courseDetails.course_id)
        }
      }

    }
  })
};








let deleteStudentCourseRegistration = function (student_id) {
  let sql = 'DELETE FROM coursecollection WHERE student_id = '+student_id;
  conn.query(sql,function(err,data){
    if(err) console.log(err)
        })

}

let insertStudentCourseRegistration = function (student_id, course_id, course_name, course_price) {
  let sql = "INSERT INTO tcc.coursecollection (student_id,course_id,course_name,course_price) VALUES ( " + student_id + "," + course_id + ",'" + course_name + "', '" + course_price + "')";

  console.log(sql)

 // return

   conn.query(sql,function(err,data){
    if(err) console.log(err)
  })

}

let courseDetails = function (courseid) {
  let sql = 'SELECT * FROM course WHERE course_id = '+courseid;
  conn.query(sql,function (err,data, fields) {
    if(err) console.log(err)
    else{
       //done(null,data)
     return data;
      // console.log(data);

      // var array = data;
      // var harshResult = {};
      //
      // for (var key in array){
      //   // console.log(array[key].course_id);
      //   // console.log(array[key].course_name);
      //   // console.log(array[key].course_price);
      //
      //   if (insertStudentCourseRegistration(student_id, array[key].course_id, array[key].course_name, array[key].course_price)) {
      //     console.log('success ' + courseDetails.course_id)
      //   } else {
      //     console.log('Failure ' + courseDetails.course_id)
      //   }
      // }

      //return

    }
  })
};


module.exports = router;
