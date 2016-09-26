'use strict';
const model = require('./models/tasks');

module.exports = (app) => {
  app.get('/api/v1.0/users', (req, resp) => {
    model.users.find({})
        .then( (err, docs) => {
            if(err)
              return resp.send(err);
            resp.json(docs);
        });
    });

    app.get('/api/v1.0/tasks', (req, resp) => {
            model.tasks.find({})
                .then( (err, docs) => {
                    if(err)
                      return resp.send(err);
                    resp.json(docs);
      });
    });

    app.get('/api/v1.0/aggregate', (req, resp) => {
       model.users.aggregate(// Pipeline
	[
		{
			$lookup: {
			    "from" : "tasks",
			    "localField" : "_id",
			    "foreignField" : "key",
			    "as" : "task"
			}
		},
		{
			$project: {
			 _id: 0,
			 name: '$firstName',
			 Status: '$task.status'
			}
		},
		{
			$unwind: {
			 path: '$Status'
			}
		},
		{
			$match: {
				Status : "Close"
			}
		},
		{
			$group: {
			  name: '$name',
			  count: { $sum: 1 }
			}
		},
		{
			$sort: {
			  count: -1
			}
		},
	]
)
       .exec((err, result) => {
         if(err)
           return resp.send(err);
         resp.json(result);
       });
    });
  // ------- Загрузка изначальной страницы
  app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
}
