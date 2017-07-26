/**
 * Created by DELL on 2017/6/26.
 */
import Vue from 'vue'
import sheetAdd from './addSheet.vue'

const sheetAddConstructor = Vue.extend(sheetAdd)
sheetAddConstructor.false=false
sheetAddConstructor.prototype.remove = function () {
    var _this = this;
    if(!_this.isShow) return
    _this.isShow= false
    sheetAddConstructor.false=false
    setTimeout(function () {
        _this.$el.parentNode.removeChild(_this.$el);
    },350)
}

sheetAddConstructor.prototype.removeNow = function () {
    this.isShow= false
    sheetAddConstructor.false=false
    this.$el.parentNode.removeChild(this.$el);
}

export function sheetAdded(options) {
    if( sheetAddConstructor.false) return;
    sheetAddConstructor.false=true
    var instance = new sheetAddConstructor().$mount(document.createElement('div'));
    if(options.direction){
        instance.direction = options.direction
    }
    instance.scope=options.scope
    instance.success =  function (data) {
        if(Object.prototype.toString.call(options.success) == '[object Function]'){
            options.success(data)
            this.remove()
        }
    }
    document.body.appendChild(instance.$el);
    setTimeout(function () {
        instance.isShow= true
    },10)
    setTimeout(function () {
        // instance.isShow= false
    },3000)
    Vue.nextTick(() => {
    })
    return instance
}