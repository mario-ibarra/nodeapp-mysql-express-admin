import pool from '../db.js';

export const index = function(req, res){
    message = '';
   if(req.method == "POST"){
      let post  = req.body;
      let first_name= post.first_name;
      let last_name= post.last_name;
      let phone= post.phone;
      let email= post.email;
      let dob = post.dob
      let image= post.image;
 
	  if (!req.files)
				return res.status(400).send('No files were uploaded.');
 
		var file = req.files.uploaded_image;
		var img_name=file.name;
 
	  	 if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                 
              file.mv('public/img/avatars/'+file.name, function(err) {
                             
	              if (err)
 
	                return res.status(500).send(err);
      					var sql = "INSERT INTO `users`(`first_name`,`last_name`,`phone`,`email`, `dob` ,`image`) VALUES ('" + first_name + "','" + last_name + "','" + phone + "','" + email + "','" + dob + "','" + image + "')";
 
    						var query = pool.query(sql, function(err, result) {
    							 res.redirect('staff/viewuser/'+result.insertId);
    						});
					   });
          } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('staff/index',{message: message});
          }
   } else {
      res.render('/staff');
   }
 
};

export const profile = (req, res) => {
	let message = '';
	let id = req.params.id;
    let sql="SELECT * FROM `users` WHERE `id`='"+id+"'"; 
    pool.query(sql, (err, result) => {
	  if(result.length <= 0)
	  message = "Profile not found!";
	  
      res.render('/staff/viewuser',{data:result, message: message});
   });
};