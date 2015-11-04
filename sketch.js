function setup() {
  noCanvas();
  var times = new NYTimes('obama', '20040101', '20101231', 3)
  times.articleSearch();
}

function draw() {}




// constructor approach //
var NYTimes = function(searchTerm, startDate, endDate, iterations) {
  this.term = searchTerm;
  this.start = startDate;
  this.end = endDate;
  this.iterate = iterations
  this.key = 'your:key';
  this.baseURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=';

  this.articleSearch = function() {
    var dataContainer = [];
    for (var i = 0; i < this.iterate; i++) {
      var newURL = this.baseURL + this.term + '&begin_date=' + this.start + '&end_date=' + this.end + '&page=' + i + '&api-key=' + this.key;
      var self = this;
      loadJSON(newURL, function(data) {
        temp = data.response.docs;
        for (var j = 0; j < temp.length; j++) {
          dataContainer.push(temp[j]);
          if (dataContainer.length === self.iterate * 10) {
            self.seeSnippet(dataContainer); /// <<< ///
          }
        }
      });
    }
  }

  this.seeSnippet = function(container) {
    var snippet;
    for (var s = 0; s < container.length; s++) {
      text = container[s].snippet;
      snippet = createP(text);
    }
  }

  this.getImages = function(container) {
    for (var g = 0; g < container.length; g++) {
      var imgArray = container[g].multimedia;
      try {
        var img = imgArray[1].url;
      } catch (e) {}
      var makeImg = createImg("http://nytimes.com/" + img);
    }
  }

};




/* // prototype approach //
function NYTimes(searchTerm,startDate,endDate,iterations){
  NYTimes.prototype.term = searchTerm;
  NYTimes.prototype.start = startDate;
  NYTimes.prototype.end = endDate;
  NYTimes.prototype.iterate = iterations
  NYTimes.prototype.key = 'e4e2ea8430460c25bbda724d9f623442:18:65073439';
  NYTimes.prototype.baseURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=';
}

 
NYTimes.prototype.articleSearch = function() {
    var dataContainer = [];
    for (var i = 0; i < this.iterate; i++) {
      var newURL = this.baseURL + this.term + '&begin_date=' + this.start + '&end_date=' + this.end + '&page=' + i + '&api-key=' + this.key;
      var self = this;
      loadJSON(newURL, function(data) {
        temp = data.response.docs;
        for (var j = 0; j < temp.length; j++) {
          dataContainer.push(temp[j]);
           if (dataContainer.length === self.iterate * 10) {
             self.seeSnippet(dataContainer);
           }
        }
      });
    }
};

NYTimes.prototype.seeSnippet = function(container){
 print(container);
}
*/