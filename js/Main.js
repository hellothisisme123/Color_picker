// https://css-tricks.com/converting-color-spaces-in-javascript/
function hexToHSL(H) { 
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
        r = "0x" + H[1] + H[1];
        g = "0x" + H[2] + H[2];
        b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
        r = "0x" + H[1] + H[2];
        g = "0x" + H[3] + H[4];
        b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0)
        h = 0;
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    else if (cmax == g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
        h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return {h, s, l};
}

function HSLToHex(h,s,l) {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0, 
        b = 0; 

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return "#" + r + g + b;
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
        this.colors_container = document.createElement('div');   //creates a colors container to hold each random color
        this.colors_container.classList.add('colors_container');     //gives the colors container a class
        $('.container').appendChild(this.colors_container);          //appends the colors container
        this.items = [];    //resets the items

        //_-==-_| RandomizeTab |_-==-_\\
        this.randomizeType = 'random'
        const randomizeWrapper = document.createElement('div')
        randomizeWrapper.classList.add('randomizeWrapper')
        
        let randomizeTypes = []
        const random = document.createElement('div')
        const monochromatic = document.createElement('div')
        const analogous = document.createElement('div')
        const triadic = document.createElement('div')
        const complementary = document.createElement('div')
        const shades = document.createElement('div')

        randomizeTypes.push(random)   
        randomizeTypes.push(monochromatic)   
        randomizeTypes.push(analogous)   
        randomizeTypes.push(triadic)   
        randomizeTypes.push(complementary)   
        randomizeTypes.push(shades)   

        random.innerHTML = 'Random'
        monochromatic.innerHTML = 'Monochromatic'
        analogous.innerHTML = 'Analogous'
        triadic.innerHTML = 'Triadic'
        complementary.innerHTML = 'Complementary'
        shades.innerHTML = 'Shades'
        
        randomizeTypes.filter(x => x.innerHTML.toLowerCase() == `${this.randomizeType}`)[0].classList.add('active')
        
        this.colors_container.appendChild(randomizeWrapper)

        const randomizeTringle = document.createElement('i')
        randomizeTringle.classList.add('fa-solid', 'fa-chevron-down')
        randomizeWrapper.appendChild(randomizeTringle)

        randomizeTypes.forEach(type => {
            type.classList.add('randomType')
            randomizeWrapper.appendChild(type)

            // change selected type
            type.addEventListener('click', e => {
                this.randomizeType = e.target.innerHTML.toLowerCase()

                randomizeWrapper.appendChild(e.target)
                randomizeTypes.forEach(type => {
                    type.classList.remove('active')
                    if (type != e.target) randomizeWrapper.appendChild(type)
                })
                e.target.classList.add('active')

                this.randomize()
            })
        })


        for (let picker_i = 0; picker_i < this.count; picker_i++) {
            this.items.push({
                'name': 'individual item',
                'locked': false,
                'color_i': picker_i,
                'wrapper_selector': '',
                'lock_btn': '',
                'color_label': ''
            });
            

            //_-==-_| colored div |_-==-_\\
            let colored_div = document.createElement('div');        //creates the colored div
            colored_div.classList.add('colored_div');               //gives the div a class
            colored_div.style.backgroundColor = this.items[picker_i].color; //sets the bg color to random
            this.colors_container.appendChild(colored_div);              //appends the div
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
                    console.log('could not copy');
                    console.log(err);
                });  
                
                document.querySelectorAll('.copy_label').forEach(item => {
                    setTimeout(() => {
                        item.remove();
                    }, 1000);
                })
                
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
            if (e.key == ' ') {
                e.preventDefault();
                this.randomize()
            }
        })
        this.randomize()
    }

    randomize = (e) => {
        if (this.randomizeType == 'random') {
            this.items.forEach(item => {
                if (!item.locked) { //randomized the colors on unlocked items
                    item.color = random_hex();                                  //sets the item color data
                    item.wrapper_selector.style.backgroundColor = item.color;   //sets the bg color
                    item.color_label.innerHTML = item.color;                    //sets the label
                }
            });    
        } else if (this.randomizeType == 'shades') {
            let seed = hexToHSL(random_hex())

            let lockedItems = this.items.filter(x => x.locked)
            if (lockedItems.length > 0) {
                seed = hexToHSL(lockedItems[0].color)
            }
            
            this.items.forEach(item => {
                if (!item.locked) {
                    seed.l = Math.floor(Math.random() * 100)
                    item.color = HSLToHex(seed.h, seed.s, seed.l)
                    item.wrapper_selector.style.backgroundColor = item.color;   //sets the bg color
                    item.color_label.innerHTML = item.color
                }
            })
        } else if (this.randomizeType == 'analogous') {
            let seed = hexToHSL(random_hex())

            let lockedItems = this.items.filter(x => x.locked)
            if (lockedItems.length > 0) {
                seed = hexToHSL(lockedItems[0].color)
            }

            if (seed.h > 339) {
                seed.h = 339
            } else if (seed.h < 30) {
                seed.h = 30
            }

            let tmpSeedH = []
            let hl1 = seed.h - 30
            let hl2 = seed.h - 15
            let hl0 = seed.h
            let hh1 = seed.h + 15
            let hh2 = seed.h + 30
            tmpSeedH.push(hl1)
            tmpSeedH.push(hl2)
            tmpSeedH.push(hl0)
            tmpSeedH.push(hh1)
            tmpSeedH.push(hh2)
            
            this.items.forEach((item, i) => {
                if (!item.locked) {
                    seed.h = tmpSeedH[i]
                    
                    item.color = HSLToHex(seed.h, seed.s, seed.l)
                    item.wrapper_selector.style.backgroundColor = item.color;   //sets the bg color
                    item.color_label.innerHTML = item.color
                }
            })
        } else if (this.randomizeType == 'monochromatic') {
            let seed = hexToHSL(random_hex())

            let lockedItems = this.items.filter(x => x.locked)
            if (lockedItems.length > 0) {
                seed = hexToHSL(lockedItems[0].color)
            }
            
            this.items.forEach(item => {
                if (!item.locked) {
                    seed.l = Math.floor(Math.random() * 100)
                    seed.s = Math.floor(Math.random() * 100)
                    item.color = HSLToHex(seed.h, seed.s, seed.l)
                    item.wrapper_selector.style.backgroundColor = item.color;   //sets the bg color
                    item.color_label.innerHTML = item.color
                }
            })
        } else if (this.randomizeType == 'complementary') {
            let seed = hexToHSL(random_hex())

            let lockedItems = this.items.filter(x => x.locked)
            if (lockedItems.length > 0) {
                seed = hexToHSL(lockedItems[0].color)
            }

            let tmpColors = []
            let c1 = {
                h: seed.h,
                s: seed.s,
                l: seed.l
            }
            let c2 = {
                h: seed.h,
                s: seed.s,
                l: seed.l
            }
            let c3 = {
                h: seed.h,
                s: seed.s,
                l: seed.l
            }
            let c4 = {
                h: seed.h,
                s: seed.s,
                l: seed.l
            }
            let c5 = {
                h: seed.h,
                s: seed.s,
                l: seed.l
            }

            c1.h += random_min_max_int(170, 190)
            if (c1.h > 359) {
                c1.h = (c1.h - 359)
            }

            c2.s += random_min_max_int(-20, 20)
            if (c2.s > 100) {
                c2.s = (c2.s - 100)
            } else if (c2.s < 0) {
                c2.s = 100 - c2.s
            }

            c4.l += random_min_max_int(-20, 20)
            if (c4.l > 100) {
                c4.l = (c4.l - 100)
            } else if (c4.l < 0) {
                c4.l = 100 - c4.l
            }

            c5.h += random_min_max_int(170, 190)
            if (c5.h > 359) {
                c5.h = (c5.h - 359)
            }

            tmpColors.push(c1)
            tmpColors.push(c2)
            tmpColors.push(c3)
            tmpColors.push(c4)
            tmpColors.push(c5)

            this.items.forEach((item, i) => {
                if (!item.locked) {
                    item.color = HSLToHex(tmpColors[i].h, tmpColors[i].s, tmpColors[i].l)
                    item.wrapper_selector.style.backgroundColor = item.color;   //sets the bg color
                    item.color_label.innerHTML = item.color
                }
            })
        } else if (this.randomizeType == 'triadic') {
            let seed = hexToHSL(random_hex())

            let lockedItems = this.items.filter(x => x.locked)
            if (lockedItems.length > 0) {
                seed = hexToHSL(lockedItems[0].color)
            }

            let tmpColors = []
            let c1 = {
                h: seed.h,
                s: seed.s,
                l: seed.l
            }
            let c2 = {
                h: seed.h,
                s: seed.s,
                l: seed.l
            }
            let c3 = {
                h: seed.h,
                s: seed.s,
                l: seed.l
            }
            let c4 = {
                h: seed.h,
                s: seed.s,
                l: seed.l
            }
            let c5 = {
                h: seed.h,
                s: seed.s,
                l: seed.l
            }

            c1.h += random_min_max_int(-110, -130)
            c1.s += random_min_max_int(-20, 20)
            c1.l += random_min_max_int(-20, 20)
            if (c1.h < 0) {
                c1.h = 360 - c1.h
            }

            if (c1.s > 100) {
                c1.s = (c1.s - 100)
            } else if (c1.s < 0) {
                c1.s = 100 - c1.s
            }

            if (c1.l > 100) {
                c1.l = (c1.l - 100)
            } else if (c1.l < 0) {
                c1.l = 100 - c1.l
            }
            
            c2.h += random_min_max_int(-110, -130)
            c2.s += random_min_max_int(-20, 20)
            c2.l += random_min_max_int(-20, 20)
            if (c2.h < 0) {
                c2.h = 360 - c2.h
            }

            if (c2.s > 100) {
                c2.s = (c2.s - 100)
            } else if (c2.s < 0) {
                c2.s = 100 - c2.s
            }

            if (c2.l > 100) {
                c2.l = (c2.l - 100)
            } else if (c2.l < 0) {
                c2.l = 100 - c2.l
            }

            c4.h += random_min_max_int(110, 130)
            c4.s += random_min_max_int(-20, 20)
            c4.l += random_min_max_int(-20, 20)
            if (c4.h > 360) {
                c4.h = (c4.h - 360)
            }

            if (c4.s > 100) {
                c4.s = (c4.s - 100)
            } else if (c4.s < 0) {
                c4.s = 100 - c4.s
            }

            if (c4.l > 100) {
                c4.l = (c4.l - 100)
            } else if (c4.l < 0) {
                c4.l = 100 - c4.l
            }
            
            c5.h += random_min_max_int(110, 130)
            c5.s += random_min_max_int(-20, 20)
            c5.l += random_min_max_int(-20, 20)
            if (c5.h > 360) {
                c5.h = (c5.h - 360)
            }

            if (c5.s > 100) {
                c5.s = (c5.s - 100)
            } else if (c5.s < 0) {
                c5.s = 100 - c5.s
            }

            if (c5.l > 100) {
                c5.l = (c5.l - 100)
            } else if (c5.l < 0) {
                c5.l = 100 - c5.l
            }

            tmpColors.push(c1)
            tmpColors.push(c2)
            tmpColors.push(c3)
            tmpColors.push(c4)
            tmpColors.push(c5)

            
            this.items.forEach((item, i) => {
                if (!item.locked) {
                    
                    item.color = HSLToHex(tmpColors[i].h, tmpColors[i].s, tmpColors[i].l)
                    item.wrapper_selector.style.backgroundColor = item.color;   //sets the bg color
                    item.color_label.innerHTML = item.color
                }
            })
        }

        this.items.forEach(item => {
            let tmpColor = hex_to_rgb(item.color)
            tmpColor = Math.round((tmpColor[0] + tmpColor[1] + tmpColor[2]) / 3)
            if (tmpColor < 128) {
                item.wrapper_selector.style.color = '#fff'
                console.log(item)
            } else {
                item.wrapper_selector.style.color = '#111'
            }
        })
        console.log(this.items)
    }
}

const picker = new color_picker(5);
picker.spawn();