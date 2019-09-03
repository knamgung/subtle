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
describe("A Task", function(){
    var assert        = require('assert');
    var sinon         = require('sinon');
    var Task          = require('../src/Task');
    var task;

    beforeEach(function(){
        task = void 0;
    });

    it("should be instantiable", function(){
        new Task;
    });

    describe("before initialized", function(){
        var task;

        beforeEach(function(){
            task = new Task;
        });

        it("should not be complete", function(){
            assert(!task.isComplete);
            assert.equal(typeof task.isComplete, 'boolean');
        });

        it("should not be initialized", function(){
            assert(!task.isInitialized);
            assert.equal(typeof task.isInitialized, 'boolean');
        });

        it("should not be running", function(){
            assert(!task.isRunning);
            assert.equal(typeof task.isRunning, 'boolean');
        });
    });

    describe("initialized", function(){

        beforeEach(function(){
            task = new Task;
            task.initialize();
        });

        describe("properties", function(){
            it("should have an immutable isInitialized", function(){
                task.isInitialized="asdf";
                assert.equal(task.isInitialized, true);
            });

            it("should have an immutable isComplete flag", function(){
                task.isComplete=true;
                assert(!task.isComplete);
                assert.equal(typeof task.isComplete, 'boolean');
            });

            it("should have an immutable isRunning flag", function(){
                task.iRunning=true;
                assert(!task.isRunning);
                assert.equal(typeof task.isRunning, 'boolean');
            });

            it("should have an immutable id", function(){
                task.id="asdf";
                assert.equal(typeof task.id, 'string');
            });

            it("should have an immutable timestamp", function(){
                task.timestamp="asdf";
                assert.equal(typeof task.timestamp, 'number');
            });

            it("should yield equal values with .toString() and id", function(){
                assert.equal(task.toString(), task.id);
            });

            it("should yield equal values with .valueOf() and timestamp", function(){
                assert.equal(task.valueOf(), task.timestamp);
            });

            it("should be complete when 'complete' is emitted", function(done){
                task.on('complete', function(){
                    assert(task.isComplete, "the task wasn't complete");
                    assert(!task.isRunning, "the task was running");
                    done();
                });
                task.emit('complete');
            });

            it("should not be running when 'complete' is emitted", function(done){
                task.run();
                task.on('complete', function(){
                    assert(!task.isRunning, "the task was running");
                    done();
                });
                assert(task.isRunning, "the task wasn't running");
                task.emit('complete');
            });

            it("should bind 'this' to the task for handlers given to on", function(done){
                task.on('foo', function(){
                    assert.equal(task, this, "this wasn't bound to the task.");
                    done();
                });
                task.emit('foo');
            });
        });

        describe("following other tasks", function(){
            var newTask;

            beforeEach(function(){
                newTask = new Task;
                newTask.initialize();
            });

            it("should be able to follow other tasks", function(){
                task.follows(newTask);

                assert(task.isFollowing(newTask));
            });

            it("should not follow tasks that aren't initilized", function(){
                assert.throws(function(){
                    task.follows(new Task);
                });
            });

            it("should not follow something that is not an instanceof Task", function(){
                assert.throws(function(){
                    task.follows(5);
                });
            });

            it("should register a 'complete' event on the new task", function(done){
                task.follows(newTask);
                task.on('running', function(){
                    done();
                });

                newTask.emit('complete');
            });

            it("should only follow a task once", function(){
                task.follows(newTask);

                assert.throws(function(){
                    task.follows(newTask);
                });
            });

            it("should not register a 'complete' event if the new task isComplete", function(){
                newTask = {
                    __proto__:Task.prototype,
                    on:sinon.stub(),
                    isInitialized:true,
                    isComplete:true
                };

                task.follows(newTask);

                assert(!newTask.on.called);
            });
        });

        describe("running", function(){
            var newTask;

            beforeEach(function(){
                newTask = new Task;
                newTask.initialize();
            });

            it("should commence when followees complete", function(){
                task.follows(newTask);

                assert(!task.isRunning);

                newTask.emit('complete');

                assert(task.isRunning);
            });

            it("should not follow anymore", function(){
                task.follows(newTask);

                assert.throws(function(){
                    task.follows(new Task);
                });
            });

            it("should emit 'running'", function(done){
                task.on('running', function(){
                    done();
                });
                task.run();
            });

            it("should call 'running' handlers immediately", function(done){
                task.run();
                task.on('running', function(){
                    done();
                });
            });

            it("should recieve following tasks in 'running' handler", function(done){
                var total=0;
                task.follows(newTask);
                task.on('running', verify('before'));
                newTask.emit('complete');
                task.on('running', verify('after'));
                function verify(cycle){
                    return function(_newTask){
                        total+=1;
                        assert.equal(_newTask, newTask, "they weren't the same.  Task was: "+_newTask+", cycle was: "+cycle);
                        if(total === 2){
                            done();
                        }
                    };
                }
            });
        });
    });
});