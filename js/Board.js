var board = {
    name: 'Tablica Kanban',
    addColumn: function(column) {
        this.element.appendChild(column.element);
        initSortable(column.id);
    },
    element: document.querySelector('#board .column-container')
}

document.querySelector('#board .column-container').addEventListener('click', function() {
    var name = prompt('Enter a name of the column');
    var data = new FormData();

    data.append('name', name);

    fetch(baseUrl + '/column', { method: 'POST', headers: myHeaders, body: data})
    .then(function(res) {
        return res.json();
    })
    .then(function(resp) {
        var column = new Column(resp.id, name);
        board.addColumn(column);
    });
    
});

function initSortable(id) {
    var el = document.getElementById(id);
    var sortable = Sortable.create(el, {
      group: 'kanban',
      sort: true
    });
}