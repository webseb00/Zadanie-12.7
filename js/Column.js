function Column(id, name) {
    var self = this;

    this.id = id;
    this.name = name || 'No given name';
    this.element = generateTemplate('column-template', {name: this.name, id: this.id});

    this.element.querySelector('.column-item').addEventListener('click', function(e) {
        if(e.target.classList.contains('btn-deleteCard')) {
            self.removeColumn();
        }

        if(e.target.classList.contains('btn-addCard')) {
            var cardName = prompt('Enter the name of the card');
            e.preventDefault();

            var data = new FormData();
            data.append('name', cardName);
            data.append('bootcamp_kanban_column_id', self.id);

            fetch(prefix + baseUrl + '/card', {
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
        }
        // Change column title
        if(e.target.classList.contains('column-title')) {
            self.renameColumn();
        }
    });
}

Column.prototype = {
    addCard: function(card) {
        this.element.querySelector('ul').appendChild(card.element);
    },
    removeColumn: function() {
        var self = this;
        fetch(prefix + baseUrl + '/column/' + self.id, {method: 'DELETE', headers: myHeaders})
            .then(function(resp) {
                return resp.json();
            })
            .then(function(resp) {
                self.element.parentNode.removeChild(self.element);
            });
    },
    renameColumn: function() {
        var self = this;
        var name = prompt('Please enter new name of the column','No name given');

        var data = new FormData();
        data.append('name', name);

        fetch(prefix + baseUrl + '/column/' + self.id, {method: 'PUT', headers: myHeaders, body: data})
            .then(function(resp) {
                return resp.json();
            })
            .then(function(resp) {
                self.element.querySelector('.column > .column-title').textContent = name;
                
            });
    }
}