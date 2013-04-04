(function ($) {
    var Book = Backbone.Model.extend({
        defaults: {
            coverImage: "img/image1.png",
            title: "Some title",
            author: "John Doe",
            releaseDate: "2012",
            keywords: "JavaScript Programming"
        }
    });

    var BookView = Backbone.View.extend({
        tagName: "div",
        className: "bookContainer",
        template: $("#bookTemplate").html(),
        events: {"click .delete": "deleteBook"},

        render: function () {
            var tmpl = _.template(this.template);

            this.$el.html(tmpl(this.model.toJSON()));

            return this;
        },

        deleteBook: function () {
            this.model.destroy();

            this.remove();
        }
    });

    var Library = Backbone.Collection.extend({
        model: Book
    });

    var books = [
        {title: "book1"},
        {title: "book2"},
        {title: "book3"},
        {title: "book4"},
        {title: "book5"}
    ];

    var LibraryView = Backbone.View.extend({
        el: $("#books"),

        events: {"click #add": "addBook"},

        initialize: function () {
            this.collection = new Library(books);
            this.render();

            this.collection.on("add", this.renderBook, this);
            this.collection.on("remove", this.removeBook, this);
        },

        render: function () {
            var self = this;
            _.each(this.collection.models, function (item) {
                self.renderBook(item);
            }, this);
        },

        renderBook: function (item) {
            var bookView = new BookView({
                model: item
            });
            this.$el.append(bookView.render().el);
        },

        removeBook: function (bookRemoved) {
            var removedBookData = bookRemoved.attributes;

            // first remove the attributes that have not changed from their defaults
            _.each(removedBookData, function(val, key){
                if (removedBookData[key] === bookRemoved.defaults[key]) {
                    delete removedBookData[key];
                }
            });

            _.each(books, function(book){
               if (_.isEqual(book, removedBookData)) {
                   books.splice(_.indexOf(books, book), 1);
               }
            });
        },

        addBook: function (e) {
            e.preventDefault();

            var formData = {};

            $("#addBook div").children("input").each(function (i, el) {
                var val = $(el).val();
                if (val !== "") {
                    formData[el.id] = val;
                }
            });

            books.push(formData);

            this.collection.add(new Book(formData));
        }
    });

    var libraryView = new LibraryView();

})(jQuery);
