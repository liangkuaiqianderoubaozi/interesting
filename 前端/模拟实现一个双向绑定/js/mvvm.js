// 创建一个Mvvm构造函数
// 这里用es6方法将options赋一个初始值，防止没传，等同于options || {}
function Mvvm(options = {}) {
    /**
     * 主思路：
     *   1.读取主节点下的子节点
     *   2.正则替换子节点的模板语法{{}},这里我起名为Compile()
     *   3.通过监听属性的get/set调用Compile()->>实现数据到页面的单向绑定
     *   4.给元素节点添加监听事件调用属性的get/set方法->>实现数据的双向绑定
     * */
    this.$options = options;
    let data = this._data = this.$options.data;

    for (let key in data) {
        Object.defineProperty(this, key, {
            configurable: true,
            get() {
                return this._data[key]
            },
            set(newVal) {
                this._data[key] = newVal
            }
        })
    }

    observe(data);

    new Compile(options.el, this);
}

/**
 * 拦截get/set方法
 * */
function Observe(data) {
    // 所谓数据劫持就是给对象增加get,set
    let dep = new Dep();
    // 先遍历一遍对象再说
    for (let key in data) {     // 把data属性通过defineProperty的方式定义属性
        let val = data[key];
        observe(val);   // 递归继续向下找，实现深度的数据劫持
        Object.defineProperty(data, key, {
            configurable: true,
            get() {
                Dep.target && dep.addSub(Dep.target);   // 将watcher添加到订阅事件中 [watcher]
                return val;
            },
            set(newVal) {   // 更改值的时候
                if (val === newVal) {   // 设置的值和以前值一样就不理它
                    return;
                }
                val = newVal;   // 如果以后再获取值(get)的时候，将刚才设置的值再返回去
                observe(newVal);    // 当设置为新值后，也需要把新值再去定义成属性
                dep.notify();   // 让所有watcher的update方法执行即可
            }
        });
    }
}
// 方便递归调用
function observe(data) {
    // 如果不是对象的话就直接return掉
    // 防止递归溢出
    if (!data || typeof data !== 'object') return;
    return new Observe(data);
}

/**
 * 执行正则替换模板+监听dom节点调用get/set方法
 * */
function Compile(el, vm) {

    // 将el挂载到实例上方便调用
    vm.$el = document.querySelector(el);

    // 在el范围里将内容都拿到，当然不能一个一个的拿
    // 可以选择移到内存中去然后放入文档碎片中，节省开销
    let fragment = document.createDocumentFragment();
    //所以，这里的firstChild才可以拿到所有的节点
    while (child = vm.$el.firstChild) {
        //因为，appendChild 是移动节点而非复制节点
        fragment.appendChild(child);
    }

    // 对el里面的内容进行替换
    function replace(frag, hasWatcher) {
        //Array.from（）方法从类似数组或可迭代的对象创建一个新的，“浅复制”的Array实例。
        //可执行console.log(Array.from([1, 2, 3], x => x + x));进行理解,返回的是新数组
        Array.from(frag.childNodes).forEach(node => {
            let txt = node.textContent;
            let reg = /\{\{(.*?)\}\}/g;   // 正则匹配{{}}

            /**
             *  w3c
             *
             * The nodeType property returns the node type, as a number, of the specified node.
             *  If the node is an element node, the nodeType property will return 1.
             *  If the node is an attribute node, the nodeType property will return 2.
             *  If the node is a text node, the nodeType property will return 3.
             *  If the node is a comment node, the nodeType property will return 8.
             *  This property is read-only.
             *
             * */
            if (node.nodeType === 1) {  // 元素节点
                let nodeAttr = node.attributes; // 获取dom上的所有属性,是个类数组
                Array.from(nodeAttr).forEach(attr => {
                    let name = attr.name;   // v-model  type
                    let exp = attr.value;   // c        text
                    if (name.includes('k-')) {
                        node.value = vm[exp];   // this.c 为 2
                    }
                    if (!hasWatcher) {
                        // 监听变化
                        new Watcher(vm, exp, function (newVal) {
                            node.value = newVal;   // 当watcher触发时会自动将内容放进输入框中
                        });
                    }


                    node.addEventListener('input', e => {
                        let newVal = e.target.value;
                        // 相当于给this.c赋了一个新值
                        // 而值的改变会调用set，set中又会调用notify，notify中调用watcher的update方法实现了更新
                        vm[exp] = newVal;
                    });
                });
            }

            if (node.nodeType === 3 && reg.test(txt)) {
                function replaceTxt(hasWatcher) {
                    node.textContent = txt.replace(reg, (matched, placeholder) => {
                        if (!hasWatcher) {
                            new Watcher(vm, placeholder, replaceTxt);
                        }
                        return placeholder.split('.').reduce((val, key) => {
                            return val[key];
                        }, vm);
                    });
                };
                // 替换
                replaceTxt(hasWatcher);
            }
            // 如果还有子节点，继续递归replace
            if (node.childNodes && node.childNodes.length) {
                replace(node, true);
            }
        });
    }

    replace(fragment, false);  // 替换内容

    vm.$el.appendChild(fragment);   // 再将文档碎片放入el中
}

/**
 *以下四部分是实现数据修改调用正则替换Compile()方法
 * */
function Dep() {
    //存放函数的事件池
    this.sub = [];
}
Dep.prototype = {
    addSub(sub) {
        this.sub.push(sub)
    },
    notify() {
        this.sub.forEach(sub => sub.update())
    }
}
function Watcher(vm, exp, fn) {
    this.fn = fn
    this.vm = vm
    this.exp = exp

    Dep.target = this
    let arr = exp.split(".")
    let val = vm
    arr.forEach(key => {
        val = val[key]
    })
    Dep.target = null
}
Watcher.prototype.update = function () {
    let arr = this.exp.split('.');
    let val = this.vm;
    arr.forEach(key => {
        val = val[key];   // 通过get获取到新的值
    });
    this.fn(val);
}






