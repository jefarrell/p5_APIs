

var NYTimes = function(searchTerm, startDate, endDate, iterations) {
  this.term = searchTerm;
  this.start = startDate;
  this.end = endDate;
  this.iterate = iterations
  this.key = 'Your:API:key';
  this.baseURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=';
  this.dataContainer = [];

  this.articleSearch = function() {
    for (var i = 0; i < this.iterate; i++) {
      var newURL = this.baseURL + this.term + '&begin_date=' + this.start + '&end_date=' + this.end + '&page=' + i + '&api-key=' + this.key;
      var self = this;
      loadJSON(newURL, function(data) {
        temp = data.response.docs;
        for (var j = 0; j < temp.length; j++) {
          self.dataContainer.push(temp[j]);
          if (self.dataContainer.length === self.iterate*10) {
            print(self.dataContainer);
          }
        }
      });
    }

  };
};

