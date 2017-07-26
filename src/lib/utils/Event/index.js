class Event{
    constructor(){
        this.handlers=[]
    }
    on(type,fn){
        if(!this.handlers[type]){
            this.handlers[type] = [];
        }
        this.handlers[type].push({handle:fn,one:false});
    }
    one(type,option={},fn){
        if(!this.handlers[type]){
            this.handlers[type] = [];
        }
        this.handlers[type].push({handle:fn,one:true});
    }
    emit(type,option,fn){
        var handlers = this.handlers[type]
        for (var i=0, len=handlers.length; i < len; i++){
            if(fn){
                if(handlers[i].handle === fn){
                    handlers[i].handle(option)
                    if(handlers[i].one){
                        handlers.splice(i, 1);
                    }
                    break;
                }
            }else {
                handlers[i].handle(option)
                if(handlers[i].one){
                    handlers.splice(i, 1);
                }
            }

        }
    }
    remove(type,fn){
        var handlers = this.handlers[type]
        if(fn){
            for (var i=0, len=handlers.length; i < len; i++){
                if(handlers[i] === fn){
                    handlers.splice(i, 1);
                    break;
                }
            }
        }else {
            delete this.handlers[type];
        }
    }
}
export default new Event();