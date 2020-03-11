wp.blocks.registerBlockType('brad/border-box', {
  title: 'Posts',
  icon: 'smiley',
  category: 'common',
  attributes: {
    content: {type: 'string'},
    color: {type: 'string'},
    count: {type: 'number'},
    rubric: {type: 'string'}
  },
  

  edit: function(props) {

    function updateCount(event) {
        props.setAttributes({count: event.target.value})
    }

    function showPosts(event) {
        event.preventDefault();
        count    = event.target.count.value;
        rubric   = event.target.rub.value;
        newPosts = posts;
        if (rubric) {
            newPosts = newPosts.filter(post => post.categories.includes(rubric));
        }

        postsIcons = '';
        if (count > 0) {
            postsIconsItems = [];

            newPosts.slice(0, count).forEach(element =>
                postsIconsItems.push(
                    React.createElement(
                        "a",
                        {
                            style: {
                                height: "190px",
                                width: "170px",
                                borderColor: "#ead7d7",
                                borderStyle: "solid",
                                display: "inline-block",
                                color: "white",
                                textAlign: "center",
                                padding: "14px",
                                textDecoration: "none"
                            }
                        },
                        React.createElement("img", {src: element.miniature}),
                        React.createElement("figcaption", {}, element.title),
                        React.createElement("figcaption", {}, element.date))
                )
            );
            postsIcons = React.createElement("div", {style: {overflow: "auto", whiteSpace: "nowrap"}}, postsIconsItems);
        }

        props.setAttributes({postsIcons: postsIcons});
    }

    rubrics = '';
    if (categories.length > 0) {
        rubrics = [];
        categories.forEach(element => {
            rubrics.push(
                React.createElement("label", null, element, React.createElement("input", {
                    name: "rub",
                    value: element,
                    type: "radio"
                }))
            )
        });
    }

    return React.createElement(
      "div",
      null,
      React.createElement(
        "h3",
        null,
        "Simple Box"
      ),
      React.createElement("form", {onSubmit: showPosts},
      React.createElement("input", { type: "number", name: "count", placeholder: "Количество постов", value: props.attributes.count, onChange: updateCount }),
      React.createElement("br"),
      rubrics,
      React.createElement("input", {type: "submit", value: 'Применить фильтр'})),
      props.attributes.postsIcons
    );
  },
  save: function(props) {
    return wp.element.createElement(
      "h3",
      { style: { border: "3px solid " + props.attributes.color } },
      props.attributes.content
    );
  }
})

