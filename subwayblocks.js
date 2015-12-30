/* ******************************
	**** ABOUT THIS PROJECT ****
	I wanted to know how many different ways I could walk from
	the subway to my apartment. My apartment is 4 blocks north
	and 4 blocks east of the subway station. I realized it was
	quite a few, and that solving it would be recursive. So I
	wrote this to calculate the number for me.

	Then, I tried to figure out the equation by analysing a range
	of inputs. It turns out that, too, is recursive. For an grid
	with dimentions n by m:
		f(n, m) = f(n, m-1) + f(n-1, m)
		f(n, m) = f(m, n)	// this makes sense if you think about it
								pictorially - just rotate your page by
								90 degrees - the solution stays the same
		f(n, 2) = f(2, n) = n
*/
'use strict'

function calcPaths() {
  var up = $('#numUp').val();
  var over = $('#numOver').val();
  if (!(validateInpt(up) && validateInpt(over))) {
		// it would be better if I alerted which input was causing the error...I'll do that later
		return;
	}
  if (inputIsLowEnough(up, over)) {
    let str = "Inputs are too large for your browswer! Try again with a smaller grid size."
    try {
      var totals = move(1, 1, over, up, 0);
      str = "There are " + totals + " different paths through a " + up + " by " + over + " grid.";
    } catch(err) {
      console.log(err);
    }
    $('#solnText').html(str);
  }
}


/* ******************************
	input validation
	****************************** */
function validateInpt(inpt) {
  var ret = false;
  if (inpt != '') {	// make sure they entered something
    if ($.isNumeric(inpt)) // must be a number
    {
      if (Math.floor(inpt) == inpt) {	// must be (equal to) an integer
        if (inpt >= 0) // must be a positive number
        {
          ret = true;
        } else {
          alert("Input is less than zero. Please use only positive numbers");
        }
      } // end integer checked
      else {
        alert("Input must be a whole number");
      }
    } // end number check
    else {
      alert("Please enter a number");
    }
  } // end check for anything entered
  return ret;
}
// make sure the inputs aren't too big
// else the client may hang for a while
// and we don't want a bad user experience
function inputIsLowEnough(x, y) {
  return true;
  if (Math.pow(x * y, 2) < 30000)
    return true;
  else {
    var str = "This uses a brute-force recursive algorithm. As such, it does not perform well with high numbers. To prevent your page from hanging a maximum limit has been imposed, and " + x + " and " + y + " have exceeded that limit. Enter lower numbers and try again.";
    $('#solnText').html(str);
    alert("Inputs are too high");
    // it would be nice to explain what the input limit is...
    return false;
  }
}


/* ******************************
	worker function
	****************************** */
function move(x, y, maxX, maxY, memory) {
  if ((x == maxX) && (y == maxY)) {	// found a path to the end
    return 1;
  } else {	// still not at destination
		memory = memory || [];
		let count = 0;
    if (x < maxX) {	// move "over"
			if(!memory[x+1, y])
				memory[x+1, y] = move(x+1, y, maxX, maxY, memory);
      count += memory[x+1, y];
    }
    if (y < maxY) {	// move "up"
			memory[x] = memory[x] || [];
      memory[x, y+1] = memory[x, y+1] || [];
      if(!memory[x, y+1].length)
				memory[x, y+1] = move(x, y+1, maxX, maxY, memory);
      count += memory[x, y+1]
    }
		return count;
  }
}
