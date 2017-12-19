
var friends = require("../data/friends");

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

	app.get("/api/friends", function(req, res) {
		res.json(friends);
	});

	// Create New reservation - takes in JSON input
	app.post("/api/friends", function(req, res) {
	  // req.body hosts is equal to the JSON post sent from the user
	  // This works because of our body-parser middleware
	  var new_friend = req.body;
	  var best_match_rate = 0;
	  var current_match_rate = 0;

	for(var i =0 ; i < new_friend.scores.length; i++){
	 	new_friend.scores[i] = parseInt(new_friend.scores[i]);
	}

	var best_friend = new_friend;

	for (var i =0; i < friends.length; i++){
		for(var a = 0; a < friends[i].scores[a]; a++){
			current_match_rate +=  Math.abs(new_friend.scores[a] - friends[i].scores[a]);
		}
		if (current_match_rate < best_match_rate){
			best_match_rate = current_match_rate;
			best_friend = friends[i];
		}
	}


	  friends.push(new_friend);


	  res.json(best_friend);
	});
};