str = process.argv[2];
numbers = str.split(',');
framesResult = new Array();

frame = 0;
pin = 1;

// transform input into array of frames 
// each frame: [pin1,pin2]
numbers.forEach(function(s) {
	i = parseInt(s);

	if (pin == 1) {
		if (i == 10) {
			framesResult.push([i,0]);
			frame++;
		} else {
			framesResult.push([i]);
			pin++;
		}
	} else {
		framesResult[frame].push(i);
		frame++;
		pin = 1;
	}
});

totalScore = 0;

// loop from frame 1 to 10 (max frame)
for (i = 0; i < framesResult.length && i < 10; i++) {
	// check present frame has pin2
	if (framesResult[i].length == 2) {
		score = framesResult[i][0] + framesResult[i][1];
		totalScore += score;

		// check has next frame
		if (i + 1 < framesResult.length) {
			if (framesResult[i][0] == 10) {     // check present frame get a strike
				// check next frame has pin2
				if (framesResult[i+1].length == 1) {
    				totalScore += framesResult[i+1][0];
    			} else {
    				totalScore += framesResult[i+1][0] + framesResult[i+1][1];
    				// check next frame get a strike
    				if (framesResult[i+1][0] == 10 && i+2 < framesResult.length) {
    					// check next next frame has pin2
    					if (framesResult[i+2].length == 1)
		    				totalScore += framesResult[i+2][0];
		    			else
		    				totalScore += framesResult[i+2][0] + framesResult[i+2][1];
    				}
    			}
			} else if (score == 10) {            // check present frame get a spare
				totalScore += framesResult[i+1][0];
			}
		}
	} else {
		totalScore += framesResult[i][0];
	}
}
console.log(totalScore);
