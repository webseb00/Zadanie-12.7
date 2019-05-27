function Card(id, name) {
    var self = this;

    this.id = id;
    this.name = name || 'No name given';
    this.element = generateTemplate('card-template', {description: this.name}, 'li');

    this.element.querySelector('.card').addEventListener('click', function(e) {
    	e.stopPropagation();

    	if (e.target.classList.contains('btn-delete')) {
      		self.removeCard();
        }
        // Change card content
        // if(e.target.classList.contains('btn-rename')) {
        //     var rename = prompt('', self.name);
            

        //     var data = new FormData();
        //     data.append('id', self.id);
        //     data.append('name', rename);

        //     fetch(prefix + baseUrl + '/card/' + self.id, {method: 'PUT', headers: myHeaders, body: data})
        //         .then(function(resp) {
        //             return resp.json();
        //         })
        //         .then(function(resp) {
                    
        //             self.element.querySelector('.card-description').textContent = rename;
                    
        //         })
        // }
      });
      
}

Card.prototype = {
    removeCard: function() {
        var self = this;
        fetch(prefix + baseUrl + '/card/' + self.id, { method: 'DELETE', headers: myHeaders })
            .then(function(resp) {
                return resp.json();
            })
            .then(function(resp) {
                self.element.parentNode.removeChild(self.element);
            })
    }
}