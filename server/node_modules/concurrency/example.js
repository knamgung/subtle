var concurrency = require('concurrency');
var Callback    = concurrency.Callback;
var Process     = concurrency.Process;

var find = new Process({
   command:"find",
   args:["/bin"]
});
var find2 = new Process({
   command:"find",
   args:["/usr/bin"]
});

var callback = new Callback(function(done, find, find2){
    var i = setInterval(function(){
        console.log('waiting...');
    }, 500);
    //let's write them to stdout for fun...
    find.stdout.pipe(process.stdout);
    find2.stdout.pipe(process.stdout);

    //we better give the pipes enough time to drain ;)
    setTimeout(function(){
        clearInterval(i);
        console.log('callback finished!');
        done("'I feel like yielding now :)'");
    }, 10000);
}).follows(find).follows(find2);

var ls = new Process({
   command:"ls"
}).follows(callback);

find.on('running', function(){
    console.log('find running');
});
find.on('complete', function(){
    console.log('find complete');
});
find2.on('running', function(){
    console.log('find2 running');
});
find2.on('complete', function(){
    console.log('find2 complete');
});

ls.on('complete', function(ls){
    console.log('ls complete');
    ls.stdout.pipe(process.stdout);
});

ls.on('running', function(callback){
    console.log("The yield of the callback was: "+callback.yield);
    console.log('ls running');
});

ls.run();
