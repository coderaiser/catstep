(function() {
    'use strict';
    
    var Cat         = getByDataName('catstep'),
        Direction   = {
            left    : getByDataNameAll('catstep-left'),
            right   : getByDataNameAll('catstep-right'),
            up      : getByDataNameAll('catstep-up'),
            down    : getByDataNameAll('catstep-down'),
        },
        
        Move        = {
            right: getByDataName('catstep-move-right'),
            left: getByDataName('catstep-move-left')
        },
        
        forEach     = function(array, callback) {
            Array.prototype.forEach.call(array, callback);
        },
        
        KEY_LEFT    = 37,
        KEY_RIGHT   = 39,
        KEY_UP      = 38,
        KEY_DOWN    = 40;
    
    window.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
        case KEY_RIGHT:
            right();
            break;
        case KEY_LEFT:
            left();
            break;
        case KEY_UP:
            up();
            break;
        case KEY_DOWN:
            down();
            break;
        }
    });
    
    Move.right.addEventListener('click', right);
    Move.left.addEventListener('click', left);
    
    function left() {
        modify(Cat.style, -10);
        step('left');
    }
    
    function right() {
        modify(Cat.style, 10);
        step('right');
    }
    
    function up() {
        step('up');
    }
    
    function down() {
        step('down');
    }
    
    function modify(style, number) {
        var current = parseInt(style.left, 10) || 0;
        style.left = current + number + 'px';
    }
    
    function step(direction) {
        Object.keys(Direction).forEach(function(where) {
            var elements = Direction[where];
            
            if (where !== direction)
                hide(where);
            else
                switch (elements.length) {
                case 1:
                    elements[0].hidden = false;
                    break;
                case 2:
                    if (elements[0].hidden) {
                        elements[0].hidden = false;
                        elements[1].hidden = true;
                    } else {
                        elements[0].hidden = true;
                        elements[1].hidden = false;
                    }
                    break;
                }
        });
    }
    
    function hide(direction) {
        var steps = Direction[direction];
        
        forEach(steps, function(item) {
            if (!item.hidden)
                item.hidden = true;
        });
    }
    
    function getByDataName(selector) {
        var result = getByDataNameAll(selector)[0];
        
        return result;
    }
    
    function getByDataNameAll(selector) {
        var result = document
            .querySelectorAll('[data-name="' + selector + '"]');
        
        return result;
    }
    
})();
