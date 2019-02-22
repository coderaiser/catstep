(function() {
    'use strict';
    
    const Cat = getByDataName('catstep');
    
    const Direction = {
        left    : getByDataNameAll('catstep-left'),
        right   : getByDataNameAll('catstep-right'),
        up      : getByDataNameAll('catstep-up'),
        down    : getByDataNameAll('catstep-down'),
    };
    
    const MoveEl = {
        left    : getByDataName('catstep-move-left'),
        right   : getByDataName('catstep-move-right'),
        up      : getByDataName('catstep-move-up'),
        down    : getByDataName('catstep-move-down'),
    };
    
    const Move = {
        left() {
            modify(Cat.style, -10);
            step('left');
        },
        
        right() {
            modify(Cat.style, 10);
            step('right');
        },
        
        up() {
            step('up');
        },
        
        down() {
            step('down');
        },
    };
    
    const forEach = (array, callback) => {
        Array.prototype.forEach.call(array, callback);
    };
    
    const KEY_LEFT = 37;
    const KEY_RIGHT = 39;
    const KEY_UP = 38;
    const KEY_DOWN = 40;
    
    window.addEventListener('keydown', (event) => {
        switch (event.keyCode) {
        case KEY_RIGHT:
            Move.right();
            break;
        case KEY_LEFT:
            Move.left();
            break;
        case KEY_UP:
            Move.up();
            break;
        case KEY_DOWN:
            Move.down();
            break;
        }
    });
    
    Object.keys(MoveEl).forEach((name) => {
        MoveEl[name].addEventListener('click', Move[name]);
    });
    
    function modify(style, number) {
        const current = parseInt(style.left, 10) || 0;
        style.left = current + number + 'px';
    }
    
    function step(direction) {
        Object.keys(Direction).forEach((where) => {
            const elements = Direction[where];
            
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
        const steps = Direction[direction];
        
        [...steps].forEach((item) => {
            if (!item.hidden)
                item.hidden = true;
        });
    }
    
    function getByDataName(selector) {
        const [result] = getByDataNameAll(selector);
        
        return result;
    }
    
    function getByDataNameAll(selector) {
        const result = document
            .querySelectorAll('[data-name="' + selector + '"]');
        
        return result;
    }
})();

