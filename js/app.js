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

    var book = new Book({
        title: "My Book",
        author: "Harry Patel"
    });

    var bookView = new BookView({model: book});

    $("#books").html(bookView.render().el);

})(jQuery);
