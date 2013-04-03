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

        render: function () {
            var tmpl = _.template(this.template);

            this.$el.html(tmpl(this.model.toJSON()));

            return this;
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

        initialize: function () {
            this.collection = new Library(books);
            this.render();
        },

        render: function () {
            var that = this;
            _.each(this.collection.models, function (item) {
                that.renderBook(item);
            }, this);
        },

        renderBook: function (item) {
            var bookView = new BookView({
                model: item
            });
            this.$el.append(bookView.render().el);
        }
    });

    var libraryView = new LibraryView();

})(jQuery);
