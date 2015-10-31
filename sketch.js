function setup() {
  noCanvas();
  var times = new NYTimes('obama', '20040101', '20101231', 3)
  times.articleSearch();
}

function draw() {
}
