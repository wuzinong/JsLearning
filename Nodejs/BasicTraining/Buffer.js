
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);

var str = bin.toString('utf-8'); // => "hello"
console.log(str);
var bin2 = new Buffer('hello','utf-8');
console.log(bin2); 

// Buffer与字符串有一个重要区别。字符串是只读的，并且对字符串的任何修改得到的都是一个新字符串，原字符串保持不变。
// 至于Buffer，更像是可以做指针操作的C语言数组。例如，可以用[index]方式直接修改某个位置的字节。
// 而.slice方法也不是返回一个新的Buffer，而更像是返回了指向原Buffer中间的某个位置的指针，如下所示。
var sub = bin.slice(2);
sub[0] = 0x65;
console.log(bin); 

// 也因此，如果想要拷贝一份Buffer，得首先创建一个新的Buffer，并通过.copy方法把原Buffer中的数据复制过去。
// 这个类似于申请一块新的内存，并把已有内存中的数据复制过去。以下是一个例子。

var dup = new Buffer(bin.length);
bin.copy(dup);
dup[0] = 0x65;
console.log(bin);
console.log(dup)