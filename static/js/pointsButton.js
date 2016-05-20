$(document).ready(function(){
	var empty = "";
	$('#pointsButton').on('click', function () {
		var input_scores = {}
		var inputs = ["a1h", "a1a", "a2h", "a2a", "a3h", "a3a", "a4h", "a4a", "a5h", "a5a", "a6h", "a6a", "b1h", "b1a", "b2h", "b2a", "b3h", "b3a", "b4h", "b4a", "b5h", "b5a", "b6h", "b6a", "c1h", "c1a", "c2h", "c2a", "c3h", "c3a", "c4h", "c4a", "c5h", "c5a", "c6h", "c6a", "d1h", "d1a", "d2h", "d2a", "d3h", "d3a", "d4h", "d4a", "d5h", "d5a", "d6h", "d6a"]
		complete = true;
		var groupA = {USA: 0, Colombia: 0, 'Costa Rica': 0, Paraguay: 0}
		var groupB = {Brazil: 0, Ecuador: 0, Haiti: 0, Peru: 0}
		var groupC = {Mexico: 0, Uruguay: 0, Jamaica: 0, Venezuela: 0}
		var groupD = {Argentina: 0, Chile: 0, Panama: 0, Bolivia: 0}
		var groups = {a: groupA, b: groupB, c: groupC, d: groupD}
		var team_games = {}
		var standings = {a: {}, b: {}, c: {}, d: {}}
		var goals_per_team = {USA: {goals_for: 0, goals_against: 0}, Colombia: {goals_for: 0, goals_against: 0}, 'Costa Rica': {goals_for: 0, goals_against: 0}, Paraguay: {goals_for: 0, goals_against: 0}, 
			Brazil: {goals_for: 0, goals_against: 0}, Ecuador: {goals_for: 0, goals_against: 0}, Haiti: {goals_for: 0, goals_against: 0}, Peru: {goals_for: 0, goals_against: 0}, 
			Mexico: {goals_for: 0, goals_against: 0}, Uruguay: {goals_for: 0, goals_against: 0}, Jamaica: {goals_for: 0, goals_against: 0}, Venezuela: {goals_for: 0, goals_against: 0}, 
			Argentina: {goals_for: 0, goals_against: 0}, Chile: {goals_for: 0, goals_against: 0}, Panama: {goals_for: 0, goals_against: 0}, Bolivia: {goals_for: 0, goals_against: 0}}
		var $btn = $(this).button('loading');
		for (var i = 0; i < inputs.length; ++i) {
			current = 'input[name="' + inputs[i] + '"]';
			current_value = $(current).val();
			input_scores[inputs[i]] = parseInt(current_value)
			if (current_value == empty || current_value > 9 || current_value < 0) {
				string_array = inputs[i].split("");
				game = string_array[0] + string_array[1]
				game = game.toUpperCase()
				if (string_array[2]=="h"){
					home_or_away = "home"
				} else {
					home_or_away = "away"
				}
				complete = false;
				break;
			}
		}
		if (complete) {
			for (var i = 0; i < inputs.length; ++i) {
				group = inputs[i][0];
				home = inputs[i];
				away = inputs[i+1];
				home_team = $('label[for="' + home + '"]').text();
				if (team_games[home_team] == undefined) {
					team_games[home_team] = {}
				}
				away_team = $('label[for="' + away + '"]').text();
				team_games[home_team][away_team] = inputs[i]
				home_score = input_scores[inputs[i]];
				away_score = input_scores[inputs[i+1]];
				goals_per_team[home_team].goals_for += home_score;
				goals_per_team[away_team].goals_for += away_score;
				goals_per_team[home_team].goals_against += away_score;
				goals_per_team[away_team].goals_against += home_score;
				if (home_score > away_score) {
					groups[group][home_team] += 3;
				} else if (home_score < away_score) {
					groups[group][away_team] += 3;
				} else {

					groups[group][home_team] += 1;
					groups[group][away_team] += 1;
				}
				++i;
			}
			group_letters = ["a","b","c","d"];
			for (var i = 0; i < group_letters.length; ++i) {
				curr = group_letters[i];
				teamsSorted = Object.keys(groups[curr]).sort(function(a,b){return groups[curr][a]-groups[curr][b]})
				if (groups[curr][teamsSorted[3]] > groups[curr][teamsSorted[2]]){
					standings[curr].first_place = teamsSorted[3]
					if (groups[curr][teamsSorted[2]] > groups[curr][teamsSorted[1]]) {
						standings[curr].second_place = teamsSorted[2];
					} else if (groups[curr][teamsSorted[2]] == groups[curr][teamsSorted[0]]) {
						second_place = three_way_tie(goals_per_team, teamsSorted[2], teamsSorted[1], teamsSorted[0]);
						standings[curr].second_place = second_place;
					} else if (groups[curr][teamsSorted[2]] == groups[curr][teamsSorted[1]]) {
						second_place = two_way_tie(team_games, goals_per_team, input_scores, teamsSorted[2], teamsSorted[1]);
						standings[curr].second_place = second_place;
					}
				} else if (groups[curr][teamsSorted[3]] == groups[curr][teamsSorted[1]]) {
					first_place = three_way_tie(goals_per_team, teamsSorted[3], teamsSorted[2], teamsSorted[1]);
					standings[curr].first_place = first_place;
					if (first_place == teamsSorted[3]) {
						second_place = two_way_tie(team_games, goals_per_team, input_scores, teamsSorted[2], teamsSorted[1]);
					} else if (first_place == teamsSorted[2]) {
						second_place = two_way_tie(team_games, goals_per_team, input_scores, teamsSorted[3], teamsSorted[1]);
					} else {
						second_place = two_way_tie(team_games, goals_per_team, input_scores, teamsSorted[3], teamsSorted[2]);;
					}
					standings[curr].second_place = second_place;
				} else if (groups[curr][teamsSorted[3]] == groups[curr][teamsSorted[2]]) {
					first_place = two_way_tie(team_games, goals_per_team, input_scores, teamsSorted[3], teamsSorted[2]);
					standings[curr].first_place = first_place;
					if (first_place == teamsSorted[3]) {
						standings[curr].second_place = teamsSorted[2];
					} else {
						standings[curr].second_place = teamsSorted[3];
					}
				}
			}
			for (var i = 0; i < group_letters.length; ++i) {
				curr = group_letters[i];
				first = standings[curr].first_place;
				second = standings[curr].second_place;
				$('#' + curr + '1').find('option').remove().end()
				$('#' + curr + '2').find('option').remove().end()
				$('#' + curr + '1').append($("<option></option>").attr("value",first).text(first));
				$('#' + curr + '2').append($("<option></option>").attr("value",second).text(second));
			}
			$('#bracketCollapse').collapse("show")
			updateSemiFinalists();
		} else {
			// "Game " + game + " " + home_or_away + " is not filled in yet"
			$('#bracketCollapse').collapse("hide")
			$('#modalHead').html('<i class="glyphicon glyphicon-thumbs-down"></i>  Not all the scores have been entered!')
			$('#modalParagraph').html("<b>Game " + game + " " + home_or_away + " is not filled in yet or is not between 0 and 9!<b>")
			$('#notFinishedModal').modal('show');
		}
		$btn.button('reset');
	})
});

function updateSemiFinalists() {
    $('.semi_select')
        .find('option')
        .remove()
        .end()
        .append('<option disabled selected value style="display: none">Choose a Team</option>')
    ;
    var a1 = $("#a1").children("option").filter(":selected").text();
    var a2 = $("#a2").children("option").filter(":selected").text();
    var b1 = $("#b1").children("option").filter(":selected").text();
    var b2 = $("#b2").children("option").filter(":selected").text();
    var c1 = $("#c1").children("option").filter(":selected").text();
    var c2 = $("#c2").children("option").filter(":selected").text();
    var d1 = $("#d1").children("option").filter(":selected").text();
    var d2 = $("#d2").children("option").filter(":selected").text();
    $('#s1').append($("<option></option>").attr("value",a1).text(a1));
    $('#s1').append($("<option></option>").attr("value",b2).text(b2));
    $('#s2').append($("<option></option>").attr("value",d1).text(d1));
    $('#s2').append($("<option></option>").attr("value",c2).text(c2));
    $('#s3').append($("<option></option>").attr("value",b1).text(b1));
    $('#s3').append($("<option></option>").attr("value",a2).text(a2));
    $('#s4').append($("<option></option>").attr("value",c1).text(c1));
    $('#s4').append($("<option></option>").attr("value",d2).text(d2));
}

function three_way_tie(goals_per_team, team1, team2, team3) {
	team1_goal_for = goals_per_team[team1].goals_for;
	team2_goal_for = goals_per_team[team2].goals_for;
	team3_goal_for = goals_per_team[team3].goals_for;
	team1_goal_diff = team1_goal_for - goals_per_team[team1].goals_against;
	team2_goal_diff = team2_goal_for - goals_per_team[team2].goals_against;
	team3_goal_diff = team3_goal_for - goals_per_team[team3].goals_against;
	if (team1_goal_diff > team3_goal_diff && team1_goal_diff > team2_goal_diff) {
		return team1;
	} else if (team2_goal_diff > team1_goal_diff && team2_goal_diff > team3_goal_diff) {
		return team2; 
	} else if (team3_goal_diff > team1_goal_diff && team3_goal_diff > team2_goal_diff) {
		return team3; 
	}
	if (team1_goal_for > team3_goal_for && team1_goal_for > team2_goal_for) {
		return team1;
	} else if (team2_goal_for > team1_goal_for && team2_goal_for > team3_goal_for) {
		return team2; 
	} else if (team3_goal_for > team1_goal_for && team3_goal_for > team2_goal_for) {
		return team3; 
	}
	return team1;
}

function two_way_tie(team_games, goals_per_team, input_scores, team1, team2) {
	if (team_games[team1][team2] != undefined){
		game_code_home = team_games[team1][team2];
		team1_score = input_scores[game_code_home];
		game_code_away = game_code_home.slice(0,2) + "a";
		team2_score = input_scores[game_code_away];
	} else {
		game_code_home = team_games[team2][team1];
		team2_score = input_scores[game_code_home];
		game_code_away = game_code_home.slice(0,2) + "a";
		team1_score = input_scores[game_code_away];
	}
	if (team2_score > team1_score) {
		return team2;
	} else if (team1_score > team2_score) {
		return team1;
	}
	team1_goal_diff = goals_per_team[team1].goals_for - goals_per_team[team1].goals_against;
	team2_goal_diff = goals_per_team[team2].goals_for - goals_per_team[team2].goals_against;
	if (team2_goal_diff > team1_goal_diff) {
		return team2;
	} else if (team1_goal_diff > team2_goal_diff) {
		return team1;
	}
	if (goals_per_team[team2].goals_for > goals_per_team[team1].goals_for) {
		return team2;
	} else if (goals_per_team[team1].goals_for > goals_per_team[team2].goals_for) {
		return team1;
	}
	// this point just guess
	return team1;
}




