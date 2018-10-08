/*Path to server with images*/
    const servPath = {
        path: "https://images.pexels.com/photos",
        images: [
            "1275929/pexels-photo-1275929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=9060",
            "1451074/pexels-photo-1451074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450&w=560",
            "1460880/pexels-photo-1460880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=200",
            "1437629/pexels-photo-1437629.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=500",
            "87284/ocean-seacoast-rocks-water-87284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=426&w=400",
            "885880/pexels-photo-885880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=1260",
            "1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        ]
    };

    /*Get a random number in range [0-n], not that random though*/
    const randNum = (n) => {
        return Math.floor(Math.random() * Math.floor(n));
    };

    /*Find a random image*/
    const chooseImg = () => {
        let index = randNum(servPath.images.length);
        return `${servPath.path}/${servPath.images[index]}`
    };

    const blankForImg = (src) => {
        let img = document.createElement('img');
        img.src = src;
        img.id = 'idle_image';
        return img
    };

    const idleEvents = ['mousemove', 'mousedown', 'keypress', 'DOMMouseScroll', 'mousewheel', 'touchmove', 'MSPointerMove'];
    let timeOutId;
    let content = document.body.querySelector('section');

    const activeState = () => {
        timeCount();
        let idle_actual = document.getElementById('idle_image');
        if(idle_actual){
            idle_actual.remove();
            document.body.appendChild(content);
        }
    };

    const passiveState = () => {
        content.remove();
        document.body.appendChild(blankForImg(chooseImg()));
    };

    /*User moved*/
    const startOver = (e) => {
        console.log(e);
        window.clearTimeout(timeOutId);
        activeState();
    };

    /*Start tracking time*/
    const timeCount = () => {
        timeOutId = setTimeout(passiveState, 5000)
    };

    /** relaunch function **/
    function relaunch (func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        }
    }

    /*init app*/
    (() => {
        idleEvents.forEach(event => {
            window.addEventListener(event, relaunch (startOver, 200))
        });
        timeCount()
    })();