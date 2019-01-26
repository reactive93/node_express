export function eraser(canvas, context, state){
    console.log("eraser style");
    const mouse = { x:0, y:0};
    let draw = false;
    context.globalCompositeOperation = 'destination-out';
    context.strokeStyle = "#000";
    context.fillStyle="#000";
    context.lineWidth = "20";
    console.log(context);
    canvas.onmousedown = function(e){

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        draw = true;
        context.beginPath();
        context.moveTo(mouse.x, mouse.y);
        state.socket.emit(state.room, JSON.stringify({pen:false, 'start': 1, 'x': mouse.x, 'y': mouse.y}) )
    };
    canvas.onmousemove = function(e){

        if(draw===true){

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
            context.lineTo(mouse.x, mouse.y);
            context.stroke();
            state.socket.emit(state.room, JSON.stringify({pen:false, 'x': mouse.x, 'y': mouse.y}) );
        }
    };
    canvas.onmouseup = function(e){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        context.lineTo(mouse.x, mouse.y);
        context.stroke();
        draw = false;
        state.socket.emit(state.room, JSON.stringify({pen:false, 'start': 0, 'x': mouse.x, 'y': mouse.y}) );

    };
};

export function pen(canvas, context, state){
    console.log("pen style");
    const mouse = { x:0, y:0};
    let draw = false;
    context.globalCompositeOperation = 'source-over';
    context.strokeStyle = "#000";
    context.fillStyle="#000";
    context.lineWidth = "1";
    console.log(context);
    canvas.onmousedown = function(e){

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        draw = true;
        context.beginPath();
        context.moveTo(mouse.x, mouse.y);
        state.socket.emit(state.room, JSON.stringify({pen:true, 'start': 1, 'x': mouse.x, 'y': mouse.y}) )
    };
    canvas.onmousemove = function(e){

        if(draw===true){

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
            context.lineTo(mouse.x, mouse.y);
            context.stroke();
            state.socket.emit(state.room, JSON.stringify({pen:true, 'x': mouse.x, 'y': mouse.y}) );
        }
    };
    canvas.onmouseup = function(e){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        context.lineTo(mouse.x, mouse.y);
        context.stroke();
        draw = false;
        state.socket.emit(state.room, JSON.stringify({pen:true, 'start': 0, 'x': mouse.x, 'y': mouse.y}) );

    };
};

export function move(canvas, context, state) {
    const image_data = context.getImageData(0,0, canvas.width, canvas.height);

    console.log("move");
    console.log(image_data);
    const mouse = { x:0, y:0};
    let ismove = false;
    console.log(context);
    console.log(canvas);
    canvas.onmousedown = function(e){

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        ismove = true;
        context.save();
    };
    canvas.onmousemove = function(e){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if(ismove){
            console.log(mouse);
            context.putImageData(image_data,  mouse.x, mouse.y,0,0, canvas.width, canvas.height);
            // context.restore();
        }
    };
    canvas.onmouseup = function(e){
        ismove = false;
    };
}


export function next(canvas, context, state, component) {

    const image_data = context.getImageData(0,0, canvas.width, canvas.height);
    if(state.page < state.total){
        state.canvas_list[state.page] = image_data;
        const page = state.page+1;
        const image = state.canvas_list[page];
        context.putImageData(image,0,0);
        // state.page++;
        component.setState({page: state.page+1});
    }
    if (state.page == state.total){
        const image_data = context.getImageData(0,0, canvas.width, canvas.height);
        state.canvas_list.push(image_data);
        context.clearRect(0,0,canvas.width, canvas.height);
        const total =  state.total+1;
        const page = state.page+1;
        component.setState({page:page},()=>console.log(`next page ${state.page}`));
        component.setState({total:total},()=>console.log(`next total ${state.total}`));
        // state.page++;
        // state.total++;
    }


    console.log(state);
console.log(`page ${state.page} total ${state.total}`);
console.log(`next ${state.page}`);
}

export function back(canvas, context, state, component) {
    console.log("back");

    if(state.page == state.total){
        const current_image = context.getImageData(0,0, canvas.width, canvas.height);
        state.canvas_list[state.page] = current_image;
        // state.page--;
        const page = state.page-1;
        component.setState({page: page});
        const prev_image = state.canvas_list[page];
        context.putImageData(prev_image, 0, 0);
        return;
    }
    if ( state.page > 0){
        const image_data = context.getImageData(0,0, canvas.width, canvas.height);
        const page1 = state.page;
        state.canvas_list[page1] = image_data;
        // state.page--;
        component.setState({page: state.page-1});
        const page = state.page-1;
        const image = state.canvas_list[page];
        context.putImageData(image, 0, 0);
    }
    console.log(`page ${state.page} total ${state.total}`);
    console.log(`back ${state.page}`);
    console.log(state);
}