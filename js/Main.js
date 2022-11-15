setTimeout(() => {

const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const random_hex = () => {
    const hexex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    let r1 = hexex[randomIntFromInterval(0, 15)],
        g1 = hexex[randomIntFromInterval(0, 15)],
        b1 = hexex[randomIntFromInterval(0, 15)],
        r2 = hexex[randomIntFromInterval(0, 15)],
        g2 = hexex[randomIntFromInterval(0, 15)],
        b2 = hexex[randomIntFromInterval(0, 15)];
    
    let hex = `#${r1}${g1}${b1}${r2}${g2}${b2}`;
    return hex;
}

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
            
            

            //_-==-_| colored div |_-==-_\\
            let colored_div = document.createElement('div');        //creates the colored div
            colored_div.classList.add('colored_div');               //gives the div a class
            let generated_color =  random_hex();                    //generates a color
            colored_div.style.backgroundColor = generated_color;    //sets the bg color to random
            colors_container.appendChild(colored_div);              //appends the div

            //==| color label |==\\
            let color_label = document.createElement('p');
            color_label.innerHTML = `${generated_color}`;
            color_label.classList.add('color_label');
            colored_div.appendChild(color_label);
            
            //==| copy |==\\
            let copy_btn = document.createElement('div');           //creates the copy btn wrapper
            copy_btn.classList.add('copy_btn_wrapper');             //adds a class to the wrapper
            copy_btn.innerHTML = '<i class="fa-solid fa-copy"></i>';//sets the innerhtml
            colored_div.appendChild(copy_btn);                      //appends the wrapper to the div
            copy_btn.addEventListener('click', (e) => {    
                navigator.clipboard.writeText(generated_color).then(() => { //copy to clipboard
                    log('copy');    
                }).catch(() => { //if it fails
                    log('could not copy')
                });                
            });

            //==| lock |==\\
            let lock_btn = document.createElement('div');           //creates the lock btn wrapper
            lock_btn.classList.add('lock_btn_wrapper');             //adds a class to the wrapper
            lock_btn.innerHTML = '<i class="fa-solid fa-lock"></i>';//sets the innerhtml
            colored_div.appendChild(lock_btn);                      //appends the wrapper to the div


            this.items.push({
                'name': 'individual item',
                'locked': false,
                'color_i': picker_i,
                'color': generated_color
            });
            log(this.items[picker_i]);
        }
    }

    randomize_block(block) {

    }
}

const picker = new color_picker(5);
picker.spawn();






}, 0);
