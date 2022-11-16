setTimeout(() => {

// const random_hex = () => {
//     const hexex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
//     let r1 = hexex[random_min_max_int(0, 15)],
//         g1 = hexex[random_min_max_int(0, 15)],
//         b1 = hexex[random_min_max_int(0, 15)],
//         r2 = hexex[random_min_max_int(0, 15)],
//         g2 = hexex[random_min_max_int(0, 15)],
//         b2 = hexex[random_min_max_int(0, 15)];
    
//     let hex = `#${r1}${g1}${b1}${r2}${g2}${b2}`;
//     return hex;
// }

class color_picker {
    constructor(
        count,
        items
    ) {
        this.count = count;    
        this.items = items;        
    }
    spawn() {
        if ($('.colors_container')) $('.colors_container').remove();    //removes the colors container if it exists
        let colors_container = document.createElement('div');   //creates a colors container to hold each random color
        colors_container.classList.add('colors_container');     //gives the colors container a class
        $('.container').appendChild(colors_container);          //appends the colors container
        this.items = [];    //resets the items

        for (let picker_i = 0; picker_i < this.count; picker_i++) {
            this.items.push({
                'name': 'individual item',
                'locked': false,
                'color_i': picker_i,
                'color': random_hex(),
                'wrapper_selector': '',
                'lock_btn': '',
                'color_label': ''
            });
            

            //_-==-_| colored div |_-==-_\\
            let colored_div = document.createElement('div');        //creates the colored div
            colored_div.classList.add('colored_div');               //gives the div a class
            let generated_color =  random_hex();                    //generates a color
            colored_div.style.backgroundColor = this.items[picker_i].color; //sets the bg color to random
            colors_container.appendChild(colored_div);              //appends the div
            this.items[picker_i].wrapper_selector = colored_div;    //selector inside the object

            //==| color label |==\\
            let color_label = document.createElement('p');
            color_label.innerHTML = `${this.items[picker_i].color}`;
            color_label.classList.add('color_label');
            colored_div.appendChild(color_label);
            this.items[picker_i].color_label = color_label;
            
            //==| copy |==\\
            let copy_btn = document.createElement('div');           //creates the copy btn wrapper
            copy_btn.classList.add('copy_btn_wrapper');             //adds a class to the wrapper
            copy_btn.innerHTML = '<i class="fa-solid fa-copy"></i>';//sets the innerhtml
            colored_div.appendChild(copy_btn);                      //appends the wrapper to the div
            copy_btn.addEventListener('click', (e) => {    
                navigator.clipboard.writeText(this.items[picker_i].color).catch((err) => { //if it fails
                    log('could not copy');
                    log(err);
                });  
                
                console.log(
                    document.querySelectorAll('.copy_label').forEach(item => {
                        setTimeout(() => {
                            item.remove();
                        }, 1000);
                    })
                );
                let tmp_copy_label = document.createElement('p');
                tmp_copy_label.innerHTML = `copied ${this.items[picker_i].color}`;
                tmp_copy_label.classList.add('copy_label');
                document.body.appendChild(tmp_copy_label);
                
            });

            //==| lock |==\\
            let lock_btn = document.createElement('div');           //creates the lock btn wrapper
            lock_btn.classList.add('lock_btn_wrapper');             //adds a class to the wrapper
            lock_btn.innerHTML = '<i class="fa-solid fa-lock-open"></i>';//sets the innerhtml
            colored_div.appendChild(lock_btn);                      //appends the wrapper to the div
            this.items[picker_i].lock_btn = lock_btn;               //lock button selector in the object

            if (typeof log == 'function') log(this.items[picker_i]); 
        }

        this.items.forEach(item => {
            item.lock_btn.addEventListener('click', (e) => {
                if (item.locked) {
                    item.locked = false;
                    item.lock_btn.innerHTML = '<i class="fa-solid fa-lock-open"></i>';
                }
                else if (!item.locked) {
                    item.locked = true;  
                    item.lock_btn.innerHTML = '<i class="fa-solid fa-lock"></i>';
                }  
            });
        });

        window.addEventListener('keypress', (e) => {
            if (e.key == ' ') { //runs only on Spacebar press
                e.preventDefault();
                this.items.forEach(item => {
                    if (!item.locked) { //randomized the colors on unlocked items
                        item.color = random_hex();                                  //sets the item color data
                        item.wrapper_selector.style.backgroundColor = item.color;   //sets the bg color
                        item.color_label.innerHTML = item.color;                    //sets the label
                    }
                });
            }
        });
    }
}

const picker = new color_picker(5);
picker.spawn();






}, 0);
