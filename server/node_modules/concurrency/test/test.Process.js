/*!
 * Copyright 2013 Joseph Spencer.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
describe("A Process", function(){
    var assert        = require('assert');
    var prequire      = require('proxyquire');
    var sinon         = require('sinon');
    var EventEmitter  = require('events').EventEmitter;
    var Task          = sinon.stub();
    Task.returns(Task);
    var child_process = sinon.stub();
    var Process       = prequire('../src/Process', {
        'child_process':child_process,
        './Task':Task
    });
    var _process;

    beforeEach(function(){
        var emitter=new EventEmitter;
        emitter.emit.bind(emitter);
        emitter.on.bind(emitter);
        Task.emit=emitter.emit;
        Task.on=emitter.on;
        Task.initialize=sinon.stub();
        child_process.spawn=sinon.stub();
        child_process.fork=sinon.stub();
    });

    afterEach(function(){
        Task.reset();
        child_process.reset();
        _process = void 0;
    });

    it("should be instantiable", function(){
        _process = new Process({command:"commandToRun"});
    });

    describe("argument validation", function(){
        it("should require an object", function(){
            assert.throws(function(){
                new Process(null);
            });
        });

        it("should require an argument", function(){
            assert.throws(function(){
                new Process;
            });
        });

        it("should now allow more than one argument", function(){
            assert.throws(function(){
                new Process({command:"asdf"}, {});
            });
        });

        it("should require a command", function(){
            assert.throws(function(){
                new Process({command:null});
            });
        });

        it("should require args to be an array if given", function(){
            assert.throws(function(){
                new Process({command:"ls", args:null});
            });
        });

        it("should require options to be an object if given", function(){
            assert.throws(function(){
                new Process({command:"ls", options:null});
            });
        });
    });
});