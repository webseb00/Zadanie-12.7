function Column(id, name) {
    var self = this;



    this.id = id;
    this.name = name || 'No given name';
    this.element = generateElement('column-template', {name: this.name, id: this.id});

    this.element.querySelector('.column').addEventListener(function(e) {
        if(e.target.classList.contains('btn-delete')) {
            self.removeColumn();
        }

        if(e.target.classList.contains('add-card')) {
            self.addCard(new Card(prompt('Add the name of the card')));
            var cardName = prompt('Enter the name of the card');
            e.preventDefault();

            var data = new FormData();
            data.append('name', cardName);
            data.append('bootcamp_kanban_column_id', self.id);

            fetch(baseUrl + '/card', {
                method: 'POST',
                headers: myHeaders,
                body: data,
            })
            .then(function(res) {
                return res.json();
            })
            .then(function(resp) {
                var card = new Card(resp.id, cardName);
                self.addCard(card);
            });

            self.addCard(new Card(cardName));
        }
    });
}

Column.prototype = {
    addCard: function(card) {
        this.element.querySelector('ul').appendChild(card.element);
    },
    removeColumn: function() {
        var self = this;
        fetch(baseUrl + '/column/' + self.id, {method: DELETE, headers: myHeaders})
            .then(function(resp) {
                return resp.json();
            })
            .then(function(resp) {
                self.element.parentNode.removeChild(self.element);
            });
    }
}