(function() {
  $.getJSON( '/igMediaCounts')
    .done(function( data ) {
      var yCounts = data.users.map(function(item){
        return item.counts.follows;
      });
      
      yCounts.unshift('Followers');

      var chart = c3.generate({
        //bindto: '#chart',
        data: {
          columns: [
            yCounts 
          ],
          type: "bar"
        }
      });
    });
})();
