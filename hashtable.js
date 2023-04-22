class HashTable{
    constructor(capacity){
        this.INIT_CAPACITY = 4;
        this.n = 0;
        this.m = capacity | this.INIT_CAPACITY;
        this.keys = new Array(this.m);
        this.vals = new Array(this.m);

        for(let i = 0; i < this.m; i++){
            this.keys[i] = null;
            this.vals[i] = null;
        }
    }

    size(){
        return this.n;
    }

    isEmpty(){
        return this.size() === 0;
    }

    contains(key){
        if (key == null) return new Error('Key is null');
        return this.get(key) !== null;
    }

    hash(key){
        let hashCode = (key & 0x7fffffff) % this.m;
        console.log('hashCode => ', hashCode);
        return hashCode;
    }

    resize(newCapacity){
        console.log('Resize...');
        let tmp = new HashTable(newCapacity);
        for(let i = 0; i<this.m; i++){
            if(this.keys[i] !== null){
                this.put(this.keys[i], this.vals[i]);
            }
        }

        console.log('newHashMap => ', tmp);

        this.keys = tmp.keys;
        this.vals = tmp.vals;
        this.m = tmp.m;

        console.log('Current hashMap =>', this);
    }

    put(key,value){
        if(key == null) return new Error('Key is null');
        if(value == null){
            this.delete(key);
            return;
        }

        if(this.n == this.m / 2) this.resize(2 * this.m);
        let i = 0;
        for(i = this.hash(key); this.keys[i] !== null; i = (1 + 1) % this.m){
            if(this.keys[i] == key){
                this.vals[i] = value;
                return;
            }
        }

        this.keys[i] = key;
        this.vals[i] = value;
        this.n++;
    }

    get(key){
        if (key == null) return new Error('Key is null');
        for (let i = this.hash(key); this.keys[i] !== null; i = (1+1)%this.m){
            if (this.keys[i] == key) {
                return this.vals[i]
            }
        }
        return null;
    }

    delete(key) {
        if (key == null) return new Error('Key is null');
        if (this.contains(key) == false) return;
        let i = this.hash(key);
        while(key !== this.keys[i]){
            i = (i + 1) % this.m;
        }

        this.keys[i] = null;
        this.vals[i] = null;

        i = (i + 1) % this.m;
        while(this.keys[i] !== null){
            let keyToRefresh = this.keys[i];
            let valToRefresh = this.vals[i];

            this.keys[i] = null;
            this.vals[i] = null;
            this.n--;
            this.put(keyToRefresh, valToRefresh);
            i = (i + 1) % this.m;
        }

        this.n--;
        if (this.n > 0 && this.n <= this.m / 8) {
            this.resize(this.m / 2);
        }
    }
}