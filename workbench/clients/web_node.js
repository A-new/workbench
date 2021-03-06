var zerorpc = require('zerorpc');
var fs = require('fs');
var util = require('util');

// Open the zeroRPC connection to workbench
var client = new zerorpc.Client();
client.connect('tcp://127.0.0.1:4242');

// What functions are available
client.invoke('_zerorpc_list', function(error, res, more) {
    console.log(res);
});

// Load a file, store it in workbench and ask workbench to generate a view on it
fs.readFile('../test_files/pe_files/baddy._exe_', function (err, data) {
    if (err) throw err;
    client.invoke('store_sample', 'baddy._exe_', data, function(err, md5, more) {
        if (err) throw err;
        console.log(md5);
        client.invoke('work_request','view', md5, function(err, result, more) {
            if (err) throw err;
            console.log( util.inspect(result, {depth:null}));
        });
    });
});