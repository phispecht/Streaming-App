(function ($) {
    $(document).ready(function () {
        const left = $(".fa-chevron-left");
        const right = $(".fa-chevron-right");

        left.click(function () {
            moveRight();
        });

        right.click(function () {
            moveLeft();
        });

        function moveRight() {
            const movieContainer = $(".movieContainer");
            const slideWidth = movieContainer[0].offsetWidth;

            $(".movieContainer-subParent").animate(
                {
                    left: slideWidth,
                },
                400,
                function () {
                    $(".movieContainer:last-of-type").prependTo(
                        ".movieContainer-subParent"
                    );
                    $(".movieContainer:first-of-type").addClass(
                        "movieContainer-animate"
                    );

                    $(".movieContainer-subParent").css("left", "0px");
                }
            );
        }

        function moveLeft() {
            const movieContainer = $(".movieContainer");
            const slideWidth = movieContainer[0].offsetWidth;

            $(".movieContainer-subParent").animate(
                {
                    left: -slideWidth,
                },
                400,
                function () {
                    $(".movieContainer:first-of-type").appendTo(
                        ".movieContainer-subParent"
                    );
                    $(".movieContainer:last-of-type").addClass(
                        "movieContainer-animate"
                    );

                    $(".movieContainer-subParent").css("left", "0px");
                }
            );
        }
    });
})(jQuery);
