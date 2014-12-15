(function() {
    'use strict';
    
    var Cat         = getByDataName('catstep'),
        Direction   = {
            right: getByDataNameAll('catstep-right'),
            left: getByDataNameAll('catstep-left')
        },
        
        Move        = {
            right: getByDataName('catstep-move-right'),
            left: getByDataName('catstep-move-left')
        },
        
        forEach     = function(array, callback) {
            Array.prototype.forEach.call(array, callback);
        },
        
        KEY_RIGHT   = 39,
        KEY_LEFT    = 37;
    
    window.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
        case KEY_RIGHT:
            right();
            break;
        case KEY_LEFT:
            left();
            break;
        }
    });
    
    Move.right.addEventListener('click', right);
    Move.left.addEventListener('click', left);
    
    function right() {
        modify(Cat.style, 10);
        step('right');
        hide('left');
    }
    
    function left() {
        modify(Cat.style, -10);
        step('left');
        hide('right');
    }
    
    function modify(style, number) {
        var current = parseInt(style.left, 10) || 0;
        style.left = current + number + 'px';
    }
    
    function step(direction) {
        var step1   = Direction[direction][0],
            step2   = Direction[direction][1];
        
        if (!step1.hidden) {
            step1.hidden = true;
            step2.hidden = false;
        } else {
            step1.hidden = false;
            step2.hidden = true;
        }
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
